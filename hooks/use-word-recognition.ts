'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
type RecognitionResult = {
  isFinal: boolean;
  0: { transcript: string; confidence: number };
};
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  processLocally?: boolean;
  onresult:
    | ((event: {
        resultIndex: number;
        results: ArrayLike<RecognitionResult>;
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  abort: () => void;
};
type Constructor = {
  new (): Recognition;
  available?: (options: {
    langs: string[];
    processLocally: boolean;
  }) => Promise<string>;
  install?: (options: {
    langs: string[];
    processLocally: boolean;
  }) => Promise<boolean>;
};
export function useWordRecognition() {
  const [state, setState] = useState<'off' | 'starting' | 'listening'>('off');
  const [text, setText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [error, setError] = useState('');
  const instance = useRef<Recognition | null>(null);
  const generation = useRef(0);
  const release = useCallback(() => {
    generation.current++;
    if (instance.current) {
      const current = instance.current;
      instance.current = null;
      current.onend = null;
      current.onerror = null;
      current.onstart = null;
      current.onresult = null;
      current.abort();
    }
  }, []);
  const stop = useCallback(() => {
    release();
    setState('off');
  }, [release]);
  useEffect(() => {
    const hide = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', stop);
    return () => {
      release();
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', stop);
    };
  }, [release, stop]);
  async function start(online: boolean) {
    release();
    const token = generation.current;
    setError('');
    setText('');
    setFinalText('');
    setState('starting');
    try {
      const global = window as Window & {
        SpeechRecognition?: Constructor;
        webkitSpeechRecognition?: Constructor;
      };
      const Ctor = global.SpeechRecognition ?? global.webkitSpeechRecognition;
      if (!Ctor)
        throw new Error(
          'Word recognition is unavailable in this browser. The sound exercises still work.',
        );
      const recognizer = new Ctor();
      if (!online) {
        if (!('processLocally' in recognizer) || !Ctor.available)
          throw new Error(
            'On-device recognition is unavailable here. You can choose the online browser service below.',
          );
        const available = await Ctor.available({
          langs: ['en-US'],
          processLocally: true,
        });
        if (token !== generation.current) return;
        if (available !== 'available')
          throw new Error(
            'The English on-device language pack is not installed. Use a browser with a local English pack, or choose the online service below.',
          );
        recognizer.processLocally = true;
      } else if ('processLocally' in recognizer)
        recognizer.processLocally = false;
      if (token !== generation.current) return;
      recognizer.lang = 'en-US';
      recognizer.continuous = true;
      recognizer.interimResults = true;
      recognizer.onstart = () => {
        if (token === generation.current) setState('listening');
      };
      recognizer.onresult = (event) => {
        if (token !== generation.current) return;
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          interim += result[0].transcript + ' ';
          if (result.isFinal) final += result[0].transcript + ' ';
        }
        setText(interim.trim().slice(-200));
        if (final) setFinalText(final.trim().slice(-200));
      };
      recognizer.onerror = (event) => {
        if (token !== generation.current) return;
        setError(
          event.error === 'no-speech'
            ? 'No words detected. Try again when ready.'
            : event.error === 'not-allowed'
              ? 'Speech permission was denied. Check your browser settings.'
              : `Word recognition stopped (${event.error}). You can retry.`,
        );
        stop();
      };
      recognizer.onend = () => {
        if (token === generation.current) {
          instance.current = null;
          setState('off');
        }
      };
      instance.current = recognizer;
      recognizer.start();
    } catch (reason) {
      if (token !== generation.current) return;
      release();
      setState('off');
      setError(
        reason instanceof Error
          ? reason.message
          : 'Word recognition could not start.',
      );
    }
  }
  return {
    state,
    text,
    finalText,
    error,
    start,
    stop,
    clear: () => {
      setText('');
      setFinalText('');
    },
  };
}
