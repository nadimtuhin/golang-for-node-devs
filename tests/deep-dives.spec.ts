import { test, expect } from '@playwright/test';

test.describe('Philosophy & History Guide (/philosophy)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/philosophy');
  });

  test('should render genesis origin story and Google 45-minute build catalyst', async ({ page }) => {
    await expect(page).toHaveTitle(/Philosophy|Zen of Go/i);

    const bodyText = await page.locator('#viewPhilosophy').innerText();
    expect(bodyText).toContain('Rob Pike');
    expect(bodyText).toContain('Ken Thompson');
    expect(bodyText).toContain('Robert Griesemer');
    expect(bodyText).toContain('2007');
  });

  test('should render When to Use Go and When NOT to Use Go trade-off sections', async ({ page }) => {
    const bodyText = await page.locator('#viewPhilosophy').innerText();
    expect(bodyText).toContain('When to Use Go');
    expect(bodyText).toContain('When NOT to Use Go');
  });
});

test.describe('Compilation Pipeline & Air Hot Reloading (/troubleshooting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/troubleshooting');
  });

  test('should render 5-stage SSA compilation pipeline and compiler flags', async ({ page }) => {
    await expect(page).toHaveTitle(/Diagnostics|Compilation|Troubleshooting/i);

    const bodyText = await page.locator('#viewTroubleshooting').innerText();
    expect(bodyText).toContain('SSA');
    expect(bodyText).toContain('-gcflags');
    expect(bodyText).toContain('-ldflags');
  });

  test('should render Air live reload configuration (.air.toml)', async ({ page }) => {
    const bodyText = await page.locator('#viewTroubleshooting').innerText();
    expect(bodyText).toContain('.air.toml');
    expect(bodyText).toContain('air');
  });
});

test.describe('Go Dependency Management Guide (/go-mod-vs-npm)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/go-mod-vs-npm');
  });

  test('should explain Minimal Version Selection (MVS) and go.sum cryptographic integrity', async ({ page }) => {
    await expect(page).toHaveTitle(/go\.mod/i);

    const bodyText = await page.locator('#viewModExplain').innerText();
    expect(bodyText).toContain('Minimal Version Selection');
    expect(bodyText).toContain('go.sum');
    expect(bodyText).toContain('replace');
  });

  test('should render npm vs go command comparison matrix', async ({ page }) => {
    const bodyText = await page.locator('#viewModExplain').innerText();
    expect(bodyText).toContain('npm install');
    expect(bodyText).toContain('go get');
    expect(bodyText).toContain('go mod tidy');
  });
});

test.describe('Docker Containerization Guide (/docker)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docker');
  });

  test('should render multi-stage Docker build guide and scratch container pattern', async ({ page }) => {
    await expect(page).toHaveTitle(/Docker/i);

    const bodyText = await page.locator('#viewDocker').innerText();
    expect(bodyText).toMatch(/multi-stage/i);
    expect(bodyText).toContain('scratch');
  });
});

test.describe('Fullstack Microservice Architecture (/microservice)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/microservice');
  });

  test('should render Express vs Fiber comparison and MongoDB singleton pattern', async ({ page }) => {
    await expect(page).toHaveTitle(/Microservice/i);

    const bodyText = await page.locator('#viewRepoExplorer').innerText();
    expect(bodyText).toContain('Fiber');
    expect(bodyText).toContain('mongo');
  });
});

test.describe('Common Go Pitfalls & Footguns (/pitfalls)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pitfalls');
  });

  test('should explain loop variable closures, nil interface traps, and goroutine leaks', async ({ page }) => {
    await expect(page).toHaveTitle(/Pitfalls/i);

    const bodyText = await page.locator('#viewPitfalls').innerText();
    expect(bodyText).toContain('goroutine');
    expect(bodyText).toContain('nil');
  });
});

test.describe('LeetCode in Go Guide (/leetcode)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/leetcode');
  });

  test('should render LeetCode Easy problems with complexity analysis and studio links', async ({ page }) => {
    await expect(page).toHaveTitle(/LeetCode/i);

    const bodyText = await page.locator('#viewLeetcode').innerText();
    expect(bodyText).toContain('Two Sum');
    expect(bodyText).toContain('Valid Parentheses');
  });
});

test.describe('Rosetta Syntax Cheatsheet (/cheatsheet)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cheatsheet');
  });

  test('should render side-by-side JS/TS to Go syntax mapping', async ({ page }) => {
    await expect(page).toHaveTitle(/Cheatsheet|Rosetta/i);

    const bodyText = await page.locator('#viewCheatsheet').innerText();
    expect(bodyText).toContain('JavaScript');
    expect(bodyText).toContain('Go');
  });
});
