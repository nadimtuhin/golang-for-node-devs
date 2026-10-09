import { test, expect } from '@playwright/test';

test.describe('Run Code Execution Functional Tests', () => {
  test('should compile and display standard output with exit 0 on default lesson', async ({ page }) => {
    await page.goto('/');

    const runBtn = page.locator('#runBtn');
    const consoleArea = page.locator('#consoleArea');
    const statusTag = page.locator('#statusTag');

    await expect(runBtn).toBeVisible();
    await expect(runBtn).toBeEnabled();

    await runBtn.click();

    // Verify status updates and execution completes successfully
    await expect(statusTag).toContainText('Exit 0', { timeout: 15000 });
    await expect(consoleArea).toContainText('User: Gopher');
    await expect(consoleArea).toContainText('Guaranteed Zero Values');
    await expect(runBtn).toBeEnabled();
  });

  test('should compile and show test cases passing when deep linked to LeetCode Two Sum', async ({ page }) => {
    await page.goto('/?chapter=lc_two_sum');

    const detailTitle = page.locator('#detailTitle');
    await expect(detailTitle).toContainText('Two Sum');

    const runBtn = page.locator('#runBtn');
    const consoleArea = page.locator('#consoleArea');
    const statusTag = page.locator('#statusTag');

    await expect(runBtn).toBeVisible();
    await expect(runBtn).toBeEnabled();

    await runBtn.click();

    await expect(statusTag).toContainText('Exit 0', { timeout: 15000 });
    await expect(consoleArea).toContainText('Input: nums = [2 7 11 15], target = 9');
    await expect(consoleArea).toContainText('Output Indices: [0 1]');
    await expect(runBtn).toBeEnabled();
  });

  test('should execute worker queue and finish with code 0 when deep linked to concurrency lesson', async ({ page }) => {
    await page.goto('/?chapter=bullmq_basic');

    const detailTitle = page.locator('#detailTitle');
    await expect(detailTitle).toContainText('BullMQ');

    const runBtn = page.locator('#runBtn');
    const consoleArea = page.locator('#consoleArea');
    const statusTag = page.locator('#statusTag');

    await expect(runBtn).toBeVisible();
    await expect(runBtn).toBeEnabled();

    await runBtn.click();

    await expect(statusTag).toContainText('Exit 0', { timeout: 15000 });
    await expect(consoleArea).toContainText('[Worker');
    await expect(consoleArea).toContainText('Sending');
    await expect(consoleArea).toContainText('All BullMQ-style background jobs completed!');
    await expect(runBtn).toBeEnabled();
  });

  test('should run code on multiple pages by navigating via studio deep links', async ({ page }) => {
    const pagesToTest = [
      {
        path: '/leetcode',
        linkSelector: 'a.action-btn[href*="/?chapter=lc_two_sum"], a:has-text("Run in Studio")',
        expectedChapter: 'lc_two_sum',
        expectedOutput: 'Output Indices',
      },
      {
        path: '/interviews',
        linkSelector: 'a.action-btn[href*="/?chapter=promise_all"], a:has-text("Try Concurrency in Studio")',
        expectedChapter: 'promise_all',
        expectedOutput: 'data',
      },
      {
        path: '/philosophy',
        linkSelector: 'a.action-btn[href*="/?chapter=philo_clear_over_clever"], a:has-text("Try in Playground")',
        expectedChapter: 'philo_clear_over_clever',
        expectedOutput: 'Clear is better than clever',
      },
    ];

    for (const { path, linkSelector, expectedChapter, expectedOutput } of pagesToTest) {
      await page.goto(path);

      const studioLink = page.locator(linkSelector).first();
      await expect(studioLink).toBeVisible();
      await studioLink.click();

      // Ensure we navigated to studio with chapter parameter
      await expect(page).toHaveURL(new RegExp(`\\/\\?chapter=${expectedChapter}`));

      const runBtn = page.locator('#runBtn');
      const consoleArea = page.locator('#consoleArea');
      const statusTag = page.locator('#statusTag');

      await expect(runBtn).toBeVisible();
      await expect(runBtn).toBeEnabled();

      await runBtn.click();

      await expect(statusTag).toContainText('Exit 0', { timeout: 15000 });
      await expect(consoleArea).toContainText(expectedOutput);
      await expect(runBtn).toBeEnabled();
    }
  });
});
