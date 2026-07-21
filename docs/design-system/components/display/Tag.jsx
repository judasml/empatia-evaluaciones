import React from 'react';

/**
 * Tag — a removable/selectable chip (competencies, skills, filters). Neutral by
 * default; `selected` uses the brand soft fill.
 */
export function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  leadingIcon = null,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = Boolean(onClick);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: 32, padding: '0 12px', borderRadius: 'var(--radius-pill)',
        border: `1px solid ${selected ? 'var(--brand-border)' : 'var(--border-default)'}`,
        background: selected ? 'var(--brand-soft)' : (clickable && hover ? 'var(--surface-subtle)' : 'var(--surface)'),
        color: selected ? 'var(--brand-strong)' : 'var(--text-body)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)',
        cursor: clickable ? 'pointer' : 'default', whiteSpace: 'nowrap',
        transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      {leadingIcon ? <span style={{ display: 'inline-flex', width: 15, height: 15 }}>{leadingIcon}</span> : null}
      {children}
      {onRemove ? (
        <button type="button" aria-label="Quitar" onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16,
            marginRight: -4, border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit', opacity: 0.6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </span>
  );
}
