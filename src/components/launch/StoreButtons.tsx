import type { ReactNode } from 'react';
import { launchContent } from '../../config/launch';
import { AppleIcon, PlayIcon } from './launchIcons';
import './launch.css';

interface StoreLinkProps {
  href: string;
  className: string;
  icon: ReactNode;
  small: string;
  big: string;
}

function StoreLink({ href, className, icon, small, big }: StoreLinkProps) {
  const content = (
    <>
      {icon}
      <span className="store__text">
        <span className="store__small">{small}</span>
        <span className="store__big">{big}</span>
      </span>
    </>
  );

  // No store link yet: show the button but make it clear it isn't active.
  if (!href) {
    return (
      <span className={`store ${className} store--inactive`} role="link" aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a className={`store ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

export function StoreButtons() {
  const { appStoreUrl, googlePlayUrl } = launchContent.stores;

  return (
    <div className="launch__stores">
      <StoreLink
        href={appStoreUrl}
        className="store--apple"
        icon={<AppleIcon className="store__icon" />}
        small="Download on the"
        big="App Store"
      />
      <StoreLink
        href={googlePlayUrl}
        className="store--play"
        icon={<PlayIcon className="store__icon" />}
        small="Get it on"
        big="Google Play"
      />
    </div>
  );
}