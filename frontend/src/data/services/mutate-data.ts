import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: method === "DELETE" ? undefined : JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error ${method} ${url}:`, errorData);
      throw new Error(errorData.error?.message || "Request failed");
    }

    console.log("Requesting:", url.toString(), method, payload);
    console.log("Auth token:", authToken);
    console.log(response.ok);

    return method === "DELETE" ? true : await response.json();
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
}
