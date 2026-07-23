import { useState } from "react";
import { Avatar } from "@/components/design-system/avatar";
import { Button } from "@/components/design-system/button";
import { Dialog } from "@/components/design-system/dialog";
import { ProgressBar } from "@/components/design-system/progress-bar";
import { Icon } from "@/components/icon";
import type { PublicAssignment } from "@/lib/public-invitation";

type TransitionScreenProps = {
  completedCount: number;
  assignmentTotal: number;
  nextAssignment?: PublicAssignment;
  onContinue: () => void;
  onLater: () => void;
};

export function TransitionScreen({
  completedCount,
  assignmentTotal,
  nextAssignment,
  onContinue,
  onLater,
}: TransitionScreenProps) {
  const [showLater, setShowLater] = useState(false);
  const remaining = assignmentTotal - completedCount;
  const done = remaining === 0;
  const completedLabel =
    assignmentTotal === 1
      ? "Completaste la evaluación. Gracias por tu tiempo y tu honestidad."
      : `Completaste las ${assignmentTotal} evaluaciones. Gracias por tu tiempo y tu honestidad.`;

  return (
    <section className="flow-screen">
      <div className="flow-scroll">
        <div className="transition">
          <span className="transition__check">
            <Icon name="check" size={38} />
          </span>
          <h1>{done ? "¡Has terminado!" : "Evaluación enviada"}</h1>
          <p>
            {done
              ? completedLabel
              : `Gracias. Te quedan ${remaining} de ${assignmentTotal} por completar.`}
          </p>

          <div className="transition__progress">
            <ProgressBar
              segments={assignmentTotal}
              value={(completedCount / assignmentTotal) * 100}
            />
            <span>
              {completedCount} de {assignmentTotal}{" "}
              {assignmentTotal === 1 ? "completada" : "completadas"}
            </span>
          </div>

          {!done && nextAssignment ? (
            <div className="next-assignment">
              <p className="eyebrow">Siguiente persona</p>
              <div className="next-assignment__card">
                <Avatar name={nextAssignment.subject.displayName} size="lg" />
                <div>
                  <strong>{nextAssignment.subject.displayName}</strong>
                  <span>
                    {nextAssignment.relationshipLabel} ·{" "}
                    {nextAssignment.subject.roleTitle}
                  </span>
                  <small>
                    <Icon name="clock" size={13} />
                    Unos 5 minutos
                  </small>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <footer className="flow-actions flow-actions--stacked">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onContinue}
          trailingIcon={
            done ? undefined : <Icon name="chevron-right" size={18} />
          }
        >
          {done ? "Cerrar" : "Continuar"}
        </Button>
        {!done ? (
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={() => setShowLater(true)}
          >
            Terminar más tarde
          </Button>
        ) : null}
      </footer>

      <Dialog
        open={showLater}
        onClose={() => setShowLater(false)}
        dock="bottom"
        title="¿Terminar más tarde?"
        description="Puedes volver con el mismo enlace y retomar justo donde lo dejaste. Tu progreso queda guardado."
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLater(false)}>
              Seguir ahora
            </Button>
            <Button variant="secondary" onClick={onLater}>
              Terminar
            </Button>
          </>
        }
      />
    </section>
  );
}
