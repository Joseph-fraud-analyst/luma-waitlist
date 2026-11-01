import { useEffect, useState } from 'react';
import { env } from '../../../config/env';
import { getWaitlistConfig } from '../services/waitlistService';
import type { LaunchStatus } from '../types';

interface WaitlistConfigState {
  launchAt: string;
  timezone: string;
  status: LaunchStatus;
  isLoading: boolean;
}

export function useWaitlistConfig(): WaitlistConfigState {
  const [config, setConfig] = useState<WaitlistConfigState>({
    launchAt: env.launchDate,
    timezone: 'UTC',
    status: new Date() >= new Date(env.launchDate) ? 'LAUNCHED' : 'UPCOMING',
    isLoading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await getWaitlistConfig();

        if (cancelled) return;

        setConfig({
          launchAt: response.launch_at,
          timezone: response.timezone,
          status: response.status,
          isLoading: false,
        });
      } catch {
        // Keep the configured fallback launch date.
        // The countdown remains functional if the API is temporarily unavailable.
        if (!cancelled) {
          setConfig((current) => ({
            ...current,
            isLoading: false,
          }));
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return config;
}