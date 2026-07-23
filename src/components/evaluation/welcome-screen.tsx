import { AppHeader } from "@/components/design-system/app-header";
import { Avatar } from "@/components/design-system/avatar";
import { Badge } from "@/components/design-system/badge";
import { Button } from "@/components/design-system/button";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";
import type { PublicInvitation } from "@/lib/public-invitation";

type WelcomeScreenProps = {
  invitation: PublicInvitation;
  completedAssignmentIds: string[];
  onStart: () => void;
};

export function WelcomeScreen({
  invitation,
  completedAssignmentIds,
  onStart,
}: WelcomeScreenProps) {
  const pendingCount =
    invitation.assignments.length - completedAssignmentIds.length;
  const hasProgress = completedAssignmentIds.length > 0;
  const anonymous = invitation.confidentialityMode === "anonymous";

  return (
    <section className="flow-screen">
      <AppHeader
        logoSrc={invitation.organization.logoUrl}
        logoAlt={invitation.organization.displayName}
        name={invitation.organization.displayName}
      />

      <div className="flow-scroll">
        <div className="welcome">
          <p className="eyebrow">Evaluación 360°</p>
          <h1>
            {hasProgress
              ? "Tu progreso está guardado"
              : "Tu mirada puede ayudar a crecer"}
          </h1>
          <p className="welcome__lead">
            {hasProgress
              ? "Retoma justo donde lo dejaste. Tus respuestas anteriores siguen aquí."
              : "Te invitamos a compartir feedback honesto sobre las personas con las que trabajas."}
          </p>

          <Card className="privacy-card">
            <span className="privacy-card__icon">
              <Icon name="lock" size={22} />
            </span>
            <div>
              <strong>
                {anonymous
                  ? "Tus respuestas son anónimas"
                  : "Tus respuestas son confidenciales"}
              </strong>
              <p>
                {anonymous
                  ? "Tu nombre no aparece en ningún reporte. Los resultados se comparten de forma agrupada."
                  : "Tus respuestas se comparten de forma atribuida únicamente con los roles autorizados de tu organización."}
              </p>
            </div>
          </Card>

          <div className="section-heading">
            <h2>Tus evaluaciones</h2>
            <span>
              {pendingCount} {pendingCount === 1 ? "pendiente" : "pendientes"}
            </span>
          </div>

          <div className="assignment-list">
            {invitation.assignments.map((assignment) => {
              const complete = completedAssignmentIds.includes(assignment.id);

              return (
                <div className="assignment-row" key={assignment.id}>
                  <Avatar
                    name={assignment.subject.displayName}
                    size="md"
                    status={complete ? "complete" : "pending"}
                  />
                  <div className="assignment-row__copy">
                    <strong>{assignment.subject.displayName}</strong>
                    <span>{assignment.relationshipLabel}</span>
                  </div>
                  <Badge tone={complete ? "brand" : "neutral"}>
                    {complete ? "Completada" : "Pendiente"}
                  </Badge>
                </div>
              );
            })}
          </div>

          <p className="time-estimate">
            <Icon name="clock" size={16} />
            Unos 5 minutos por persona
          </p>
        </div>
      </div>

      <footer className="flow-actions">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onStart}
          trailingIcon={<Icon name="chevron-right" size={18} />}
        >
          {hasProgress ? "Retomar" : "Comenzar"}
        </Button>
      </footer>
    </section>
  );
}
