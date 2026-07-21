import React from 'react';

/**
 * ProgressBar — brand-filled track. The canonical place the brand shows "progress".
 * Set `showValue` for a trailing percentage; `segments` for step progress.
 */
export function ProgressBar({
  value = 0,           // 0–100
  segments,            // optional: total number of steps (renders segmented)
  size = 'md',         // 'sm' | 'md'
  showValue = false,
  label,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const h = size === 'sm' ? 6 : 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }} {...rest}>
      {(label || showValue) ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          {label ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)' }}>{label}</span> : <span />}
          {showValue ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--brand-strong)' }}>{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      {segments ? (
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: segments }).map((_, i) => {
            const filled = i < Math.round((pct / 100) * segments);
            return <span key={i} style={{ flex: 1, height: h, borderRadius: 'var(--radius-pill)',
              background: filled ? 'var(--brand)' : 'var(--surface-muted)',
              transition: 'background var(--dur-slow) var(--ease-standard)' }} />;
          })}
        </div>
      ) : (
        <div style={{ height: h, borderRadius: 'var(--radius-pill)', background: 'var(--surface-muted)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--brand)', borderRadius: 'var(--radius-pill)',
            transition: 'width var(--dur-slow) var(--ease-out)' }} />
        </div>
      )}
    </div>
  );
}
