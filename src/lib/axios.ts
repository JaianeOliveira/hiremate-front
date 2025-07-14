import { cleanAndFormatParams } from "@/utils/clean-and-format-params";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.params) {
    config.params = cleanAndFormatParams(config.params);
  }
  return config;
});
