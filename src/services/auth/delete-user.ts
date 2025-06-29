import { api } from "@/lib/axios";

export const deleteUserService = async (id: string) => {
  return await api({
    method: "DELETE",
    url: `/users/${id}`,
  });
};
