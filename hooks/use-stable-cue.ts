'use client';
import { useEffect, useRef, useState } from 'react';
import { CueLatch } from '@/lib/voice/feedback';

export function useStableCue(value: string, phase: string) {
  const latch = useRef(new CueLatch());
  const latest = useRef(value);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    latest.current = value;
  }, [value]);
  useEffect(() => {
    setShown(latch.current.update(latest.current, performance.now(), true));
    const timer = setInterval(
      () => setShown(latch.current.update(latest.current, performance.now())),
      100,
    );
    return () => clearInterval(timer);
  }, [phase]);
  return shown;
}
