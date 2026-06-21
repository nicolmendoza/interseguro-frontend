import { getGoApiUrl } from '../config/runtimeConfig';
import { postEmpty } from '../http/httpClient';
import type { TokenResponse } from './auth.types';

export async function requestToken(): Promise<TokenResponse> {
  return postEmpty<TokenResponse>(`${getGoApiUrl()}/auth/token`);
}
