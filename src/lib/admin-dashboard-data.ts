export type CoverageSource = {
  received: number;
  expected: number;
  anonymous: boolean;
};

export type SubjectCoverage = {
  id: string;
  name: string;
  role: string;
  boss: CoverageSource;
  peer: CoverageSource;
  team: CoverageSource;
};

export type PendingEvaluator = {
  id: string;
  name: string;
  channel: "whatsapp" | "email";
  pending: number;
};

export const dashboardData = {
  organization: {
    name: "Northwind",
    primaryColor: "#4A5DA8",
  },
  user: {
    name: "Andrea Gil",
    role: "RR. HH.",
  },
  campaign: {
    name: "Evaluación de liderazgo",
    period: "Julio 2026",
    status: "Ciclo activo",
    closesLabel: "Cierra el 9 de agosto",
  },
  metrics: [
    {
      label: "Evaluadores que completaron",
      value: "23",
      detail: "de 41",
      progress: 56,
    },
    {
      label: "Respuestas recibidas",
      value: "61%",
      detail: "25 pendientes",
      progress: 61,
    },
    {
      label: "Días restantes",
      value: "5",
      detail: "Cierra el 9 de agosto",
      progress: 24,
    },
    {
      label: "Resultados listos",
      value: "9",
      detail: "de 15 evaluados",
      progress: 60,
    },
  ],
  subjects: [
    {
      id: "subject-lucia",
      name: "Lucía Fernández",
      role: "Dir. Operaciones",
      boss: { received: 1, expected: 1, anonymous: false },
      peer: { received: 4, expected: 4, anonymous: true },
      team: { received: 5, expected: 5, anonymous: true },
    },
    {
      id: "subject-marco",
      name: "Marco Ruiz",
      role: "Analista sénior",
      boss: { received: 1, expected: 1, anonymous: false },
      peer: { received: 3, expected: 3, anonymous: true },
      team: { received: 4, expected: 4, anonymous: true },
    },
    {
      id: "subject-daniela",
      name: "Daniela Soto",
      role: "Diseño de producto",
      boss: { received: 1, expected: 1, anonymous: false },
      peer: { received: 2, expected: 3, anonymous: true },
      team: { received: 4, expected: 4, anonymous: true },
    },
    {
      id: "subject-javier",
      name: "Javier Peña",
      role: "Soporte",
      boss: { received: 0, expected: 1, anonymous: false },
      peer: { received: 3, expected: 3, anonymous: true },
      team: { received: 2, expected: 5, anonymous: true },
    },
    {
      id: "subject-ana",
      name: "Ana Castillo",
      role: "Finanzas",
      boss: { received: 1, expected: 1, anonymous: false },
      peer: { received: 3, expected: 4, anonymous: true },
      team: { received: 3, expected: 3, anonymous: true },
    },
  ] satisfies SubjectCoverage[],
  pendingEvaluators: [
    {
      id: "pending-sofia",
      name: "Sofía Ibarra",
      channel: "whatsapp",
      pending: 3,
    },
    {
      id: "pending-andres",
      name: "Andrés Mora",
      channel: "email",
      pending: 1,
    },
    {
      id: "pending-elena",
      name: "Elena Bravo",
      channel: "whatsapp",
      pending: 2,
    },
  ] satisfies PendingEvaluator[],
} as const;
