/* @jsxRuntime classic */
/* empat.IA 360 — Encuesta de evaluación 270°/360°
   Prototipo interactivo de 4 pantallas conectadas. Entrada por enlace con token
   (WhatsApp), sin login. Usa las primitivas del sistema (window.Empat). */

const { AppHeader, Button, Card, Avatar, Badge, ProgressBar, Textarea, Dialog } = window.Empat;
const { useState, useRef, useEffect } = React;

/* ── Iconos (línea, agnósticos) ─────────────────────────────── */
const I = {
  lock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12.5l5 5L20 6.5"/></svg>,
  chevron: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  arrowLeft: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  help: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .8-1 1.7"/><path d="M12 17h.01"/></svg>,
};

/* ── Datos de la cola (perspectiva del evaluador) ───────────── */
const PEOPLE = [
  { name: 'Lucía Fernández', relation: 'Tu jefa',   role: 'Directora de Operaciones' },
  { name: 'Marco Ruiz',      relation: 'Tu par',    role: 'Analista de Datos' },
  { name: 'Daniela Soto',    relation: 'Tu par',    role: 'Diseñadora de Producto' },
  { name: 'Javier Peña',     relation: 'Te reporta', role: 'Especialista de Soporte' },
];

const COMPETENCIES = [
  { name: 'Comunicación', qs: [
    'Comparte la información relevante de forma clara y a tiempo.',
    'Escucha con atención antes de responder.',
    'Adapta su mensaje según con quién habla.',
    'Comunica también las malas noticias con honestidad.' ] },
  { name: 'Colaboración', qs: [
    'Ofrece ayuda a sus compañeros sin que se la pidan.',
    'Reconoce abiertamente el trabajo de las demás personas.',
    'Gestiona los desacuerdos de forma constructiva.',
    'Comparte el mérito de los logros del equipo.' ] },
  { name: 'Fiabilidad', qs: [
    'Cumple los compromisos que asume.',
    'Avisa con antelación cuando algo se va a retrasar.',
    'Mantiene la calma cuando hay presión.',
    'Se puede confiar en la calidad de su trabajo.' ] },
  { name: 'Iniciativa', qs: [
    'Propone mejoras en lugar de solo señalar problemas.',
    'Toma decisiones aunque la información sea incompleta.',
    'Asume la responsabilidad cuando algo sale mal.',
    'Impulsa que las cosas avancen sin esperar a que se lo pidan.' ] },
  { name: 'Adaptabilidad', qs: [
    'Se ajusta bien a los cambios de prioridades.',
    'Está abierta a recibir feedback y actuar sobre él.',
    'Aprende de los errores con rapidez.',
    'Prueba nuevas formas de hacer las cosas.' ] },
  { name: 'Orientación a resultados', qs: [
    'Se centra en lo que aporta más valor.',
    'Da seguimiento a los temas hasta cerrarlos.',
    'Equilibra la calidad con los plazos.',
    'Mantiene el foco en los objetivos del equipo.' ] },
];
const QUESTIONS = COMPETENCIES.flatMap((c) => c.qs.map((q) => ({ competency: c.name, text: q })));
const TOTAL_Q = QUESTIONS.length; // 24

/* Client white-label identity — the host page may override via window.__EMPAT_CLIENT.
   { name, markBg, glyph:'ring'|'diamond'|'dot', logoSrc }. Brand colour is set purely
   through the --brand CSS token, so no JS is needed to re-tint the app. */
const CLIENT = Object.assign(
  { name: 'Northwind', markBg: 'var(--text-strong)', glyph: 'ring' },
  (typeof window !== 'undefined' && window.__EMPAT_CLIENT) || {}
);

function ClientLogo({ size = 'md' }) {
  const s = size === 'lg' ? 1 : 0.82;
  const g = 15 * s;
  const glyph = CLIENT.glyph === 'diamond'
    ? <div style={{ width: g, height: g, background: 'var(--white)', transform: 'rotate(45deg)', borderRadius: 3 * s }} />
    : CLIENT.glyph === 'dot'
    ? <div style={{ width: g, height: g, borderRadius: '50%', background: 'var(--white)' }} />
    : <div style={{ width: g, height: g, borderRadius: '50%', border: `${3 * s}px solid var(--white)` }} />;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 * s }}>
      {CLIENT.logoSrc ? (
        <img src={CLIENT.logoSrc} alt={CLIENT.name} style={{ maxHeight: (size === 'lg' ? 40 : 32), maxWidth: 180, objectFit: 'contain' }} />
      ) : (
        <>
          <div style={{ width: 40 * s, height: 40 * s, borderRadius: 11 * s, background: CLIENT.markBg,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {glyph}
          </div>
          <span style={{ fontSize: (size === 'lg' ? 22 : 19), fontWeight: 'var(--fw-bold)', letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{CLIENT.name}</span>
        </>
      )}
    </div>
  );
}

/* ── Barra de estado del dispositivo ────────────────────────── */
function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <div className="icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="var(--text-strong)"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="var(--text-strong)" opacity="0.4"/><rect x="2" y="2" width="15" height="8" rx="1.5" fill="var(--text-strong)"/><rect x="21.5" y="4" width="1.5" height="4" rx="0.75" fill="var(--text-strong)" opacity="0.4"/></svg>
      </div>
    </div>
  );
}

