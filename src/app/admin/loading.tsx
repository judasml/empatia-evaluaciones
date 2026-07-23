import { Card } from "@/components/design-system/card";

export default function AdminLoading() {
  return (
    <main className="admin-main" aria-busy="true" aria-label="Cargando dashboard">
      <div className="admin-loading__hero" />
      <section className="admin-metrics">
        {[0, 1, 2, 3].map((item) => (
          <Card key={item} className="admin-loading__card">
            <span />
            <strong />
            <small />
          </Card>
        ))}
      </section>
      <Card className="admin-loading__panel">
        <span className="sr-only">Cargando contenido</span>
      </Card>
    </main>
  );
}
