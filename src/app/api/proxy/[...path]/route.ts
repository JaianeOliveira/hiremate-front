import { COOKIE_ACCESS_TOKEN } from "@/config/cookies";
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.API_URL!;

async function handleProxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetUrl = `${BACKEND_BASE_URL}/${path.join("/")}`;

  const headers: Record<string, string> = {};
  const cookie = req.headers.get("cookie");

  if (cookie) headers["cookie"] = cookie;

  const authorization = req.headers.get(COOKIE_ACCESS_TOKEN);
  if (authorization) headers[COOKIE_ACCESS_TOKEN] = authorization;

  const config: AxiosRequestConfig = {
    headers,
    validateStatus: () => true,
  };

  let axiosResp;

  if (req.method === "GET" || req.method === "DELETE") {
    axiosResp = await axios.request({
      method: req.method,
      url: targetUrl,
      ...config,
    });
  } else {
    const body = await req.json();
    axiosResp = await axios.request({
      method: req.method,
      url: targetUrl,
      data: body,
      ...config,
    });
  }

  return NextResponse.json(axiosResp.data, { status: axiosResp.status });
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PATCH = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
