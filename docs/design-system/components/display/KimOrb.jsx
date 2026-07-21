import React from 'react';

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

export function KimOrb({
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
