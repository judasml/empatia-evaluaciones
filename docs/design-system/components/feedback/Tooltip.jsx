import React from 'react';

/**
 * Tooltip — hover/focus hint. Neutral dark bubble; appears above the trigger.
 * Wrap any element as children.
 */
export function Tooltip({ label, children, side = 'top', style }) {
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
