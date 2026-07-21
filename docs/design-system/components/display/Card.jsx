import React from 'react';

/**
 * Card — the primary surface. Soft radius, hairline border, whisper of shadow.
 * Set `interactive` for hover lift on tappable cards.
 */
export function Card({
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
