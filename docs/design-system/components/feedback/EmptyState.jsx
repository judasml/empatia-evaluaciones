import React from 'react';

/**
 * EmptyState — calm, encouraging placeholder for zero-data views. Neutral illustration
 * slot (pass an icon node), title, supporting copy and an optional action.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  style,
  ...rest
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      gap: 12, padding: 'var(--space-8) var(--space-5)', ...style,
    }} {...rest}>
      {icon ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 64, height: 64, borderRadius: 'var(--radius-2xl)', background: 'var(--surface-subtle)',
          color: 'var(--text-faint)', marginBottom: 4 }}>
          <span style={{ display: 'inline-flex', width: 30, height: 30 }}>{icon}</span>
        </span>
      ) : (
        /* Ilustración por defecto — formas simples en la paleta fija del producto */
        <svg width="96" height="68" viewBox="0 0 96 68" fill="none" aria-hidden="true" style={{ marginBottom: 4 }}>
          <circle cx="48" cy="34" r="26" fill="var(--surface-subtle)" />
          <circle cx="48" cy="34" r="31" fill="none" stroke="var(--border-default)" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
          <circle cx="48" cy="34" r="11" fill="#E8735A" opacity="0.9" />
          <path d="M43.5 34l3 3 6-6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="70" y="12" width="10" height="10" rx="3" fill="#E9A23B" transform="rotate(18 75 17)" />
          <circle cx="18" cy="20" r="4.5" fill="#2E9E8F" />
          <circle cx="76" cy="52" r="3.5" fill="#5B6BC0" />
          <path d="M14 46c3 4 7 6 12 6" stroke="#A05BB5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {title ? <h3 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>{title}</h3> : null}
      {description ? <p style={{ margin: 0, maxWidth: 320, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</p> : null}
      {action ? <div style={{ marginTop: 8 }}>{action}</div> : null}
    </div>
  );
}
