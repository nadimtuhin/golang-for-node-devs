import { test, expect } from '@playwright/test';

test.describe('Go in the AI Era Guide (/ai)', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await page.goto('/ai');
  });

  test('should render page with valid landmarks, title, and active navigation tab', async ({ page }) => {
    await expect(page).toHaveTitle(/Go in the AI Era.*Go for Node\.js Devs/i);

    // Skip to main content landmark
    const skipLink = page.locator('a.skip-to-content');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');

    // Main landmark
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();

    // Active nav tab
    const activeTab = page.locator('nav[aria-label="Site Navigation"] a[aria-current="page"]');
    await expect(activeTab).toBeVisible();
    await expect(activeTab).toContainText('AI & LLMs');
  });

  test('should display all 6 core sections with jump navigation', async ({ page }) => {
    const sectionIds = [
      '#section-landscape',
      '#section-flagships',
      '#section-gateways',
      '#section-agents',
      '#section-code',
      '#section-matrix',
    ];

    for (const id of sectionIds) {
      const section = page.locator(id);
      await expect(section).toBeAttached();
    }

    // Verify quick navigation pills exist
    const navPills = page.locator('nav[aria-label="AI Guide Topics Navigation"] a');
    await expect(navPills).toHaveCount(6);
  });

  test('should render both architectural SVG diagrams with accessibility labels', async ({ page }) => {
    const svgStack = page.locator('svg[aria-label*="Architectural diagram of modern AI stack"]');
    await expect(svgStack).toBeVisible();

    const svgStreaming = page.locator('svg[aria-label*="Comparison showing Node.js 1.2GB memory usage"]');
    await expect(svgStreaming).toBeVisible();
  });

  test('should feature all 4 flagship Go AI infrastructure case studies', async ({ page }) => {
    await expect(page.locator('text=Ollama (github.com/ollama/ollama)')).toBeVisible();
    await expect(page.locator('text=Weaviate (github.com/weaviate/weaviate)')).toBeVisible();
    await expect(page.locator('text=LocalAI (github.com/mudler/LocalAI)')).toBeVisible();
    await expect(page.locator('text=Kubernetes, KServe & GPU Control Plane')).toBeVisible();
  });

  test('should include all 4 production Go code examples with working copy buttons', async ({ page }) => {
    const codeIds = [
      'code-sse-gateway',
      'code-errgroup-agent',
      'code-ollama-sdk',
      'code-gemini-sdk',
    ];

    for (const id of codeIds) {
      const codeBlock = page.locator(`#${id}`);
      await expect(codeBlock).toBeVisible();
    }

    const copyButtons = page.locator('.copy-btn-trigger');
    await expect(copyButtons).toHaveCount(4);

    // Click the first copy button
    const firstCopyBtn = copyButtons.first();
    await firstCopyBtn.click();
    await expect(firstCopyBtn).toContainText('Copied');
  });

  test('should render the comprehensive decision matrix table comparing Python, TS, and Go', async ({ page }) => {
    const matrixTable = page.locator('#section-matrix table.rosetta-table');
    await expect(matrixTable).toBeVisible();

    // Verify key domain rows exist
    await expect(matrixTable.locator('text=Model Training & Fine-Tuning')).toBeVisible();
    await expect(matrixTable.locator('text=High-Throughput LLM Gateway & SSE Proxy')).toBeVisible();
    await expect(matrixTable.locator('text=Agentic Parallel Tool Calling')).toBeVisible();
    await expect(matrixTable.locator('text=Cluster Serving & GPU Orchestration')).toBeVisible();
  });
});
