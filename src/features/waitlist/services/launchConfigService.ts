// Self-contained on purpose: it reads the launch date straight from the backend
// and does not depend on the signup service or its types.

const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '').replace(/\/$/, '');
const FALLBACK_LAUNCH_AT =
  (import.meta.env.VITE_LAUNCH_DATE as string | undefined) || '2027-01-11T00:00:00Z';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const TIMEOUT_MS = 4000;

export type LaunchStatusValue = 'UPCOMING' | 'LAUNCHED';

export interface LaunchInfo {
  launchAt: string;
  timezone: string;
  status: LaunchStatusValue;
  launched: boolean;
}

/** GET /v1/waitlist/config */
interface LaunchConfigResponse {
  launch_at: string;
  timezone: string;
  status: LaunchStatusValue;
}

/** Used when there is no API URL, the mock is on, or the API can't be reached. */
export function fallbackLaunchInfo(): LaunchInfo {
  const launched = Date.now() >= new Date(FALLBACK_LAUNCH_AT).getTime();
  return {
    launchAt: FALLBACK_LAUNCH_AT,
    timezone: 'UTC',
    status: launched ? 'LAUNCHED' : 'UPCOMING',
    launched,
  };
}

export async function fetchLaunchInfo(): Promise<LaunchInfo> {
  if (!API_BASE || USE_MOCK) return fallbackLaunchInfo();

  const response = await fetch(`${API_BASE}/v1/waitlist/config`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Launch config request failed (${response.status})`);

  const body = (await response.json()) as LaunchConfigResponse;
  return {
    launchAt: body.launch_at,
    timezone: body.timezone,
    status: body.status,
    launched: body.status === 'LAUNCHED',
  };
}

/** "1 January 2027", shown in the timezone the backend gives for the launch. */
export function formatLaunchDate(iso: string, timeZone: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  try {
    return date.toLocaleDateString('en-GB', { ...options, timeZone });
  } catch {
    // Unknown timezone name: fall back to UTC rather than failing.
    return date.toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });
  }
}