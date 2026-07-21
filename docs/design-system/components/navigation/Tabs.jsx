import React from 'react';

/**
 * Tabs — underline segmented navigation. Active tab uses the brand underline + text.
 * Controlled via `value`/`onChange` or uncontrolled via `defaultValue`.
 */
export function Tabs({
  tabs = [],           // [{ value, label, count }]
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const active = value !== undefined ? value : internal;
  const pick = (v) => { if (value === undefined) setInternal(v); onChange && onChange(v); };

  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', ...style }} {...rest}>
      {tabs.map((t) => {
        const on = t.value === active;
        return (
          <button key={t.value} type="button" onClick={() => pick(t.value)}
            style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 12px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
              color: on ? 'var(--brand-strong)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-standard)',
            }}>
            {t.label}
            {t.count != null ? (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)',
                padding: '1px 6px', borderRadius: 'var(--radius-pill)',
                background: on ? 'var(--brand-soft)' : 'var(--surface-subtle)', color: on ? 'var(--brand-strong)' : 'var(--text-muted)' }}>{t.count}</span>
            ) : null}
            <span style={{ position: 'absolute', left: 8, right: 8, bottom: -1, height: 2, borderRadius: '2px 2px 0 0',
              background: on ? 'var(--brand)' : 'transparent', transition: 'background var(--dur-fast) var(--ease-standard)' }} />
          </button>
        );
      })}
    </div>
  );
}
