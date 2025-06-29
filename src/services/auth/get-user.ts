import { publicApi } from "@/lib/axios";

interface GetUserServiceRequest {
  id?: string;
  email?: string;
}

export const getUserService = async (params: GetUserServiceRequest) => {
  const { id, email } = params;

  if (!id && !email) {
    throw new Error("Either id or email must be provided");
  }

  const queryParams = new URLSearchParams();

  if (id) {
    queryParams.append("id", id);
  }

  if (email) {
    queryParams.append("email", email);
  }
  const url = `/users/?${queryParams.toString()}`;

  return await publicApi({
    method: "GET",
    url,
  });
};
