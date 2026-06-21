import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3002',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run dev',
      cwd: '../interseguro-node-api',
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
      cwd: '../interseguro-go-api',
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
      command: 'npm run dev',
      url: 'http://127.0.0.1:3002',
      reuseExistingServer: true,
      timeout: 120_000,
      env: {
        NEXT_PUBLIC_GO_API_URL: 'http://127.0.0.1:3000',
        NEXT_PUBLIC_NODE_API_URL: 'http://127.0.0.1:3001',
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
