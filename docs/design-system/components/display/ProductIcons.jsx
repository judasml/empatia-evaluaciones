import React from 'react';

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
export const PI_COLORS = {
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

export function ProductIcon({
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
