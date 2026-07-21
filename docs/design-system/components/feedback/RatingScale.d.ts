import * as React from 'react';

/**
 * @startingPoint section="Feedback" subtitle="1–5 Likert rating input" viewport="700x160"
 */
export interface RatingScaleProps {
  value?: number | 'na' | null;
  defaultValue?: number | 'na' | null;
  onChange?: (value: number | 'na') => void;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
  allowNA?: boolean;
  naLabel?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function RatingScale(props: RatingScaleProps): JSX.Element;
