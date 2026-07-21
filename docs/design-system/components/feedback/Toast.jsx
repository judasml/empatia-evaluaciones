import React from 'react';

/**
 * Toast — transient confirmation. Success uses the brand tone (per white-label rule).
 * Purely presentational; drive show/hide from the host.
 */
export function Toast({
  title,
  description,
  tone = 'success',   // 'success' | 'neutral' | 'danger'
  icon,
  onClose,
  style,
  ...rest
}) {
  const tones = {
    success: { accent: 'var(--brand)', iconBg: 'var(--brand-soft)', iconFg: 'var(--brand)' },
    neutral: { accent: 'var(--border-strong)', iconBg: 'var(--surface-subtle)', iconFg: 'var(--text-muted)' },
    danger:  { accent: 'var(--danger)', iconBg: 'var(--danger-soft)', iconFg: 'var(--danger)' },
  };
  const t = tones[tone] || tones.success;

  const defaultIcon = tone === 'danger'
    ? <path d="M12 8v5M12 16.5v.5" strokeLinecap="round" />
    : <path d="M5 12.5l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />;

  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', maxWidth: 420,
      padding: 14, background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', ...style,
    }} {...rest}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        width: 32, height: 32, borderRadius: 'var(--radius-md)', background: t.iconBg }}>
        {icon || (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.iconFg} strokeWidth="2.5">{defaultIcon}</svg>
        )}
      </span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {title ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{title}</span> : null}
        {description ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</span> : null}
      </div>
      {onClose ? (
        <button type="button" aria-label="Cerrar" onClick={onClose}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, marginTop: -2,
            border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      ) : null}
    </div>
  );
}
