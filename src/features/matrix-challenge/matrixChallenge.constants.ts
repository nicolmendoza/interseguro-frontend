import type { MatrixResult, StatusState } from './matrixChallenge.types';

export const emptyResult: MatrixResult = {
  q: [],
  r: [],
  stats: {},
  rotated: [],
};

export const initialStatus: StatusState = {
  message: 'Listo para enviar consultas.',
  state: 'ok',
};
