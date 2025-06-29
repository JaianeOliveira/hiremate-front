import { api } from "@/lib/axios";

export interface ListApplicationsRequest {
  params?: Record<string, string>;
}

export const listApplicationsService = async () => {
  return await api.get("/applications");
};
