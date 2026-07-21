import React from 'react';

/**
 * Button — the primary action control.
 * White-label rule: `variant="primary"` is the ONLY place brand colour appears
 * on an action. Everything else is neutral.
 */
export function Button({
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
