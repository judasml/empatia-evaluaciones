import React from 'react';

/**
 * IconButton — a square, icon-only control. Icon-library agnostic: pass an SVG
 * (or any node) as children. Always give an `aria-label`.
 */
export function IconButton({
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
