import { useCallback, useState } from 'react';
import { site } from '../../../config/site';
import { ApiError } from '../../../services/api/client';
import { joinWaitlist } from '../services/waitlistService';
import type {
  SignupStatus,
  WaitlistSignupResponse,
} from '../types';
import {
  normalizeEmail,
  validateSignup,
  type SignupErrors,
} from '../validation/signup';

export function useWaitlistSignup() {
  const [email, setEmailValue] = useState('');

  const [consent, setConsentValue] = useState<boolean>(
    site.consentPreChecked,
  );

  const [errors, setErrors] =
    useState<SignupErrors>({});

  const [status, setStatus] =
    useState<SignupStatus>('idle');

  const [serverError, setServerError] =
    useState<string | null>(null);

  // Preserve the registration response because other
  // frontend components may depend on this information.
  const [result, setResult] =
    useState<WaitlistSignupResponse | null>(null);

  const setEmail = useCallback((value: string) => {
    setEmailValue(value);

    setErrors((current) => ({
      ...current,
      email: undefined,
    }));

    setServerError(null);
  }, []);

  const setConsent = useCallback((value: boolean) => {
    setConsentValue(value);

    setErrors((current) => ({
      ...current,
      consent: undefined,
    }));
  }, []);

  const submit = useCallback(
    async (honeypot: string) => {
      if (status === 'submitting') {
        return;
      }

      const found = validateSignup(
        email,
        consent,
      );

      setErrors(found);
      setServerError(null);

      if (found.email || found.consent) {
        return;
      }

      // Bots that fill the hidden field receive a success
      // response, but no request is sent to the backend.
      if (honeypot) {
        setResult({
          message:
            'Your waitlist registration was successful.',
          position: 0,
          total_registered: 0,
          already_registered: false,
        });

        setStatus('success');
        return;
      }

      setStatus('submitting');

      try {
        // Preserve the established backend request contract.
        const response = await joinWaitlist({
          email: normalizeEmail(email),

          // The single frontend consent checkbox controls
          // consent for launch updates.
          launch_updates_consent: consent,

          // Marketing consent remains separate and is not
          // implied by launch update consent.
          marketing_consent: false,
        });

        setResult(response);
        setStatus('success');
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : 'We couldn’t reach the server. Check your connection and try again.';

        setServerError(message);
        setStatus('error');
      }
    },
    [email, consent, status],
  );

  return {
    email,
    setEmail,
    consent,
    setConsent,
    errors,
    status,
    serverError,
    result,
    submit,
  };
}