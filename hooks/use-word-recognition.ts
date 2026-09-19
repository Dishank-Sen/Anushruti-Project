'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UtteranceBuffer } from '@/lib/voice/utterance';

export function useWordRecognition() {
  const [state, setState] = useState<
    'off' | 'starting' | 'listening' | 'processing'
  >('off');
  const [text, setText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const worker = useRef<Worker | null>(null);
  const ready = useRef(false);
  const busy = useRef(false);
  const epoch = useRef(0);
  const buffer = useRef(new UtteranceBuffer());
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stop = useCallback(() => {
    epoch.current++;
    ready.current = false;
    busy.current = false;
    worker.current?.terminate();
    worker.current = null;
    if (watchdog.current) clearTimeout(watchdog.current);
    buffer.current.reset();
    setState('off');
  }, []);
  const clear = useCallback((clearNotes = true) => {
    epoch.current++;
    buffer.current.reset();
    setText('');
    setFinalText('');
    if (clearNotes) setNotes([]);
  }, []);
  useEffect(() => {
    const hide = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', stop);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', stop);
    };
  }, [stop]);
  function start() {
    stop();
    clear();
    setError('');
    setProgress(0);
    setState('starting');
    try {
      const instance = new Worker(
        new URL('../workers/transcription.worker.ts', import.meta.url),
        { type: 'module' },
      );
      worker.current = instance;
      const fail = (message: string) => {
        if (worker.current !== instance) return;
        stop();
        setError(message);
      };
      watchdog.current = setTimeout(
        () =>
          fail(
            'The model download timed out. Check your connection and try again.',
          ),
        180000,
      );
      instance.onerror = () =>
        fail(
          'Captions are unavailable here. Try again or use the visual exercises.',
        );
      instance.onmessage = (
        event: MessageEvent<{
          type: string;
          text?: string;
          id?: number;
          progress?: number;
          message?: string;
        }>,
      ) => {
        if (worker.current !== instance) return;
        const data = event.data;
        if (data.type === 'progress') setProgress(data.progress ?? 0);
        if (data.type === 'ready') {
          if (watchdog.current) clearTimeout(watchdog.current);
          ready.current = true;
          setState('listening');
        }
        if (data.type === 'error')
          fail(data.message ?? 'Captions stopped. Please retry.');
        if (data.type === 'result') {
          if (watchdog.current) clearTimeout(watchdog.current);
          busy.current = false;
          setState('listening');
          if (data.id !== epoch.current) return;
          const words =
            data.text?.replace(/\[[^\]]*\]|\([^)]*\)/g, '').trim() ?? '';
          if (!words || !/[a-z]/i.test(words)) {
            setText('No clear words this time. Try again when ready.');
            return;
          }
          setText(words);
          setFinalText(words);
          setNotes((previous) => [...previous, words].slice(-8));
        }
      };
      instance.postMessage({ type: 'load' });
    } catch {
      stop();
      setError(
        'This browser cannot start local captions. The visual exercises still work.',
      );
    }
  }
  function acceptAudio(audio: Float32Array, rate: number, speech: boolean) {
    if (!ready.current || busy.current || !worker.current) return;
    const utterance = buffer.current.push(audio, rate, speech);
    if (!utterance) return;
    busy.current = true;
    setState('processing');
    watchdog.current = setTimeout(() => {
      stop();
      setError(
        'This device needs more time for captions. Try a shorter phrase.',
      );
    }, 45000);
    worker.current.postMessage(
      { type: 'transcribe', audio: utterance, id: epoch.current },
      [utterance.buffer],
    );
  }
  return {
    state,
    text,
    finalText,
    notes,
    progress,
    error,
    start,
    stop,
    clear,
    acceptAudio,
  };
}
