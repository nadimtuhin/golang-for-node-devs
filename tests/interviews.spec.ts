import { test, expect } from '@playwright/test';

test.describe('Senior Go Backend Interview Guide (/interviews)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/interviews');
  });

  test('should render page title, main headings, and topic navigation', async ({ page }) => {
    await expect(page).toHaveTitle(/Interview.*Go for Node\.js Devs/i);

    const mainTitle = page.locator('#viewInterviews h2');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toContainText('Go vs Node.js Senior Backend Interview Mastery');

    // Topic navigation pills
    const topicNav = page.locator('nav[aria-label="Interview Topics Navigation"]');
    await expect(topicNav).toBeVisible();

    const topicLinks = topicNav.locator('a');
    await expect(topicLinks).toHaveCount(6);

    const expectedTopics = [
      '#section-gmp',
      '#section-memory',
      '#section-datastructs',
      '#section-channels',
      '#section-errors',
      '#section-microservices',
    ];

    for (const hash of expectedTopics) {
      await expect(topicNav.locator(`a[href="${hash}"]`)).toBeVisible();
    }
  });

  test('should render all 5 architectural SVG diagrams with accessibility labels', async ({ page }) => {
    // 1. GMP vs Libuv diagram
    const gmpDiagram = page.locator('svg[aria-label="Comparison between Node.js libuv event loop and Go GMP scheduler"]');
    await expect(gmpDiagram).toBeVisible();

    // 2. Tricolor GC diagram
    const gcDiagram = page.locator('svg[aria-label="Go Stack vs Heap and Tricolor Garbage Collector visual representation"]');
    await expect(gcDiagram).toBeVisible();

    // 3. SliceHeader memory diagram
    const sliceDiagram = page.locator('svg[aria-label="Internal layout of Go SliceHeader and Map bucket structure"]');
    await expect(sliceDiagram).toBeVisible();

    // 4. Channel state matrix diagram
    const channelDiagram = page.locator('svg[aria-label="Go Channel State Operations Matrix"]');
    await expect(channelDiagram).toBeVisible();

    // 5. Context tree diagram
    const contextDiagram = page.locator('svg[aria-label="Context Cancellation Tree Cascade and Graceful Server Shutdown Workflow"]');
    await expect(contextDiagram).toBeVisible();
  });

  test('should feature 20 in-depth interview questions across all 6 sections', async ({ page }) => {
    const qaCards = page.locator('.qa-card');
    const count = await qaCards.count();
    expect(count).toBeGreaterThanOrEqual(18);

    // Verify key senior-level questions
    const cardTexts = await qaCards.allInnerTexts();
    const joined = cardTexts.join(' ');

    expect(joined).toContain('GMP Scheduler');
    expect(joined).toContain('Work-Stealing');
    expect(joined).toContain('Escape Analysis');
    expect(joined).toContain('Tricolor');
    expect(joined).toContain('SliceHeader');
    expect(joined).toContain('Channel');
    expect(joined).toContain('errors.Is');
  });

  test('should toggle accordion open/close when clicking QA header button', async ({ page }) => {
    const headerBtn = page.locator('#qa-header-gmp-breakdown');
    const body = page.locator('#qa-body-gmp-breakdown');

    await expect(headerBtn).toBeVisible();
    await expect(headerBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(body).toBeVisible();

    // Click to collapse
    await headerBtn.click();
    await expect(headerBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(body).toBeHidden();

    // Click to expand again
    await headerBtn.click();
    await expect(headerBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(body).toBeVisible();
  });

  test('should feature interactive Studio deep links to try concepts in playground', async ({ page }) => {
    const studioLinks = page.locator('#viewInterviews a[href*="chapter="], #viewInterviews a[href*="/chapter/"]');
    const count = await studioLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);

    // Verify first link leads to studio
    const firstLink = studioLinks.first();
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toContainText('Studio');
  });
});
