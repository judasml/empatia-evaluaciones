
import type { CSSProperties } from "react";
import { EvaluationFlow } from "@/components/evaluation/evaluation-flow";
import { TokenState } from "@/components/token-state";
import { findInvitationByToken } from "@/lib/demo-invitations";

type EvaluationPageProps = {
  params: Promise<{ token: string }>;
};

type BrandStyle = CSSProperties & {
  "--brand": string;
  "--brand-on": string;
};

export default async function EvaluationPage({ params }: EvaluationPageProps) {
  const { token } = await params;
  const lookup = await findInvitationByToken(token);

  if (lookup.status !== "valid") {
    return <TokenState status={lookup.status} />;
  }

  const brandStyle: BrandStyle = {
    "--brand": lookup.invitation.organization.brandColor,
    "--brand-on": lookup.invitation.organization.brandOnColor,
  };

  return (
    <main className="evaluation-page" style={brandStyle}>
      <div className="evaluation-shell">
        <EvaluationFlow invitation={lookup.invitation} />
      </div>
    </main>
  );
}

