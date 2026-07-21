/* empat.IA 360 — Onboarding del cliente (3 pasos, desktop)
   El cliente configura su cuenta white-label:
   1. Identidad — logo + color de marca con preview en vivo de la encuesta móvil.
   2. Norte estratégico — misión/visión pegada o documento; oferta de KIM.
   3. Confirmación — resumen con preview de encuesta y encabezado de reportes.
   El color elegido se aplica en vivo sobreescribiendo --brand en el contenedor
   del preview (misma mecánica white-label del sistema). */

const { Button, Card, Textarea, Badge, ProductIcon, KimOrb } = window.Empat;
const { useState, useRef } = React;

/* ── Iconos línea ───────────────────────────────────────────── */
const I = {
  upload: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 20h16"/></svg>,
  image: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-9 9"/></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5l5 5L20 6.5"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  back: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>,
  edit: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 3l4 4L8 20l-5 1 1-5z"/></svg>,
};

/* ── Paleta curada de colores de marca ──────────────────────── */
const SWATCHES = ['#4A5DA8', '#0E7C66', '#B4532A', '#7C3AED', '#B02A5B', '#1D6FB8', '#3F6212', '#334155'];

const STEPS = [
  { n: 1, label: 'Identidad' },
  { n: 2, label: 'Norte estratégico' },
  { n: 3, label: 'Confirmación' },
];

