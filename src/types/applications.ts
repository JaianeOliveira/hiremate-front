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
  SENT = "SENT", // Enviado
  INTERVIEWS_AND_TESTS = "INTERVIEWS_AND_TESTS", // Entrevistas e testes
  SUBMISSION_PENDING = "SUBMISSION_PENDING", // Candidatura pendente (ainda falta enviar)
  CULTURAL_FIT = "CULTURAL_FIT", // Fit cultural
  OFFER_RECEIVED = "OFFER_RECEIVED", // Proposta recebida
  REJECTED = "REJECTED", // Reprovado
  NO_RESPONSE = "NO_RESPONSE", // Sem resposta
  OFFER_DECLINED = "OFFER_DECLINED", // Proposta rejeitada
  POSITION_ACCEPTED = "POSITION_ACCEPTED", // Cargo aceito
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

export enum ApplicationStatusGroupEnum {
  RUNNING = "RUNNING",
  REJECTED = "REJECTED",
  ARCHIVED = "ARCHIVED",
  TALENT_POOL = "TALENT_POOl",
}

export const ApplicationStatusGroup: Record<
  ApplicationStatusGroupEnum,
  ApplicationStatusEnum[]
> = {
  [ApplicationStatusGroupEnum.RUNNING]: [
    ApplicationStatusEnum.SENT,
    ApplicationStatusEnum.INTERVIEWS_AND_TESTS,
    ApplicationStatusEnum.CULTURAL_FIT,
    ApplicationStatusEnum.OFFER_RECEIVED,
    ApplicationStatusEnum.SUBMISSION_PENDING,
  ],
  [ApplicationStatusGroupEnum.REJECTED]: [
    ApplicationStatusEnum.NO_RESPONSE,
    ApplicationStatusEnum.REJECTED,
  ],
  [ApplicationStatusGroupEnum.ARCHIVED]: [
    ApplicationStatusEnum.OFFER_DECLINED,
    ApplicationStatusEnum.POSITION_ACCEPTED,
  ],
  [ApplicationStatusGroupEnum.TALENT_POOL]: [],
};
