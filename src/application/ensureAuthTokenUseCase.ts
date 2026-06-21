import { requestToken } from '../infrastructure/auth/authClient';
import { getToken, saveToken } from '../infrastructure/auth/tokenStorage';

export async function ensureAuthTokenUseCase() {
  const storedToken = getToken();

  if (storedToken) {
    return storedToken;
  }

  const result = await requestToken();
  saveToken(result.token);
  return result.token;
}
