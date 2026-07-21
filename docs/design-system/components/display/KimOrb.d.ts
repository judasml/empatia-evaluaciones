import * as React from 'react';

/**
 * @startingPoint section="Display" subtitle="El orbe KIM — presencia del asistente, respira" viewport="700x260"
 */
export interface KimOrbProps {
  /** Diameter in px. Default 80 (the standard). `floating` forces 44. */
  size?: number;
  /** Typing/thinking — fast pulse. */
  active?: boolean;
  /** Centre label. Default 'KIM'. */
  label?: string;
  /** Mini 44px version fixed at the bottom-right corner. */
  floating?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export function KimOrb(props: KimOrbProps): JSX.Element;
