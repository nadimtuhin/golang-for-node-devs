import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', titleExpected: /Go for Node\.js/i, navName: 'Studio' },
  { path: '/ai', titleExpected: /AI|LLM/i, navName: 'AI & LLMs' },
  { path: '/ai-agents', titleExpected: /AI|Agent/i, navName: 'AI & Agents' },
  { path: '/microservice', titleExpected: /Microservice/i, navName: 'Microservice' },
  { path: '/testing', titleExpected: /Testing/i, navName: 'Testing' },
  { path: '/docker', titleExpected: /Docker/i, navName: 'Docker' },
  { path: '/leetcode', titleExpected: /LeetCode/i, navName: 'LeetCode' },
  { path: '/go-mod-vs-npm', titleExpected: /go\.mod/i, navName: 'go.mod vs npm' },
  { path: '/go-vs-rust', titleExpected: /Go vs Rust/i, navName: 'Go vs Rust' },
  { path: '/philosophy', titleExpected: /Philosophy/i, navName: 'Philosophy' },
  { path: '/interviews', titleExpected: /Interview/i, navName: 'Interviews' },
  { path: '/pitfalls', titleExpected: /Pitfalls/i, navName: 'Pitfalls' },
  { path: '/troubleshooting', titleExpected: /Diagnostics|Troubleshooting/i, navName: 'Diagnostics' },
  { path: '/cheatsheet', titleExpected: /Cheatsheet|Rosetta/i, navName: 'Rosetta' },
];

test.describe('Multi-page Routes & Navigation', () => {
  for (const route of routes) {
    test(`route "${route.path}" should render successfully with correct landmarks and active tab`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      // Check title contains expected keyword
      await expect(page).toHaveTitle(route.titleExpected);

      // Check skip-to-content landmark exists
      const skipLink = page.locator('a.skip-to-content');
      await expect(skipLink).toBeAttached();
      await expect(skipLink).toHaveAttribute('href', '#main-content');

      // Check main landmark exists
      const mainContent = page.locator('#main-content');
      await expect(mainContent).toBeVisible();

      // Check header nav landmark
      const headerNav = page.locator('nav[aria-label="Site Navigation"]');
      await expect(headerNav).toBeVisible();

      // Check active tab has aria-current="page"
      const activeLink = headerNav.locator(`a[aria-current="page"]`);
      await expect(activeLink).toBeVisible();
      await expect(activeLink).toContainText(route.navName);
    });
  }
});
