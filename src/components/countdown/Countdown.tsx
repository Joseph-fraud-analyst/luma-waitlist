import { useWaitlistConfig } from '../../features/waitlist/hooks/useWaitlistConfig';
import { useCountdown } from './useCountdown';
import './countdown.css';

const pad = (value: number) => String(value).padStart(2, '0');

/** "1 January 2027", in the timezone the backend gives for the launch. */
function formatLaunchDate(launchAt: string, timeZone: string): string {
  const date = new Date(launchAt);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  try {
    return date.toLocaleDateString('en-GB', { ...options, timeZone });
  } catch {
    // Unknown timezone name: fall back to UTC rather than failing//.
    return date.toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });
  }
}

export function Countdown() {
  const { launchAt, timezone, status, isLoading } = useWaitlistConfig();

  const { days, hours, minutes, seconds, isComplete } = useCountdown(launchAt);

  // Wait for the backend's date, so the page never flashes the fallback date first.
  if (isLoading) {
    return null;
  }

  // After launch: show the live message, not the countdown.
  if (status === 'LAUNCHED' || isComplete) {
    return (
      <p className="countdown__label">
        Lumaya is live. Check your inbox for early access.
      </p>
    );
  }

  const label = formatLaunchDate(launchAt, timezone);

  const units = [
    { label: 'Days', value: String(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ];

  return (
    <section className="countdown" aria-label="Time until launch">
      {label ? <p className="countdown__label">Launching on {label}</p> : null}

      <div className="countdown__tiles" role="timer">
        {units.map((unit) => (
          <div className="countdown__tile" key={unit.label}>
            <span className="countdown__value">{unit.value}</span>
            <span className="countdown__unit">{unit.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}