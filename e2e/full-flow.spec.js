import { expect, test } from '@playwright/test';

test('calculates QR, rotation and Node statistics from the UI', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Factorizacion QR' })).toBeVisible();
  await page.getByTestId('matrix-cell-0-0').fill('12');

  await page.getByTestId('process-button').click();
  await expect(page.getByTestId('status')).toHaveText('Matriz procesada por Go y Node.');
  await expect(page.getByTestId('q-output')).toContainText('0.8571428571');
  await expect(page.getByTestId('r-output')).toContainText('174.999');
  await expect(page.getByTestId('stats-output')).toContainText('"max"');
  await expect(page.getByTestId('stats-output')).toContainText('"hasDiagonalMatrix"');
  await expect(page.getByTestId('rotated-output')).toContainText('-4');
});
