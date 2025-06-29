import { api } from "@/lib/axios";

interface DeleteSessionRequest {
  sessionToken: string;
}

export const deleteSessionService = async ({
  sessionToken,
}: DeleteSessionRequest) => {
  return await api({
    method: "DELETE",
    url: `/sessions/${sessionToken}`,
  });
};
