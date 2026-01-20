const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, 'Request Timeout', 'Request timed out');
    }
    throw error;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error('API URL is not configured. Use mock data instead.');
  }

  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `Failed to fetch ${endpoint}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      'Network Error',
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

export function isApiAvailable(): boolean {
  return !!API_URL;
}
