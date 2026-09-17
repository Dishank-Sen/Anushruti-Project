'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { analyseVoice } from '@/lib/voice/analysis';
import { NoiseGate, type VoiceFrame } from '@/lib/voice/practice';
export type MicrophoneState = 'off' | 'requesting' | 'live' | 'error';
export function useVoiceInput(
  onSample: (sample: VoiceFrame, time: number) => void,
  onStop: () => void,
  onAudio: (audio: Float32Array, rate: number, speech: boolean) => void,
) {
  const [state, setState] = useState<MicrophoneState>('off');
  const [error, setError] = useState('');
  const sampleHandler = useRef(onSample);
  const stopHandler = useRef(onStop);
  const audioHandler = useRef(onAudio);
  useEffect(() => {
    sampleHandler.current = onSample;
    stopHandler.current = onStop;
    audioHandler.current = onAudio;
  });
  const resources = useRef<{
    stream: MediaStream;
    context: AudioContext;
    frame: number;
    capture?: AudioWorkletNode;
  } | null>(null);
  const generation = useRef(0);
  const gate = useRef(new NoiseGate());
  const release = useCallback(() => {
    generation.current++;
    const active = resources.current;
    resources.current = null;
    if (active) {
      cancelAnimationFrame(active.frame);
      if (active.capture) {
        active.capture.port.onmessage = null;
        active.capture.disconnect();
      }
      active.stream.getTracks().forEach((track) => {
        track.onended = null;
        track.stop();
      });
      void active.context.close().catch(() => {});
    }
  }, []);
  const stop = useCallback(() => {
    release();
    setState('off');
    stopHandler.current();
  }, [release]);
  useEffect(() => {
    const hidden = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', hidden);
    window.addEventListener('pagehide', stop);
    return () => {
      document.removeEventListener('visibilitychange', hidden);
      window.removeEventListener('pagehide', stop);
      release();
    };
  }, [release, stop]);
  async function start() {
    release();
    const token = generation.current;
    setError('');
    if (
      !window.isSecureContext ||
      !navigator.mediaDevices?.getUserMedia ||
      !window.AudioContext
    ) {
      setState('error');
      setError(
        'Microphone practice needs HTTPS or localhost and a browser with Web Audio support. You can still try the demo.',
      );
      return;
    }
    setState('requesting');
    let stream: MediaStream | null = null;
    let context: AudioContext | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          // Browser speech enhancement can fade sustained hums and distort the target.
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      });
      if (token !== generation.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      context = new AudioContext();
      const analyser = context.createAnalyser();
      analyser.fftSize = 4096;
      const highpass = context.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 75;
      const lowpass = context.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 5000;
      context
        .createMediaStreamSource(stream)
        .connect(highpass)
        .connect(lowpass)
        .connect(analyser);
      // The analyser has no audible output. The worklet emits only silent output.
      resources.current = { stream, context, frame: 0 };
      await context.resume();
      if (token !== generation.current) return;
      const track = stream.getAudioTracks()[0];
      if (!track || track.readyState !== 'live')
        throw new Error('Microphone disconnected');
      track.onended = () => {
        stop();
        setState('error');
        setError('The microphone disconnected. Reconnect it and try again.');
      };
      context.onstatechange = () => {
        if (token === generation.current && context?.state === 'suspended') {
          stop();
          setError(
            'Microphone paused by your browser. Start it again when you are ready.',
          );
        }
      };
      let latestSpeech = false;
      if (context.audioWorklet) {
        await context.audioWorklet.addModule('/audio/voice-capture.js');
        if (token !== generation.current || !resources.current) return;
        const capture = new AudioWorkletNode(context, 'voice-capture');
        resources.current.capture = capture;
        lowpass.connect(capture);
        capture.connect(context.destination);
        capture.port.onmessage = (event: MessageEvent<Float32Array>) => {
          if (token === generation.current)
            audioHandler.current(event.data, context!.sampleRate, latestSpeech);
        };
      }
      gate.current.reset(performance.now());
      setState('live');
      const data = new Float32Array(analyser.fftSize);
      let last = 0;
      const tick = (time: number) => {
        if (token !== generation.current || !resources.current) return;
        if (time - last >= 80) {
          last = time;
          analyser.getFloatTimeDomainData(data);
          const sample = gate.current.update(
            analyseVoice(data, analyser.context.sampleRate),
            time,
          );
          latestSpeech = sample.speech && !sample.learningNoise;
          sampleHandler.current(sample, time);
        }
        if (resources.current)
          resources.current.frame = requestAnimationFrame(tick);
      };
      resources.current.frame = requestAnimationFrame(tick);
    } catch (reason) {
      stream?.getTracks().forEach((track) => track.stop());
      if (context && context.state !== 'closed')
        void context.close().catch(() => {});
      if (token !== generation.current) return;
      release();
      setState('error');
      const name = reason instanceof DOMException ? reason.name : '';
      setError(
        name === 'NotAllowedError'
          ? 'Microphone permission is off. Allow it in your browser’s site settings, then try again—or explore the demo.'
          : name === 'NotFoundError'
            ? 'No microphone found. Connect one, then try again. The demo works without a microphone.'
            : 'We couldn’t start your microphone. Check that it is connected and not busy in another app, then try again.',
      );
    }
  }
  return {
    state,
    error,
    start,
    stop,
    recalibrate: () => gate.current.reset(performance.now()),
    manual: (floor: number, margin: number) =>
      gate.current.manual(floor, margin),
  };
}
