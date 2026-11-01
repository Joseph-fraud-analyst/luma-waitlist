import { useEffect, useState } from 'react';

/** Becomes true the moment the launch time passes, even if the page is already open. */
export function useLaunchReached(launchAt?: string): boolean {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    if (!launchAt) return;
    const target = new Date(launchAt).getTime();
    if (!Number.isFinite(target)) return;

    const check = (): boolean => {
      if (Date.now() >= target) {
        setReached(true);
        return true;
      }
      return false;
    };

    if (check()) return;
    const id = window.setInterval(() => {
      if (check()) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [launchAt]);

  return reached;
}
