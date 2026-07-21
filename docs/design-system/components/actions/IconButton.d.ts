import * as React from 'react';

export interface IconButtonProps {
  /** The icon node (SVG). Icon-library agnostic. */
  children?: React.ReactNode;
  variant?: 'ghost' | 'secondary' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Required for accessibility. */
  'aria-label'?: string;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;
