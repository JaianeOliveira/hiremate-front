import { api } from "@/lib/axios";
import { AdapterSession } from "next-auth/adapters";

interface UpdateSessionRequest {
  sessionToken: string;
  data: Partial<AdapterSession>;
}

export const updateSessionService = async ({
  sessionToken,
  data,
}: UpdateSessionRequest) => {
  return await api({
    method: "PATCH",
    url: `/sessions/${sessionToken}`,
    data,
  });
};
