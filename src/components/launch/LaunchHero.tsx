import { launchContent } from '../../config/launch';
import { RocketIcon } from './launchIcons';
import './launch.css';

export function LaunchHero() {
  const { tagline, headline, badge, lede } = launchContent;

  return (
    <header className="launch__hero">
      <p className="launch__tagline">{tagline}</p>

      <h1 className="launch__title">
        <span className="launch__line">{headline.first}</span>
        <span className="launch__line launch__accent">{headline.accent}</span>
      </h1>

      <svg className="launch__swoosh" viewBox="0 0 300 24" aria-hidden="true">
        <defs>
          <linearGradient id="swoosh-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0a4fe8" />
            <stop offset="1" stopColor="#3d9bff" />
          </linearGradient>
        </defs>
        <path d="M3 18 C 70 4, 200 2, 297 9" fill="none" stroke="url(#swoosh-grad)" strokeWidth="7" strokeLinecap="round" />
      </svg>

      <p className="launch__badge">
        <RocketIcon className="launch__badge-icon" />
        {badge}
      </p>

      <p className="launch__lede">{lede}</p>
    </header>
  );
}