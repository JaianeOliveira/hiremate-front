import { ApplicationStatusEnum } from "@/types/applications";
import { z } from "zod";

export const CreateApplicationSchema = z.object({
  companyName: z.string().min(1, { message: "Campo obrigatório" }),
  jobTitle: z.string().min(1, { message: "Campo obrigatório" }),
  link: z.string().optional(),
  applicationDate: z.date({ message: "Campo obrigatório" }),
  status: z.nativeEnum(ApplicationStatusEnum).optional(),
  isTalentPool: z.boolean(),
  notes: z.string().optional(),
  contact: z.string().optional(),
  feedback: z.string().optional(),
});

export type CreateApplicationType = z.infer<typeof CreateApplicationSchema>;
