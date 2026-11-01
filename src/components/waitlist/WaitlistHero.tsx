import { site } from '../../config/site';
import './waitlist.css';

export function WaitlistHero() {
  const [lineOne, lineTwo] = site.headline;
  // The full stop gets its own span so it can be tucked in and set in the deeper blue.
  const accentHasPeriod = site.headlineAccent.endsWith('.');
  const accentText = accentHasPeriod ? site.headlineAccent.slice(0, -1) : site.headlineAccent;

  return (
    <header className="hero">
      <p className="hero__tagline">{site.tagline}</p>

      <h1 className="hero__title">
        <span className="hero__line">{lineOne}</span>
        <span className="hero__line">{lineTwo}</span>
        <span className="hero__line hero__accent">
          {accentText}
          {accentHasPeriod ? <span className="hero__period">.</span> : null}
        </span>
      </h1>

      <p className="hero__lede">
        {site.lede.before}
        <strong className="hero__highlight">{site.lede.highlight}</strong>
        {site.lede.after}
      </p>

      <p className="hero__availability">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        {site.availability}
      </p>
    </header>
  );
}