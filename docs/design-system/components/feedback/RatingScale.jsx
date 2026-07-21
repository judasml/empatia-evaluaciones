import React from 'react';

/**
 * RatingScale — the core 360-feedback input. A horizontal 1–max scale of tappable
 * cells (Likert). Selected cell + everything below it fill with brand. Optional
 * end labels and an "N/A" opt-out. Cells are ≥44px tall (touch-friendly).
 */
export function RatingScale({
  value,               // controlled selected number (1..max) or null
  defaultValue = null,
  onChange,
  max = 5,
  lowLabel,            // e.g. "En desarrollo"
  highLabel,           // e.g. "Referente"
  allowNA = false,
  naLabel = 'N/A',
  disabled = false,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const sel = isControlled ? value : internal;

  const pick = (n) => {
    if (disabled) return;
    if (!isControlled) setInternal(n);
    onChange && onChange(n);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: disabled ? 0.55 : 1, ...style }} {...rest}>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: max }).map((_, i) => {
          const n = i + 1;
          const active = sel != null && sel !== 'na' && n <= sel;
          const isSel = sel === n;
          return (
            <button key={n} type="button" onClick={() => pick(n)} disabled={disabled} aria-pressed={isSel}
              style={{
                flex: 1, minHeight: 48, borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
                border: `1.5px solid ${active ? 'var(--brand)' : 'var(--border-default)'}`,
                background: active ? 'var(--brand)' : 'var(--surface)',
                color: active ? 'var(--brand-on)' : 'var(--text-body)',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)',
                boxShadow: isSel ? 'var(--shadow-sm)' : 'none',
                transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
              }}>
              {n}
            </button>
          );
        })}
        {allowNA ? (
          <button type="button" onClick={() => pick('na')} disabled={disabled} aria-pressed={sel === 'na'}
            style={{
              minWidth: 52, minHeight: 48, padding: '0 12px', borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
              border: `1.5px solid ${sel === 'na' ? 'var(--border-strong)' : 'var(--border-default)'}`,
              background: sel === 'na' ? 'var(--surface-muted)' : 'var(--surface)',
              color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)',
            }}>
            {naLabel}
          </button>
        ) : null}
      </div>
      {(lowLabel || highLabel) ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{lowLabel}</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{highLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
