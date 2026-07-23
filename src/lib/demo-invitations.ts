import type {
  InvitationLookup,
  PublicAssignment,
  PublicInvitation,
  PublicQuestion,
} from "@/lib/public-invitation";

const competencies = [
  {
    name: "Comunicación",
    prompts: [
      "Comparte la información relevante de forma clara y a tiempo.",
      "Escucha con atención antes de responder.",
      "Adapta su mensaje según con quién habla.",
      "Comunica también las malas noticias con honestidad.",
    ],
  },
  {
    name: "Colaboración",
    prompts: [
      "Ofrece ayuda a sus compañeros sin que se la pidan.",
      "Reconoce abiertamente el trabajo de las demás personas.",
      "Gestiona los desacuerdos de forma constructiva.",
      "Comparte el mérito de los logros del equipo.",
    ],
  },
  {
    name: "Fiabilidad",
    prompts: [
      "Cumple los compromisos que asume.",
      "Avisa con antelación cuando algo se va a retrasar.",
      "Mantiene la calma cuando hay presión.",
      "Se puede confiar en la calidad de su trabajo.",
    ],
  },
  {
    name: "Iniciativa",
    prompts: [
      "Propone mejoras en lugar de solo señalar problemas.",
      "Toma decisiones aunque la información sea incompleta.",
      "Asume la responsabilidad cuando algo sale mal.",
      "Impulsa que las cosas avancen sin esperar a que se lo pidan.",
    ],
  },
  {
    name: "Adaptabilidad",
    prompts: [
      "Se ajusta bien a los cambios de prioridades.",
      "Está abierta a recibir feedback y actuar sobre él.",
      "Aprende de los errores con rapidez.",
      "Prueba nuevas formas de hacer las cosas.",
    ],
  },
  {
    name: "Orientación a resultados",
    prompts: [
      "Se centra en lo que aporta más valor.",
      "Da seguimiento a los temas hasta cerrarlos.",
      "Equilibra la calidad con los plazos.",
      "Mantiene el foco en los objetivos del equipo.",
    ],
  },
] as const;

const questions: PublicQuestion[] = competencies.flatMap(
  (competency, competencyIndex) =>
    competency.prompts.map((prompt, promptIndex) => ({
      id: `q-${competencyIndex + 1}-${promptIndex + 1}`,
      competency: competency.name,
      prompt,
      scale: {
        min: 1,
        max: 5,
        leftLabel: "Nunca",
        rightLabel: "Siempre",
      },
    })),
);

const assignments: PublicAssignment[] = [
  {
    id: "assignment-lucia",
    subject: {
      displayName: "Lucía Fernández",
      roleTitle: "Directora de Operaciones",
    },
    relationshipLabel: "Tu jefa",
    status: "pending",
  },
  {
    id: "assignment-marco",
    subject: {
      displayName: "Marco Ruiz",
      roleTitle: "Analista de Datos",
    },
    relationshipLabel: "Tu par",
    status: "pending",
  },
  {
    id: "assignment-daniela",
    subject: {
      displayName: "Daniela Soto",
      roleTitle: "Diseñadora de Producto",
    },
    relationshipLabel: "Tu par",
    status: "pending",
  },
  {
    id: "assignment-javier",
    subject: {
      displayName: "Javier Peña",
      roleTitle: "Especialista de Soporte",
    },
    relationshipLabel: "Te reporta",
    status: "pending",
  },
];

const demoInvitation: PublicInvitation = {
  id: "01J-DEMO-INVITATION-NORTHWIND",
  confidentialityMode: "anonymous",
  organization: {
    displayName: "Northwind",
    brandColor: "#4A5DA8",
    brandOnColor: "#ffffff",
  },
  expiresAt: "2027-01-31T23:59:59.000Z",
  questionnaire: {
    version: 1,
    questions,
  },
  assignments: [assignments[0]],
};

export async function findInvitationByToken(
  token: string,
): Promise<InvitationLookup> {
  // Adaptador de demostración. La versión productiva reemplazará esta función por
  // una consulta server-side que compare un hash del token.
  await Promise.resolve();

  if (token === "demo-valido") {
    return { status: "valid", invitation: demoInvitation };
  }

  if (token === "demo-confidencial") {
    return {
      status: "valid",
      invitation: {
        ...demoInvitation,
        id: "01J-DEMO-CONFIDENTIAL-NORTHWIND",
        confidentialityMode: "confidential",
      },
    };
  }

  if (token === "demo-expirado") {
    return { status: "expired" };
  }

  if (token === "demo-revocado") {
    return { status: "revoked" };
  }

  return { status: "invalid" };
}
