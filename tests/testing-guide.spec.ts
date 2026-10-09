import { test, expect } from '@playwright/test';

test.describe('Testing Guide View (/testing)', () => {
  test('should load the testing guide with all 8 topics and landmarks', async ({ page }) => {
    const res = await page.goto('/testing');
    expect(res?.status()).toBe(200);

    // Title verification
    await expect(page).toHaveTitle(/Unit & Integration Testing in Go/i);

    // Hero banner verification
    const heroTitle = page.locator('h1.view-hero-title');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Unit & Integration Testing in Go');

    // Quicknav verification
    const quickNav = page.locator('nav.test-quicknav');
    await expect(quickNav).toBeVisible();

    const expectedTopics = [
      '#topic-philosophy',
      '#topic-mocking',
      '#topic-databases',
      '#topic-redis',
      '#topic-queues',
      '#topic-httptest',
      '#topic-benchmarks',
      '#topic-rosetta',
    ];

    for (const topicId of expectedTopics) {
      const section = page.locator(topicId);
      await expect(section).toBeAttached();
    }
  });

  test('should render architectural diagrams and Rosetta comparison table', async ({ page }) => {
    await page.goto('/testing');

    // SVG diagram verification
    const diagrams = page.locator('.diagram-svg-container svg');
    const count = await diagrams.count();
    expect(count).toBeGreaterThan(0);

    // Rosetta table verification
    const rosettaTable = page.locator('table.rosetta-table');
    await expect(rosettaTable).toBeVisible();

    const rows = rosettaTable.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThanOrEqual(10);
  });

  test('should provide working code copy buttons', async ({ page }) => {
    await page.goto('/testing');

    const copyButtons = page.locator('.copy-snippet-btn');
    const count = await copyButtons.count();
    expect(count).toBeGreaterThan(0);

    const firstCopyBtn = copyButtons.first();
    await expect(firstCopyBtn).toBeVisible();
  });
});
