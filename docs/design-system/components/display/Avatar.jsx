import React from 'react';

/**
 * Avatar — person marker. Shows an image, else initials on a warm neutral fill.
 * Optional status ring/dot. Kept neutral (no brand) so lists don't shout.
 */
export function Avatar({
  name = '',
  src,
  size = 'md',        // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status,             // undefined | 'complete' | 'pending'
  style,
  ...rest
}) {
  const dims = { xs: 24, sm: 32, md: 40, lg: 52, xl: 72 };
  const dim = dims[size] || dims.md;
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const fontSize = Math.round(dim * 0.38);

  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, ...style }} {...rest}>
      <span style={{
        width: dim, height: dim, borderRadius: 'var(--radius-pill)', overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface-muted)', color: 'var(--text-body)',
        border: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)', fontSize,
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (initials || '·')}
      </span>
      {status ? (
        <span style={{
          position: 'absolute', right: -1, bottom: -1,
          width: Math.max(8, dim * 0.28), height: Math.max(8, dim * 0.28),
          borderRadius: '50%', border: '2px solid var(--surface)',
          background: status === 'complete' ? 'var(--brand)' : 'var(--text-faint)',
        }} />
      ) : null}
    </span>
  );
}
