import { publicApi } from "@/lib/axios";
import { AdapterUser } from "next-auth/adapters";

export const createUserService = async (user: AdapterUser) => {
  return await publicApi({
    method: "POST",
    url: "/users",
    data: user,
  });
};
