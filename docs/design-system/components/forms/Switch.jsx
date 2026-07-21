import React from 'react';

/**
 * Switch — on/off toggle. Track fills with brand when on (progress/positive state).
 */
export function Switch({
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

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };

  return (
    <label htmlFor={fieldId} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style,
    }}>
      {(label || description) ? (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>{label}</span> : null}
          {description ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{description}</span> : null}
        </span>
      ) : null}
      <button
        id={fieldId} role="switch" aria-checked={on} type="button" onClick={toggle} disabled={disabled}
        style={{
          position: 'relative', width: 46, height: 28, flexShrink: 0, padding: 0, border: 'none',
          borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer',
          background: on ? 'var(--brand)' : 'var(--surface-muted)',
          transition: 'background var(--dur-base) var(--ease-standard)',
        }}
        {...rest}
      >
        <span style={{
          position: 'absolute', top: 3, left: on ? 21 : 3, width: 22, height: 22,
          borderRadius: 'var(--radius-pill)', background: 'var(--white)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--dur-base) var(--ease-standard)',
        }} />
      </button>
    </label>
  );
}
