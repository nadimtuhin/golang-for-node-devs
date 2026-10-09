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

  test('verifies official Go branding color tokens and contrast standards', async ({ page }) => {
    await page.goto('/');

    const tokens = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        goBlue: style.getPropertyValue('--go-blue').trim().toLowerCase(),
        goDarkCyan: style.getPropertyValue('--go-dark-cyan').trim().toLowerCase(),
        goNavy: style.getPropertyValue('--go-navy').trim().toLowerCase(),
        focusRing: style.getPropertyValue('--focus-ring').trim().toLowerCase(),
      };
    });

    expect(tokens.goBlue).toBe('#00add8');
    expect(tokens.goDarkCyan).toBe('#007d9c');
    expect(tokens.goNavy).toBe('#0b2545');
    expect(tokens.focusRing).toBe('#00add8');

    // Active tab in header should use official Go Dark Cyan (#007d9c -> rgb(0, 125, 156)) for AA contrast on white
    const activeTab = page.locator('.header-nav-scroll a.tab-toggle.active');
    const tabBg = await activeTab.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(tabBg).toBe('rgb(0, 125, 156)');
  });

  test('verifies typographical hierarchy and font families for UI and code', async ({ page }) => {
    await page.goto('/');

    const typography = await page.evaluate(() => {
      const bodyFont = getComputedStyle(document.body).fontFamily;
      const lessonTitle = document.querySelector('.lesson-title');
      const titleFont = lessonTitle ? getComputedStyle(lessonTitle).fontFamily : '';
      const codeEl = document.querySelector('.node-code');
      const codeFont = codeEl ? getComputedStyle(codeEl).fontFamily : '';
      return { bodyFont, titleFont, codeFont };
    });

    expect(typography.bodyFont).toMatch(/Plus Jakarta Sans|Inter/i);
    expect(typography.titleFont).toMatch(/Plus Jakarta Sans|Inter/i);
    expect(typography.codeFont).toMatch(/JetBrains Mono|Fira Code/i);
  });

  test('focus-visible outline uses official Go Blue (#00ADD8)', async ({ page }) => {
    await page.goto('/');

    // Tab to skip-to-content link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a.skip-to-content');
    await expect(skipLink).toBeFocused();

    const outlineColor = await skipLink.evaluate((el) => window.getComputedStyle(el).outlineColor);
    // #00add8 resolves to rgb(0, 173, 216)
    expect(outlineColor).toBe('rgb(0, 173, 216)');
  });
});
