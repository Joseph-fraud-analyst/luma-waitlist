export interface Avatar {
  name: string;
  /** Optional photo URL. Without it, initials are shown. */
  src?: string;
}

export const site = {
  availability: 'Available in Europe only',
  name: 'Lumaya',
  headline: ['Your Personal', 'Climate Assistant'] as const,
  headlineAccent: 'is Coming.',
  tagline: 'Light with purpose.',
  lede: {
  before:
    'Understand what’s happening around you, how weather and climate conditions may affect your day, and what to do next.\nFrom ',
  highlight: 'planning ahead',
  after:
    ' and making informed decisions to finding nearby support, Lumaya helps you face everyday challenges with greater confidence.',
},
  /** The mockup shows the box ticked. Set to false to make people tick it themselves. */
  consentPreChecked: true,
  routes: { home: '/', success: '/success', privacy: '/privacy' },
  avatars: [{ name: 'Ada O.' }, { name: 'Maya R.' }, { name: 'Tom K.' }] as Avatar[],
} as const;