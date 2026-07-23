import Link from "next/link";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";

type TokenStateProps = {
  status: "expired" | "revoked" | "invalid";
};

const copy = {
  expired: {
    eyebrow: "Enlace vencido",
    title: "Este enlace ya no está disponible",
    description:
      "El período para responder terminó. Si crees que debería seguir activo, pide un enlace nuevo a la persona que te invitó.",
  },
  revoked: {
    eyebrow: "Enlace no disponible",
    title: "No pudimos abrir esta invitación",
    description:
      "Por seguridad, este enlace dejó de estar activo. Pide uno nuevo a la persona que te invitó.",
  },
  invalid: {
    eyebrow: "Enlace no disponible",
    title: "No pudimos abrir esta invitación",
    description:
      "Revisa que hayas copiado el enlace completo. Si el problema continúa, pide uno nuevo a la persona que te invitó.",
  },
} as const;

export function TokenState({ status }: TokenStateProps) {
  const content = copy[status];

  return (
    <main className="state-page">
      <Card padding="lg" className="state-card">
        <span className="state-card__icon">
          <Icon name="lock" size={26} />
        </span>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <Link href="/" className="state-card__link">
          Volver al inicio
        </Link>
      </Card>
    </main>
  );
}
