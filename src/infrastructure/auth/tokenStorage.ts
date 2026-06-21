const tokenKey = 'jwt-token';

let memoryToken = '';

export function getToken(): string {
  if (memoryToken) {
    return memoryToken;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  memoryToken = window.localStorage.getItem(tokenKey) ?? '';
  return memoryToken;
}

export function saveToken(token: string) {
  memoryToken = token;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(tokenKey, token);
  }
}
