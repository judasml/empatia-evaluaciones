import * as React from 'react';

export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: SelectOption[];
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
