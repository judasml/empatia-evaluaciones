import Link from "next/link";
import { saveBranding } from "@/app/admin/configuracion/actions";
import { BrandSettingsForm } from "@/components/admin/brand-settings-form";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";

type BrandSettingsPageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function BrandSettingsPage({
  searchParams,
}: BrandSettingsPageProps) {
  const { saved, error } = await searchParams;

  return (
    <main className="admin-main admin-narrow">
      <Link href="/admin" className="admin-back-link">
        <Icon name="arrow-left" size={16} />
        Volver al dashboard
      </Link>
      <div className="admin-page-title">
        <p className="eyebrow">White-label</p>
        <h1>Tu marca, en toda la experiencia</h1>
        <p>
          Un único color controla botones, progreso y estados de éxito. El resto
          permanece cálido y neutral.
        </p>
      </div>
      {saved ? (
        <p className="form-success" role="status">
          <Icon name="check" size={16} />
          Configuración guardada.
        </p>
      ) : null}
      {error ? (
        <p className="form-error" role="alert">
          No pudimos guardar la configuración. Revisa los datos.
        </p>
      ) : null}
      <Card padding="lg">
        <BrandSettingsForm action={saveBranding} />
      </Card>
    </main>
  );
}