/* ═══════════════ PANTALLA 1 · ENTRADA ═══════════════ */
function WelcomeScreen({ onStart }) {
  return (
    <div className="screen fade">
      <div className="scroll">
        <div style={{ padding: 'var(--space-8) var(--gutter) var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-8)' }}>
            <ClientLogo size="lg" />
          </div>

          <h1 style={{ margin: '0 0 10px', fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--lh-tight)' }}>
            Ayuda a tu equipo a crecer
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>
            Te han invitado a dar feedback a 4 compañeros. Tus respuestas ayudarán a que reciban una visión honesta y útil de su trabajo.
          </p>

          {/* Caja destacada de anonimato */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 'var(--space-6)',
            padding: 'var(--space-4)', background: 'var(--brand-soft)', border: '1px solid var(--brand-border)',
            borderRadius: 'var(--radius-lg)' }}>
            <span style={{ display: 'inline-flex', width: 22, height: 22, color: 'var(--brand-strong)', flexShrink: 0, marginTop: 1 }}><I.lock width="22" height="22"/></span>
            <div>
              <div style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--brand-strong)' }}>Tus respuestas son anónimas</div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--brand-strong)', opacity: 0.85, lineHeight: 'var(--lh-normal)', marginTop: 2 }}>
                Tu nombre no aparece en ningún reporte. Solo se comparten resultados agregados.
              </div>
            </div>
          </div>

          {/* Lista de pendientes */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: 'var(--space-7) 0 var(--space-3)' }}>
            <h2 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)' }}>Tus evaluaciones</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--text-muted)' }}>4 pendientes</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PEOPLE.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xs)' }}>
                <Avatar name={p.name} size="md" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{p.relation}</div>
                </div>
                <Badge tone="neutral">Pendiente</Badge>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 'var(--space-5)', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', width: 16, height: 16 }}><I.clock width="16" height="16"/></span>
            <span style={{ fontSize: 'var(--fs-body-sm)' }}>Unos 5 minutos por persona</span>
          </div>
        </div>
      </div>

      {/* Barra de acción fija */}
      <div style={{ padding: 'var(--space-4) var(--gutter) var(--space-6)', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface)' }}>
        <Button variant="primary" size="lg" fullWidth onClick={onStart} trailingIcon={<I.chevron width="18" height="18"/>}>Comenzar</Button>
      </div>
    </div>
  );
}

