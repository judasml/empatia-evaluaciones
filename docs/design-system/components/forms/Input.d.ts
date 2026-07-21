import * as React from 'react';

export interface InputProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  helper?: string;
  /** When set, the field turns to the (restrained) danger state and shows this message. */
  error?: string;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
