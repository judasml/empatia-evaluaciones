import * as React from 'react';

/**
 * @startingPoint section="Display" subtitle="Íconos multicolor de las acciones del producto" viewport="700x300"
 */
export type ProductIconName =
  | 'crearEvaluacion'
  | 'invitar'
  | 'cobertura'
  | 'resultados'
  | 'importar'
  | 'kim';

export interface ProductIconProps {
  name: ProductIconName;
  /** Glyph size in px. Default 40. */
  size?: number;
  /** Mount on a soft rounded tile tinted with the icon's own colour. */
  tile?: boolean;
  style?: React.CSSProperties;
}

/** Fixed product palette — independent of the client's --brand. */
export const PI_COLORS: Record<'coral' | 'amber' | 'teal' | 'indigo' | 'plum' | 'ink', { fill: string; soft: string; deep: string }>;

export function ProductIcon(props: ProductIconProps): JSX.Element;
