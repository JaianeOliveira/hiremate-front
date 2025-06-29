import { publicApi } from "@/lib/axios";
import { AdapterAccount } from "next-auth/adapters";

interface LinkingAccountRequest {
  data: AdapterAccount;
}

export const linkingAccountService = async ({
  data,
}: LinkingAccountRequest) => {
  return await publicApi({
    method: "POST",
    url: "/accounts",
    data,
  });
};
