import history from "lib/history";

const defaultOptions: Partial<RequestInit> = {
  credentials: "include",
};

// Implementation code where T is the returned data shape
async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...defaultOptions, ...options });

  if (response.status === 401) {
    history.push("/");
    return undefined as any;
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default http;
