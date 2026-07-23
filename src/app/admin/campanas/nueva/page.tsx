import Link from "next/link";
import { createCampaign } from "@/app/admin/campanas/nueva/actions";
import { Button } from "@/components/design-system/button";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";

type NewCampaignPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewCampaignPage({
  searchParams,
}: NewCampaignPageProps) {
  const { error } = await searchParams;

  return (
    <main className="admin-main admin-narrow">
      <Link href="/admin" className="admin-back-link">
        <Icon name="arrow-left" size={16} />
        Volver al dashboard
      </Link>
      <div className="admin-page-title">
        <p className="eyebrow">Nuevo ciclo</p>
        <h1>Crear evaluación</h1>
        <p>
          Empieza con la configuración esencial. Las competencias y preguntas se
          agregan en el siguiente paso.
        </p>
      </div>

      <Card padding="lg">
        {error ? (
          <p className="form-error" role="alert">
            No pudimos guardar el ciclo. Revisa los datos e inténtalo de nuevo.
          </p>
        ) : null}
        <form action={createCampaign} className="admin-form admin-form--grid">
          <label className="admin-form__wide">
            Nombre del ciclo
            <input
              name="name"
              placeholder="Ej.: Evaluación de liderazgo · 2026"
              required
            />
          </label>
          <label>
            Tipo de evaluación
            <select name="evaluationType" defaultValue="360">
              <option value="90">90°</option>
              <option value="180">180°</option>
              <option value="270">270°</option>
              <option value="360">360°</option>
            </select>
          </label>
          <label>
            Departamento
            <input name="department" placeholder="Todos" />
          </label>
          <fieldset className="admin-form__wide privacy-choice">
            <legend>Modo de confidencialidad</legend>
            <label>
              <input
                type="radio"
                name="confidentialityMode"
                value="anonymous"
                defaultChecked
              />
              <span>
                <strong>Anónima</strong>
                <small>
                  La identidad queda separada del contenido por arquitectura.
                </small>
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="confidentialityMode"
                value="confidential"
              />
              <span>
                <strong>Confidencial</strong>
                <small>
                  Roles autorizados pueden consultar respuestas atribuidas.
                </small>
              </span>
            </label>
          </fieldset>
          <label>
            Fecha de cierre
            <input name="endsAt" type="date" />
          </label>
          <div className="admin-form__actions admin-form__wide">
            <Link href="/admin" className="secondary-link">
              Cancelar
            </Link>
            <Button type="submit" size="lg">
              Guardar y continuar
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
