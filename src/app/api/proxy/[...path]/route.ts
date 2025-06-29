import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: { path: string[] } };

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleProxy(req: NextRequest, { params }: RouteParams) {
  const targetUrl = `${BACKEND_BASE_URL}/${params.path.join("/")}`;

  const headers: Record<string, string> = {};
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers["cookie"] = cookie;
  }
  const authorization = req.headers.get("authorization");
  if (authorization) {
    headers["authorization"] = authorization;
  }

  // Configurações do Axios: repassa status mesmo em erro
  const config: AxiosRequestConfig = {
    headers,
    validateStatus: () => true,
  };

  // Dispara a requisição conforme o método
  let axiosResp;
  if (req.method === "GET" || req.method === "DELETE") {
    axiosResp = await axios.request({
      method: req.method,
      url: targetUrl,
      ...config,
    });
  } else {
    // POST, PATCH, PUT, etc.: repassa também o body JSON
    const body = await req.json();
    axiosResp = await axios.request({
      method: req.method,
      url: targetUrl,
      data: body,
      ...config,
    });
  }

  // Retorna ao cliente o mesmo status e o payload JSON
  return NextResponse.json(axiosResp.data, {
    status: axiosResp.status,
  });
}

// Exporta cada método para o Next.js App Router
export const GET = handleProxy;
export const POST = handleProxy;
export const PATCH = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
