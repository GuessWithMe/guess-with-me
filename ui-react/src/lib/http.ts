import history from "lib/history";

const defaultOptions: Partial<RequestInit> = {
  credentials: "include",
};

// Implementation code where T is the returned data shape
async function http<T>(
  url: string,
  options?: RequestInit
  // @ts-ignore
): Promise<T> {
  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (response.status === 401) {
      history.push("/");
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default http;
