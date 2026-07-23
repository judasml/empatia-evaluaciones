import Link from "next/link";
import { CoverageTable } from "@/components/admin/coverage-table";
import { MetricCard } from "@/components/admin/metric-card";
import { RemindersPanel } from "@/components/admin/reminders-panel";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";
import { dashboardData } from "@/lib/admin-dashboard-data";

const actions = [
  {
    icon: "plus" as const,
    title: "Crear evaluación",
    description: "Nuevo ciclo 90°, 180°, 270° o 360°",
    href: "/admin/campanas/nueva",
  },
  {
    icon: "users" as const,
    title: "Revisar cobertura",
    description: "Participación por evaluado y fuente",
    href: "#coverage",
  },
  {
    icon: "palette" as const,
    title: "Configurar marca",
    description: "Logo, wordmark y color principal",
    href: "/admin/configuracion",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="admin-main">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Panel operativo</p>
          <h1>Todo el ciclo, bajo control</h1>
          <p>
            Prioriza la participación y la cobertura antes de abrir resultados.
          </p>
        </div>
        <span className="admin-hero__date">
          {dashboardData.campaign.closesLabel}
        </span>
      </section>

      <section className="admin-actions" aria-label="Acciones principales">
        {actions.map((action) => (
          <Link href={action.href} key={action.title}>
            <Card padding="md" interactive>
              <span className="admin-action__icon">
                <Icon name={action.icon} size={24} />
              </span>
              <span>
                <strong>{action.title}</strong>
                <small>{action.description}</small>
              </span>
              <Icon name="arrow-right" size={17} />
            </Card>
          </Link>
        ))}
      </section>

      <section className="admin-metrics" aria-label="Resumen de participación">
        {dashboardData.metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <CoverageTable subjects={[...dashboardData.subjects]} />
      <RemindersPanel
        evaluators={[...dashboardData.pendingEvaluators]}
        campaignName={dashboardData.campaign.name}
      />
    </main>
  );
}
