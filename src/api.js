export const sampleMatrix = [
  [12, -51, 4],
  [6, 167, -68],
  [-4, 24, -41],
];

const runtimeConfig = window.__APP_CONFIG__ ?? {};
const goApiUrl = runtimeConfig.goApiUrl ?? import.meta.env.VITE_GO_API_URL ?? 'http://localhost:3000';
const nodeApiUrl = runtimeConfig.nodeApiUrl ?? import.meta.env.VITE_NODE_API_URL ?? 'http://localhost:3001';

let token = '';

export function setToken(value) {
  token = value;
}

export async function requestToken() {
  const response = await fetch(`${goApiUrl}/auth/token`, { method: 'POST' });
  return parseResponse(response);
}

export async function requestQR(matrix) {
  return postJSON(`${goApiUrl}/qr`, { matrix });
}

export async function requestRotation(matrix) {
  return postJSON(`${goApiUrl}/rotate`, { matrix });
}

export async function requestAnalyze(matrix) {
  return postJSON(`${goApiUrl}/analyze`, { matrix });
}

export async function requestStats(matrices) {
  return postJSON(`${nodeApiUrl}/stats`, { matrices });
}

async function postJSON(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return parseResponse(response);
}

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `HTTP ${response.status}`);
  }

  return data;
}
