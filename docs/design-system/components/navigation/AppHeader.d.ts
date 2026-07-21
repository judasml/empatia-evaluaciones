import * as React from 'react';

/**
 * @startingPoint section="Navigation" subtitle="White-label header with logo slot" viewport="700x60"
 */
export interface AppHeaderProps {
  /** Client logo image URL (white-label slot). If omitted, `name` renders as a wordmark. */
  logoSrc?: string;
  logoAlt?: string;
  name?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  /** Compact in-survey variant: shows evaluated person + relation instead of the logo. */
  compact?: boolean;
  person?: string;
  relation?: string;
  style?: React.CSSProperties;
}
export function AppHeader(props: AppHeaderProps): JSX.Element;
