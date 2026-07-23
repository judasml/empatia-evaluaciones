import type { CSSProperties } from "react";
import { Card } from "@/components/design-system/card";

type MetricStyle = CSSProperties & {
  "--metric-progress": string;
};

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  progress: number;
};

export function MetricCard({
  label,
  value,
  detail,
  progress,
}: MetricCardProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const ringStyle: MetricStyle = {
    "--metric-progress": `${clampedProgress * 3.6}deg`,
  };

  return (
    <Card className="admin-metric">
      <div>
        <span className="admin-metric__label">{label}</span>
        <div className="admin-metric__value">
          <strong>{value}</strong>
          <span>{detail}</span>
        </div>
      </div>
      <span
        className="admin-ring"
        style={ringStyle}
        aria-label={`${clampedProgress}%`}
      >
        <span />
      </span>
    </Card>
  );
}
