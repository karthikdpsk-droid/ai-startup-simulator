const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const defaultHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const parseJson = async (response: Response): Promise<any> => {
  const text = await response.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (_) {
    // keep raw text when JSON parse fails
  }

  if (!response.ok) {
    const message = (json?.message ?? json?.error ?? text) || response.statusText;
    throw new Error(message);
  }

  return json ?? text;
};

export const post = async <T = any>(path: string, body: any, token?: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: defaultHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return parseJson(response);
};

export const get = async <T = any>(path: string, token?: string): Promise<T> => {
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
  return parseJson(response);
};
