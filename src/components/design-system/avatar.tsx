import type { HTMLAttributes } from "react";

type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "complete" | "pending";
};

export function Avatar({
  name,
  size = "md",
  status,
  className = "",
  ...props
}: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={`ds-avatar ds-avatar--${size} ${className}`.trim()}
      aria-label={name}
      {...props}
    >
      <span className="ds-avatar__face" aria-hidden="true">
        {initials || "·"}
      </span>
      {status ? (
        <span
          className={`ds-avatar__status ds-avatar__status--${status}`}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
