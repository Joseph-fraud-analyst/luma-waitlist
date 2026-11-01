import type { ReactNode } from 'react';
import { PageBackground } from './PageBackground';
import { SiteHeader } from './SiteHeader';
import './common.css';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <PageBackground />
      <SiteHeader />
      <main className="page__main">{children}</main>
    </div>
  );
}
