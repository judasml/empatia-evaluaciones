import type { HTMLAttributes } from "react";

type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  segments?: number;
  size?: "sm" | "md";
  showValue?: boolean;
  label?: string;
};

export function ProgressBar({
  value,
  segments,
  size = "md",
  showValue = false,
  label,
  className = "",
  ...props
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`ds-progress ds-progress--${size} ${className}`.trim()}
      {...props}
    >
      {label || showValue ? (
        <div className="ds-progress__meta">
          <span>{label}</span>
          {showValue ? <span>{Math.round(percentage)}%</span> : null}
        </div>
      ) : null}
      {segments ? (
        <div
          className="ds-progress__segments"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percentage)}
        >
          {Array.from({ length: segments }, (_, index) => (
            <span
              className={
                index < Math.round((percentage / 100) * segments)
                  ? "ds-progress__segment ds-progress__segment--filled"
                  : "ds-progress__segment"
              }
              key={index}
            />
          ))}
        </div>
      ) : (
        <div
          className="ds-progress__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percentage)}
        >
          <span
            className="ds-progress__fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
