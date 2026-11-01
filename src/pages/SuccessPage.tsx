import { Link, useLocation } from 'react-router-dom';
import { Orb } from '../components/branding/Orb';
import { PageLayout } from '../components/common/PageLayout';
import { useWaitlistConfig } from '../features/waitlist/hooks/useWaitlistConfig';
import { site } from '../config/site';
import './pages.css';

interface SuccessState {
  alreadyJoined?: boolean;
}

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

export default function SuccessPage() {
  const state = useLocation().state as SuccessState | null;

  const { launchAt, status, isLoading } = useWaitlistConfig();

  const title = state?.alreadyJoined
    ? 'You’re already on the list.'
    : 'You’re on the list.';

  const launchDate = formatLaunchDate(launchAt);

  const message =
    status === 'LAUNCHED'
      ? 'Lumaya is now live. Check your inbox for early access.'
      : isLoading || !launchDate
        ? 'We’ll email you when Lumaya opens.'
        : `We’ll email you when Lumaya opens on ${launchDate}.`;

  return (
    <PageLayout>
      <section className="success">
        <Orb size={128} pulse />

        <h1 className="success__title">{title}</h1>

        <p className="success__text">{message}</p>

        <Link className="btn btn--secondary" to={site.routes.home}>
          Back to home
        </Link>
      </section>
    </PageLayout>
  );
}