/* ── Mini preview de la encuesta móvil (tintada en vivo) ────── */
function SurveyPreview({ brand, logo, name, compact }) {
  const W = compact ? 232 : 264;
  return (
    <div style={{ '--brand': brand, width: W, borderRadius: 28, border: '1px solid var(--border-default)', background: 'var(--bg-page)', boxShadow: 'var(--shadow-card)', overflow: 'hidden', flexShrink: 0 }}>
      {/* status bar */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
        <div style={{ width: 64, height: 5, borderRadius: 999, background: 'var(--surface-muted)' }} />
      </div>
      {/* header con logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px 10px' }}>
        {logo
          ? <img src={logo} alt="" style={{ height: 18, maxWidth: 84, objectFit: 'contain' }} />
          : <span style={{ fontSize: 12, fontWeight: 'var(--fw-bold)', letterSpacing: '-0.01em' }}>{name}</span>}
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--text-faint)' }}>3 de 12</span>
      </div>
      {/* progreso — marca */}
      <div style={{ margin: '0 16px', height: 4, borderRadius: 999, background: 'var(--surface-muted)', overflow: 'hidden' }}>
        <div style={{ width: '25%', height: '100%', borderRadius: 999, background: 'var(--brand)', transition: 'background 300ms var(--ease-standard)' }} />
      </div>
      {/* pregunta */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Comunicación</span>
        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 'var(--fw-semibold)', lineHeight: 1.35 }}>¿Explica sus decisiones con claridad al equipo?</p>
        {/* escala likert */}
        <div style={{ display: 'flex', gap: 5 }}>
          {[1, 2, 3, 4, 5].map((v) => (
            <span key={v} style={{ flex: 1, height: 30, borderRadius: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
              background: v === 4 ? 'var(--brand)' : 'var(--surface)', color: v === 4 ? 'var(--brand-on)' : 'var(--text-muted)',
              border: v === 4 ? '1px solid var(--brand)' : '1px solid var(--border-default)', transition: 'background 300ms var(--ease-standard)' }}>{v}</span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 8.5, color: 'var(--text-faint)' }}>Nunca</span>
          <span style={{ fontSize: 8.5, color: 'var(--text-faint)' }}>Siempre</span>
        </div>
        {/* botón primario — marca */}
        <span style={{ height: 34, borderRadius: 10, background: 'var(--brand)', color: 'var(--brand-on)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, transition: 'background 300ms var(--ease-standard)' }}>Siguiente</span>
        <span style={{ textAlign: 'center', fontSize: 8, color: 'var(--text-faint)' }}>Tus respuestas son anónimas</span>
      </div>
    </div>
  );
}

/* ── Preview del encabezado de reportes ─────────────────────── */
function ReportHeaderPreview({ brand, logo, name }) {
  return (
    <div style={{ '--brand': brand, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
        {logo
          ? <img src={logo} alt="" style={{ height: 20, maxWidth: 96, objectFit: 'contain' }} />
          : <span style={{ fontSize: 13, fontWeight: 'var(--fw-bold)' }}>{name}</span>}
        <span style={{ width: 1, height: 16, background: 'var(--border-default)' }} />
        <span style={{ fontSize: 11.5, fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)' }}>Reporte 360 · Julio 2026</span>
        <span style={{ marginLeft: 'auto', padding: '2px 9px', borderRadius: 999, background: 'var(--brand-soft)', border: '1px solid var(--brand-border)', color: 'var(--brand-strong)', fontSize: 9.5, fontWeight: 600, transition: 'background 300ms var(--ease-standard)' }}>Ciclo activo</span>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ width: 88, height: 9, borderRadius: 999, background: 'var(--surface-muted)' }} />
          <span style={{ width: 48, height: 9, borderRadius: 999, background: 'var(--surface-subtle)' }} />
        </div>
        <div style={{ height: 6, borderRadius: 999, background: 'var(--surface-muted)', overflow: 'hidden' }}>
          <div style={{ width: '64%', height: '100%', borderRadius: 999, background: 'var(--brand)', transition: 'background 300ms var(--ease-standard)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ width: 140, height: 7, borderRadius: 999, background: 'var(--surface-subtle)' }} />
        </div>
      </div>
    </div>
  );
}

/* ── Stepper superior ───────────────────────────────────────── */
function Stepper({ step, go }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 560, margin: '0 auto' }}>
      {STEPS.map((s, i) => {
        const done = step > s.n, active = step === s.n;
        return (
          <React.Fragment key={s.n}>
            {i > 0 ? <span style={{ flex: 1, height: 2, borderRadius: 999, background: step > i ? 'var(--brand)' : 'var(--border-default)', transition: 'background var(--dur-slow) var(--ease-standard)', margin: '0 10px', marginBottom: 22 }} /> : null}
            <button type="button" className="stepbtn" onClick={done ? () => go(s.n) : undefined}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, background: 'none', border: 'none', padding: 0, cursor: done ? 'pointer' : 'default', fontFamily: 'var(--font-sans)' }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: done || active ? 'var(--brand)' : 'var(--surface)', color: done || active ? 'var(--brand-on)' : 'var(--text-faint)',
                border: done || active ? '1px solid var(--brand)' : '1px solid var(--border-default)',
                fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', transition: 'background var(--dur-fast) var(--ease-standard)' }}>
                {done ? <span style={{ display: 'inline-flex', width: 14, height: 14 }}><I.check width="14" height="14"/></span> : s.n}
              </span>
              <span style={{ fontSize: 'var(--fs-caption)', fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)', color: active ? 'var(--text-strong)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Paso 1 · Identidad ─────────────────────────────────────── */
function StepIdentity({ brand, setBrand, logo, setLogo, next }) {
  const fileRef = useRef(null);
  const [over, setOver] = useState(false);

  const readFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = () => setLogo(r.result);
    r.readAsDataURL(f);
  };

  return (
    <div className="rise" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)' }}>Tu marca, en toda la experiencia</h1>
          <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-body)', color: 'var(--text-muted)', maxWidth: 480 }}>Tu logo y tu color aparecerán en las encuestas, los recordatorios y los reportes. Puedes cambiarlos cuando quieras.</p>
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)' }}>Logo</span>
          <div className={'drop' + (over ? ' over' : '')}
            onClick={() => fileRef.current && fileRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setOver(true); }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => { e.preventDefault(); setOver(false); readFile(e.dataTransfer.files[0]); }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--border-strong)', background: 'var(--surface)', cursor: 'pointer' }}>
            {logo ? (
              <img src={logo} alt="Logo cargado" style={{ height: 40, maxWidth: 160, objectFit: 'contain' }} />
            ) : (
              <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)' }}>
                <I.image width="20" height="20"/>
              </span>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{logo ? 'Logo cargado' : 'Arrastra tu logo aquí o haz clic para buscarlo'}</div>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)', marginTop: 2 }}>{logo ? 'Haz clic para reemplazarlo' : 'PNG o SVG con fondo transparente, mínimo 200px de ancho'}</div>
            </div>
            <span style={{ display: 'inline-flex', width: 18, height: 18, color: 'var(--text-faint)' }}><I.upload width="18" height="18"/></span>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => readFile(e.target.files[0])} />
          </div>
        </div>

        {/* Color */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)' }}>Color de marca</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {SWATCHES.map((c) => (
              <button key={c} type="button" className="sw" onClick={() => setBrand(c)} aria-label={`Color ${c}`}
                style={{ width: 34, height: 34, borderRadius: '50%', background: c, border: 'none', padding: 0,
                  boxShadow: brand === c ? `0 0 0 2px var(--surface), 0 0 0 4.5px ${c}` : '0 0 0 1px oklch(0 0 0 / 0.08) inset' }} />
            ))}
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-default)', background: 'var(--surface)', cursor: 'pointer' }}>
              <input type="color" value={brand} onChange={(e) => setBrand(e.target.value)} style={{ width: 20, height: 20, border: 'none', padding: 0, background: 'none', cursor: 'pointer' }} />
              <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{brand.toUpperCase()}</span>
            </label>
          </div>
          <p style={{ margin: 0, fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>Lo usamos con moderación: botones, progreso y estados de éxito. Todo lo demás permanece neutro.</p>
        </div>

        <div>
          <Button variant="primary" size="lg" trailingIcon={<I.arrow/>} onClick={next}>Continuar</Button>
        </div>
      </div>

      {/* Preview en vivo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Así la verá tu gente</span>
        <SurveyPreview brand={brand} logo={logo} name="Tu empresa" />
      </div>
    </div>
  );
}

/* ── Paso 2 · Norte estratégico ─────────────────────────────── */
function StepMission({ mission, setMission, docName, setDocName, next, back, skip }) {
  const fileRef = useRef(null);
  return (
    <div className="rise" style={{ maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)' }}>¿Hacia dónde va tu empresa?</h1>
        <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}>La usamos para que los planes de desarrollo apunten hacia donde tu empresa quiere ir.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Textarea
          label="Misión y visión"
          placeholder="Pega aquí la misión y la visión de tu empresa…"
          rows={6}
          value={mission}
          onChange={(e) => setMission(e.target.value)}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>o si la tienes en un archivo:</span>
          <Button variant="secondary" size="sm" leadingIcon={<I.doc/>} onClick={() => fileRef.current && fileRef.current.click()}>
            {docName ? docName : 'Cargar documento'}
          </Button>
          {docName ? <span style={{ display: 'inline-flex', width: 15, height: 15, color: 'var(--brand)' }}><I.check width="15" height="15"/></span> : null}
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={(e) => e.target.files[0] && setDocName(e.target.files[0].name)} />
        </div>
      </div>

      {/* Oferta KIM — destacada pero no intrusiva */}
      <Card padding="md" style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--surface)', border: '1px solid var(--border-default)' }}>
        <KimOrb />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>¿No la tienen definida?</div>
          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 2 }}>KIM puede ayudarte a descubrirla en una conversación de 10 minutos. Toca el orbe para empezar.</div>
        </div>
      </Card>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button variant="ghost" size="md" leadingIcon={<I.back/>} onClick={back}>Atrás</Button>
        <Button variant="primary" size="lg" trailingIcon={<I.arrow/>} onClick={next} disabled={!mission.trim() && !docName}>Continuar</Button>
        <a href="#" className="qlink" onClick={(e) => { e.preventDefault(); skip(); }} style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)', textDecoration: 'none', marginLeft: 'auto' }}>Completar después</a>
      </div>
    </div>
  );
}

