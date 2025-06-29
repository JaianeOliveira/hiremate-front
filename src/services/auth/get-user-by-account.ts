import { publicApi } from "@/lib/axios";

interface GetUserByAccountRequest {
  provider: string;
  providerAccountId: string;
}

export const getUserByAccountService = async (
  params: GetUserByAccountRequest
) => {
  return await publicApi({
    method: "GET",
    url: `/users/by-account/${params.provider}/${params.providerAccountId}`,
  });
};
