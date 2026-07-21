/* @jsxRuntime classic */
/* AUTO-GENERATED preview build of empat.IA 360 primitives.
   Assembled from components/**.jsx for browser (Babel) previews + the app UI kit.
   Source of truth is the individual component .jsx files. Attaches to window.Empat. */

// ── Button ──────────────────────────────────────────────────
/**
 * Button — the primary action control.
 * White-label rule: `variant="primary"` is the ONLY place brand colour appears
 * on an action. Everything else is neutral.
 */
function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',           // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 14px', height: 36, fontSize: 'var(--fs-body-sm)', gap: 6, radius: 'var(--radius-sm)' },
    md: { padding: '0 20px', height: 44, fontSize: 'var(--fs-body)',    gap: 8, radius: 'var(--radius-md)' },
    lg: { padding: '0 26px', height: 52, fontSize: 'var(--fs-body-lg)', gap: 8, radius: 'var(--radius-md)' },
  };
  const variants = {
    primary:   { background: 'var(--brand)',        color: 'var(--brand-on)',    border: '1px solid transparent', boxShadow: 'var(--shadow-sm)' },
    secondary: { background: 'var(--surface)',      color: 'var(--text-strong)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' },
    ghost:     { background: 'transparent',         color: 'var(--text-strong)', border: '1px solid transparent', boxShadow: 'none' },
    danger:    { background: 'var(--surface)',      color: 'var(--danger)',      border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverBg = {
    primary: 'var(--brand-hover)',
    secondary: 'var(--surface-subtle)',
    ghost: 'var(--surface-subtle)',
    danger: 'var(--danger-soft)',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.height, padding: s.padding, width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)', fontSize: s.fontSize, fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--tracking-snug)', lineHeight: 1, borderRadius: s.radius,
        cursor: disabled ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
        transform: active && !disabled ? 'scale(var(--press-scale))' : hover && !disabled && variant !== 'ghost' ? 'translateY(-1px)' : 'none',
        opacity: disabled ? 0.45 : 1,
        ...v,
        background: hover && !disabled ? hoverBg : v.background,
        boxShadow: hover && !disabled && variant !== 'ghost'
          ? (variant === 'primary' ? 'var(--shadow-md)' : 'var(--shadow-sm)')
          : active ? 'var(--shadow-xs)' : v.boxShadow,
        ...style,
      }}
      {...rest}
    >
      {leadingIcon ? <span style={{ display: 'inline-flex', width: '1.15em', height: '1.15em' }}>{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span style={{ display: 'inline-flex', width: '1.15em', height: '1.15em' }}>{trailingIcon}</span> : null}
    </button>
  );
}

// ── IconButton ──────────────────────────────────────────────
/**
 * IconButton — a square, icon-only control. Icon-library agnostic: pass an SVG
 * (or any node) as children. Always give an `aria-label`.
 */
function IconButton({
  children,
  variant = 'ghost',   // 'ghost' | 'secondary' | 'primary'
  size = 'md',         // 'sm' | 'md' | 'lg'
  disabled = false,
  onClick,
  style,
  'aria-label': ariaLabel,
  ...rest
}) {
  const sizes = { sm: 34, md: 44, lg: 52 };
  const dim = sizes[size] || sizes.md;
  const variants = {
    ghost:     { background: 'transparent',    color: 'var(--text-muted)',  border: '1px solid transparent', hover: 'var(--surface-subtle)' },
    secondary: { background: 'var(--surface)',  color: 'var(--text-strong)', border: '1px solid var(--border-default)', hover: 'var(--surface-subtle)' },
    primary:   { background: 'var(--brand)',    color: 'var(--brand-on)',    border: '1px solid transparent', hover: 'var(--brand-hover)' },
  };
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: dim, height: dim, borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
        transform: active && !disabled ? 'scale(var(--press-scale))' : 'scale(1)',
        ...v, background: hover && !disabled ? v.hover : v.background,
        ...style,
      }}
      {...rest}
    >
      <span style={{ display: 'inline-flex', width: size === 'sm' ? 18 : 20, height: size === 'sm' ? 18 : 20 }}>{children}</span>
    </button>
  );
}

