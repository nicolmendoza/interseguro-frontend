import { requestAnalyze, requestRotation } from '../infrastructure/http/matrixApiClient';
import type { Matrix } from '../domain/matrix';
import type { MatrixResult } from '@/features/matrix-challenge/matrixChallenge.types';

export async function analyzeMatrixUseCase(matrix: Matrix): Promise<MatrixResult> {
  
  const [analysis, rotation] = await Promise.all([
    requestAnalyze(matrix),
    requestRotation(matrix),
  ]);

  return {
    q: analysis.q,
    r: analysis.r,
    stats: analysis.stats,
    rotated: rotation.rotated,
  };
}
