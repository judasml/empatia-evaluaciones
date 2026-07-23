import "server-only";

import { createHash } from "node:crypto";
import { findInvitationByToken as findDemoInvitation } from "@/lib/demo-invitations";
import type {
  InvitationLookup,
  PublicInvitation,
  SubmissionPayload,
  SubmissionResult,
} from "@/lib/public-invitation";
import {
  isDemoMode,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function hashToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

function isPublicInvitation(value: unknown): value is PublicInvitation {
  if (!value || typeof value !== "object") {
    return false;
  }

  const invitation = value as Partial<PublicInvitation>;
  return Boolean(
    invitation.id &&
      (invitation.confidentialityMode === "anonymous" ||
        invitation.confidentialityMode === "confidential") &&
      invitation.organization &&
      invitation.questionnaire &&
      Array.isArray(invitation.questionnaire.questions) &&
      Array.isArray(invitation.assignments),
  );
}

function parseLookup(value: unknown): InvitationLookup {
  if (!value || typeof value !== "object") {
    return { status: "invalid" };
  }

  const lookup = value as { status?: string; invitation?: unknown };
  if (lookup.status === "valid" && isPublicInvitation(lookup.invitation)) {
    return { status: "valid", invitation: lookup.invitation };
  }

  if (
    lookup.status === "expired" ||
    lookup.status === "revoked" ||
    lookup.status === "completed"
  ) {
    return { status: lookup.status };
  }

  return { status: "invalid" };
}

export async function findInvitationByToken(
  token: string,
): Promise<InvitationLookup> {
  if (!isSupabaseConfigured()) {
    return isDemoMode()
      ? findDemoInvitation(token)
      : Promise.resolve({ status: "invalid" });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("resolve_public_invitation", {
    p_token_hash: hashToken(token),
  });

  if (error) {
    console.error("No se pudo resolver la invitación pública.", error.code);
    return { status: "invalid" };
  }

  return parseLookup(data);
}

export async function submitPublicEvaluation(
  token: string,
  payload: SubmissionPayload,
): Promise<SubmissionResult> {
  if (!isSupabaseConfigured()) {
    const demoLookup = await findDemoInvitation(token);
    return demoLookup.status === "valid"
      ? { status: "completed" }
      : { status: "unavailable" };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("submit_public_evaluation", {
    p_token_hash: hashToken(token),
    p_answers: payload.answers.map((answer) => ({
      questionId: answer.questionId,
      value: answer.value,
    })),
    p_comment: payload.comment?.trim() || null,
  });

  if (error) {
    console.error("No se pudo guardar la evaluación.", error.code);
    return {
      status: "error",
      message:
        "No pudimos guardar tus respuestas. Revisa tu conexión e inténtalo de nuevo.",
    };
  }

  const result = data as { status?: string } | null;
  return result?.status === "completed"
    ? { status: "completed" }
    : { status: "unavailable" };
}
