/**
 * Playwright Configuration for Mobile Polish Tests
 *
 * Run tests with: npx playwright test
 */

const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // Base URL for the local server (Live Server)
    baseURL:
      "http://127.0.0.1:5502/DevOps-Cloud-Portfolio-Pub/Portfolio-Projects/cloudycode.dev/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Disable webServer since using Live Server
  // webServer: {
  //   command: "npx serve -l 8080",
  //   url: "http://localhost:8080",
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
