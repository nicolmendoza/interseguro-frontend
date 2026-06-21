import type { AnalyzeResult, Matrix, QRResult, RotationResult } from '../../domain/matrix';
import { getGoApiUrl, getNodeApiUrl } from '../config/runtimeConfig';
import { getToken } from '../auth/tokenStorage';
import { postJSON } from './httpClient';

export const sampleMatrix = [
  [12, -51, 4],
  [6, 167, -68],
  [-4, 24, -41],
]   satisfies Matrix;

export async function requestQR(matrix: Matrix): Promise<QRResult> {
  return postJSON<QRResult>(`${getGoApiUrl()}/qr`, { matrix }, { token: getToken() });
}

export async function requestRotation(matrix: Matrix): Promise<RotationResult> {
  return postJSON<RotationResult>(`${getGoApiUrl()}/rotate`, { matrix }, { token: getToken() });
}

export async function requestAnalyze(matrix: Matrix): Promise<AnalyzeResult> {
  return postJSON<AnalyzeResult>(`${getGoApiUrl()}/analyze`, { matrix }, { token: getToken() });
}

export async function requestStats(matrices: Matrix[]) {
  return postJSON(`${getNodeApiUrl()}/stats`, { matrices }, { token: getToken() });
}
