import { apiRequest } from '../../../services/api/client';
import type {
  WaitlistConfigResponse,
  WaitlistCountResponse,
  WaitlistSignupPayload,
  WaitlistSignupResponse,
} from '../types';

export const WAITLIST_JOINED_EVENT = 'lumaya:waitlist-joined';

function notifyJoined(): void {
  window.dispatchEvent(
    new Event(WAITLIST_JOINED_EVENT),
  );
}

// =====================================================
// WAITLIST REGISTRATION
// =====================================================

export async function joinWaitlist(
  payload: WaitlistSignupPayload,
): Promise<WaitlistSignupResponse> {
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
  const response = await apiRequest<WaitlistCountResponse>(
    '/v1/waitlist/count',
  );

  return response.total_registered;
}

// =====================================================
// LAUNCH CONFIGURATION
// =====================================================

export async function getWaitlistConfig(): Promise<WaitlistConfigResponse> {
  return apiRequest<WaitlistConfigResponse>(
    '/v1/waitlist/config',
  );
}