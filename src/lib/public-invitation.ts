export type AssignmentStatus = "pending" | "in_progress" | "submitted";

export type PublicQuestion = {
  id: string;
  competency: string;
  prompt: string;
  scale: {
    min: 1;
    max: 5;
    leftLabel: string;
    rightLabel: string;
  };
};

export type PublicAssignment = {
  id: string;
  subject: {
    displayName: string;
    roleTitle: string;
  };
  relationshipLabel: string;
  status: AssignmentStatus;
};

export type PublicInvitation = {
  id: string;
  confidentialityMode: "anonymous" | "confidential";
  organization: {
    displayName: string;
    logoUrl?: string;
    brandColor: string;
    brandOnColor: string;
  };
  expiresAt: string;
  questionnaire: {
    version: number;
    questions: PublicQuestion[];
  };
  assignments: PublicAssignment[];
};

export type InvitationLookup =
  | { status: "valid"; invitation: PublicInvitation }
  | { status: "expired" | "revoked" | "invalid" };