/* ── Paso 3 · Confirmación ──────────────────────────────────── */
function StepConfirm({ brand, logo, mission, docName, missionSkipped, back, goTo }) {
  const [done, setDone] = useState(false);
  const missionState = mission.trim()
    ? { label: 'Misión y visión guardadas', detail: mission.trim().length > 120 ? mission.trim().slice(0, 120) + '…' : mission.trim() }
    : docName
      ? { label: 'Documento cargado', detail: docName }
      : { label: 'Pendiente', detail: 'Puedes completarla después desde Configuración, o conversarla con KIM.' };

  return (
    <div className="rise" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)' }}>Todo listo para empezar</h1>
        <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}>Así se verá empat.IA 360 con tu marca. Revisa y confirma.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
        {/* Resumen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card padding="md" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {logo
              ? <img src={logo} alt="Logo" style={{ height: 32, maxWidth: 120, objectFit: 'contain', flexShrink: 0 }} />
              : <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)', flexShrink: 0 }}><I.image width="18" height="18"/></span>}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>{logo ? 'Logo cargado' : 'Sin logo por ahora'}</div>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)', marginTop: 2 }}>{logo ? 'Aparecerá en encuestas y reportes' : 'Mostraremos el nombre de tu empresa en texto'}</div>
            </div>
            <button type="button" onClick={() => goTo(1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-flex', width: 13, height: 13 }}><I.edit width="13" height="13"/></span> Editar
            </button>
          </Card>

          <Card padding="md" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: brand, flexShrink: 0, boxShadow: '0 0 0 1px oklch(0 0 0 / 0.08) inset' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>Color de marca</div>
              <div className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', marginTop: 2 }}>{brand.toUpperCase()}</div>
            </div>
            <button type="button" onClick={() => goTo(1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-flex', width: 13, height: 13 }}><I.edit width="13" height="13"/></span> Editar
            </button>
          </Card>

          <Card padding="md" style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0 }}><I.doc width="18" height="18"/></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-semibold)' }}>Norte estratégico</span>
                {!mission.trim() && !docName ? <Badge tone="muted">Pendiente</Badge> : <Badge tone="brand" dot>Listo</Badge>}
              </div>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 3, lineHeight: 'var(--lh-normal)' }}>{missionState.detail}</div>
            </div>
            <button type="button" onClick={() => goTo(2)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-caption)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-muted)', flexShrink: 0 }}>
              <span style={{ display: 'inline-flex', width: 13, height: 13 }}><I.edit width="13" height="13"/></span> Editar
            </button>
          </Card>

          {/* Encabezado de reportes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Encabezado de tus reportes</span>
            <ReportHeaderPreview brand={brand} logo={logo} name="Tu empresa" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <Button variant="ghost" size="md" leadingIcon={<I.back/>} onClick={back}>Atrás</Button>
            <Button variant="primary" size="lg" leadingIcon={done ? <I.check/> : null} onClick={() => setDone(true)} disabled={done}>
              {done ? 'Cuenta configurada' : 'Confirmar y empezar'}
            </Button>
          </div>
        </div>

        {/* Preview encuesta */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Tu encuesta</span>
          <SurveyPreview brand={brand} logo={logo} name="Tu empresa" compact />
        </div>
      </div>
    </div>
  );
}

