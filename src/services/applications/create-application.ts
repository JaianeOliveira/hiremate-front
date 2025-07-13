import { api } from "@/lib/axios";
import { CreateApplicationType } from "@/schemas/create-application.schema";

export interface CreteApplicationRequest {
  data: CreateApplicationType;
}

export const creteApplicationService = async ({
  data,
}: CreteApplicationRequest) => {
  return await api.post(`/applications`, data);
};
