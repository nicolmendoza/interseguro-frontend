import type { Matrix } from '@/domain/matrix';
import type { MatrixStats } from '@/domain/stats';

export type MatrixResult = {
  q: Matrix;
  r: Matrix;
  stats: MatrixStats;
  rotated: Matrix;
};

export type StatusState = {
  message: string;
  state: 'ok' | 'error';
};
