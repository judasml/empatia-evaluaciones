import * as React from 'react';

export interface DialogProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  dock?: 'center' | 'bottom';
  style?: React.CSSProperties;
}
export function Dialog(props: DialogProps): JSX.Element;
