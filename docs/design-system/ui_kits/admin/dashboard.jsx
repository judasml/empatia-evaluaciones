/* empat.IA 360 — Dashboard del encargado de RRHH (desktop)
   Control operativo de un ciclo 360 activo: métricas, panel de cobertura con
   umbral de anonimato (mín. 3 respuestas por fuente) y recordatorios a pendientes.
   Sin gráficas de resultados: esta pantalla es operación, no análisis.
   Artesanía: skeleton al cargar, entradas escalonadas, conteo animado, anillos
   de progreso, hover suave en filas y micro-feedback botón→check al recordar. */

const { Button, Card, Avatar, Badge, Tooltip, Toast, ProductIcon, KimOrb } = window.Empat;
const { useState, useEffect, useRef } = React;

/* ── Iconos línea ───────────────────────────────────────────── */
const I = {
  lock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5l5 5L20 6.5"/></svg>,
  chat: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12z"/></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
};

/* ── Datos del ciclo ────────────────────────────────────────── */
const CYCLE = { name: 'Evaluación de liderazgo', period: 'Julio 2026', daysLeft: 5, totalDays: 21, closes: 'cierra el 9 jul' };

const EVALUADOS = [
  { name: 'Lucía Fernández', role: 'Dir. Operaciones', jefe: [1,1], par: [4,4], equipo: [5,5] },
  { name: 'Marco Ruiz',      role: 'Analista sénior',  jefe: [1,1], par: [3,3], equipo: [4,4] },
  { name: 'Daniela Soto',    role: 'Diseño de producto', jefe: [1,1], par: [2,3], equipo: [4,4] },
  { name: 'Javier Peña',     role: 'Soporte',          jefe: [0,1], par: [3,3], equipo: [2,5] },
  { name: 'Ana Castillo',    role: 'Finanzas',         jefe: [1,1], par: [3,4], equipo: [3,3] },
  { name: 'Pedro Alarcón',   role: 'Ingeniería',       jefe: [1,1], par: [4,4], equipo: [6,6] },
  { name: 'Carmen Vega',     role: 'Comercial',        jefe: [1,1], par: [1,3], equipo: [3,4] },
  { name: 'Rodrigo Núñez',   role: 'Ingeniería',       jefe: [1,1], par: [3,3], equipo: [5,5] },
];
const isReady = (e) => e.jefe[0] >= e.jefe[1] && e.par[0] >= e.par[1] && e.equipo[0] >= e.equipo[1];

const PENDIENTES = [
  { name: 'Sofía Ibarra',   channel: 'whatsapp', pending: 3 },
  { name: 'Andrés Mora',    channel: 'correo',   pending: 1 },
  { name: 'Elena Bravo',    channel: 'whatsapp', pending: 2 },
  { name: 'Tomás Quiroga',  channel: 'whatsapp', pending: 4 },
  { name: 'Isabel Fuentes', channel: 'correo',   pending: 2 },
];
const TOTAL_PENDIENTES = 18;

const ANON_TIP = 'Se necesitan mínimo 3 respuestas para mostrar resultados de esta fuente y proteger el anonimato';

/* ── Hooks de movimiento ────────────────────────────────────── */
function useCountUp(target, { duration = 950, delay = 0, start = true } = {}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0 = null;
    const tick = (t) => {
      if (t0 == null) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setV(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const to = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [start, target]);
  return start ? v : 0;
}

/* Anillo de progreso animado (stroke-dashoffset) */
function Ring({ pct, delay = 0, start, size = 46, stroke = 5 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [off, setOff] = useState(c);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setOff(c * (1 - Math.min(100, pct) / 100)), 80 + delay);
    return () => clearTimeout(t);
  }, [start]);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-muted)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--brand)" strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        style={{ transition: 'stroke-dashoffset 1150ms cubic-bezier(0.16, 1, 0.3, 1)' }} />
    </svg>
  );
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

