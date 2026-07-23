import { AppHeader } from "@/components/design-system/app-header";
import { ProgressBar } from "@/components/design-system/progress-bar";
import { Icon } from "@/components/icon";
import type {
  PublicAssignment,
  PublicQuestion,
} from "@/lib/public-invitation";

type QuestionScreenProps = {
  assignment: PublicAssignment;
  assignmentIndex: number;
  assignmentTotal: number;
  question: PublicQuestion;
  questionIndex: number;
  questionTotal: number;
  selectedScore?: number;
  advancing: boolean;
  onAnswer: (score: number) => void;
  onPrevious: () => void;
};

export function QuestionScreen({
  assignment,
  assignmentIndex,
  assignmentTotal,
  question,
  questionIndex,
  questionTotal,
  selectedScore,
  advancing,
  onAnswer,
  onPrevious,
}: QuestionScreenProps) {
  const overallProgress =
    ((assignmentIndex + (questionIndex + 1) / questionTotal) /
      assignmentTotal) *
    100;
  const questionProgress = ((questionIndex + 1) / questionTotal) * 100;

  return (
    <section className="flow-screen">
      <AppHeader
        compact
        person={assignment.subject.displayName}
        relation={assignment.relationshipLabel}
        onBack={questionIndex > 0 ? onPrevious : undefined}
        right={
          <span className="header-help" title="Selecciona la respuesta que mejor describa lo que observas">
            <Icon name="help" size={22} />
          </span>
        }
      />

      <div className="question-progress">
        <div className="question-progress__labels">
          <span>
            Evaluación {assignmentIndex + 1} de {assignmentTotal}
          </span>
          <span>
            Pregunta {questionIndex + 1} de {questionTotal}
          </span>
        </div>
        <ProgressBar
          segments={assignmentTotal}
          value={overallProgress}
          size="sm"
        />
        <ProgressBar value={questionProgress} size="sm" />
      </div>

      <div className="flow-scroll">
        <div className="question">
          <div>
            <p className="eyebrow">{question.competency}</p>
            <h1>{question.prompt}</h1>
          </div>

          <fieldset className="rating" disabled={advancing}>
            <legend className="sr-only">
              Responde en una escala de {question.scale.min} a{" "}
              {question.scale.max}
            </legend>
            <div className="rating__buttons">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  type="button"
                  key={score}
                  className={
                    selectedScore === score
                      ? "rating__button rating__button--selected"
                      : "rating__button"
                  }
                  aria-label={`${score} de 5`}
                  aria-pressed={selectedScore === score}
                  onClick={() => onAnswer(score)}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="rating__labels">
              <span>{question.scale.leftLabel}</span>
              <span>{question.scale.rightLabel}</span>
            </div>
          </fieldset>

          <div className="question__footer">
            {questionIndex > 0 ? (
              <button
                type="button"
                className="text-button"
                onClick={onPrevious}
              >
                <Icon name="arrow-left" size={15} />
                Anterior
              </button>
            ) : (
              <span />
            )}
            <span className="save-note" aria-live="polite">
              Guardado en este dispositivo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
