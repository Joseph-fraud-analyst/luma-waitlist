import { useWaitlistConfig } from '../../features/waitlist/hooks/useWaitlistConfig';
import { useCountdown } from './useCountdown';
import './countdown.css';

const pad = (value: number) => String(value).padStart(2, '0');

function formatLaunchDate(launchAt: string): string {
  const date = new Date(launchAt);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function Countdown() {
  const { launchAt, status } = useWaitlistConfig();

  const { days, hours, minutes, seconds, isComplete } = useCountdown(launchAt);

  const hasLaunched = status === 'LAUNCHED' || isComplete;

  if (hasLaunched) {
    return (
      <p className="countdown__label">
        Lumaya is live. Check your inbox for early access.
      </p>
    );
  }

  const units = [
    { label: 'Days', value: String(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ];

  return (
    <section className="countdown" aria-label="Time until launch">
      <p className="countdown__label">
        {/* Launching on {formatLaunchDate(launchAt)} */}
      </p>

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