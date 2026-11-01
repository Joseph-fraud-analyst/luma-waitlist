import { useEffect, useRef, useState } from 'react';

/** Eases the displayed number toward `target`. Jumps straight there if the user prefers reduced motion. */
export function useAnimatedNumber(target: number | null, duration = 900): number {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (target === null) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    if (reduceMotion || from === target) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (target - from) * eased);
      fromRef.current = next; // an interrupted animation resumes from where it is
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
