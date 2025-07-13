import { api } from "@/lib/axios";

export interface DeleteApplicationRequest {
  id: string;
}

export const deletApplicationService = async ({
  id,
}: DeleteApplicationRequest) => {
  return await api.delete(`/applications/${id}`);
};
