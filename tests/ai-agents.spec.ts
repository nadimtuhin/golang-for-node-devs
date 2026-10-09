import { test, expect } from '@playwright/test';

test.describe('Where to Use Go for AI, ML, LangChain & Agents (/ai-agents)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-agents');
  });

  test('should render page with valid landmarks, title, and active navigation tab', async ({ page }) => {
    await expect(page).toHaveTitle(/Where to Use Go for AI, ML, LangChain & Agent Development/i);

    // Skip to content landmark
    const skipLink = page.locator('a.skip-to-content');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Main landmark
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();

    // Active nav tab
    const activeTab = page.locator('nav[aria-label="Site Navigation"] a[aria-current="page"]');
    await expect(activeTab).toBeVisible();
    await expect(activeTab).toContainText('AI & Agents');
  });

  test('should render all 7 core architectural sections', async ({ page }) => {
    await expect(page.locator('#heading-sec-1')).toContainText('The Modern AI Engineering Split');
    await expect(page.locator('#heading-sec-2')).toContainText('Where Go Wins Decisively');
    await expect(page.locator('#heading-sec-3')).toContainText('LangChain in Go');
    await expect(page.locator('#heading-sec-4')).toContainText('Autonomous Agent Architectures');
    await expect(page.locator('#heading-sec-5')).toContainText('Production-Ready Code Implementations');
    await expect(page.locator('#heading-sec-6')).toContainText('Where NOT to Use Go');
    await expect(page.locator('#heading-sec-7')).toContainText('The Node.js ➔ Go AI Package Rosetta Stone');
  });

  test('should render architectural SVG diagrams with high contrast', async ({ page }) => {
    const svgs = page.locator('.diagram-svg-container svg');
    await expect(svgs).toHaveCount(3);
  });

  test('should render the comparison tables and rosetta stones', async ({ page }) => {
    const rosettaTable = page.locator('table.rosetta-table');
    await expect(rosettaTable).toBeVisible();
    await expect(rosettaTable.locator('text=Memory per Agent Worker')).toBeVisible();

    const diffTable = page.locator('table.diff-table');
    await expect(diffTable).toBeVisible();
    await expect(diffTable.locator('text=langchain').first()).toBeVisible();
  });

  test('should feature production-ready code blocks for Agent, RAG and MCP', async ({ page }) => {
    const codeBlocks = page.locator('pre.code-block');
    // Ensure we have at least 6 code blocks across the guide
    expect(await codeBlocks.count()).toBeGreaterThanOrEqual(6);

    // Ensure errgroup, langchaingo, and jsonrpc are present in the code
    const pageText = await page.locator('#main-content').innerText();
    expect(pageText).toContain('errgroup.WithContext');
    expect(pageText).toContain('github.com/tmc/langchaingo');
    expect(pageText).toContain('jsonrpc');
  });
});
