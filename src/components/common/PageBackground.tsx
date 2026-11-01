import './common.css';

/**
 * Backdrop drawn on the mockup's 1672x941 artboard: a translucent sphere on each
 * side, stacked waves rising at both bottom corners, and a pale glow in the centre.
 */
export function PageBackground() {
  return (
    <div className="bg" aria-hidden="true">
      <svg className="bg__art" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMax slice">
        <defs>
          <filter id="bg-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="bg-soft-sm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          <radialGradient id="bg-sphere-l" cx="0.42" cy="0.5" r="0.62">
            <stop offset="0" stopColor="#62b5fb" />
            <stop offset="0.5" stopColor="#8fcafc" />
            <stop offset="0.85" stopColor="#d3e8fd" />
            <stop offset="1" stopColor="#f3f8ff" />
          </radialGradient>
          <radialGradient id="bg-sphere-r" cx="0.45" cy="0.15" r="0.8">
            <stop offset="0" stopColor="#43c2fd" />
            <stop offset="0.4" stopColor="#7dc3fd" />
            <stop offset="0.75" stopColor="#cfe6fd" />
            <stop offset="1" stopColor="#ece4fb" />
          </radialGradient>

          <linearGradient id="bg-wl1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cfdcfb" />
            <stop offset="1" stopColor="#e6e9fc" />
          </linearGradient>
          <linearGradient id="bg-wl2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b6d8fd" />
            <stop offset="1" stopColor="#a3cdfc" />
          </linearGradient>
          <linearGradient id="bg-wl3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fc4fd" />
            <stop offset="1" stopColor="#4a8cfb" />
          </linearGradient>
          <linearGradient id="bg-wl4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3a7cf6" />
            <stop offset="1" stopColor="#7cb2fc" />
          </linearGradient>
          <linearGradient id="bg-wr1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8dbcfc" />
            <stop offset="0.55" stopColor="#5b97fb" />
            <stop offset="1" stopColor="#b0a4fb" />
          </linearGradient>
          <linearGradient id="bg-wr2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#4a8bf8" />
            <stop offset="1" stopColor="#86b8fc" />
          </linearGradient>
          <linearGradient id="bg-line-l" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="620" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bg-line-r" gradientUnits="userSpaceOnUse" x1="1672" y1="0" x2="1100" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="bg-glow" cx="0.5" cy="1" r="0.75">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#d3effe" stopOpacity="0.8" />
            <stop offset="1" stopColor="#d3effe" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Centre glow behind the content */}
        <ellipse cx="836" cy="960" rx="780" ry="170" fill="url(#bg-glow)" />

        {/* Left sphere */}
        <circle cx="-30" cy="405" r="315" fill="url(#bg-sphere-l)" />
        <ellipse cx="10" cy="505" rx="140" ry="90" fill="#f2c9f4" opacity="0.4" filter="url(#bg-soft)" />
        <circle cx="-30" cy="405" r="315" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
        <path
          d="M0 320 C 90 360 170 440 200 540"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.7"
          strokeWidth="2.5"
          filter="url(#bg-soft-sm)"
        />

        {/* Right sphere */}
        <circle cx="1799" cy="580" r="429" fill="url(#bg-sphere-r)" />
        <ellipse cx="1700" cy="650" rx="210" ry="70" fill="#e7d3fa" opacity="0.5" filter="url(#bg-soft)" />
        <ellipse cx="1590" cy="330" rx="30" ry="26" fill="#ffffff" opacity="0.25" filter="url(#bg-soft-sm)" />
        <circle cx="1799" cy="580" r="429" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2.5" />

        {/* Left waves */}
        <path d="M0 568 C 170 580 360 690 560 850 L560 941 L0 941 Z" fill="url(#bg-wl1)" opacity="0.9" />
        <path d="M0 628 C 160 640 340 740 560 850 L560 941 L0 941 Z" fill="url(#bg-wl2)" opacity="0.9" />
        <path d="M0 722 C 140 700 320 770 560 850 L560 941 L0 941 Z" fill="url(#bg-wl3)" />
        <path d="M0 722 C 140 700 320 770 560 850" fill="none" stroke="url(#bg-line-l)" strokeWidth="3" />
        <path
          d="M0 925 C 180 872 360 846 560 850 C 640 852 700 880 760 941 L0 941 Z"
          fill="url(#bg-wl4)"
        />
        <path d="M0 925 C 180 872 360 846 560 850 C 640 852 700 880 760 941" fill="none" stroke="url(#bg-line-l)" strokeWidth="3" />

        {/* Right waves */}
        <path d="M1672 632 C 1500 642 1330 740 1150 862 L1150 941 L1672 941 Z" fill="url(#bg-wr1)" />
        <path d="M1672 632 C 1500 642 1330 740 1150 862" fill="none" stroke="url(#bg-line-r)" strokeWidth="3" />
        <path
          d="M980 941 C 1040 880 1110 853 1200 852 C 1400 850 1580 870 1672 935 L1672 941 Z"
          fill="url(#bg-wr2)"
        />
        <path
          d="M980 941 C 1040 880 1110 853 1200 852 C 1400 850 1580 870 1672 935"
          fill="none"
          stroke="url(#bg-line-r)"
          strokeWidth="3"
        />

        {/* Soft pale crest in the centre */}
        <ellipse cx="836" cy="955" rx="520" ry="85" fill="#e9f8ff" opacity="0.95" filter="url(#bg-soft)" />
      </svg>
    </div>
  );
}