/* ═══════════════ PANTALLA 2 · PREGUNTA ═══════════════ */
function QuestionScreen({ evalIndex, qIndex, person, answer, onAnswer, onPrev }) {
  const q = QUESTIONS[qIndex];
  const ends = ['Nunca', 'Siempre'];
  const [picked, setPicked] = useState(answer ?? null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => { setPicked(answer ?? null); setLeaving(false); }, [qIndex, evalIndex]);

  const choose = (n) => {
    if (leaving) return;
    setPicked(n);
    setLeaving(true);
    setTimeout(() => onAnswer(n), 260);
  };

  return (
    <div className="screen">
      <AppHeader compact person={person.name} relation={person.relation}
        onBack={qIndex === 0 ? undefined : onPrev}
        right={<span style={{ display: 'inline-flex', width: 22, height: 22, color: 'var(--text-faint)' }}><I.help width="22" height="22"/></span>} />

      {/* Progreso doble */}
      <div style={{ padding: '12px var(--gutter) 14px', background: 'var(--surface)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--text-muted)' }}>Evaluación {evalIndex + 1} de {PEOPLE.length}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--brand-strong)' }}>Pregunta {qIndex + 1} de {TOTAL_Q}</span>
        </div>
        <ProgressBar segments={PEOPLE.length} value={((evalIndex + (qIndex + 1) / TOTAL_Q) / PEOPLE.length) * 100} size="sm" style={{ marginBottom: 6 }} />
        <ProgressBar value={((qIndex + 1) / TOTAL_Q) * 100} size="sm" />
      </div>

      <div className="scroll" key={qIndex}>
        <div className="fade" style={{ padding: 'var(--space-8) var(--gutter) var(--space-6)', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 12 }}>{q.competency}</div>
          <h2 style={{ margin: '0 0 4px', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--tracking-snug)', lineHeight: 'var(--lh-snug)' }}>{q.text}</h2>

          <div style={{ flex: 1 }} />

          {/* Escala 1–5 de círculos táctiles */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginTop: 'var(--space-8)' }}>
            {[1, 2, 3, 4, 5].map((n) => {
              const on = picked === n;
              return (
                <button key={n} type="button" onClick={() => choose(n)} aria-label={`${n}`}
                  style={{ width: 58, height: 58, flex: '1 1 0', maxWidth: 62, borderRadius: '50%', cursor: 'pointer',
                    border: `2px solid ${on ? 'var(--brand)' : 'var(--border-default)'}`,
                    background: on ? 'var(--brand)' : 'var(--surface)',
                    color: on ? 'var(--brand-on)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)',
                    boxShadow: on ? 'var(--shadow-sm)' : 'none',
                    transform: on ? 'scale(1.06)' : 'scale(1)',
                    transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)' }}>
                  {n}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{ends[0]}</span>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{ends[1]}</span>
          </div>

          {/* Anterior discreto */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            {qIndex > 0 ? (
              <button type="button" onClick={onPrev} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer',
                color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)', fontWeight: 'var(--fw-medium)', padding: 8 }}>
                <span style={{ display: 'inline-flex', width: 15, height: 15 }}><I.arrowLeft width="15" height="15"/></span> Anterior
              </button>
            ) : <span style={{ height: 36 }} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ PANTALLA 3 · COMENTARIO ═══════════════ */
function CommentScreen({ person, onSend, onSkip, onPrev }) {
  const [text, setText] = useState('');
  return (
    <div className="screen fade">
      <AppHeader compact person={person.name} relation={person.relation} onBack={onPrev} />
      <div className="scroll">
        <div style={{ padding: 'var(--space-7) var(--gutter) var(--space-6)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--brand-strong)', marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', width: 14, height: 14 }}><I.check width="14" height="14"/></span> 24 de 24 respondidas
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--lh-tight)' }}>
            Para terminar: una idea concreta para {person.name.split(' ')[0]}
          </h1>
          <p style={{ margin: '0 0 var(--space-5)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', lineHeight: 'var(--lh-normal)' }}>
            ¿Qué debería <strong style={{ color: 'var(--text-body)', fontWeight: 'var(--fw-semibold)' }}>empezar</strong> a hacer, <strong style={{ color: 'var(--text-body)', fontWeight: 'var(--fw-semibold)' }}>dejar</strong> de hacer o <strong style={{ color: 'var(--text-body)', fontWeight: 'var(--fw-semibold)' }}>seguir</strong> haciendo?
          </p>

          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} maxLength={600} showCount
            placeholder="Ej.: Empezar a compartir el contexto de las decisiones antes de la reunión. Dejar de asumir tareas de otros sin avisar. Seguir dando feedback tan claro y a tiempo como hasta ahora." />

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 'var(--space-4)', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', width: 15, height: 15, flexShrink: 0 }}><I.lock width="15" height="15"/></span>
            <span style={{ fontSize: 'var(--fs-caption)', lineHeight: 'var(--lh-normal)' }}>Este comentario se comparte de forma anónima, sin tu nombre.</span>
          </div>
        </div>
      </div>

      <div style={{ padding: 'var(--space-4) var(--gutter) var(--space-6)', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" size="lg" fullWidth disabled={text.trim().length === 0} onClick={onSend}>Enviar evaluación</Button>
        <Button variant="ghost" size="md" fullWidth onClick={onSkip} style={{ color: 'var(--text-muted)' }}>Enviar sin comentario</Button>
      </div>
    </div>
  );
}

/* ═══════════════ PANTALLA 4 · TRANSICIÓN ═══════════════ */
function TransitionScreen({ completed, next, onContinue, onLater }) {
  const [showLater, setShowLater] = useState(false);
  const remaining = PEOPLE.length - completed;
  const done = remaining === 0;

  return (
    <div className="screen fade">
      <div className="scroll">
        <div style={{ padding: 'var(--space-9) var(--gutter) var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '100%' }}>
          {/* Check de confirmación */}
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--brand-on)', boxShadow: '0 10px 24px -8px var(--brand)', marginBottom: 'var(--space-5)' }}>
            <I.check width="38" height="38"/>
          </div>

          <h1 style={{ margin: '0 0 6px', fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--tracking-tight)' }}>
            {done ? '¡Has terminado!' : 'Evaluación enviada'}
          </h1>
          <p style={{ margin: 0, fontSize: 'var(--fs-body-lg)', color: 'var(--text-muted)', maxWidth: 300, lineHeight: 'var(--lh-normal)' }}>
            {done ? 'Completaste las 4 evaluaciones. Gracias por tu tiempo y tu honestidad.' : `Gracias. Te quedan ${remaining} de ${PEOPLE.length} por completar.`}
          </p>

          {/* Progreso de la cola */}
          <div style={{ width: '100%', maxWidth: 300, margin: 'var(--space-6) 0' }}>
            <ProgressBar segments={PEOPLE.length} value={(completed / PEOPLE.length) * 100} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono)', color: 'var(--text-muted)', marginTop: 8 }}>{completed} de {PEOPLE.length} completadas</div>
          </div>

          {!done && next ? (
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', fontFamily: 'var(--font-mono)', marginBottom: 10, textAlign: 'left' }}>Siguiente persona</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', textAlign: 'left' }}>
                <Avatar name={next.name} size="lg" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-semibold)' }}>{next.name}</div>
                  <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{next.relation} · {next.role}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, color: 'var(--text-faint)' }}>
                    <span style={{ display: 'inline-flex', width: 13, height: 13 }}><I.clock width="13" height="13"/></span>
                    <span style={{ fontSize: 'var(--fs-caption)' }}>Unos 5 minutos</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ padding: 'var(--space-4) var(--gutter) var(--space-6)', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {done ? (
          <Button variant="primary" size="lg" fullWidth onClick={onContinue}>Cerrar</Button>
        ) : (
          <>
            <Button variant="primary" size="lg" fullWidth onClick={onContinue} trailingIcon={<I.chevron width="18" height="18"/>}>Continuar</Button>
            <Button variant="ghost" size="md" fullWidth onClick={() => setShowLater(true)} style={{ color: 'var(--text-muted)' }}>Terminar más tarde</Button>
          </>
        )}
      </div>

      <Dialog open={showLater} onClose={() => setShowLater(false)} dock="bottom"
        title="¿Terminar más tarde?"
        description="Puedes volver con el mismo enlace y retomar justo donde lo dejaste. Tu progreso queda guardado."
        footer={<>
          <Button variant="ghost" onClick={() => setShowLater(false)}>Seguir ahora</Button>
          <Button variant="secondary" onClick={onLater}>Terminar</Button>
        </>} />
    </div>
  );
}

/* ═══════════════ APP / máquina de estados ═══════════════ */
function App() {
  const [screen, setScreen] = useState('welcome'); // welcome | question | comment | transition
  const [evalIndex, setEvalIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // key `${e}-${q}` -> n
  const [completed, setCompleted] = useState(0);
  const scrollTop = () => { const s = document.querySelector('.scroll'); if (s) s.scrollTop = 0; };

  const start = () => { setScreen('question'); setEvalIndex(0); setQIndex(0); };

  const answer = (n) => {
    setAnswers((a) => ({ ...a, [`${evalIndex}-${qIndex}`]: n }));
    if (qIndex + 1 < TOTAL_Q) { setQIndex(qIndex + 1); scrollTop(); }
    else { setScreen('comment'); scrollTop(); }
  };

  const prev = () => {
    if (screen === 'comment') { setScreen('question'); setQIndex(TOTAL_Q - 1); scrollTop(); return; }
    if (qIndex > 0) { setQIndex(qIndex - 1); scrollTop(); }
  };

  const finishEval = () => { setCompleted((c) => c + 1); setScreen('transition'); scrollTop(); };

  const continueQueue = () => {
    if (completed >= PEOPLE.length) { // done -> restart demo
      setScreen('welcome'); setEvalIndex(0); setQIndex(0); setAnswers({}); setCompleted(0); scrollTop(); return;
    }
    setEvalIndex(completed); setQIndex(0); setScreen('question'); scrollTop();
  };

  const later = () => { setScreen('welcome'); scrollTop(); };

  const person = PEOPLE[evalIndex];
  const next = PEOPLE[completed];

  const screenEl = (
    <>
      {screen === 'welcome' && <WelcomeScreen onStart={start} />}
      {screen === 'question' && <QuestionScreen evalIndex={evalIndex} qIndex={qIndex} person={person}
        answer={answers[`${evalIndex}-${qIndex}`]} onAnswer={answer} onPrev={prev} />}
      {screen === 'comment' && <CommentScreen person={person} onSend={finishEval} onSkip={finishEval} onPrev={prev} />}
      {screen === 'transition' && <TransitionScreen completed={completed} next={next} onContinue={continueQueue} onLater={later} />}
    </>
  );

  // Desktop/laptop: same flow, same components — just a centred max-width card, more air.
  if ((typeof window !== 'undefined' && window.__EMPAT_SHELL) === 'desktop') {
    return <div className="deskcard">{screenEl}</div>;
  }

  return (
    <div className="device">
      <StatusBar />
      {screenEl}
      <div className="homebar" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
