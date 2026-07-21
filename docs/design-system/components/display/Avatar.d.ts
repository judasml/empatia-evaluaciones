import * as React from 'react';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** `complete` shows a brand dot; `pending` a neutral dot. */
  status?: 'complete' | 'pending';
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): JSX.Element;
