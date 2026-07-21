import React from 'react';

/**
 * Textarea — multi-line field for open feedback comments. Optional character count.
 */
export function Textarea({
  label,
  value,
  defaultValue,
  onChange,
  placeholder,
  helper,
  error,
  disabled = false,
  rows = 4,
  maxLength,
  showCount = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [len, setLen] = React.useState((value ?? defaultValue ?? '').length);
  const fieldId = id || React.useId();
  const invalid = Boolean(error);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)',
        }}>{label}</label>
      ) : null}
      <textarea
        id={fieldId}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => { setLen(e.target.value.length); onChange && onChange(e); }}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          resize: 'vertical', padding: '12px 14px', minHeight: 96,
          background: disabled ? 'var(--surface-subtle)' : 'var(--surface)',
          border: `1px solid ${invalid ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus ? (invalid ? 'var(--ring-danger)' : 'var(--ring)') : 'none',
          outline: 'none', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh-normal)', color: 'var(--text-strong)',
          transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
        }}
        {...rest}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', color: invalid ? 'var(--danger)' : 'var(--text-muted)' }}>
          {error || helper || ''}
        </span>
        {showCount && maxLength ? (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--text-faint)', flexShrink: 0 }}>{len}/{maxLength}</span>
        ) : null}
      </div>
    </div>
  );
}
