
import { AppHeader } from "@/components/design-system/app-header";
import { Button } from "@/components/design-system/button";
import { Textarea } from "@/components/design-system/textarea";
import { Icon } from "@/components/icon";
import type { PublicAssignment } from "@/lib/public-invitation";

type CommentScreenProps = {
  assignment: PublicAssignment;
  confidentialityMode: "anonymous" | "confidential";
  comment: string;
  questionTotal: number;
  onChange: (comment: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

export function CommentScreen({
  assignment,
  confidentialityMode,
  comment,
  questionTotal,
  onChange,
  onPrevious,
  onSubmit,
}: CommentScreenProps) {
  const firstName = assignment.subject.displayName.split(" ")[0];

  return (
    <section className="flow-screen">
      <AppHeader
        compact
        person={assignment.subject.displayName}
        relation={assignment.relationshipLabel}
        onBack={onPrevious}
      />

      <div className="flow-scroll">
        <div className="comment-screen">
          <p className="eyebrow eyebrow--success">
            <Icon name="check" size={14} />
            {questionTotal} de {questionTotal} respondidas
          </p>
          <h1>Para terminar: una idea concreta para {firstName}</h1>
          <p className="comment-screen__lead">
            ¿Qué debería <strong>empezar</strong> a hacer,{" "}
            <strong>dejar</strong> de hacer o <strong>seguir</strong> haciendo?
          </p>

          <Textarea
            value={comment}
            onChange={(event) => onChange(event.target.value)}
            rows={6}
            maxLength={600}
            showCount
            placeholder="Ej.: Empezar a compartir el contexto de las decisiones antes de la reunión. Dejar de asumir tareas de otros sin avisar. Seguir dando feedback tan claro y a tiempo como hasta ahora."
          />

          <p className="privacy-note">
            <Icon name="lock" size={15} />
            {confidentialityMode === "anonymous"
              ? "Este comentario se comparte de forma anónima, sin tu nombre."
              : "Este comentario se comparte de forma confidencial con los roles autorizados."}
          </p>
        </div>
      </div>

      <footer className="flow-actions flow-actions--stacked">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onSubmit}
          disabled={!comment.trim()}
        >
          Enviar evaluación
        </Button>
        <Button variant="ghost" size="md" fullWidth onClick={onSubmit}>
          Enviar sin comentario
        </Button>
      </footer>
    </section>
  );
}

