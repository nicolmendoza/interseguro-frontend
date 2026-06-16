import './styles.css';
import { requestAnalyze, requestRotation, requestToken, sampleMatrix, setToken } from './api.js';
import { formatJSON, validateMatrix } from './matrix.js';

const elements = {
  rowCount: document.querySelector('#rowCount'),
  columnCount: document.querySelector('#columnCount'),
  matrixGrid: document.querySelector('#matrixGrid'),
  processButton: document.querySelector('#processButton'),
  sampleButton: document.querySelector('#sampleButton'),
  status: document.querySelector('#status'),
  qOutput: document.querySelector('#qOutput'),
  rOutput: document.querySelector('#rOutput'),
  rotatedOutput: document.querySelector('#rotatedOutput'),
  statsOutput: document.querySelector('#statsOutput'),
};

let matrixValues = sampleMatrix.map((row) => [...row]);

syncSizeInputs();
renderMatrixGrid();

elements.sampleButton.addEventListener('click', () => {
  matrixValues = sampleMatrix.map((row) => [...row]);
  syncSizeInputs();
  renderMatrixGrid();
  setStatus('Ejemplo cargado.');
});

elements.rowCount.addEventListener('change', resizeMatrixFromControls);
elements.columnCount.addEventListener('change', resizeMatrixFromControls);

elements.processButton.addEventListener('click', async () => runAction('Matriz procesada por Go y Node.', async () => {
  const matrix = readMatrix();
  const [analysis, rotation] = await Promise.all([
    requestAnalyze(matrix),
    requestRotation(matrix),
  ]);

  elements.qOutput.textContent = formatJSON(analysis.q);
  elements.rOutput.textContent = formatJSON(analysis.r);
  elements.statsOutput.textContent = formatJSON(analysis.stats);
  elements.rotatedOutput.textContent = formatJSON(rotation.rotated);
}));

async function runAction(successMessage, action) {
  try {
    setBusy(true);
    await ensureToken();
    await action();
    setStatus(successMessage);
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    setBusy(false);
  }
}

async function ensureToken() {
  if (window.localStorage.getItem('jwt-token')) {
    setToken(window.localStorage.getItem('jwt-token'));
    return;
  }

  const result = await requestToken();
  window.localStorage.setItem('jwt-token', result.token);
  setToken(result.token);
}

function readMatrix() {
  const matrix = Array.from(elements.matrixGrid.querySelectorAll('.matrix-row')).map((row) =>
    Array.from(row.querySelectorAll('input')).map((input) => Number(input.value)),
  );

  validateMatrix(matrix);
  return matrix;
}

function renderMatrixGrid() {
  elements.matrixGrid.innerHTML = '';
  elements.matrixGrid.style.setProperty('--columns', matrixValues[0].length);

  matrixValues.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.className = 'matrix-row';

    row.forEach((value, columnIndex) => {
      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any';
      input.value = String(value);
      input.dataset.testid = `matrix-cell-${rowIndex}-${columnIndex}`;
      input.ariaLabel = `Fila ${rowIndex + 1}, columna ${columnIndex + 1}`;
      input.addEventListener('input', () => {
        matrixValues[rowIndex][columnIndex] = Number(input.value);
      });
      rowElement.append(input);
    });

    elements.matrixGrid.append(rowElement);
  });
}

function resizeMatrixFromControls() {
  const rows = clamp(Number(elements.rowCount.value), 1, 8);
  const columns = clamp(Number(elements.columnCount.value), 1, 8);
  elements.rowCount.value = String(rows);
  elements.columnCount.value = String(columns);

  matrixValues = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) => matrixValues[rowIndex]?.[columnIndex] ?? 0),
  );
  renderMatrixGrid();
}

function syncSizeInputs() {
  elements.rowCount.value = String(matrixValues.length);
  elements.columnCount.value = String(matrixValues[0].length);
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.dataset.state = isError ? 'error' : 'ok';
}

function setBusy(isBusy) {
  for (const button of document.querySelectorAll('button')) {
    button.disabled = isBusy;
  }
}
