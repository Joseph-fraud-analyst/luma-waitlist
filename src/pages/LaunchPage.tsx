import { useEffect } from 'react';
import { PageLayout } from '../components/common/PageLayout';
import { LaunchDecor } from '../components/launch/LaunchDecor';
import { LaunchFeatures } from '../components/launch/LaunchFeatures';
import { LaunchHero } from '../components/launch/LaunchHero';
import { StoreButtons } from '../components/launch/StoreButtons';
import { site } from '../config/site';
import '../components/launch/launch.css';

export default function LaunchPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${site.name} is now live`;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <PageLayout>
      <LaunchDecor />
      <div className="launch">
        <LaunchHero />
        <StoreButtons />
        <LaunchFeatures />
      </div>
    </PageLayout>
  );
}