import { api } from "@/lib/axios";
import { Application, ApplicationStatusEnum } from "@/types/applications";
import { Pagination } from "@/types/pagination";

export interface ListApplicationsRequest {
  pagination?: Pagination;
  filters?: {
    status?: ApplicationStatusEnum[];
    company?: string[];
    isTalentPool?: boolean;
  };
}

export interface ListApplicationsResponse {
  data: Application[];
  pagination: Pagination;
}

export const listApplicationsService = async ({
  filters,
  pagination,
}: ListApplicationsRequest) => {
  return await api.get<ListApplicationsResponse>("/applications", {
    params: {
      ...filters,
      ...pagination,
    },
    headers: {},
  });
};