/* ── App ────────────────────────────────────────────────────── */
function Onboarding() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState('#4A5DA8');
  const [logo, setLogo] = useState(null);
  const [mission, setMission] = useState('');
  const [docName, setDocName] = useState(null);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ── */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 18, height: 64, padding: '0 32px', background: 'var(--surface)', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
          {logo
            ? <img src={logo} alt="Logo" style={{ height: 24, maxWidth: 110, objectFit: 'contain' }} />
            : <span style={{ fontSize: 17, fontWeight: 'var(--fw-bold)', letterSpacing: '-0.02em' }}>Tu empresa</span>}
        </div>
        <span style={{ width: 1, height: 26, background: 'var(--border-default)' }} />
        <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>Configuración de tu cuenta</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }} className="num">Paso {step} de 3</span>
      </header>

      {/* ── Stepper ── */}
      <div data-screen-label="Progreso de onboarding" style={{ padding: '28px 32px 8px' }}>
        <Stepper step={step} go={setStep} />
      </div>

      {/* ── Contenido ── */}
      <main style={{ flex: 1, width: '100%', maxWidth: 980, margin: '0 auto', padding: '36px 32px 64px' }}>
        {step === 1 ? (
          <div data-screen-label="Paso 1 — Identidad">
            <StepIdentity brand={brand} setBrand={setBrand} logo={logo} setLogo={setLogo} next={() => setStep(2)} />
          </div>
        ) : step === 2 ? (
          <div data-screen-label="Paso 2 — Norte estratégico">
            <StepMission mission={mission} setMission={setMission} docName={docName} setDocName={setDocName}
              next={() => setStep(3)} back={() => setStep(1)} skip={() => setStep(3)} />
          </div>
        ) : (
          <div data-screen-label="Paso 3 — Confirmación">
            <StepConfirm brand={brand} logo={logo} mission={mission} docName={docName} back={() => setStep(2)} goTo={setStep} />
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Onboarding />);
