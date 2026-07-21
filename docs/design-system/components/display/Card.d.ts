import * as React from 'react';

/**
 * @startingPoint section="Surfaces" subtitle="Soft-shadow content card" viewport="700x240"
 */
export interface CardProps {
  children?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
