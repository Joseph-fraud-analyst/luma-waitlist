import { PageLayout } from '../components/common/PageLayout';
import { Countdown } from '../components/countdown/Countdown';
import { WaitlistCounter } from '../components/waitlist/WaitlistCounter';
import { WaitlistForm } from '../components/waitlist/WaitlistForm';
import { WaitlistHero } from '../components/waitlist/WaitlistHero';

export default function WaitlistPage() {
  return (
    <PageLayout>
      <WaitlistHero />
      <WaitlistForm />
      <Countdown />
      <WaitlistCounter />
    </PageLayout>
  );
}
