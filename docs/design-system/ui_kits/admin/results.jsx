/* empat.IA 360 — Resultados individuales de un evaluado (desktop, RRHH)
   Reporte 360 de una persona: hero con score y banda, radar por fuente con
   leyenda interactiva, brechas de percepción, fortalezas/desarrollo y
   comentarios anónimos. Barra flotante con acciones (KIM, presentación).
   Regla de color: la marca solo en acentos/acciones; los colores de fuente
   y de banda son FIJOS (data-viz / semánticos), independientes del cliente. */

const { Button, Card, Avatar, Badge, ProductIcon, KimOrb } = window.Empat;
const { useState, useEffect } = React;

/* ── Iconos línea ───────────────────────────────────────────── */
const I = {
  back: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>,
  deck: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>,
  up: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 19V5M6 11l6-6 6 6"/></svg>,
  trendUp: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>,
  seed: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21v-8"/><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 13c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/></svg>,
  quote: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 11H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4"/><path d="M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4"/></svg>,
};

/* ── Colores FIJOS de data-viz (no dependen de la marca) ────── */
const SOURCES = {
  jefe:   { label: 'Jefe',   color: 'oklch(0.52 0.13 265)', soft: 'oklch(0.52 0.13 265 / 0.10)' },
  par:    { label: 'Pares',  color: 'oklch(0.62 0.13 55)',  soft: 'oklch(0.62 0.13 55 / 0.10)'  },
  equipo: { label: 'Equipo', color: 'oklch(0.58 0.12 165)', soft: 'oklch(0.58 0.12 165 / 0.10)' },
};
const SOURCE_KEYS = ['jefe', 'par', 'equipo'];

/* Bandas semánticas FIJAS de calificación (iguales para todos los clientes) */
const BANDS = [
  { min: 4.5, label: 'Referente',     color: 'oklch(0.46 0.11 155)', soft: 'oklch(0.95 0.030 155)' },
  { min: 3.5, label: 'Competente',    color: 'oklch(0.53 0.11 150)', soft: 'oklch(0.955 0.032 150)' },
  { min: 2.5, label: 'Progresando',   color: 'oklch(0.62 0.12 80)',  soft: 'oklch(0.96 0.040 85)'  },
  { min: 0,   label: 'En desarrollo', color: 'oklch(0.58 0.13 45)',  soft: 'oklch(0.955 0.035 45)' },
];
const bandOf = (v) => BANDS.find((b) => v >= b.min);

/* ── Datos del evaluado ─────────────────────────────────────── */
const PERSON = { name: 'Lucía Fernández', role: 'Directora de Operaciones', cycle: 'Evaluación de liderazgo · Julio 2026', responses: { jefe: 1, par: 4, equipo: 5 } };

const COMPS = [
  { name: 'Comunicación',              jefe: 4.8, par: 4.3, equipo: 3.9 },
  { name: 'Liderazgo',                 jefe: 4.6, par: 4.5, equipo: 4.7 },
  { name: 'Trabajo en equipo',         jefe: 4.6, par: 4.6, equipo: 4.8 },
  { name: 'Toma de decisiones',        jefe: 4.3, par: 4.5, equipo: 4.6 },
  { name: 'Orientación a resultados',  jefe: 4.8, par: 4.7, equipo: 4.9 },
  { name: 'Desarrollo de personas',    jefe: 3.6, par: 4.1, equipo: 3.8 },
  { name: 'Adaptabilidad',             jefe: 3.9, par: 4.0, equipo: 3.8 },
  { name: 'Visión estratégica',        jefe: 4.4, par: 3.8, equipo: 3.7 },
];
const avg = (c) => (c.jefe + c.par + c.equipo) / 3;
const OVERALL = COMPS.reduce((s, c) => s + avg(c), 0) / COMPS.length;   // ≈ 4.32
const GROUP_AVG = 4.14;

