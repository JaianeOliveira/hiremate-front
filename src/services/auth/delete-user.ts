import { publicApi } from "@/lib/axios";

export const deleteUserService = async (id: string) => {
  return await publicApi({
    method: "DELETE",
    url: `/users/${id}`,
  });
};
