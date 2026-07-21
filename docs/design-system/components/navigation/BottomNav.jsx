import React from 'react';

/**
 * BottomNav — mobile tab bar (for the manager/admin side of the product). Active item
 * uses the brand colour. Icon-agnostic: each item carries an `icon` node.
 */
export function BottomNav({
  items = [],          // [{ value, label, icon }]
  value,
  onChange,
  style,
  ...rest
}) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'stretch', gap: 2,
      padding: '6px 8px calc(6px + env(safe-area-inset-bottom, 0px))',
      background: 'var(--surface)', borderTop: '1px solid var(--border-subtle)', flexShrink: 0, ...style,
    }} {...rest}>
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button key={it.value} type="button" onClick={() => onChange && onChange(it.value)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              minHeight: 52, padding: '6px 2px', border: 'none', background: 'transparent', cursor: 'pointer',
              color: on ? 'var(--brand)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-standard)',
            }}>
            <span style={{ display: 'inline-flex', width: 24, height: 24 }}>{it.icon}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-mono)', fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)' }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
