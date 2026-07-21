import React from 'react';

/**
 * AppHeader — top bar. Holds the WHITE-LABEL logo slot on the left.
 * Pass `logoSrc` for the client's logo image; if absent, the brand `name` renders
 * in plain type (never invent a mark). Optional left action (back) and right slot.
 * `compact` is the in-survey variant that shows the evaluated person + relation.
 */
export function AppHeader({
  logoSrc,
  logoAlt = 'Logo',
  name,                 // fallback wordmark when no logoSrc
  onBack,
  right,
  compact = false,
  person,               // compact mode: evaluated person's name
  relation,             // compact mode: relationship label, e.g. "Tu par"
  style,
  ...rest
}) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 12,
      height: 60, padding: '0 var(--gutter)', flexShrink: 0,
      background: 'var(--surface)', borderBottom: '1px solid var(--border-subtle)',
      ...style,
    }} {...rest}>
      {onBack ? (
        <button type="button" aria-label="Atrás" onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, marginLeft: -8,
            border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-body)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      ) : null}

      {compact ? (
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: 'var(--tracking-snug)' }}>{person}</span>
          {relation ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{relation}</span> : null}
        </div>
      ) : (
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          {/* WHITE-LABEL LOGO SLOT */}
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt} style={{ maxHeight: 28, maxWidth: 160, objectFit: 'contain' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>{name}</span>
          )}
        </div>
      )}

      {right ? <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>{right}</div> : null}
    </header>
  );
}