// ── Checkbox ────────────────────────────────────────────────
/**
 * Checkbox — square check with brand fill when selected. Optional label + description.
 */
function Checkbox({
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

// ── Input ───────────────────────────────────────────────────
/**
 * Input — labelled text field with optional helper / error and leading icon.
 * Focus ring is brand-tinted (the only brand accent on a form control).
 */
function Input({
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

// ── Radio ───────────────────────────────────────────────────
/**
 * Radio — single-choice control. Use inside a RadioGroup-style wrapper by sharing
 * a `name`. Brand dot when selected.
 */
function Radio({
  checked,
  defaultChecked,
  onChange,
  name,
  value,
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
        <input id={fieldId} type="radio" name={name} value={value} checked={on} onChange={toggle} disabled={disabled}
          style={{ position: 'absolute', opacity: 0, width: 22, height: 22, margin: 0, cursor: 'inherit' }} {...rest} />
        <span aria-hidden="true" style={{
          width: 22, height: 22, borderRadius: 'var(--radius-pill)',
          border: `1.5px solid ${on ? 'var(--brand)' : 'var(--border-strong)'}`,
          background: 'var(--surface)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color var(--dur-fast) var(--ease-standard)',
        }}>
          {on ? <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-pill)', background: 'var(--brand)' }} /> : null}
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

// ── Select ──────────────────────────────────────────────────
/**
 * Select — native-backed dropdown styled to match Input. Icon-agnostic chevron
 * drawn inline. Pass options as [{value, label}] or use children <option>s.
 */
function Select({
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

// ── Switch ──────────────────────────────────────────────────
/**
 * Switch — on/off toggle. Track fills with brand when on (progress/positive state).
 */
function Switch({
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

// ── Textarea ────────────────────────────────────────────────
/**
 * Textarea — multi-line field for open feedback comments. Optional character count.
 */
function Textarea({
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

// ── Avatar ──────────────────────────────────────────────────
/**
 * Avatar — person marker. Shows an image, else initials on a warm neutral fill.
 * Optional status ring/dot. Kept neutral (no brand) so lists don't shout.
 */
function Avatar({
  name = '',
  src,
  size = 'md',        // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status,             // undefined | 'complete' | 'pending'
  style,
  ...rest
}) {
  const dims = { xs: 24, sm: 32, md: 40, lg: 52, xl: 72 };
  const dim = dims[size] || dims.md;
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const fontSize = Math.round(dim * 0.38);

  return (
    <span style={{ position: 'relative', display: 'inline-flex', flexShrink: 0, ...style }} {...rest}>
      <span style={{
        width: dim, height: dim, borderRadius: 'var(--radius-pill)', overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface-muted)', color: 'var(--text-body)',
        border: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)', fontSize,
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (initials || '·')}
      </span>
      {status ? (
        <span style={{
          position: 'absolute', right: -1, bottom: -1,
          width: Math.max(8, dim * 0.28), height: Math.max(8, dim * 0.28),
          borderRadius: '50%', border: '2px solid var(--surface)',
          background: status === 'complete' ? 'var(--brand)' : 'var(--text-faint)',
        }} />
      ) : null}
    </span>
  );
}

// ── Badge ───────────────────────────────────────────────────
/**
 * Badge — small status pill. `tone="brand"` is the ONLY chromatic tone (success/
 * completed states). Everything else is neutral; `danger`/`warning` used sparingly.
 */
function Badge({
  children,
  tone = 'neutral',   // 'neutral' | 'brand' | 'muted' | 'danger' | 'warning'
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: { bg: 'var(--surface-subtle)', fg: 'var(--text-body)',  dotc: 'var(--text-faint)' },
    brand:   { bg: 'var(--brand-soft)',     fg: 'var(--brand-strong)', dotc: 'var(--brand)' },
    muted:   { bg: 'transparent',           fg: 'var(--text-muted)',  dotc: 'var(--text-faint)', border: '1px solid var(--border-default)' },
    danger:  { bg: 'var(--danger-soft)',    fg: 'var(--danger)',      dotc: 'var(--danger)' },
    warning: { bg: 'var(--warning-soft)',   fg: 'oklch(0.5 0.09 60)', dotc: 'var(--warning)' },
  };
  const t = tones[tone] || tones.neutral;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 24, padding: '0 10px', borderRadius: 'var(--radius-pill)',
      background: t.bg, color: t.fg, border: t.border || '1px solid transparent',
      fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-normal)', whiteSpace: 'nowrap', ...style,
    }} {...rest}>
      {dot ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dotc }} /> : null}
      {children}
    </span>
  );
}

// ── Card ────────────────────────────────────────────────────
/**
 * Card — the primary surface. Soft radius, hairline border, whisper of shadow.
 * Set `interactive` for hover lift on tappable cards.
 */
function Card({
  children,
  padding = 'md',        // 'none' | 'sm' | 'md' | 'lg'
  interactive = false,
  onClick,
  as = 'div',
  style,
  ...rest
}) {
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--card-pad)', lg: 'var(--space-6)' };
  const [hover, setHover] = React.useState(false);
  const Tag = as;

  return (
    <Tag
      onClick={onClick}
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: pads[padding] ?? pads.md,
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-card)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ── Tag ─────────────────────────────────────────────────────
/**
 * Tag — a removable/selectable chip (competencies, skills, filters). Neutral by
 * default; `selected` uses the brand soft fill.
 */
function Tag({
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

// ── EmptyState ──────────────────────────────────────────────
/**
 * EmptyState — calm, encouraging placeholder for zero-data views. Neutral illustration
 * slot (pass an icon node), title, supporting copy and an optional action.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  style,
  ...rest
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      gap: 12, padding: 'var(--space-8) var(--space-5)', ...style,
    }} {...rest}>
      {icon ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 64, height: 64, borderRadius: 'var(--radius-2xl)', background: 'var(--surface-subtle)',
          color: 'var(--text-faint)', marginBottom: 4 }}>
          <span style={{ display: 'inline-flex', width: 30, height: 30 }}>{icon}</span>
        </span>
      ) : (
        <svg width="96" height="68" viewBox="0 0 96 68" fill="none" aria-hidden="true" style={{ marginBottom: 4 }}>
          <circle cx="48" cy="34" r="26" fill="var(--surface-subtle)" />
          <circle cx="48" cy="34" r="31" fill="none" stroke="var(--border-default)" strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" />
          <circle cx="48" cy="34" r="11" fill="#E8735A" opacity="0.9" />
          <path d="M43.5 34l3 3 6-6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="70" y="12" width="10" height="10" rx="3" fill="#E9A23B" transform="rotate(18 75 17)" />
          <circle cx="18" cy="20" r="4.5" fill="#2E9E8F" />
          <circle cx="76" cy="52" r="3.5" fill="#5B6BC0" />
          <path d="M14 46c3 4 7 6 12 6" stroke="#A05BB5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </svg>
      )}
      {title ? <h3 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>{title}</h3> : null}
      {description ? <p style={{ margin: 0, maxWidth: 320, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</p> : null}
      {action ? <div style={{ marginTop: 8 }}>{action}</div> : null}
    </div>
  );
}

// ── ProgressBar ─────────────────────────────────────────────
/**
 * ProgressBar — brand-filled track. The canonical place the brand shows "progress".
 * Set `showValue` for a trailing percentage; `segments` for step progress.
 */
function ProgressBar({
  value = 0,           // 0–100
  segments,            // optional: total number of steps (renders segmented)
  size = 'md',         // 'sm' | 'md'
  showValue = false,
  label,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const h = size === 'sm' ? 6 : 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }} {...rest}>
      {(label || showValue) ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          {label ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)' }}>{label}</span> : <span />}
          {showValue ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--brand-strong)' }}>{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      {segments ? (
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: segments }).map((_, i) => {
            const filled = i < Math.round((pct / 100) * segments);
            return <span key={i} style={{ flex: 1, height: h, borderRadius: 'var(--radius-pill)',
              background: filled ? 'var(--brand)' : 'var(--surface-muted)',
              transition: 'background var(--dur-slow) var(--ease-standard)' }} />;
          })}
        </div>
      ) : (
        <div style={{ height: h, borderRadius: 'var(--radius-pill)', background: 'var(--surface-muted)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--brand)', borderRadius: 'var(--radius-pill)',
            transition: 'width var(--dur-slow) var(--ease-out)' }} />
        </div>
      )}
    </div>
  );
}

// ── RatingScale ─────────────────────────────────────────────
/**
 * RatingScale — the core 360-feedback input. A horizontal 1–max scale of tappable
 * cells (Likert). Selected cell + everything below it fill with brand. Optional
 * end labels and an "N/A" opt-out. Cells are ≥44px tall (touch-friendly).
 */
function RatingScale({
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

// ── Toast ───────────────────────────────────────────────────
/**
 * Toast — transient confirmation. Success uses the brand tone (per white-label rule).
 * Purely presentational; drive show/hide from the host.
 */
function Toast({
  title,
  description,
  tone = 'success',   // 'success' | 'neutral' | 'danger'
  icon,
  onClose,
  style,
  ...rest
}) {
  const tones = {
    success: { accent: 'var(--brand)', iconBg: 'var(--brand-soft)', iconFg: 'var(--brand)' },
    neutral: { accent: 'var(--border-strong)', iconBg: 'var(--surface-subtle)', iconFg: 'var(--text-muted)' },
    danger:  { accent: 'var(--danger)', iconBg: 'var(--danger-soft)', iconFg: 'var(--danger)' },
  };
  const t = tones[tone] || tones.success;

  const defaultIcon = tone === 'danger'
    ? <path d="M12 8v5M12 16.5v.5" strokeLinecap="round" />
    : <path d="M5 12.5l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />;

  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', maxWidth: 420,
      padding: 14, background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', ...style,
    }} {...rest}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        width: 32, height: 32, borderRadius: 'var(--radius-md)', background: t.iconBg }}>
        {icon || (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.iconFg} strokeWidth="2.5">{defaultIcon}</svg>
        )}
      </span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {title ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{title}</span> : null}
        {description ? <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</span> : null}
      </div>
      {onClose ? (
        <button type="button" aria-label="Cerrar" onClick={onClose}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, marginTop: -2,
            border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>
      ) : null}
    </div>
  );
}

