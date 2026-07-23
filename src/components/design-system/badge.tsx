
import type { HTMLAttributes, ReactNode } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "neutral" | "brand" | "muted" | "danger" | "warning";
  dot?: boolean;
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`ds-badge ds-badge--${tone} ${className}`.trim()}
      {...props}
    >
      {dot ? <span className="ds-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

