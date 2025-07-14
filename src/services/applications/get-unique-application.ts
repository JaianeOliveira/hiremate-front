import { api } from "@/lib/axios";
import { Application } from "@/types/applications";

export interface GetUniqueApplicationRequest {
  id: string;
}

export interface GetUniqueApplicationResponse {
  data: Application;
}

export const getUniqueApplicationService = async ({
  id,
}: GetUniqueApplicationRequest) => {
  return await api.get<GetUniqueApplicationResponse>(`/applications/${id}`);
};
