import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import './launch.css';

/* ---------- helpers ---------- */

function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// Fixed pseudo-random numbers in 0..1, so the layout is the same on every render.
const random = (seed: number) => Math.abs((Math.sin(seed * 12.9898) * 43758.5453) % 1);

/* ---------- fireworks ---------- */

interface FireworkProps {
  cx: number;
  cy: number;
  radius: number;
  /** Seconds before this burst starts, so the two don't fire together. */
  delay: number;
}

function Firework({ cx, cy, radius, delay }: FireworkProps) {
  const rays = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const angle = (i / 48) * Math.PI * 2;
        const long = i % 2 === 0;
        const inner = radius * 0.14;
        const outer = radius * (0.55 + 0.45 * random(i + 1));
        return {
          x1: cx + Math.cos(angle) * inner,
          y1: cy + Math.sin(angle) * inner,
          x2: cx + Math.cos(angle) * outer,
          y2: cy + Math.sin(angle) * outer,
          long,
        };
      }),
    [cx, cy, radius],
  );

  const timing = { animationDelay: `${delay}s` };

  return (
    <g className="fw" style={{ transformOrigin: `${cx}px ${cy}px`, ...timing }}>
      <circle className="fw__core" cx={cx} cy={cy} r={radius * 0.3} fill="url(#launch-glow)" style={timing} />
      {rays.map((ray, i) => (
        <g key={i}>
          <line
            className="fw__ray"
            pathLength={1}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke="#eab04a"
            strokeWidth={ray.long ? 2.4 : 1.6}
            strokeLinecap="round"
            style={timing}
          />
          {ray.long ? <circle className="fw__dot" cx={ray.x2} cy={ray.y2} r="2.4" fill="#f6c25b" style={timing} /> : null}
        </g>
      ))}
    </g>
  );
}

/* ---------- confetti ---------- */

const CONFETTI_COLOURS = ['#e9a93f', '#f3c565', '#1a63f2', '#4aa3ff', '#7fb6ff'];

const CONFETTI = Array.from({ length: 26 }, (_, i) => {
  const duration = 8 + random(i + 3) * 6;
  return {
    x: 40 + random(i + 1) * 1780,
    restY: 60 + random(i + 9) * 700, // where it sits if motion is turned off
    drift: (random(i + 7) - 0.5) * 160,
    spin: (360 + random(i + 11) * 540) * (i % 2 === 0 ? 1 : -1),
    duration,
    delay: -random(i + 5) * duration, // negative: already mid-fall when the page opens
    colour: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
  };
});

/* ---------- ribbons ---------- */

type Point = [number, number];

// Points for: M p0 C p1 p2 p3 S p4 p5
function toPath(p: Point[]): string {
  return `M${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]} S ${p[4][0]} ${p[4][1]}, ${p[5][0]} ${p[5][1]}`;
}

function shifted(points: Point[], offsets: number[], amplitude: number): Point[] {
  return points.map(([x, y], i) => [x, y + offsets[i] * amplitude] as Point);
}

const RIBBON_COLOURS = {
  blue: ['#6aa9ff', '#0a58f0', '#2f8cff'],
  gold: ['#f3c565', '#c98a2a', '#f6d58a'],
} as const;

interface RibbonProps {
  id: string;
  points: Point[];
  colour: keyof typeof RIBBON_COLOURS;
  width: number;
  duration: number;
  reduced: boolean;
}

function Ribbon({ id, points, colour, width, duration, reduced }: RibbonProps) {
  const amplitude = 16;
  const calm = toPath(points);
  const waveA = toPath(shifted(points, [0, -1, 1, -0.7, 0.9, 0.5], amplitude));
  const waveB = toPath(shifted(points, [0, 1, -1, 0.7, -0.9, -0.5], amplitude));
  const values = [calm, waveA, calm, waveB, calm].join(';');
  const xs = points.map((p) => p[0]);
  const [c1, c2, c3] = RIBBON_COLOURS[colour];

  const wave = reduced ? null : (
    <animate
      attributeName="d"
      dur={`${duration}s`}
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.25;0.5;0.75;1"
      keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
      values={values}
    />
  );

  return (
    <g className="ribbon">
      <defs>
        {/* The streamer fades out at both ends instead of stopping bluntly. */}
        <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1={Math.min(...xs)} y1="0" x2={Math.max(...xs)} y2="0">
          <stop offset="0" stopColor={c1} stopOpacity="0" />
          <stop offset="0.14" stopColor={c1} />
          <stop offset="0.5" stopColor={c2} />
          <stop offset="0.86" stopColor={c3} />
          <stop offset="1" stopColor={c3} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={calm} fill="none" stroke={`url(#${id}-grad)`} strokeWidth={width}>
        {wave}
      </path>
      <path d={calm} fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth={Math.max(2, width * 0.14)} transform={`translate(0 ${-width * 0.22})`}>
        {wave}
      </path>
    </g>
  );
}

/* ---------- decoration layer ---------- */

export function LaunchDecor() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="launch-decor" aria-hidden="true">
      <svg viewBox="0 0 1862 845" preserveAspectRatio="xMidYMin slice">
        <defs>
          <radialGradient id="launch-glow">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <Ribbon id="rb-left-blue" colour="blue" width={24} duration={7} reduced={reduced}
          points={[[170, 425], [230, 350], [330, 310], [410, 345], [470, 395], [480, 372]]} />
        <Ribbon id="rb-left-gold" colour="gold" width={12} duration={8} reduced={reduced}
          points={[[455, 300], [470, 275], [540, 280], [600, 330], [650, 380], [664, 398]]} />
        <Ribbon id="rb-right-gold" colour="gold" width={14} duration={9} reduced={reduced}
          points={[[1250, 420], [1330, 360], [1420, 365], [1490, 358], [1650, 280], [1755, 272]]} />
        <Ribbon id="rb-right-blue" colour="blue" width={24} duration={7.5} reduced={reduced}
          points={[[1330, 428], [1420, 395], [1500, 410], [1560, 450], [1700, 500], [1768, 462]]} />

        <Firework cx={470} cy={132} radius={105} delay={0} />
        <Firework cx={1410} cy={135} radius={98} delay={2.4} />

        {CONFETTI.map((piece, i) => (
          <rect
            key={i}
            className="confetti"
            width="14"
            height="6"
            rx="1.5"
            fill={piece.colour}
            style={
              {
                '--x': `${piece.x}px`,
                '--y': `${piece.restY}px`,
                '--drift': `${piece.drift}px`,
                '--spin': `${piece.spin}deg`,
                '--rot': `${(i * 47) % 180}deg`,
                '--dur': `${piece.duration}s`,
                '--delay': `${piece.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}