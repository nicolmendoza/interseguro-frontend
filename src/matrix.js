export function parseMatrix(text) {
  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('La matriz debe ser JSON valido, por ejemplo [[1,2],[3,4]].');
  }

  validateMatrix(parsed);
  return parsed;
}

export function validateMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error('La matriz debe contener al menos una fila.');
  }
  if (!Array.isArray(matrix[0]) || matrix[0].length === 0) {
    throw new Error('La matriz debe contener al menos una columna.');
  }

  const columns = matrix[0].length;
  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== columns) {
      throw new Error('Todas las filas deben tener la misma cantidad de columnas.');
    }
    for (const value of row) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error('Todos los valores deben ser numeros finitos.');
      }
    }
  }
}

export function formatJSON(value) {
  return JSON.stringify(value, null, 2);
}
