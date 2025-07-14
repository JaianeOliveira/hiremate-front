import { api } from "@/lib/axios";
import { CreateApplicationType } from "@/schemas/create-application.schema";

export interface EditApplicationRequest {
  id: string;
  data: Partial<CreateApplicationType>;
}

export const editApplicationService = async ({
  data,
  id,
}: EditApplicationRequest) => {
  return await api.patch(`/applications/${id}`, data);
};