/* ── Adorno estilo clay ─────────────────────────────────────── */
function ClayDeco() {
  const shape = (st) => <span style={{ position: 'absolute', display: 'block', ...st }} />;
  return (
    <div aria-hidden="true" style={{ position: 'absolute', top: -18, right: 0, width: 240, height: 150, pointerEvents: 'none', overflow: 'hidden' }}>
      {shape({ right: 24, top: 12, width: 104, height: 104, borderRadius: '50%', border: '14px solid var(--brand-softer)' })}
      {shape({ right: 4, top: 84, width: 40, height: 40, borderRadius: '50%', background: 'var(--brand-soft)' })}
      {shape({ right: 140, top: 66, width: 26, height: 26, borderRadius: 7, background: 'var(--surface-muted)', transform: 'rotate(45deg)' })}
      {shape({ right: 118, top: 22, width: 12, height: 12, borderRadius: '50%', background: 'var(--brand)', opacity: 0.85 })}
      {shape({ right: 190, top: 108, width: 9, height: 9, borderRadius: '50%', background: 'var(--border-strong)' })}
    </div>
  );
}

/* ── Métrica con conteo + anillo ────────────────────────────── */
function Metric({ label, value, suffix = '', unit, sub, pct, delay = 0, start }) {
  const n = useCountUp(value, { delay, start });
  return (
    <Card padding="md" style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <span style={{ fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-medium)', color: 'var(--text-muted)' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="num" style={{ fontSize: 'var(--fs-display)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)', lineHeight: 1 }}>{n}{suffix}</span>
          {unit ? <span style={{ fontSize: 'var(--fs-body)', color: 'var(--text-faint)', fontWeight: 'var(--fw-medium)' }}>{unit}</span> : null}
        </div>
        {sub ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{sub}</span> : null}
      </div>
      {pct != null ? <Ring pct={pct} delay={delay} start={start} /> : null}
    </Card>
  );
}

/* ── Celda de cobertura ─────────────────────────────────────── */
function CoverageCell({ pair, anonRule }) {
  const [r, e] = pair;
  const complete = r >= e;
  const locked = anonRule && r < 3;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
      <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: complete ? 'var(--text-strong)' : 'var(--text-muted)', fontWeight: complete ? 500 : 400 }}>
        {r}/{e}
      </span>
      {locked ? (
        <Tooltip label={ANON_TIP} side="top">
          <span style={{ display: 'inline-flex', width: 15, height: 15, color: 'var(--text-faint)', cursor: 'default' }}><I.lock width="15" height="15"/></span>
        </Tooltip>
      ) : null}
    </div>
  );
}

/* ── Micro-feedback: botón → spinner → check ────────────────── */
function RemindButton({ state, onClick }) { // 'idle' | 'sending' | 'sent'
  if (state === 'sent') {
    return (
      <span className="pop" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, minWidth: 168, height: 34,
        borderRadius: 'var(--radius-pill)', background: 'var(--brand-soft)', border: '1px solid var(--brand-border)',
        color: 'var(--brand-strong)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)' }}>
        <span className="pop" style={{ display: 'inline-flex', width: 14, height: 14 }}><I.check width="14" height="14"/></span>
        Enviado
      </span>
    );
  }
  return (
    <button type="button" onClick={state === 'idle' ? onClick : undefined}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 168, height: 34,
        padding: '0 14px', borderRadius: 'var(--radius-sm)', cursor: state === 'idle' ? 'pointer' : 'default',
        background: 'var(--surface)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)',
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)' }}
      onMouseEnter={(e) => { if (state === 'idle') e.currentTarget.style.background = 'var(--surface-subtle)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; }}>
      {state === 'sending' ? <span className="spin" /> : 'Enviar recordatorio'}
    </button>
  );
}

/* ── Skeletons ──────────────────────────────────────────────── */
const Sk = ({ w, h, r = 8, style }) => <span className="sk" style={{ width: w, height: h, borderRadius: r, ...style }} />;