const CONTEXT = {
  'Orientación a resultados': 'La calificación más alta y la más consistente entre las tres fuentes.',
  'Trabajo en equipo':        'Su equipo directo es quien mejor la evalúa en esta competencia.',
  'Liderazgo':                'Por encima del promedio del grupo en las tres fuentes.',
  'Desarrollo de personas':   'La oportunidad más mencionada en los comentarios abiertos.',
  'Visión estratégica':       'Su jefe la ve más fuerte aquí que sus pares y su equipo.',
  'Adaptabilidad':            'Estable entre fuentes, pero por debajo de su propio promedio.',
};

const COMMENTS = [
  { source: 'equipo', text: 'Siempre tiene claridad sobre las prioridades y nos la transmite sin dramatismo, incluso en semanas difíciles.' },
  { source: 'equipo', text: 'Me gustaría que dedicara más tiempo a conversaciones de desarrollo, no solo a la operación del día a día.' },
  { source: 'equipo', text: 'Cuando algo sale mal, busca soluciones y no culpables. Eso genera mucha confianza en el equipo.' },
  { source: 'equipo', text: 'A veces las decisiones ya vienen tomadas y nos enteramos tarde. Explicar el porqué ayudaría a remar juntos.' },
  { source: 'par',    text: 'Es la persona con la que quiero trabajar cuando el proyecto es complejo: cumple lo que promete.' },
  { source: 'jefe',   text: 'Podría delegar más y reservar su energía para lo estratégico; su equipo está listo para asumir más.' },
];
const countBySource = COMMENTS.reduce((m, c) => ((m[c.source] = (m[c.source] || 0) + 1), m), {});

/* Brechas: top 3 por diferencia máx-mín entre fuentes */
const GAPS = COMPS
  .map((c) => {
    const vals = SOURCE_KEYS.map((k) => ({ k, v: c[k] }));
    const hi = vals.reduce((a, b) => (b.v > a.v ? b : a));
    const lo = vals.reduce((a, b) => (b.v < a.v ? b : a));
    return { name: c.name, hi, lo, delta: hi.v - lo.v };
  })
  .sort((a, b) => b.delta - a.delta)
  .slice(0, 3);

const BY_AVG = [...COMPS].sort((a, b) => avg(b) - avg(a));
const TOP3 = BY_AVG.slice(0, 3);
const BOTTOM3 = BY_AVG.slice(-3).reverse();

/* ── Conteo animado ─────────────────────────────────────────── */
function useCountUp(target, { duration = 1100, decimals = 2 } = {}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, t0 = null;
    const tick = (t) => {
      if (t0 == null) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setV(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v.toFixed(decimals);
}

/* ── Logo del cliente (slot white-label, muestra) ───────────── */
function ClientLogo() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--text-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 11, height: 11, borderRadius: '50%', border: '2.5px solid var(--white)' }} />
      </div>
      <span style={{ fontSize: 17, fontWeight: 'var(--fw-bold)', letterSpacing: '-0.02em' }}>Northwind</span>
    </div>
  );
}

