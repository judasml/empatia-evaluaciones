import React from 'react';

/**
 * Badge — small status pill. `tone="brand"` is the ONLY chromatic tone (success/
 * completed states). Everything else is neutral; `danger`/`warning` used sparingly.
 */
export function Badge({
  children,
  tone = 'neutral',   // 'neutral' | 'brand' | 'muted' | 'danger' | 'warning'
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: { bg: 'var(--surface-subtle)', fg: 'var(--text-body)',  dotc: 'var(--text-faint)' },
    brand:   { bg: 'var(--brand-soft)',     fg: 'var(--brand-strong)', dotc: 'var(--brand)' },
    muted:   { bg: 'transparent',           fg: 'var(--text-muted)',  dotc: 'var(--text-faint)', border: '1px solid var(--border-default)' },
    danger:  { bg: 'var(--danger-soft)',    fg: 'var(--danger)',      dotc: 'var(--danger)' },
    warning: { bg: 'var(--warning-soft)',   fg: 'oklch(0.5 0.09 60)', dotc: 'var(--warning)' },
  };
  const t = tones[tone] || tones.neutral;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 24, padding: '0 10px', borderRadius: 'var(--radius-pill)',
      background: t.bg, color: t.fg, border: t.border || '1px solid transparent',
      fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-normal)', whiteSpace: 'nowrap', ...style,
    }} {...rest}>
      {dot ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dotc }} /> : null}
      {children}
    </span>
  );
}
