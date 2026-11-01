import { useEffect, useState } from 'react';
import { getWaitlistCount, WAITLIST_JOINED_EVENT } from '../services/waitlistService';

export type WaitlistCountStatus = 'loading' | 'ready' | 'error';

/**
 * Live waitlist size. Refreshes:
 *  - on mount
 *  - every `pollMs` while the tab is visible
 *  - when the tab becomes visible again
 *  - right after a signup in this tab (custom event)
 *  - when another tab changes storage (keeps the mock in sync across tabs)
 * If a refresh fails, the last known count stays on screen.
 */
export function useWaitlistCount(pollMs = 30_000) {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<WaitlistCountStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const value = await getWaitlistCount();
        if (cancelled) return;
        setCount(value);
        setStatus('ready');
      } catch {
        if (cancelled) return;
        setStatus((previous) => (previous === 'ready' ? 'ready' : 'error'));
      }
    };

    const refresh = () => {
      void load();
    };
    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') void load();
    };

    refresh();
    const intervalId = window.setInterval(refreshIfVisible, pollMs);
    document.addEventListener('visibilitychange', refreshIfVisible);
    window.addEventListener(WAITLIST_JOINED_EVENT, refresh);
    window.addEventListener('storage', refresh);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', refreshIfVisible);
      window.removeEventListener(WAITLIST_JOINED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [pollMs]);

  return { count, status };
}