/* ── Radar de competencias ──────────────────────────────────── */
function Radar({ hovered, size = 460 }) {
  const cx = size / 2, cy = size / 2 + 4;
  const R = size / 2 - 74;                       // radio útil (deja sitio a etiquetas)
  const N = COMPS.length;
  const angle = (i) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const pt = (i, v) => {
    const r = (v / 5) * R;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];
  };
  const ringPath = (v) => COMPS.map((_, i) => pt(i, v).join(',')).join(' ');
  const dimOpacity = (k) => (hovered && hovered !== k ? 0.13 : 1);

  return (
    <svg width="100%" viewBox={`-28 0 ${size + 56} ${size}`} style={{ display: 'block', maxWidth: size, margin: '0 auto' }} role="img" aria-label="Radar de 8 competencias por fuente">
      {/* Anillos y radios */}
      {[1, 2, 3, 4, 5].map((v) => (
        <polygon key={v} points={ringPath(v)} fill={v === 5 ? 'var(--surface-subtle)' : 'none'} stroke="var(--border-subtle)" strokeWidth="1" style={v === 5 ? { fill: 'transparent' } : null} />
      ))}
      {COMPS.map((_, i) => {
        const [x, y] = pt(i, 5);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border-subtle)" strokeWidth="1" />;
      })}
      {/* Etiquetas de escala (eje vertical superior) */}
      {[1, 2, 3, 4, 5].map((v) => (
        <text key={v} x={cx + 7} y={cy - (v / 5) * R + 3.5} fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-faint)">{v}</text>
      ))}
      {/* Trazos por fuente */}
      {SOURCE_KEYS.map((k, si) => {
        const pts = COMPS.map((c, i) => pt(i, c[k]));
        return (
          <g key={k} className="trace trace-in" style={{ opacity: dimOpacity(k), animationDelay: `${180 + si * 140}ms` }}>
            <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={SOURCES[k].soft} stroke={SOURCES[k].color} strokeWidth="2" strokeLinejoin="round" />
            {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="var(--surface)" stroke={SOURCES[k].color} strokeWidth="2" />)}
          </g>
        );
      })}
      {/* Etiquetas de competencia */}
      {COMPS.map((c, i) => {
        const [x, y] = pt(i, 5);
        const a = angle(i);
        const dx = Math.cos(a), dy = Math.sin(a);
        const lx = x + dx * 14, ly = y + dy * 16;
        const anchor = Math.abs(dx) < 0.25 ? 'middle' : dx > 0 ? 'start' : 'end';
        const words = c.name.split(' ');
        const lines = words.length > 2 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')]
                    : words.length === 2 && c.name.length > 16 ? [words[0], words[1]] : [c.name];
        return (
          <text key={c.name} x={lx} y={ly + (dy < -0.3 ? -(lines.length - 1) * 13 : 0)} textAnchor={anchor} fontFamily="var(--font-sans)" fontSize="12.5" fontWeight="600" fill="var(--text-body)">
            {lines.map((ln, li) => <tspan key={li} x={lx} dy={li === 0 ? 0 : 13}>{ln}</tspan>)}
          </text>
        );
      })}
    </svg>
  );
}

