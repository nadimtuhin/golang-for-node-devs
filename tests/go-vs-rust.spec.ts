import { test, expect } from '@playwright/test';

test.describe('Go vs Rust Comparison Guide (/go-vs-rust)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/go-vs-rust');
  });

  test('should render page with valid landmarks, title, and active navigation tab', async ({ page }) => {
    await expect(page).toHaveTitle(/Go vs Rust.*Go for Node\.js Devs/i);

    // Skip to content
    const skipLink = page.locator('a.skip-to-content');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Main landmark
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();

    // Active nav tab
    const activeTab = page.locator('nav[aria-label="Site Navigation"] a[aria-current="page"]');
    await expect(activeTab).toBeVisible();
    await expect(activeTab).toContainText('Go vs Rust');
  });

  test('should render all 4 architectural SVG diagrams', async ({ page }) => {
    const svgs = page.locator('.diagram-svg-container svg');
    await expect(svgs).toHaveCount(4);
  });

  test('should render head-to-head comparison matrix table with all critical metrics', async ({ page }) => {
    const table = page.locator('table.rosetta-table');
    await expect(table).toBeVisible();

    await expect(table.locator('text=Raw CPU Performance')).toBeVisible();
    await expect(table.locator('text=Latency Predictability')).toBeVisible();
    await expect(table.locator('text=Concurrency Model')).toBeVisible();
    await expect(table.locator('text=Compilation Speed')).toBeVisible();
    await expect(table.locator('text=Type System Power')).toBeVisible();
  });

  test('should render 3-way side-by-side code comparison cards', async ({ page }) => {
    const triGrids = page.locator('.code-tri-grid');
    await expect(triGrids).toHaveCount(3);

    // Verify Go, Rust, and TypeScript cards are present in each grid
    const goHeaders = page.locator('.code-col-header.go-head');
    await expect(goHeaders).toHaveCount(3);

    const rustHeaders = page.locator('.code-col-header.rust-head');
    await expect(rustHeaders).toHaveCount(3);

    const tsHeaders = page.locator('.code-col-header.ts-head');
    await expect(tsHeaders).toHaveCount(3);
  });

  test('interactive decision engine should dynamically calculate recommendation', async ({ page }) => {
    const evalBtn = page.locator('#evaluateBtn');
    await expect(evalBtn).toBeVisible();

    const resultBox = page.locator('#recommendationResult');
    await expect(resultBox).toBeVisible();

    // Default recommendation should be Go for microservice
    const title = page.locator('#recTitle');
    await expect(title).toContainText('Go (Golang)');

    // Select engine workload and zero-latency tolerance
    await page.selectOption('#q-workload', 'engine');
    await page.selectOption('#q-latency', 'zero');
    await page.selectOption('#q-team', 'systems');

    await evalBtn.click();

    // Recommendation should flip to Rust
    await expect(title).toContainText('Rust');
  });

  test('FAQ accordions should toggle expand/collapse state', async ({ page }) => {
    const firstQaHeader = page.locator('.qa-card .qa-header').first();
    const firstQaBody = page.locator('.qa-card .qa-body').first();

    await expect(firstQaHeader).toBeVisible();
    await expect(firstQaBody).toBeVisible();

    // Click to collapse
    await firstQaHeader.click();
    await expect(firstQaBody).toBeHidden();

    // Click again to expand
    await firstQaHeader.click();
    await expect(firstQaBody).toBeVisible();
  });
});
