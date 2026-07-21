import * as React from 'react';

export interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function Radio(props: RadioProps): JSX.Element;
