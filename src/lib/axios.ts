import { cleanAndFormatParams } from "@/utils/clean-and-format-params";
import { pages } from "@/utils/pages";
import axios from "axios";
import { signOut } from "next-auth/react";

export const api = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.params) {
    config.params = cleanAndFormatParams(config.params);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const resp = error.response;
    if (resp) {
      const { status, data } = resp;
      const code = data?.error as string | undefined;

      if (
        status === 401 &&
        (code === "INVALID_TOKEN" || code === "TOKEN_NOT_FOUND")
      ) {
        await signOut({ callbackUrl: pages.login });
      }
    }
    return Promise.reject(error);
  }
);

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
