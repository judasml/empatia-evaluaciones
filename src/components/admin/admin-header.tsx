import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { Avatar } from "@/components/design-system/avatar";
import { Badge } from "@/components/design-system/badge";
import { Icon } from "@/components/icon";
import type { AdminViewer } from "@/lib/admin-session";

type AdminHeaderProps = {
  organizationName: string;
  campaignName: string;
  campaignPeriod: string;
  viewer: AdminViewer;
};

export function AdminHeader({
  organizationName,
  campaignName,
  campaignPeriod,
  viewer,
}: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <Link href="/admin" className="admin-brand" aria-label="Ir al dashboard">
        <span className="admin-brand__mark" aria-hidden="true">
          <span />
        </span>
        <strong>{organizationName}</strong>
      </Link>
      <span className="admin-header__divider" aria-hidden="true" />
      <div className="admin-header__campaign">
        <span>
          {campaignName} · {campaignPeriod}
        </span>
        <Badge tone="brand" dot>
          Ciclo activo
        </Badge>
        {viewer.demo ? <Badge tone="muted">Modo demo</Badge> : null}
      </div>
      <nav className="admin-header__nav" aria-label="Cuenta">
        <Link
          href="/admin/configuracion"
          className="admin-icon-link"
          aria-label="Configuración"
        >
          <Icon name="settings" size={18} />
        </Link>
        <div className="admin-user">
          <span>
            {viewer.name} · {viewer.role}
          </span>
          <Avatar name={viewer.name} size="sm" />
        </div>
        <form action={signOut}>
          <button className="admin-signout" type="submit">
            Salir
          </button>
        </form>
      </nav>
    </header>
  );
}