/* Leyenda interactiva del radar */
function Legend({ hovered, setHovered }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {SOURCE_KEYS.map((k) => (
        <div key={k} className="lchip" onMouseEnter={() => setHovered(k)} onMouseLeave={() => setHovered(null)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px 6px 10px', borderRadius: 'var(--radius-pill)',
            border: `1px solid ${hovered === k ? SOURCES[k].color : 'var(--border-default)'}`, background: hovered === k ? SOURCES[k].soft : 'var(--surface)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: SOURCES[k].color, flexShrink: 0 }} />
          <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)' }}>{SOURCES[k].label}</span>
          <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            {PERSON.responses[k]} {PERSON.responses[k] === 1 ? 'resp.' : 'resps.'}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Barra divergente de brecha ─────────────────────────────── */
function GapBar({ gap, delay }) {
  const MIN = 3, MAX = 5;                            // zoom en el rango relevante
  const x = (v) => ((v - MIN) / (MAX - MIN)) * 100;
  const left = x(gap.lo.v), width = x(gap.hi.v) - x(gap.lo.v);
  return (
    <div className="rise" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '18px 20px', borderTop: '1px solid var(--border-subtle)', animationDelay: `${delay}ms` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)' }}>{gap.name}</span>
        <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>Δ {gap.delta.toFixed(1)}</span>
      </div>
      <div style={{ position: 'relative', height: 34 }}>
        {/* pista 3–5 */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 14, height: 6, borderRadius: 999, background: 'var(--surface-muted)' }} />
        {/* marcas de escala */}
        {[3, 4, 5].map((v) => (
          <span key={v} className="num" style={{ position: 'absolute', top: 24, left: `${x(v)}%`, transform: v === 5 ? 'translateX(-100%)' : v === 3 ? 'none' : 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)' }}>{v.toFixed(1)}</span>
        ))}
        {/* banda de brecha */}
        <div className="gapfill" style={{ position: 'absolute', top: 14, height: 6, borderRadius: 999, left: `${left}%`, width: `${width}%`,
          background: `linear-gradient(90deg, ${SOURCES[gap.lo.k].color}, ${SOURCES[gap.hi.k].color})`, animationDelay: `${delay + 200}ms` }} />
        {/* extremos */}
        {[gap.lo, gap.hi].map((e) => (
          <span key={e.k} style={{ position: 'absolute', top: 10, left: `${x(e.v)}%`, transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%',
            background: 'var(--surface)', border: `3px solid ${SOURCES[e.k].color}`, boxShadow: 'var(--shadow-xs)' }} />
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
        Su <strong style={{ color: SOURCES[gap.hi.k].color, fontWeight: 'var(--fw-semibold)' }}>{SOURCES[gap.hi.k].label.toLowerCase()}</strong> la ve en <span className="num" style={{ fontFamily: 'var(--font-mono)' }}>{gap.hi.v.toFixed(1)}</span>;
        su <strong style={{ color: SOURCES[gap.lo.k].color, fontWeight: 'var(--fw-semibold)' }}>{SOURCES[gap.lo.k].label.toLowerCase()}</strong>, en <span className="num" style={{ fontFamily: 'var(--font-mono)' }}>{gap.lo.v.toFixed(1)}</span>.
      </p>
    </div>
  );
}

/* ── Tarjeta de competencia (fortaleza / desarrollo) ────────── */
function CompCard({ comp, kind, delay }) {
  const v = avg(comp);
  const band = bandOf(v);
  return (
    <Card padding="md" className="rise" style={{ display: 'flex', flexDirection: 'column', gap: 8, animationDelay: `${delay}ms` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{comp.name}</span>
        <span style={{ display: 'inline-flex', width: 16, height: 16, color: kind === 'top' ? band.color : 'var(--text-faint)', flexShrink: 0 }}>
          {kind === 'top' ? <I.trendUp width="16" height="16"/> : <I.seed width="16" height="16"/>}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="num" style={{ fontSize: 26, fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)', lineHeight: 1 }}>{v.toFixed(2)}</span>
        <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: band.soft, color: band.color, fontSize: 11, fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--tracking-wide)' }}>{band.label}</span>
      </div>
      <p style={{ margin: 0, fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>{CONTEXT[comp.name]}</p>
    </Card>
  );
}

/* ── Tarjeta de comentario anónimo ──────────────────────────── */
function CommentCard({ c, delay }) {
  const tagged = countBySource[c.source] >= 3;      // etiqueta solo con 3+ (anonimato)
  return (
    <Card padding="md" className="rise" style={{ display: 'flex', flexDirection: 'column', gap: 10, animationDelay: `${delay}ms` }}>
      <span style={{ display: 'inline-flex', width: 18, height: 18, color: 'var(--text-faint)' }}><I.quote width="18" height="18"/></span>
      <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)' }}>{c.text}</p>
      {tagged ? (
        <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: SOURCES[c.source].soft, fontSize: 11, fontWeight: 'var(--fw-semibold)', color: SOURCES[c.source].color }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: SOURCES[c.source].color }} />
          {SOURCES[c.source].label}
        </span>
      ) : (
        <span style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>Fuente reservada por anonimato</span>
      )}
    </Card>
  );
}

/* ── Título de sección ──────────────────────────────────────── */
function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 500 }}>{eyebrow}</span>
      <h2 style={{ margin: 0, fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--tracking-snug)' }}>{title}</h2>
      {sub ? <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{sub}</p> : null}
    </div>
  );
}

/* ── App ────────────────────────────────────────────────────── */
function Results() {
  const [hovered, setHovered] = useState(null);
  const [kimActive, setKimActive] = useState(false);
  const score = useCountUp(OVERALL);
  const band = bandOf(OVERALL);
  const diff = OVERALL - GROUP_AVG;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <header data-screen-label="Resultados 360 — header" style={{ display: 'flex', alignItems: 'center', gap: 18, height: 64, padding: '0 32px', background: 'var(--surface)', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0, position: 'sticky', top: 0, zIndex: 50 }}>
        <ClientLogo />
        <span style={{ width: 1, height: 26, background: 'var(--border-default)' }} />
        <a href="#" onClick={(e) => e.preventDefault()} className="blink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-muted)', textDecoration: 'none' }}>
          <span style={{ display: 'inline-flex', width: 15, height: 15 }}><I.back width="15" height="15"/></span>
          Volver al ciclo
        </a>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Andrea Gil · RRHH</span>
          <Avatar name="Andrea Gil" size="sm" />
        </div>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: 1080, margin: '0 auto', padding: '40px 32px 140px' }}>

        {/* ── Hero ── */}
        <section data-screen-label="Hero — score general" className="rise" style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <Avatar name={PERSON.name} size="xl" />
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 500 }}>{PERSON.cycle}</span>
            <h1 style={{ margin: 0, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--lh-tight)' }}>{PERSON.name}</h1>
            <span style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}>{PERSON.role}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="num" style={{ fontSize: 64, fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)', lineHeight: 1 }}>{score}</span>
                <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--text-faint)' }}>/ 5</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ padding: '4px 13px', borderRadius: 'var(--radius-pill)', background: band.soft, color: band.color, fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)' }}>{band.label}</span>
                <span className="num" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', width: 12, height: 12 }}><I.up width="12" height="12"/></span>
                  +{diff.toFixed(2)} vs. promedio del grupo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sección 1 · Radar ── */}
        <section data-screen-label="Radar de competencias" style={{ marginTop: 48 }}>
          <SectionTitle eyebrow="Cómo la ven" title="Competencias por fuente"
            sub="Pasa el cursor por una fuente para aislar su trazo." />
          <Card padding="lg" className="rise" style={{ display: 'flex', flexDirection: 'column', gap: 12, animationDelay: '80ms' }}>
            <Legend hovered={hovered} setHovered={setHovered} />
            <Radar hovered={hovered} />
          </Card>
        </section>

        {/* ── Sección 2 · Brechas ── */}
        <section data-screen-label="Brechas de percepción" style={{ marginTop: 48 }}>
          <SectionTitle eyebrow="Dónde difieren las miradas" title="Brechas de percepción"
            sub="Las 3 competencias con mayor diferencia entre fuentes. Una brecha no es un problema: es una conversación pendiente." />
          <Card padding="none" className="rise" style={{ overflow: 'hidden', animationDelay: '80ms' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase' }}>Escala 3.0 – 5.0</span>
            </div>
            {GAPS.map((g, i) => <GapBar key={g.name} gap={g} delay={120 + i * 110} />)}
          </Card>
        </section>

        {/* ── Sección 3 · Fortalezas y desarrollo ── */}
        <section data-screen-label="Fortalezas y desarrollo" style={{ marginTop: 48 }}>
          <SectionTitle eyebrow="Síntesis" title="Fortalezas y áreas de desarrollo" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-body)' }}>Fortalezas</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TOP3.map((c, i) => <CompCard key={c.name} comp={c} kind="top" delay={i * 90} />)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-body)' }}>Áreas de desarrollo</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BOTTOM3.map((c, i) => <CompCard key={c.name} comp={c} kind="dev" delay={i * 90} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── Sección 4 · Comentarios ── */}
        <section data-screen-label="Comentarios anónimos" style={{ marginTop: 48 }}>
          <SectionTitle eyebrow="En sus palabras" title="Comentarios anónimos"
            sub="La fuente se muestra solo cuando hay al menos 3 comentarios de ese grupo." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {COMMENTS.map((c, i) => <CommentCard key={i} c={c} delay={i * 70} />)}
          </div>
        </section>
      </main>

      {/* ── Barra flotante de acciones ── */}
      <div data-screen-label="Barra de acciones" className="rise" style={{ position: 'fixed', left: 0, right: 0, margin: '0 auto', width: 'fit-content', bottom: 24, zIndex: 100,
        display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px 10px 10px', borderRadius: 'var(--radius-pill)',
        background: 'var(--surface)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg, 0 12px 32px oklch(0.26 0.012 65 / 0.10))', animationDelay: '400ms' }}>
        <KimOrb size={56} active={kimActive} onClick={() => setKimActive((v) => !v)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 6 }}>
          <span style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{kimActive ? 'KIM está escribiendo…' : 'Preguntarle a KIM sobre estos resultados'}</span>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{kimActive ? 'Analizando las brechas de percepción' : 'Toca el orbe para conversar'}</span>
        </div>
        <span style={{ width: 1, height: 28, background: 'var(--border-default)' }} />
        <Button variant="secondary" size="md" leadingIcon={<ProductIcon name="resultados" size={18} />}>Generar presentación ejecutiva</Button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Results />);
