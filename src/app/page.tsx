
import Link from "next/link";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-page__content">
        <p className="home-page__brand">empat.IA</p>
        <p className="eyebrow">Evaluaciones</p>
        <h1>Feedback más humano, desde el primer clic.</h1>
        <p className="home-page__lead">
          Esta primera versión recorre la experiencia del colaborador que recibe
          una invitación por enlace, sin login.
        </p>
        <Card padding="lg" className="home-page__demo">
          <span className="home-page__demo-icon">
            <Icon name="lock" size={22} />
          </span>
          <div>
            <strong>Invitación de demostración</strong>
            <p>
              El token se valida en el servidor y nunca se guarda en el navegador.
            </p>
          </div>
          <Link href="/evaluar/demo-valido" className="primary-link">
            Abrir evaluación
            <Icon name="chevron-right" size={18} />
          </Link>
        </Card>
      </div>
    </main>
  );
}

