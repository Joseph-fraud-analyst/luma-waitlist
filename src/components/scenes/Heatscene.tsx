import './scenes.css';

/** A person wilting in the heat: fanning themselves, sweating, thermometer climbing. */
export function HeatScene() {
  const sunRays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    return {
      x1: 196 + Math.cos(angle) * 40,
      y1: 64 + Math.sin(angle) * 40,
      x2: 196 + Math.cos(angle) * 56,
      y2: 64 + Math.sin(angle) * 56,
    };
  });

  return (
    <svg className="scene" viewBox="0 0 260 340" aria-hidden="true">
      <defs>
        <radialGradient id="hs-sun-glow">
          <stop offset="0" stopColor="#ffd36b" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd36b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hs-sun-body">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#f6a93b" />
        </radialGradient>
      </defs>

      <circle className="scene__bubble" cx="130" cy="170" r="126" />

      {/* Sun */}
      <circle className="hs__glow" cx="196" cy="64" r="78" fill="url(#hs-sun-glow)" />
      <g className="hs__rays" stroke="#f6a93b" strokeWidth="4" strokeLinecap="round">
        {sunRays.map((ray, i) => (
          <line key={i} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
        ))}
      </g>
      <circle className="hs__sun" cx="196" cy="64" r="30" fill="url(#hs-sun-body)" />

      {/* Thermometer */}
      <rect x="26" y="150" width="16" height="124" rx="8" fill="#ffffff" stroke="#0b1546" strokeWidth="2" />
      <rect className="hs__mercury" x="31" y="160" width="6" height="116" rx="3" fill="#ff4d4d" />
      <circle cx="34" cy="282" r="14" fill="#ff4d4d" stroke="#0b1546" strokeWidth="2" />
      <path d="M46 170 h8 M46 190 h8 M46 210 h8 M46 230 h8 M46 250 h8" stroke="#0b1546" strokeWidth="2" strokeLinecap="round" />

      <ellipse className="scene__shadow" cx="130" cy="312" rx="58" ry="8" />

      <g className="hs__figure">
        {/* Legs and shoes */}
        <path d="M112 252 L110 304" stroke="#f1c6a0" strokeWidth="13" strokeLinecap="round" />
        <path d="M148 252 L152 304" stroke="#f1c6a0" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx="108" cy="310" rx="15" ry="6" fill="#f4f7ff" stroke="#0b1546" strokeWidth="1.5" />
        <ellipse cx="154" cy="310" rx="15" ry="6" fill="#f4f7ff" stroke="#0b1546" strokeWidth="1.5" />

        {/* Shorts and tank top */}
        <path d="M100 206 H160 L164 252 H132 L130 232 L128 252 H96 Z" fill="#0b1546" />
        <path d="M106 126 Q130 134 154 126 L160 210 Q130 218 100 210 Z" fill="#ff7a59" />
        <ellipse cx="130" cy="176" rx="16" ry="22" fill="#e8613f" opacity="0.5" />

        {/* Hanging arm */}
        <path d="M152 140 Q166 176 160 204" fill="none" stroke="#f1c6a0" strokeWidth="12" strokeLinecap="round" />
        <circle cx="160" cy="206" r="7" fill="#f1c6a0" />

        {/* Neck and head */}
        <rect x="124" y="114" width="12" height="14" rx="5" fill="#e9b58d" />
        <circle cx="130" cy="96" r="21" fill="#f1c6a0" />
        <path d="M109 92 Q108 70 130 70 Q152 70 151 92 Q140 80 109 92 Z" fill="#3b2a24" />

        {/* Drooping, flushed, panting face */}
        <path d="M117 96 Q121 100 125 96" fill="none" stroke="#0b1546" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M115 89 L126 91" stroke="#3b2a24" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M110 99 L105 104 L111 105" fill="#e2b48c" />
        <circle className="hs__blush" cx="122" cy="104" r="6" fill="#ff6b6b" />
        <ellipse className="hs__mouth" cx="118" cy="110" rx="4" ry="3" fill="#7a2f2f" />

        {/* Fanning arm and fan */}
        <path d="M108 140 Q84 140 84 108" fill="none" stroke="#f1c6a0" strokeWidth="12" strokeLinecap="round" />
        <g className="hs__fan">
          <path d="M84 104 L55.7 75.7 A40 40 0 0 1 112.3 75.7 Z" fill="#f3c565" stroke="#c98a2a" strokeWidth="2" strokeLinejoin="round" />
          <path d="M84 104 L66 70 M84 104 L84 64 M84 104 L102 70" stroke="#c98a2a" strokeWidth="1.5" fill="none" />
        </g>
        <circle cx="84" cy="106" r="7" fill="#f1c6a0" />

        {/* Sweat */}
        <path className="hs__drop hs__drop--1" d="M128 82 q-4 6 0 9 q4 -3 0 -9 z" fill="#7fd0ff" />
        <path className="hs__drop hs__drop--2" d="M141 84 q-4 6 0 9 q4 -3 0 -9 z" fill="#7fd0ff" />
        <path className="hs__drop hs__drop--3" d="M119 80 q-4 6 0 9 q4 -3 0 -9 z" fill="#7fd0ff" />
      </g>

      {/* Heat shimmer rising off the ground */}
      <g fill="none" stroke="#ff9f43" strokeWidth="3" strokeLinecap="round">
        <path className="hs__wave hs__wave--1" d="M70 300 q8 -12 0 -24 t0 -24" />
        <path className="hs__wave hs__wave--2" d="M196 300 q8 -12 0 -24 t0 -24" />
        <path className="hs__wave hs__wave--3" d="M228 296 q8 -12 0 -24 t0 -24" />
      </g>
    </svg>
  );
}