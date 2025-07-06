import { api } from "@/lib/axios";
import { ApplicationStatusEnum } from "@/types/applications";

export interface ListCompaniesRequest {
  filters?: {
    status?: ApplicationStatusEnum[];
    isTalentPool?: boolean;
  };
}

export interface ListCompaniesResponse {
  data: string[];
}

export const listCompaniesService = async ({
  filters,
}: ListCompaniesRequest) => {
  return await api.get<ListCompaniesResponse>("/applications/companies", {
    params: {
      ...filters,
    },
  });
};
