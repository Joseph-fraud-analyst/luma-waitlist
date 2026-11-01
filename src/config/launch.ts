import { site } from './site';

// Store links come from the environment so they can change without a code edit.
const appStoreUrl = (import.meta.env.VITE_APP_STORE_URL as string | undefined)?.trim() ?? '';
const googlePlayUrl = (import.meta.env.VITE_GOOGLE_PLAY_URL as string | undefined)?.trim() ?? '';

export const launchContent = {
  tagline: site.tagline,
  headline: { first: 'Lumaya is', accent: 'Now Live.' },
  badge: 'Official Launch',
  lede: 'Your personal climate assistant is now available to help you navigate changing conditions, find support and stay prepared.',
  stores: { appStoreUrl, googlePlayUrl },
  features: [
    { key: 'updates', label: 'Real-time updates' },
    { key: 'support', label: 'Nearby support' },
    { key: 'services', label: 'Trusted services' },
  ],
} as const;