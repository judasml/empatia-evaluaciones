import React from 'react';

/**
 * Checkbox — square check with brand fill when selected. Optional label + description.
 */
export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  label,
  description,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const fieldId = id || React.useId();

  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label htmlFor={fieldId} style={{
      display: 'flex', alignItems: description ? 'flex-start' : 'center', gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, marginTop: description ? 2 : 0 }}>
        <input id={fieldId} type="checkbox" checked={on} onChange={toggle} disabled={disabled}
          style={{ position: 'absolute', opacity: 0, width: 22, height: 22, margin: 0, cursor: 'inherit' }} {...rest} />
        <span aria-hidden="true" style={{
          width: 22, height: 22, borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border-strong)'}`,
          background: on ? 'var(--brand)' : 'var(--surface)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
        }}>
          {on ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-on)" strokeWidth="3">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </span>
      </span>
      {(label || description) ? (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>{label}</span> : null}
          {description ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
