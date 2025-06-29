import { api } from "@/lib/axios";
import { AdapterSession } from "next-auth/adapters";

interface CreateSessionRequest {
  data: AdapterSession;
}

export const createSessionService = async ({ data }: CreateSessionRequest) => {
  return await api({
    method: "POST",
    url: "/sessions",
    data,
  });
};
