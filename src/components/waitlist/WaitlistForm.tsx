import { useEffect, useRef, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { site } from '../../config/site';
import { useWaitlistSignup } from '../../features/waitlist/hooks/useWaitlistSignup';
import { Button } from '../common/Button';
import { ArrowRightIcon, CheckIcon, MailIcon } from '../common/icons';
import './waitlist-form.css';

export function WaitlistForm() {
  const navigate = useNavigate();
  const { email, setEmail, consent, setConsent, errors, status, serverError, result, submit } =
    useWaitlistSignup();

  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Go to the confirmation page once the signup succeeds.
  // Go to the confirmation page once the signup succeeds.
  useEffect(() => {
    if (status === 'success') {
      navigate(site.routes.success, {
        state: { alreadyJoined: result?.already_registered === true },
      });
    }
  }, [status, result, navigate]);
  // After a failed submit, move focus to the first field that needs attention.
  useEffect(() => {
    if (errors.email) emailRef.current?.focus();
    else if (errors.consent) consentRef.current?.focus();
  }, [errors.email, errors.consent]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit(honeypotRef.current?.value ?? '');
  };

  const isSubmitting = status === 'submitting';
  const formError = errors.email ?? serverError;

  return (
    <form className="waitlist" onSubmit={handleSubmit} noValidate>
      <div className={`waitlist__field${errors.email ? ' waitlist__field--invalid' : ''}`}>
        <MailIcon className="waitlist__icon" />
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          ref={emailRef}
          id="waitlist-email"
          className="waitlist__input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={formError ? 'waitlist-form-error' : undefined}
        />
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Joining…' : 'Join the Waitlist'}
          {isSubmitting ? null : <ArrowRightIcon width={20} height={20} />}
        </Button>
      </div>

      {formError ? (
        <p id="waitlist-form-error" className="waitlist__error" role="alert">
          {formError}
        </p>
      ) : null}

      <label className="consent">
        <span className="consent__box">
          <input
            ref={consentRef}
            className="consent__input"
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'waitlist-consent-error' : undefined}
          />
          <CheckIcon className="consent__check" />
        </span>
        <span>
          I agree to receive updates about Lumaya. View our{' '}
          <Link className="consent__link" to={site.routes.privacy}>
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {errors.consent ? (
        <p id="waitlist-consent-error" className="waitlist__error" role="alert">
          {errors.consent}
        </p>
      ) : null}

      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        ref={honeypotRef}
        className="sr-only"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    </form>
  );
}
