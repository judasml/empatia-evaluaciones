import * as React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  /** `brand` = completed/success (only chromatic tone). Default `neutral`. */
  tone?: 'neutral' | 'brand' | 'muted' | 'danger' | 'warning';
  dot?: boolean;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
