import { test, expect } from '@playwright/test';

test.describe('Curriculum & Chapters Directory (/chapters)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chapters');
  });

  test('should render hero section with curriculum statistics', async ({ page }) => {
    await expect(page).toHaveTitle(/Complete Curriculum & Chapters Directory/i);

    const heading = page.locator('#curriculum-heading');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Go for Node.js Developers — All Chapters');

    // Verify stats bar
    const statsBar = page.locator('.curriculum-stats-bar');
    await expect(statsBar).toBeVisible();

    const lessonCount = statsBar.locator('.stat-card', { hasText: 'Coding Lessons' }).locator('.stat-number');
    await expect(lessonCount).toHaveText('56');

    const guideCount = statsBar.locator('.stat-card', { hasText: 'Architecture Guides' }).locator('.stat-number');
    await expect(guideCount).toHaveText('13');

    const runnableStat = statsBar.locator('.stat-card', { hasText: 'Browser Runnable' }).locator('.stat-number');
    await expect(runnableStat).toHaveText('100%');
  });

  test('should be vertically scrollable to reach all lessons and footer', async ({ page }) => {
    const scrollContainer = page.locator('#main-content');
    await expect(scrollContainer).toBeVisible();

    const dimensions = await scrollContainer.evaluate((el) => ({
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
    }));

    expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);

    // Scroll down 400px
    await scrollContainer.evaluate((el) => {
      el.scrollTop = 400;
    });

    const currentScrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
    expect(currentScrollTop).toBeGreaterThanOrEqual(300);
  });

  test('should render all 13 architecture guide cards with correct links', async ({ page }) => {
    const guidesSection = page.locator('section[aria-labelledby="guides-heading"]');
    await expect(guidesSection).toBeVisible();

    const guideCards = guidesSection.locator('.guide-nav-card');
    await expect(guideCards).toHaveCount(13);

    // Verify critical guide links
    const expectedGuides = [
      { href: '/testing', title: 'Unit & Integration Testing' },
      { href: '/ai', title: 'Go in the AI Era' },
      { href: '/ai-agents', title: 'AI Agents & LangChainGo' },
      { href: '/go-vs-rust', title: 'Go vs Rust Systems Guide' },
      { href: '/docker', title: 'Production Docker Containerization' },
      { href: '/interviews', title: 'Senior Go Interview Questions' },
      { href: '/go-mod-vs-npm', title: 'go.mod vs package.json' },
      { href: '/troubleshooting', title: 'Compilation & Air Hot Reload' },
      { href: '/microservice', title: 'Fullstack Microservice Architecture' },
      { href: '/philosophy', title: 'Genesis, History & The Zen of Go' },
      { href: '/pitfalls', title: 'Common Go Pitfalls & Footguns' },
      { href: '/leetcode', title: 'LeetCode in Go (JS vs Go)' },
      { href: '/cheatsheet', title: 'Rosetta Code Syntax Cheatsheet' },
    ];

    for (const guide of expectedGuides) {
      const card = guidesSection.locator(`.guide-nav-card[href="${guide.href}"]`);
      await expect(card).toBeVisible();
      await expect(card.locator('.guide-card-title')).toContainText(guide.title);
    }
  });

  test('should render all 56 interactive coding lessons grouped by part', async ({ page }) => {
    const lessonsSection = page.locator('section[aria-labelledby="lessons-heading"]');
    await expect(lessonsSection).toBeVisible();

    const lessonCards = lessonsSection.locator('.lesson-link-card');
    await expect(lessonCards).toHaveCount(56);

    // Verify part groups exist
    const partGroups = lessonsSection.locator('.curriculum-part-group');
    const partCount = await partGroups.count();
    expect(partCount).toBeGreaterThanOrEqual(5);

    // Verify first lesson card links to /chapter/basic_vars
    const firstLesson = lessonCards.first();
    await expect(firstLesson).toHaveAttribute('href', '/chapter/basic_vars');
    await expect(firstLesson.locator('.lesson-num-pill')).toHaveText('B1');
    await expect(firstLesson.locator('.lesson-try-tag')).toContainText('Run Code');
  });

  test('should navigate to specific chapter when clicking a lesson card', async ({ page }) => {
    const lessonCard = page.locator('.lesson-link-card[href="/chapter/basic_flow"]');
    await expect(lessonCard).toBeVisible();
    await lessonCard.click();

    await expect(page).toHaveURL(/\/chapter\/basic_flow/);
    await expect(page.locator('#detailTitle')).toContainText('Loops, If & Switch Expressions');
  });
});