function SkeletonPage() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: 16 }}>
        {[0,1,2,3].map((i) => (
          <Card key={i} padding="md" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Sk w="70%" h={11} />
              <Sk w={72} h={30} r={10} />
            </div>
            <Sk w={46} h={46} r={23} />
          </Card>
        ))}
      </div>
      <Card padding="none" style={{ marginTop: 24, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Sk w={220} h={16} /><Sk w={380} h={11} />
        </div>
        {[0,1,2,3,4].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', borderTop: '1px solid var(--border-subtle)' }}>
            <Sk w={32} h={32} r={999} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}><Sk w={140} h={12} /><Sk w={90} h={9} /></div>
            <Sk w={40} h={12} /><Sk w={40} h={12} style={{ marginLeft: 40 }} /><Sk w={40} h={12} style={{ marginLeft: 40 }} />
            <Sk w={100} h={12} style={{ marginLeft: 60 }} />
          </div>
        ))}
      </Card>
      <Card padding="none" style={{ marginTop: 24, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><Sk w={200} h={16} /><Sk w={280} h={11} /></div>
          <Sk w={230} h={34} r={10} />
        </div>
        {[0,1,2].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: '1px solid var(--border-subtle)' }}>
            <Sk w={32} h={32} r={999} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}><Sk w={120} h={12} /><Sk w={160} h={9} /></div>
            <Sk w={70} h={11} /><Sk w={168} h={34} r={10} />
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ── App ────────────────────────────────────────────────────── */
function Dashboard() {
  const [ready, setReady] = useState(false);          // skeleton -> contenido
  const [sent, setSent] = useState({});               // name -> 'sending' | 'sent'
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => { const t = setTimeout(() => setReady(true), 950); return () => clearTimeout(t); }, []);

  const showToast = (t) => {
    setToast(t);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  };

  const allSent = PENDIENTES.every((p) => sent[p.name] === 'sent');

  const remind = (p) => {
    setSent((s) => ({ ...s, [p.name]: 'sending' }));
    setTimeout(() => {
      setSent((s) => ({ ...s, [p.name]: 'sent' }));
      showToast({ title: 'Recordatorio enviado', description: `${p.name} lo recibirá por ${p.channel === 'whatsapp' ? 'WhatsApp' : 'correo'}.` });
    }, 550);
  };

  const remindAll = () => {
    PENDIENTES.forEach((p, i) => {
      if (sent[p.name] === 'sent') return;
      setTimeout(() => setSent((s) => ({ ...s, [p.name]: 'sending' })), i * 100);
      setTimeout(() => setSent((s) => ({ ...s, [p.name]: 'sent' })), i * 100 + 520);
    });
    setTimeout(() => showToast({ title: `${TOTAL_PENDIENTES} recordatorios enviados`, description: 'Cada evaluador lo recibirá por su canal habitual.' }), PENDIENTES.length * 100 + 520);
  };

  const readyCount = EVALUADOS.filter(isReady).length;

  const th = { padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 500, borderBottom: '1px solid var(--border-subtle)' };
  const td = { padding: '13px 14px', borderBottom: '1px solid var(--border-subtle)', verticalAlign: 'middle' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 18, height: 64, padding: '0 32px', background: 'var(--surface)', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
        <ClientLogo />
        <span style={{ width: 1, height: 26, background: 'var(--border-default)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {CYCLE.name} · {CYCLE.period}
          </span>
          <Badge tone="brand" dot>Ciclo activo</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Andrea Gil · RRHH</span>
          <Avatar name="Andrea Gil" size="sm" />
        </div>
      </header>

      {/* ── Contenido ── */}
      <main style={{ flex: 1, width: '100%', maxWidth: 1080, margin: '0 auto', padding: '36px 32px 56px', position: 'relative' }}>
        <ClayDeco />

        {!ready ? <SkeletonPage /> : (
          <div>
            {/* Acciones principales — tarjetas con íconos propios del producto */}
            <div className="rise" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24, position: 'relative' }}>
              {[
                { icon: 'crearEvaluacion', title: 'Crear evaluación', sub: 'Nuevo ciclo 270° o 360°' },
                { icon: 'invitar', title: 'Invitar evaluadores', sub: 'Por correo o WhatsApp' },
                { icon: 'importar', title: 'Importar historial', sub: 'Ciclos de otras herramientas' },
              ].map((a) => (
                <Card key={a.title} padding="md" interactive style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <ProductIcon name={a.icon} size={30} tile />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{a.title}</div>
                    <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{a.sub}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Métricas */}
            <div className="rise" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: 16, position: 'relative' }}>
              <Metric label="Evaluadores que completaron" value={23} unit="de 41" pct={(23 / 41) * 100} delay={0} start={ready} />
              <Metric label="Respuestas recibidas" value={61} suffix="%" pct={61} delay={120} start={ready} />
              <Metric label="Días restantes" value={CYCLE.daysLeft} sub={CYCLE.closes} pct={(CYCLE.daysLeft / CYCLE.totalDays) * 100} delay={240} start={ready} />
              <Metric label="Evaluados con resultados listos" value={9} unit="de 15" pct={(9 / 15) * 100} delay={360} start={ready} />
            </div>

            {/* Panel de cobertura */}
            <Card padding="none" className="rise" style={{ marginTop: 24, overflow: 'hidden', animation: 'fade 520ms var(--ease-out) 90ms both' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, padding: '18px 20px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <ProductIcon name="cobertura" size={24} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--tracking-snug)' }}>Cobertura por evaluado</h2>
                    <p style={{ margin: '3px 0 0', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>Respuestas recibidas / esperadas por fuente. El candado protege el anonimato (mín. 3 por fuente).</p>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{readyCount + 5} de 15 listos</span>
              </div>
              <table>
                <thead><tr>
                  <th style={{ ...th, paddingLeft: 20 }}>Evaluado</th>
                  <th style={th}>Jefe</th>
                  <th style={th}>Par</th>
                  <th style={th}>Equipo</th>
                  <th style={{ ...th, textAlign: 'right', paddingRight: 20 }}>Estado</th>
                </tr></thead>
                <tbody>
                  {EVALUADOS.map((e) => {
                    const rdy = isReady(e);
                    return (
                      <tr key={e.name}>
                        <td style={{ ...td, paddingLeft: 20 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Avatar name={e.name} size="sm" status={rdy ? 'complete' : undefined} />
                            <div>
                              <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{e.name}</div>
                              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{e.role}</div>
                            </div>
                          </div>
                        </td>
                        <td style={td}><CoverageCell pair={e.jefe} anonRule={false} /></td>
                        <td style={td}><CoverageCell pair={e.par} anonRule={true} /></td>
                        <td style={td}><CoverageCell pair={e.equipo} anonRule={true} /></td>
                        <td style={{ ...td, textAlign: 'right', paddingRight: 20 }}>
                          {rdy ? (
                            <a href="#" onClick={(ev) => ev.preventDefault()} className="rlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--brand-strong)', textDecoration: 'none' }}>
                              <span style={{ display: 'inline-flex', width: 15, height: 15 }}><I.check width="15" height="15"/></span>
                              Ver resultados
                              <span className="go" style={{ display: 'inline-flex', width: 13, height: 13 }}><I.arrow width="13" height="13"/></span>
                            </a>
                          ) : (
                            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>En curso</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ padding: '12px 20px' }}>
                <a href="#" onClick={(e) => e.preventDefault()} className="rlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Ver los 15 evaluados <span className="go" style={{ display: 'inline-flex', width: 14, height: 14 }}><I.arrow width="14" height="14"/></span>
                </a>
              </div>
            </Card>

            {/* Evaluadores pendientes */}
            <Card padding="none" style={{ marginTop: 24, overflow: 'hidden', animation: 'fade 520ms var(--ease-out) 180ms both' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 20px 12px', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--tracking-snug)' }}>Evaluadores pendientes</h2>
                  <p style={{ margin: '3px 0 0', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{TOTAL_PENDIENTES} personas aún tienen evaluaciones sin enviar.</p>
                </div>
                <Button variant="primary" size="sm" leadingIcon={allSent ? <I.check/> : <I.bell/>} onClick={remindAll} disabled={allSent}>
                  {allSent ? 'Recordatorios enviados' : 'Recordar a todos los pendientes'}
                </Button>
              </div>
              <div>
                {PENDIENTES.map((p, i) => (
                  <div key={p.name} className="prow" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                    <Avatar name={p.name} size="sm" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{p.name}</div>
                      <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{p.pending} {p.pending === 1 ? 'evaluación pendiente' : 'evaluaciones pendientes'}</div>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'inline-flex', width: 14, height: 14 }}>{p.channel === 'whatsapp' ? <I.chat width="14" height="14"/> : <I.mail width="14" height="14"/>}</span>
                      {p.channel === 'whatsapp' ? 'WhatsApp' : 'Correo'}
                    </span>
                    <RemindButton state={sent[p.name] || 'idle'} onClick={() => remind(p)} />
                  </div>
                ))}
                <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>y 13 evaluadores más…</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* KIM disponible, no protagonista — orbe mini flotante */}
      <KimOrb floating onClick={() => {}} />

      {/* Toast */}
      {toast ? (
        <div style={{ position: 'fixed', right: 24, bottom: 84, zIndex: 200 }} className="rise">
          <Toast tone="success" title={toast.title} description={toast.description} onClose={() => { clearTimeout(toastTimer.current); setToast(null); }} />
        </div>
      ) : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Dashboard />);
