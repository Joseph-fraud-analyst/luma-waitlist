import { env } from '../../../config/env';
import { apiRequest } from '../../../services/api/client';
import type {
  WaitlistConfigResponse,
  WaitlistCountResponse,
  WaitlistSignupPayload,
  WaitlistSignupResponse,
} from '../types';

const MOCK_KEY = 'lumaya:mock-waitlist';
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const WAITLIST_JOINED_EVENT = 'lumaya:waitlist-joined';

function notifyJoined(): void {
  window.dispatchEvent(new Event(WAITLIST_JOINED_EVENT));
}

function readMock(): string[] {
  try {
    return JSON.parse(localStorage.getItem(MOCK_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

function writeMock(emails: string[]): void {
  try {
    localStorage.setItem(MOCK_KEY, JSON.stringify(emails));
  } catch {
    /* Storage unavailable; the mock simply won't remember. */
  }
}

// =====================================================
// WAITLIST REGISTRATION
// =====================================================

export async function joinWaitlist(
  payload: WaitlistSignupPayload,
): Promise<WaitlistSignupResponse> {
  if (env.useMock) {
    await sleep(700);

    const emails = readMock();

    const alreadyRegistered = emails.includes(payload.email);

    if (!alreadyRegistered) {
      writeMock([...emails, payload.email]);
      notifyJoined();
    }

    return {
      message: alreadyRegistered
        ? 'This email is already registered.'
        : 'Your waitlist registration was successful.',
      position: alreadyRegistered ? 0 : emails.length + 1,
      total_registered:
        emails.length + (alreadyRegistered ? 0 : 1),
      already_registered: alreadyRegistered,
    };
  }

  const result = await apiRequest<WaitlistSignupResponse>(
    '/v1/waitlist/register',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  if (!result.already_registered) {
    notifyJoined();
  }

  return result;
}

// =====================================================
// WAITLIST COUNT
// =====================================================

export async function getWaitlistCount(): Promise<number> {
  if (env.useMock) {
    // Mock registrations start at zero.
    return readMock().length;
  }

  const response = await apiRequest<WaitlistCountResponse>(
    '/v1/waitlist/count',
  );

  return response.total_registered;
}

// =====================================================
// LAUNCH CONFIGURATION
// =====================================================

export async function getWaitlistConfig(): Promise<WaitlistConfigResponse> {
  if (env.useMock) {
    return {
      launch_at: env.launchDate,
      timezone: 'UTC',
      status: new Date() >= new Date(env.launchDate) ? 'LAUNCHED' : 'UPCOMING',
    };
  }

  return apiRequest<WaitlistConfigResponse>(
    '/v1/waitlist/config',
  );
}