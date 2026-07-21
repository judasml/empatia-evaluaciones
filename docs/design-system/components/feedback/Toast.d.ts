import * as React from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  /** `success` uses the brand tone (white-label rule). */
  tone?: 'success' | 'neutral' | 'danger';
  icon?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): JSX.Element;
