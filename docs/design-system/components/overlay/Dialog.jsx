import React from 'react';

/**
 * Dialog — centred modal sheet over a scrim. On mobile it can dock to the bottom.
 * Controlled via `open`; render actions in the footer slot.
 */
export function Dialog({
  open = false,
  onClose,
  title,
  description,
  children,
  footer,
  dock = 'center',    // 'center' | 'bottom'
  style,
  ...rest
}) {
  if (!open) return null;
  const bottom = dock === 'bottom';
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, background: 'var(--overlay)',
        display: 'flex', alignItems: bottom ? 'flex-end' : 'center', justifyContent: 'center',
        padding: bottom ? 0 : 'var(--space-5)',
      }}
    >
      <div
        role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: bottom ? 520 : 420,
          background: 'var(--surface)', boxShadow: 'var(--shadow-lg)',
          borderRadius: bottom ? 'var(--radius-2xl) var(--radius-2xl) 0 0' : 'var(--radius-xl)',
          padding: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
          ...style,
        }}
        {...rest}
      >
        {bottom ? <span style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--surface-muted)', margin: '-8px auto 0' }} /> : null}
        {(title || description) ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {title ? <h2 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>{title}</h2> : null}
            {description ? <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</p> : null}
          </div>
        ) : null}
        {children}
        {footer ? <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>{footer}</div> : null}
      </div>
    </div>
  );
}
