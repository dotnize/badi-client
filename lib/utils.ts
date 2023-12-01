import { API_URL } from "./config";

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: FetchOptions | undefined = { method: "GET" }
) {
  const { method, body } = options;

  // for debugging
  console.log(`Fetching: ${API_URL}${endpoint}\nMethod: ${method}\nJSON body:`);
  console.log(body);
  console.log();

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: body
        ? {
            "Content-Type": "application/json",
          }
        : undefined,
      body,
    });
    const jsonRes = await res.json();

    if (jsonRes?.error || !res.ok) {
      throw new Error(jsonRes?.message || res.statusText);
    }

    const data = jsonRes as T;

    return { data };
  } catch (err) {
    console.error(err);
    return { error: (err as Error)?.message };
  }
}
