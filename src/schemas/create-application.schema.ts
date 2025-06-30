import { ApplicationStatusEnum } from "@/types/applications";
import { z } from "zod";

export const CreateApplicationSchema = z.object({
  companyName: z.string().min(1, { message: "Campo obrigatório" }),
  jobTitle: z.string().min(1, { message: "Campo obrigatório" }),
  link: z.string().url().optional().nullish(),
  applicationDate: z.string({ message: "Campo obrigatório" }),
  status: z.nativeEnum(ApplicationStatusEnum).optional().nullish(),
  isTalentPool: z.boolean(),
  notes: z.string().optional().nullish(),
  contact: z.string().optional().nullish(),
  feedback: z.string().optional().nullish(),
});

export type CreateApplicationType = z.infer<typeof CreateApplicationSchema>;
