import * as React from 'react';

/**
 * @startingPoint section="Feedback" subtitle="Zero-data placeholder" viewport="700x300"
 */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