test.describe('Canonical Chapter Dynamic Route (/chapter/[id])', () => {
  test('should directly load canonical chapter with server-rendered details', async ({ page }) => {
    await page.goto('/chapter/basic_flow');

    // Title should contain chapter name
    await expect(page).toHaveTitle(/Loops, If & Switch Expressions.*Go for Node\.js/i);

    // Detail panel matches
    await expect(page.locator('#detailTitle')).toHaveText('Loops, If & Switch Expressions');
    await expect(page.locator('#editorCurrentFile')).toContainText('Loops, If & Switch Expressions');

    // Code editor textarea initialized with chapter code
    const codeArea = page.locator('#codeArea');
    const codeContent = await codeArea.inputValue();
    expect(codeContent).toContain('package main');
    expect(codeContent).toContain('switch');
  });

  test('should compile and run code successfully on canonical chapter route', async ({ page }) => {
    await page.goto('/chapter/basic_flow');

    const runBtn = page.locator('#runBtn');
    const consoleArea = page.locator('#consoleArea');
    const statusTag = page.locator('#statusTag');

    await expect(runBtn).toBeVisible();
    await expect(runBtn).toBeEnabled();

    await runBtn.click();

    // Verify compilation output
    await expect(consoleArea).toContainText('Standard loop: 1 2 3', { timeout: 15000 });
    await expect(statusTag).toContainText(/Exit 0/);
  });

  test('should navigate sequential chapters, support top/bottom pager, and scroll to top', async ({ page }) => {
    await page.goto('/chapter/basic_vars');

    const topNextBtn = page.locator('#btnTopNextLesson');
    const topPrevBtn = page.locator('#btnTopPrevLesson');
    await expect(topNextBtn).toBeVisible();
    await expect(topPrevBtn).toBeVisible();

    const mainContent = page.locator('#main-content');
    await mainContent.evaluate(el => { el.scrollTop = 400; });
    const initialScrollY = await mainContent.evaluate(el => el.scrollTop);
    expect(initialScrollY).toBeGreaterThan(0);

    // Click Next Lesson (bottom button)
    const nextBtn = page.locator('#btnNextLesson');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page).toHaveURL(/\/chapter\/basic_funcs/);
    await expect(page.locator('#detailTitle')).toContainText('Functions & Multiple Return Values');

    // Should have scrolled to top
    const scrolledTop = await mainContent.evaluate(el => el.scrollTop);
    expect(scrolledTop).toBe(0);

    // Scroll down and click top Prev button
    await mainContent.evaluate(el => { el.scrollTop = 350; });
    await topPrevBtn.click();

    await expect(page).toHaveURL(/\/chapter\/basic_vars/);
    await expect(page.locator('#detailTitle')).toContainText('Variables, := & Zero Values');
    const resetScroll = await mainContent.evaluate(el => el.scrollTop);
    expect(resetScroll).toBe(0);
  });

  test('should filter chapters list in sidebar on canonical route', async ({ page }) => {
    await page.goto('/chapter/basic_flow');

    const searchInput = page.locator('#lessonSearchInput');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('slice');

    // Slices chapters should be visible
    const visibleLessons = page.locator('.chapter-nav-item:visible');
    const count = await visibleLessons.count();
    expect(count).toBeGreaterThan(0);

    const badge = page.locator('#sidebarCountBadge');
    await expect(badge).toContainText('Found');
  });
});
