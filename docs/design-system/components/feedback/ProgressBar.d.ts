import * as React from 'react';

/**
 * @startingPoint section="Feedback" subtitle="Brand-filled progress track" viewport="700x140"
 */
export interface ProgressBarProps {
  /** 0–100 */
  value?: number;
  /** If set, renders as N discrete segments instead of a continuous bar. */
  segments?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  label?: string;
  style?: React.CSSProperties;
}
export function ProgressBar(props: ProgressBarProps): JSX.Element;
