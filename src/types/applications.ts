export type Application = {
  id: string;
  jobTitle: string;
  companyName: string;
  applicationDate: string;
  status: ApplicationStatusEnum;
  notes?: string;
  link?: string;
  contact?: string;
  feedback?: string;
  isTalentPool: boolean;
  createdAt: string;
  updatedAt: string;
  statusUpdatedAt: string;
};

export enum ApplicationStatusEnum {
  SENT, // Enviado
  INTERVIEWS_AND_TESTS, // Entrevistas e testes
  SUBMISSION_PENDING, // Candidatura pendente (ainda falta enviar)
  CULTURAL_FIT, // Fit cultural
  OFFER_RECEIVED, // Proposta recebida
  REJECTED, // Reprovado
  NO_RESPONSE, // Sem resposta
  OFFER_DECLINED, // Proposta rejeitada
  POSITION_ACCEPTED, // Cargo aceito
}

export const ApplicationStatusLabels: Record<ApplicationStatusEnum, string> = {
  [ApplicationStatusEnum.SENT]: "Enviado",
  [ApplicationStatusEnum.INTERVIEWS_AND_TESTS]: "Entrevistas e testes",
  [ApplicationStatusEnum.SUBMISSION_PENDING]: "Candidatura pendente",
  [ApplicationStatusEnum.CULTURAL_FIT]: "Fit cultural",
  [ApplicationStatusEnum.OFFER_RECEIVED]: "Proposta recebida",
  [ApplicationStatusEnum.REJECTED]: "Reprovado",
  [ApplicationStatusEnum.NO_RESPONSE]: "Sem resposta",
  [ApplicationStatusEnum.OFFER_DECLINED]: "Proposta rejeitada",
  [ApplicationStatusEnum.POSITION_ACCEPTED]: "Cargo aceito",
};

export const mockApplications: Application[] = [
  {
    id: "1",
    jobTitle: "Frontend Developer",
    companyName: "Acme Corp",
    applicationDate: "2025-06-15T10:00:00.000Z",
    status: ApplicationStatusEnum.SENT,
    notes: "Enviado currículo via site da empresa",
    link: "https://acme.jobs/frontend-developer",
    contact: "recrutamento@acme.com",
    feedback: undefined,
    isTalentPool: false,
    createdAt: "2025-06-15T10:00:00.000Z",
    updatedAt: "2025-06-15T10:00:00.000Z",
    statusUpdatedAt: "2025-06-15T10:00:00.000Z",
  },
  {
    id: "2",
    jobTitle: "Backend Engineer",
    companyName: "Globex",
    applicationDate: "2025-05-20T14:30:00.000Z",
    status: ApplicationStatusEnum.INTERVIEWS_AND_TESTS,
    notes: "Teste de código enviado, aguardando agenda",
    link: "https://careers.globex.com/backend-engineer",
    contact: "tech@globex.com",
    feedback: "Ótimo portfólio, porém precisa melhorar testes unitários",
    isTalentPool: false,
    createdAt: "2025-05-20T14:30:00.000Z",
    updatedAt: "2025-05-22T09:00:00.000Z",
    statusUpdatedAt: "2025-05-22T09:00:00.000Z",
  },
  {
    id: "3",
    jobTitle: "Fullstack Developer Intern",
    companyName: "Initech",
    applicationDate: "2025-04-10T08:15:00.000Z",
    status: ApplicationStatusEnum.NO_RESPONSE,
    notes: undefined,
    link: "https://jobs.initech.com/internships/fullstack",
    contact: undefined,
    feedback: undefined,
    isTalentPool: true,
    createdAt: "2025-04-10T08:15:00.000Z",
    updatedAt: "2025-04-10T08:15:00.000Z",
    statusUpdatedAt: "2025-04-10T08:15:00.000Z",
  },
];
