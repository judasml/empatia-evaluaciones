"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/design-system/avatar";
import { Button } from "@/components/design-system/button";
import { Card } from "@/components/design-system/card";
import { Icon } from "@/components/icon";
import type { PendingEvaluator } from "@/lib/admin-dashboard-data";

type RemindersPanelProps = {
  evaluators: PendingEvaluator[];
  campaignName: string;
};

function buildMessage(evaluator: PendingEvaluator, campaignName: string) {
  const evaluations =
    evaluator.pending === 1
      ? "una evaluación pendiente"
      : `${evaluator.pending} evaluaciones pendientes`;

  return `Hola, ${evaluator.name}. Te recordamos que tienes ${evaluations} del ciclo “${campaignName}”. Puedes retomarlas desde el enlace que recibiste. Gracias por tu tiempo.`;
}

export function RemindersPanel({
  evaluators,
  campaignName,
}: RemindersPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const copyMessage = async (evaluator: PendingEvaluator) => {
    await navigator.clipboard.writeText(buildMessage(evaluator, campaignName));
    setCopiedId(evaluator.id);
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    resetTimer.current = setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <Card padding="none" className="admin-panel">
      <div className="admin-panel__heading admin-panel__heading--actions">
        <div>
          <h2>Evaluadores pendientes</h2>
          <p>
            {evaluators.length} personas aún tienen evaluaciones sin enviar.
          </p>
        </div>
        <span className="admin-privacy-note">
          <Icon name="shield" size={15} />
          Solo mostramos participación
        </span>
      </div>

      <div className="reminder-list">
        {evaluators.map((evaluator) => {
          const copied = copiedId === evaluator.id;
          return (
            <div className="reminder-row" key={evaluator.id}>
              <Avatar name={evaluator.name} size="sm" />
              <div className="reminder-row__person">
                <strong>{evaluator.name}</strong>
                <span>
                  {evaluator.pending}{" "}
                  {evaluator.pending === 1
                    ? "evaluación pendiente"
                    : "evaluaciones pendientes"}
                </span>
              </div>
              <span className="reminder-row__channel">
                <Icon
                  name={
                    evaluator.channel === "whatsapp"
                      ? "message-circle"
                      : "mail"
                  }
                  size={14}
                />
                {evaluator.channel === "whatsapp" ? "WhatsApp" : "Correo"}
              </span>
              <Button
                variant={copied ? "primary" : "secondary"}
                size="sm"
                leadingIcon={
                  copied ? (
                    <Icon name="check" size={14} />
                  ) : (
                    <Icon name="bell" size={14} />
                  )
                }
                onClick={() => copyMessage(evaluator)}
              >
                {copied ? "Mensaje copiado" : "Copiar recordatorio"}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
