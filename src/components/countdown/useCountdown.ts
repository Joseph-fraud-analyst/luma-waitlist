import { useEffect, useState } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function compute(target: number): TimeLeft {
  const diff = Number.isFinite(target) ? Math.max(0, target - Date.now()) : 0;
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
    isComplete: diff === 0,
  };
}

export function useCountdown(targetDate: string | Date): TimeLeft {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => compute(target));

  useEffect(() => {
    setTimeLeft(compute(target));
    const id = window.setInterval(() => {
      const next = compute(target);
      setTimeLeft(next);
      if (next.isComplete) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return timeLeft;
}
