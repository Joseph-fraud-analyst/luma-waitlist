import { useWaitlistCount } from '../../features/waitlist/hooks/useWaitlistCount';
import { useAnimatedNumber } from './useAnimatedNumber';
import './waitlist-counter.css';

const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value);

export function WaitlistCounter() {
  const { count, status } = useWaitlistCount();
  const displayed = useAnimatedNumber(count);

  // Never show a wrong or placeholder number: if it can't be loaded, show nothing.
  if (status === 'error') return null;

  const isLoading = count === null;

  return (
    <section className="counter" aria-label="Waitlist size">
      <span
        className={`counter__number${isLoading ? ' counter__number--loading' : ''}`}
        aria-hidden="true"
      >
        {isLoading ? null : formatNumber(displayed)}
      </span>
      {/* Screen readers get the final number once, not every animation frame. */}
      {isLoading ? null : <span className="sr-only">{formatNumber(count)}</span>}
      <p className="counter__text">people have already joined the Lumaya waitlist</p>
    </section>
  );
}
