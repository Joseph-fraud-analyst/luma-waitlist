import { useEffect, useState } from 'react';
import {
  fallbackLaunchInfo,
  fetchLaunchInfo,
  type LaunchInfo,
} from '../services/launchConfigService';

export type LaunchStatus = 'loading' | 'upcoming' | 'launched';

/**
 * 'launched' when the backend says so, or the moment the launch time passes
 * while the page is open. 'loading' until the launch date is known.
 */
export function useLaunchStatus(): LaunchStatus {
  const [info, setInfo] = useState<LaunchInfo | null>(null);
  const [clockReached, setClockReached] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchLaunchInfo()
      .then((value) => {
        if (!cancelled) setInfo(value);
      })
      .catch(() => {
        if (!cancelled) setInfo(fallbackLaunchInfo());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const launchAt = info?.launchAt;

  useEffect(() => {
    if (!launchAt) return;
    const target = new Date(launchAt).getTime();
    if (!Number.isFinite(target)) return;

    const check = (): boolean => {
      if (Date.now() >= target) {
        setClockReached(true);
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

  if (!info) return 'loading';
  return info.launched || clockReached ? 'launched' : 'upcoming';
}