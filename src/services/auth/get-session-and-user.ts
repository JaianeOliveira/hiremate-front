import { api } from "@/lib/axios";

interface GetSessionAndUserRequest {
  sessionToken: string;
}

export const getSessionAndUserService = async ({
  sessionToken,
}: GetSessionAndUserRequest) => {
  return await api({
    method: "GET",
    url: `/sessions/${sessionToken}`,
  });
};
