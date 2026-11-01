export interface WaitlistSignupPayload {
  email: string;
  launch_updates_consent: boolean;
  marketing_consent: boolean;
}

export interface WaitlistSignupResponse {
  message: string;
  position: number;
  total_registered: number;
  already_registered: boolean;
}

export interface WaitlistCountResponse {
  total_registered: number;
}

export type LaunchStatus = 'UPCOMING' | 'LAUNCHED';

export interface WaitlistConfigResponse {
  launch_at: string;
  timezone: string;
  status: LaunchStatus;
}

export type SignupStatus = 'idle' | 'submitting' | 'success' | 'error';