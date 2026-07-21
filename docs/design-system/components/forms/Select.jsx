import React from 'react';

/**
 * Select — native-backed dropdown styled to match Input. Icon-agnostic chevron
 * drawn inline. Pass options as [{value, label}] or use children <option>s.
 */
export function Select({
  label,
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder,
  helper,
  error,
  disabled = false,
  id,
  style,
  children,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const invalid = Boolean(error);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)',
        }}>{label}</label>
      ) : null}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
          id={fieldId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none', width: '100%', height: 48,
            padding: '0 40px 0 14px',
            background: disabled ? 'var(--surface-subtle)' : 'var(--surface)',
            border: `1px solid ${invalid ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-md)',
            boxShadow: focus ? (invalid ? 'var(--ring-danger)' : 'var(--ring)') : 'none',
            outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)',
            color: 'var(--text-strong)', cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
          }}
          {...rest}
        >
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          {children}
        </select>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2"
          style={{ position: 'absolute', right: 14, pointerEvents: 'none' }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--danger)' }}>{error}</span>
      ) : helper ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{helper}</span>
      ) : null}
    </div>
  );
}
