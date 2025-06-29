import { api } from "@/lib/axios";
import { AdapterUser } from "next-auth/adapters";

export const createUserService = async (user: AdapterUser) => {
  return await api({
    method: "POST",
    url: "/users",
    data: user,
  });
};
