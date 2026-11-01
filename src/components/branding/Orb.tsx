import type { CSSProperties } from 'react';
import './branding.css';

interface OrbProps {
  /** Diameter in px of the whole orb including its glow. Omit to size it with CSS. */
  size?: number;
  pulse?: boolean;
}

export function Orb({ size, pulse = false }: OrbProps) {
  const style = size ? ({ ['--orb-size' as string]: `${size}px` } as CSSProperties) : undefined;
  return (
    <span className={`orb${pulse ? ' orb--pulse' : ''}`} style={style} aria-hidden="true">
      <span className="orb__core" />
    </span>
  );
}
