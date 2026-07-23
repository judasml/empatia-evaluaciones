
"use client";

import { useEffect, useRef, useState } from "react";
import { CommentScreen } from "@/components/evaluation/comment-screen";
import { QuestionScreen } from "@/components/evaluation/question-screen";
import { TransitionScreen } from "@/components/evaluation/transition-screen";
import { WelcomeScreen } from "@/components/evaluation/welcome-screen";
import type { PublicInvitation } from "@/lib/public-invitation";

type Screen = "welcome" | "question" | "comment" | "transition";

type StoredProgress = {
  version: 1;
  invitationId: string;
  screen: Screen;
  assignmentIndex: number;
  questionIndex: number;
  answers: Record<string, number>;
  comments: Record<string, string>;
  completedAssignmentIds: string[];
};

type EvaluationFlowProps = {
  invitation: PublicInvitation;
};

const defaultProgress: Omit<StoredProgress, "invitationId"> = {
  version: 1,
  screen: "welcome",
  assignmentIndex: 0,
  questionIndex: 0,
  answers: {},
  comments: {},
  completedAssignmentIds: [],
};

function isStoredProgress(
  value: unknown,
  invitation: PublicInvitation,
): value is StoredProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const progress = value as Partial<StoredProgress>;
  const validScreens: Screen[] = [
    "welcome",
    "question",
    "comment",
    "transition",
  ];
  return (
    progress.version === 1 &&
    progress.invitationId === invitation.id &&
    Boolean(progress.screen && validScreens.includes(progress.screen)) &&
    typeof progress.assignmentIndex === "number" &&
    progress.assignmentIndex >= 0 &&
    progress.assignmentIndex < invitation.assignments.length &&
    typeof progress.questionIndex === "number" &&
    progress.questionIndex >= 0 &&
    progress.questionIndex < invitation.questionnaire.questions.length &&
    Boolean(progress.answers && typeof progress.answers === "object") &&
    Boolean(progress.comments && typeof progress.comments === "object") &&
    Array.isArray(progress.completedAssignmentIds)
  );
}

export function EvaluationFlow({ invitation }: EvaluationFlowProps) {
  const storageKey = `empatia:progress:${invitation.id}`;
  const [screen, setScreen] = useState<Screen>(defaultProgress.screen);
  const [assignmentIndex, setAssignmentIndex] = useState(
    defaultProgress.assignmentIndex,
  );
  const [questionIndex, setQuestionIndex] = useState(
    defaultProgress.questionIndex,
  );
  const [answers, setAnswers] = useState<Record<string, number>>(
    defaultProgress.answers,
  );
  const [comments, setComments] = useState<Record<string, string>>(
    defaultProgress.comments,
  );
  const [completedAssignmentIds, setCompletedAssignmentIds] = useState<string[]>(
    defaultProgress.completedAssignmentIds,
  );
  const [hydrated, setHydrated] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const assignment = invitation.assignments[assignmentIndex];
  const question = invitation.questionnaire.questions[questionIndex];
  const answerKey = `${assignment.id}:${question.id}`;

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      try {
        const serialized = window.localStorage.getItem(storageKey);
        if (serialized) {
          const stored = JSON.parse(serialized) as unknown;
          if (isStoredProgress(stored, invitation)) {
            setScreen(stored.screen);
            setAssignmentIndex(stored.assignmentIndex);
            setQuestionIndex(stored.questionIndex);
            setAnswers(stored.answers);
            setComments(stored.comments);
            setCompletedAssignmentIds(stored.completedAssignmentIds);
          }
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [invitation, storageKey]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const progress: StoredProgress = {
      version: 1,
      invitationId: invitation.id,
      screen,
      assignmentIndex,
      questionIndex,
      answers,
      comments,
      completedAssignmentIds,
    };

    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [
    answers,
    assignmentIndex,
    comments,
    completedAssignmentIds,
    hydrated,
    invitation.id,
    questionIndex,
    screen,
    storageKey,
  ]);

  useEffect(
    () => () => {
      if (advanceTimer.current) {
        clearTimeout(advanceTimer.current);
      }
    },
    [],
  );

  const start = () => {
    const firstPendingIndex = invitation.assignments.findIndex(
      (item) => !completedAssignmentIds.includes(item.id),
    );

    if (firstPendingIndex === -1) {
      setScreen("transition");
      return;
    }

    if (firstPendingIndex !== assignmentIndex) {
      setQuestionIndex(0);
    }
    setAssignmentIndex(firstPendingIndex);
    setScreen("question");
  };

  const answer = (score: number) => {
    if (advancing) {
      return;
    }

    setAnswers((current) => ({ ...current, [answerKey]: score }));
    setAdvancing(true);
    advanceTimer.current = setTimeout(() => {
      if (questionIndex + 1 < invitation.questionnaire.questions.length) {
        setQuestionIndex((current) => current + 1);
      } else {
        setScreen("comment");
      }
      setAdvancing(false);
    }, 220);
  };

  const previousQuestion = () => {
    if (screen === "comment") {
      setScreen("question");
      setQuestionIndex(invitation.questionnaire.questions.length - 1);
      return;
    }

    setQuestionIndex((current) => Math.max(0, current - 1));
  };

  const submitAssignment = () => {
    setCompletedAssignmentIds((current) =>
      current.includes(assignment.id) ? current : [...current, assignment.id],
    );
    setScreen("transition");
  };

  const continueQueue = () => {
    const nextIndex = invitation.assignments.findIndex(
      (item) => !completedAssignmentIds.includes(item.id),
    );

    if (nextIndex === -1) {
      setScreen("welcome");
      return;
    }

    setAssignmentIndex(nextIndex);
    setQuestionIndex(0);
    setScreen("question");
  };

  if (!hydrated) {
    return (
      <div className="flow-loading" role="status">
        <span className="flow-loading__mark" />
        <p>Cargando tu progreso…</p>
      </div>
    );
  }

  if (screen === "welcome") {
    return (
      <WelcomeScreen
        invitation={invitation}
        completedAssignmentIds={completedAssignmentIds}
        onStart={start}
      />
    );
  }

  if (screen === "question") {
    return (
      <QuestionScreen
        assignment={assignment}
        assignmentIndex={assignmentIndex}
        assignmentTotal={invitation.assignments.length}
        question={question}
        questionIndex={questionIndex}
        questionTotal={invitation.questionnaire.questions.length}
        selectedScore={answers[answerKey]}
        advancing={advancing}
        onAnswer={answer}
        onPrevious={previousQuestion}
      />
    );
  }

  if (screen === "comment") {
    return (
      <CommentScreen
        assignment={assignment}
        confidentialityMode={invitation.confidentialityMode}
        comment={comments[assignment.id] ?? ""}
        questionTotal={invitation.questionnaire.questions.length}
        onChange={(comment) =>
          setComments((current) => ({
            ...current,
            [assignment.id]: comment,
          }))
        }
        onPrevious={previousQuestion}
        onSubmit={submitAssignment}
      />
    );
  }

  const nextAssignment = invitation.assignments.find(
    (item) => !completedAssignmentIds.includes(item.id),
  );

  return (
    <TransitionScreen
      completedCount={completedAssignmentIds.length}
      assignmentTotal={invitation.assignments.length}
      nextAssignment={nextAssignment}
      onContinue={continueQueue}
      onLater={() => setScreen("welcome")}
    />
  );
}

