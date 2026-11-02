import { useEffect, useState } from 'react';
import {
  fallbackLaunchInfo,
  fetchLaunchInfo,
  formatLaunchDate,
  type LaunchInfo,
  type LaunchStatusValue,
} from '../services/launchConfigService';

export interface LaunchDetails {
  launchAt: string;
  timezone: string;
  status: LaunchStatusValue;
  /** Human-readable date, e.g. "1 January 2027". */
  label: string;
}

/** Launch date from the backend (falls back to VITE_LAUNCH_DATE). Returns null while loading. */
export function useLaunchConfig(): LaunchDetails | null {
  const [info, setInfo] = useState<LaunchInfo | null>(null);

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

  if (!info) return null;
  return {
    launchAt: info.launchAt,
    timezone: info.timezone,
    status: info.status,
    label: formatLaunchDate(info.launchAt, info.timezone),
  };
}