import { api } from "@/lib/axios";
import { AdapterAccount } from "next-auth/adapters";

interface LinkingAccountRequest {
  data: AdapterAccount;
}

export const linkingAccountService = async ({
  data,
}: LinkingAccountRequest) => {
  return await api({
    method: "POST",
    url: "/accounts",
    data,
  });
};
