import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm start',
      cwd: '../node-api',
      url: 'http://127.0.0.1:3001/health',
      reuseExistingServer: true,
      timeout: 120_000,
      env: {
        JWT_SECRET: 'test-secret',
        PORT: '3001',
        GO_API_URL: 'http://127.0.0.1:3000',
        NODE_API_URL: 'http://127.0.0.1:3001',
      },
    },
    {
      command: 'go run .',
      cwd: '../go-api',
      url: 'http://127.0.0.1:3000/health',
      reuseExistingServer: true,
      timeout: 120_000,
      env: {
        JWT_SECRET: 'test-secret',
        NODE_API_URL: 'http://127.0.0.1:3001',
        PORT: '3000',
      },
    },
    {
      command: 'npm run dev -- --host 127.0.0.1',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: true,
      timeout: 120_000,
      env: {
        VITE_GO_API_URL: 'http://127.0.0.1:3000',
        VITE_NODE_API_URL: 'http://127.0.0.1:3001',
      },
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
