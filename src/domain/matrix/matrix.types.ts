import type { MatrixStats } from '../stats';

export type Matrix = number[][];

export type QRResult = {
  q: Matrix;
  r: Matrix;
};

export type AnalyzeResult = QRResult & {
  stats: MatrixStats;
};

export type RotationResult = {
  rotated: Matrix;
};

export type ErrorResponse = {
  error: string;
};

export type MatrixRequest = {
  matrix: Matrix;
};

export type MatricesRequest = {
  matrices: Matrix[];
};
