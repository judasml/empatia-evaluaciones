"use server";

import type {
  SubmissionPayload,
  SubmissionResult,
} from "@/lib/public-invitation";
import { submitPublicEvaluation } from "@/lib/public-evaluations";

export async function submitEvaluation(
  token: string,
  payload: SubmissionPayload,
): Promise<SubmissionResult> {
  return submitPublicEvaluation(token, payload);
}
