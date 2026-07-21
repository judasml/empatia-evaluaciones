import React from 'react';

/**
 * Input — labelled text field with optional helper / error and leading icon.
 * Focus ring is brand-tinted (the only brand accent on a form control).
 */
export function Input({
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  type = 'text',
  helper,
  error,
  disabled = false,
  leadingIcon = null,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || React.useId();
  const invalid = Boolean(error);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)',
          color: 'var(--text-body)',
        }}>{label}</label>
      ) : null}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, height: 48,
        padding: '0 14px', background: disabled ? 'var(--surface-subtle)' : 'var(--surface)',
        border: `1px solid ${invalid ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focus ? (invalid ? 'var(--ring-danger)' : 'var(--ring)') : 'none',
        transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
      }}>
        {leadingIcon ? <span style={{ display: 'inline-flex', width: 18, height: 18, color: 'var(--text-faint)', flexShrink: 0 }}>{leadingIcon}</span> : null}
        <input
          id={fieldId}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)',
            minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {error ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--danger)' }}>{error}</span>
      ) : helper ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{helper}</span>
      ) : null}
    </div>
  );
}
