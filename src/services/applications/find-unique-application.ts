import { api } from "@/lib/axios";
import { Application } from "@/types/applications";

export interface FindUniqueApplicationRequest {
  id: string;
}

export interface FindUniqueApplicationResponse {
  data: Application;
}

export const findUniqueApplicationService = async ({
  id,
}: FindUniqueApplicationRequest) => {
  return await api.get<FindUniqueApplicationResponse>(`/applications/${id}`);
};
