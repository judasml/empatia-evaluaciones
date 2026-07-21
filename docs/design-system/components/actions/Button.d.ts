import * as React from 'react';

/**
 * @startingPoint section="Actions" subtitle="Primary / secondary / ghost button" viewport="700x220"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Only `primary` uses the brand colour. Default `primary`. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