// ── Tooltip ─────────────────────────────────────────────────
/**
 * Tooltip — hover/focus hint. Neutral dark bubble; appears above the trigger.
 * Wrap any element as children.
 */
function Tooltip({ label, children, side = 'top', style }) {
  const [open, setOpen] = React.useState(false);
  const positions = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      <span role="tooltip" style={{
        position: 'absolute', ...positions[side], zIndex: 50,
        padding: '6px 10px', borderRadius: 'var(--radius-sm)',
        background: 'var(--text-strong)', color: 'var(--white)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-medium)',
        whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: 'var(--shadow-md)',
        opacity: open ? 1 : 0, transform: `${positions[side].transform} translateY(${open ? 0 : side === 'top' ? 3 : -3}px)`,
        transition: 'opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
      }}>
        {label}
      </span>
    </span>
  );
}

// ── AppHeader ───────────────────────────────────────────────
/**
 * AppHeader — top bar. Holds the WHITE-LABEL logo slot on the left.
 * Pass `logoSrc` for the client's logo image; if absent, the brand `name` renders
 * in plain type (never invent a mark). Optional left action (back) and right slot.
 * `compact` is the in-survey variant that shows the evaluated person + relation.
 */
function AppHeader({
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

// ── BottomNav ───────────────────────────────────────────────
/**
 * BottomNav — mobile tab bar (for the manager/admin side of the product). Active item
 * uses the brand colour. Icon-agnostic: each item carries an `icon` node.
 */
function BottomNav({
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

// ── Tabs ────────────────────────────────────────────────────
/**
 * Tabs — underline segmented navigation. Active tab uses the brand underline + text.
 * Controlled via `value`/`onChange` or uncontrolled via `defaultValue`.
 */
function Tabs({
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

// ── Dialog ──────────────────────────────────────────────────
/**
 * Dialog — centred modal sheet over a scrim. On mobile it can dock to the bottom.
 * Controlled via `open`; render actions in the footer slot.
 */
function Dialog({
  open = false,
  onClose,
  title,
  description,
  children,
  footer,
  dock = 'center',    // 'center' | 'bottom'
  style,
  ...rest
}) {
  if (!open) return null;
  const bottom = dock === 'bottom';
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, background: 'var(--overlay)',
        display: 'flex', alignItems: bottom ? 'flex-end' : 'center', justifyContent: 'center',
        padding: bottom ? 0 : 'var(--space-5)',
      }}
    >
      <div
        role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: bottom ? 520 : 420,
          background: 'var(--surface)', boxShadow: 'var(--shadow-lg)',
          borderRadius: bottom ? 'var(--radius-2xl) var(--radius-2xl) 0 0' : 'var(--radius-xl)',
          padding: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
          ...style,
        }}
        {...rest}
      >
        {bottom ? <span style={{ width: 40, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--surface-muted)', margin: '-8px auto 0' }} /> : null}
        {(title || description) ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {title ? <h2 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>{title}</h2> : null}
            {description ? <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{description}</p> : null}
          </div>
        ) : null}
        {children}
        {footer ? <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>{footer}</div> : null}
      </div>
    </div>
  );
}

// ── ProductIcon ─────────────────────────────────────────────

/**
 * ProductIcon — set de íconos multicolor propios del producto.
 * A diferencia de los íconos de línea (neutros, monocromos), estos identifican
 * las ACCIONES PRINCIPALES del producto con personalidad propia (ref: tarjetas
 * de acción de Clay). Usan una paleta fija del producto — cálida, de croma
 * medio — que convive con cualquier color de marca del cliente. La marca del
 * cliente NUNCA entra aquí.
 *
 * Uso: <ProductIcon name="kim" size={40} tile />
 * `tile` los monta sobre una teja redondeada con tinte propio.
 */

/* Paleta fija del producto (independiente de --brand) */
const PI_COLORS = {
  coral:  { fill: '#E8735A', soft: '#FBEAE5', deep: '#C25036' },
  amber:  { fill: '#E9A23B', soft: '#FBF0DC', deep: '#C07E1B' },
  teal:   { fill: '#2E9E8F', soft: '#E0F1EE', deep: '#1F7A6E' },
  indigo: { fill: '#5B6BC0', soft: '#E7EAF7', deep: '#3F4D9C' },
  plum:   { fill: '#A05BB5', soft: '#F2E7F6', deep: '#7E3E92' },
  ink:    { fill: '#4A4238', soft: '#EFEBE6', deep: '#2E2820' },
};

/* Cada ícono: composición de formas simples, viewBox 0 0 48 48, sin stroke fino */
const GLYPHS = {
  /* Crear evaluación — hoja de encuesta + más */
  crearEvaluacion: (c) => (
    <g>
      <rect x="9" y="6" width="26" height="34" rx="6" fill={c.indigo.soft} />
      <rect x="9" y="6" width="26" height="34" rx="6" fill="none" stroke={c.indigo.fill} strokeWidth="2.5" />
      <rect x="15" y="14" width="14" height="3" rx="1.5" fill={c.indigo.fill} />
      <rect x="15" y="21" width="10" height="3" rx="1.5" fill={c.indigo.fill} opacity="0.55" />
      <rect x="15" y="28" width="12" height="3" rx="1.5" fill={c.indigo.fill} opacity="0.35" />
      <circle cx="35" cy="35" r="9" fill={c.coral.fill} />
      <path d="M35 31v8M31 35h8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  ),
  /* Invitar evaluadores — dos personas + chispa de invitación */
  invitar: (c) => (
    <g>
      <circle cx="18" cy="16" r="7" fill={c.teal.fill} />
      <path d="M6 38c0-7 5.4-11 12-11s12 4 12 11" fill={c.teal.soft} stroke={c.teal.fill} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="33" cy="18" r="5.5" fill={c.amber.fill} />
      <path d="M25.5 36c.8-5.4 4-8.5 8.5-8.5 4.4 0 7.6 3 8.5 8.5" fill="none" stroke={c.amber.fill} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 7.5v6M37 10.5h6" stroke={c.coral.fill} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  ),
  /* Cobertura — anillo de progreso con segmentos por fuente */
  cobertura: (c) => (
    <g>
      <circle cx="24" cy="24" r="15" fill="none" stroke={c.ink.soft} strokeWidth="7" />
      <circle cx="24" cy="24" r="15" fill="none" stroke={c.teal.fill} strokeWidth="7"
        strokeDasharray="42 200" strokeLinecap="round" transform="rotate(-90 24 24)" />
      <circle cx="24" cy="24" r="15" fill="none" stroke={c.amber.fill} strokeWidth="7"
        strokeDasharray="24 200" strokeDashoffset="-48" strokeLinecap="round" transform="rotate(-90 24 24)" />
      <circle cx="24" cy="24" r="6" fill={c.indigo.fill} />
      <path d="M21.6 24l1.8 1.8 3.4-3.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  ),
  /* Resultados — barras con estrella de insight */
  resultados: (c) => (
    <g>
      <rect x="8" y="24" width="7" height="16" rx="3.5" fill={c.amber.fill} />
      <rect x="20" y="14" width="7" height="26" rx="3.5" fill={c.coral.fill} />
      <rect x="32" y="20" width="7" height="20" rx="3.5" fill={c.plum.fill} />
      <path d="M36 5l1.7 3.6L41.5 10l-3.8 1.4L36 15l-1.7-3.6L30.5 10l3.8-1.4z" fill={c.teal.fill} />
    </g>
  ),
  /* Importar historial — bandeja + flecha entrando */
  importar: (c) => (
    <g>
      <path d="M24 6v17" stroke={c.plum.fill} strokeWidth="3" strokeLinecap="round" />
      <path d="M17 16l7 7 7-7" fill="none" stroke={c.plum.fill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 27v7a6 6 0 0 0 6 6h20a6 6 0 0 0 6-6v-7" fill={c.amber.soft} stroke={c.amber.fill} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 30h9l2.5 4h9l2.5-4h9" fill="none" stroke={c.amber.fill} strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  ),
  /* KIM — chispa conversacional */
  kim: (c) => (
    <g>
      <path d="M8 12a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H20l-8 8V12z" fill={c.plum.soft} stroke={c.plum.fill} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 10.5l2.4 5.1 5.1 2.4-5.1 2.4-2.4 5.1-2.4-5.1-5.1-2.4 5.1-2.4z" fill={c.coral.fill} />
      <circle cx="33.5" cy="13.5" r="2" fill={c.amber.fill} />
      <circle cx="15" cy="24" r="1.7" fill={c.teal.fill} />
    </g>
  ),
};

/* Tinte de teja por ícono (fondo suave que ancla la composición) */
const TILE = {
  crearEvaluacion: 'coral',
  invitar: 'teal',
  cobertura: 'indigo',
  resultados: 'amber',
  importar: 'plum',
  kim: 'plum',
};

function ProductIcon({
  name,                  // 'crearEvaluacion' | 'invitar' | 'cobertura' | 'resultados' | 'importar' | 'kim'
  size = 40,             // tamaño del glifo en px
  tile = false,          // montado sobre teja redondeada con tinte propio
  style,
  ...rest
}) {
  const glyph = GLYPHS[name];
  if (!glyph) return null;
  const svg = (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={tile ? null : style} {...(tile ? null : rest)}>
      {glyph(PI_COLORS)}
    </svg>
  );
  if (!tile) return svg;
  const tint = PI_COLORS[TILE[name]] || PI_COLORS.ink;
  const pad = Math.round(size * 0.3);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: pad, borderRadius: Math.round(size * 0.34),
      background: `linear-gradient(160deg, #fff 0%, ${tint.soft} 100%)`,
      border: `1px solid ${tint.soft}`, boxShadow: 'var(--shadow-xs)', ...style }} {...rest}>
      {svg}
    </span>
  );
}


// ── KimOrb ──────────────────────────────────────────────────

/**
 * KimOrb — la presencia de KIM en la interfaz. NO es un botón con label: es un
 * orbe azul luminoso de 80px que respira. Reemplaza a todo botón «Conversar
 * con KIM». El azul del orbe es FIJO del producto (base rgba(56,189,248)) y
 * convive con cualquier marca del cliente — KIM es del producto, no del cliente.
 *
 * Estados: reposo (respira, ciclo 3s) · hover (acelera y brilla) ·
 * activo/escribiendo (`active`, pulso rápido).
 * `floating` = versión mini 44px fija en esquina inferior derecha, para
 * pantallas donde KIM está disponible pero no es protagonista.
 */

const KIM_CSS = `
@keyframes kim-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes kim-ring { 0% { transform: scale(1); opacity: 0.55; } 75% { transform: scale(1.32); opacity: 0; } 100% { transform: scale(1.32); opacity: 0; } }
`;

function ensureKimStyles() {
  if (typeof document === 'undefined' || document.getElementById('kim-orb-css')) return;
  const s = document.createElement('style');
  s.id = 'kim-orb-css';
  s.textContent = KIM_CSS;
  document.head.appendChild(s);
}

function KimOrb({
  size = 80,
  active = false,        // escribiendo / pensando — pulso rápido
  label = 'KIM',
  floating = false,      // mini fija abajo a la derecha (fuerza 44px)
  onClick,
  style,
  ...rest
}) {
  React.useEffect(() => { ensureKimStyles(); }, []);
  const [hover, setHover] = React.useState(false);

  const d = floating ? 44 : size;
  const mode = active ? 'active' : hover ? 'hover' : 'rest';
  const dur = { rest: 3, hover: 2.1, active: 1.2 }[mode];
  const ease = 'cubic-bezier(0.77, 0, 0.175, 1)';

  const glow = {
    rest:   `0 ${d * 0.08}px ${d * 0.25}px rgba(56, 189, 248, 0.35)`,
    hover:  `0 ${d * 0.08}px ${d * 0.25}px rgba(56, 189, 248, 0.4), 0 0 ${d * 0.45}px rgba(56, 189, 248, 0.5)`,
    active: `0 ${d * 0.08}px ${d * 0.25}px rgba(56, 189, 248, 0.45), 0 0 ${d * 0.55}px rgba(56, 189, 248, 0.55)`,
  }[mode];

  return (
    <button
      type="button"
      aria-label={active ? 'KIM está escribiendo' : 'Conversar con KIM'}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: floating ? 'fixed' : 'relative',
        right: floating ? 20 : undefined, bottom: floating ? 20 : undefined, zIndex: floating ? 150 : undefined,
        width: d, height: d, flexShrink: 0,
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}
      {...rest}
    >
      {/* Anillo exterior tenue — pulsa desfasado media fase */}
      <span aria-hidden="true" style={{
        position: 'absolute', inset: -1, borderRadius: '50%',
        border: '1.5px solid rgba(56, 189, 248, 0.55)',
        animation: `kim-ring ${dur}s ${ease} ${-dur / 2}s infinite`,
      }} />
      {/* Esfera */}
      <span aria-hidden="true" style={{
        position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
        background: 'radial-gradient(circle at 32% 26%, rgba(224, 246, 255, 0.95), rgba(125, 211, 252, 0.95) 28%, rgba(56, 189, 248, 0.98) 55%, rgba(14, 116, 178, 1) 100%)',
        boxShadow: `${glow}, inset 0 ${-d * 0.1}px ${d * 0.22}px rgba(8, 74, 110, 0.35), inset 0 ${d * 0.05}px ${d * 0.12}px rgba(255, 255, 255, 0.5)`,
        animation: `kim-breathe ${dur}s ${ease} infinite`,
        transition: 'box-shadow 320ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Textura interna de puntos sutiles */}
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1.4px)',
          backgroundSize: `${Math.max(7, d * 0.11)}px ${Math.max(7, d * 0.11)}px`,
          backgroundPosition: '2px 3px', opacity: 0.32, mixBlendMode: 'screen',
        }} />
        {label ? (
          <span style={{
            position: 'relative', fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: Math.round(d * 0.2), letterSpacing: '0.09em', color: '#fff',
            textShadow: '0 1px 4px rgba(8, 74, 110, 0.45)', userSelect: 'none',
          }}>{label}</span>
        ) : null}
      </span>
    </button>
  );
}


window.Empat = { Button, ProductIcon, PI_COLORS, KimOrb, IconButton, Checkbox, Input, Radio, Select, Switch, Textarea, Avatar, Badge, Card, Tag, EmptyState, ProgressBar, RatingScale, Toast, Tooltip, AppHeader, BottomNav, Tabs, Dialog };
