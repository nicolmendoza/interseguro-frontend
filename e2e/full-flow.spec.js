import { expect, test } from '@playwright/test';

test('Calcula resultados con la matriz inicial y luego recalcula con valores seteados', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Datos de la matriz' })).toBeVisible();
  await expect(page.getByText('Matriz de entrada')).toBeVisible();
  await expect(page.getByText('Resultados')).toBeVisible();


  await page.getByTestId('process-button').click();
  await expectDefaultMatrixResults(page);


  await fillMatrix(page, [
    [11, 2, 3],
    [4, 7, 2],
    [5, 5, 3],
  ]);

  await expect(page.getByTestId('matrix-cell-0-0')).toHaveValue('11');
  await expect(page.getByTestId('matrix-cell-1-1')).toHaveValue('7');
  await expect(page.getByTestId('matrix-cell-2-2')).toHaveValue('3');

  await page.getByTestId('process-button').click();
  await expectEditedMatrixResults(page);
});

async function expectDefaultMatrixResults(page) {

  await expect(page.getByTestId('q-output')).toContainText('0.8571428571');
  await expect(page.getByTestId('r-output')).toContainText('174.999999');
  await expect(page.getByTestId('stats-output')).toContainText('"max": 174.999999');
  await expect(page.getByTestId('stats-output')).toContainText('"min": -69.9999999948');
  await expect(page.getByTestId('stats-output')).toContainText('"hasDiagonalMatrix": false');
  await expect(page.getByTestId('rotated-output')).toContainText('-4');
}

async function expectEditedMatrixResults(page) {

  await expect(page.getByTestId('q-output')).toContainText('0.8642416215');
  await expect(page.getByTestId('r-output')).toContainText('12.72792');
  await expect(page.getByTestId('stats-output')).toContainText('"max": 12.72792');
  await expect(page.getByTestId('stats-output')).toContainText('"min": -0.5374307731');
  await expect(page.getByTestId('stats-output')).toContainText('"hasDiagonalMatrix": false');
  await expect(page.getByTestId('rotated-output')).toContainText('5');
}

async function fillMatrix(page, matrix) {
  for (const [rowIndex, row] of matrix.entries()) {
    for (const [columnIndex, value] of row.entries()) {
      await page.getByTestId(`matrix-cell-${rowIndex}-${columnIndex}`).fill(String(value));
    }
  }
}
