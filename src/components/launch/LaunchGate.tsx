import type { ReactNode } from 'react';
import { useLaunchStatus } from '../../features/waitlist/hooks/useLaunchStatus';
import LaunchPage from '../../pages/LaunchPage';
import { PageLayout } from '../common/PageLayout';

/**
 * Wrap the waitlist page with this. Before launch it renders the page untouched;
 * once launched it renders the launch screen instead.
 */
export function LaunchGate({ children }: { children: ReactNode }) {
  const status = useLaunchStatus();
    console.log('launch status:', status);
  // Development only: open /?preview=launch to see the launch screen early.
  const preview =
    import.meta.env.DEV && new URLSearchParams(window.location.search).get('preview') === 'launch';

  if (preview || status === 'launched') return <LaunchPage />;
  if (status === 'loading') return <PageLayout>{null}</PageLayout>; // never flash the waitlist on a launched site
  return <>{children}</>;
}