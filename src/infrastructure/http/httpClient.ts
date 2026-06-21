import axios, { AxiosError } from 'axios';
import type { ErrorResponse } from '@/domain/matrix';

type RequestOptions = {
  token?: string;
};

export async function postJSON<TResponse>(url: string, body: unknown, options: RequestOptions = {}): Promise<TResponse> {

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  return request<TResponse>(() => axios.post<TResponse>(url, body, { headers }));
}

export async function postEmpty<TResponse>(url: string): Promise<TResponse> {
  return request<TResponse>(() => axios.post<TResponse>(url));
}

async function request<TResponse>(operation: () => Promise<{ data: TResponse }>): Promise<TResponse> {

  try {
    const response = await operation();
    return response.data;
  } 
  catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      throw new Error(getAxiosErrorMessage(error));
    }
    throw error;
  }

}

function getAxiosErrorMessage(error: AxiosError<ErrorResponse>): string {
  return error.response?.data?.error ?? `HTTP ${error.response?.status ?? 'error'}`;
}
