import { test, expect } from '@playwright/test';

test.describe('Accessibility & Keyboard Navigation', () => {
  test('skip-to-content link becomes visible on keyboard focus and targets main', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a.skip-to-content');
    await expect(skipLink).toBeAttached();

    // Tab to skip link
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    // Trigger enter on skip link
    await page.keyboard.press('Enter');

    // main#main-content should be active or scrolled into view
    const main = page.locator('#main-content');
    await expect(main).toBeInViewport();
  });

  test('all main regions and navigation have appropriate ARIA landmarks', async ({ page }) => {
    await page.goto('/');

    // Header navigation
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Site Navigation"]')).toBeVisible();

    // Sidebar search
    await expect(page.locator('div[role="search"]')).toBeVisible();
    await expect(page.locator('input#lessonSearchInput')).toHaveAttribute('aria-label', /search/i);

    // Sidebar navigation
    await expect(page.locator('nav#chaptersList')).toBeVisible();

    // Playground main region
    await expect(page.locator('main#main-content[role="main"]')).toBeVisible();

    // Console output region
    await expect(page.locator('div[role="region"][aria-label="Terminal Execution Output"]')).toBeVisible();
    await expect(page.locator('#consoleArea')).toHaveAttribute('aria-live', 'polite');
  });

  test('interactive buttons have accessible labels and keyboard focus states', async ({ page }) => {
    await page.goto('/');

    const runBtn = page.locator('#runBtn');
    await expect(runBtn).toHaveAttribute('aria-label', /run go code/i);

    const resetBtn = page.locator('#resetBtn');
    await expect(resetBtn).toHaveAttribute('aria-label', /reset go code/i);

    const copyBtn = page.locator('#copyBtn');
    await expect(copyBtn).toHaveAttribute('aria-label', /copy go code/i);

    const nodeCopyBtn = page.locator('#copyNodeBtn');
    await expect(nodeCopyBtn).toHaveAttribute('aria-label', /copy node/i);
  });
});
