const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface SignupErrors {
  email?: string;
  consent?: string;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateSignup(email: string, consent: boolean): SignupErrors {
  const errors: SignupErrors = {};
  const normalized = normalizeEmail(email);

  if (!normalized) {
    errors.email = 'Enter your email address.';
  } else if (!EMAIL_PATTERN.test(normalized)) {
    errors.email = 'Enter a valid email address, like name@example.com.';
  }

  if (!consent) {
    errors.consent = 'Tick the box to agree to receive updates.';
  }

  return errors;
}
