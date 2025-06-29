import { api } from "@/lib/axios";
import { AdapterUser } from "next-auth/adapters";

interface UpdateUserRequest {
  id: string;
  data: Partial<AdapterUser>;
}

export const updateUserService = async ({ id, data }: UpdateUserRequest) => {
  return await api({
    method: "PATCH",
    url: `/users/${id}`,
    data,
  });
};
