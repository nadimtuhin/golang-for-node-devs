import { test, expect } from '@playwright/test';

test.describe('Interactive Studio Functional Tests', () => {
  test('should load default lesson and render code editor', async ({ page }) => {
    await page.goto('/');

    // Check lesson title
    const title = page.locator('#detailTitle');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Variables, := & Zero Values');

    // CodeMirror editor should be present
    const editor = page.locator('.CodeMirror');
    await expect(editor).toBeVisible();

    // Node preview code should be present
    const nodeCode = page.locator('#detailNodeCode');
    await expect(nodeCode).toBeVisible();
    await expect(nodeCode).toContainText('let name');
  });

  test('should deep link to a specific lesson via query parameter', async ({ page }) => {
    await page.goto('/?chapter=lc_two_sum');

    // Should load LeetCode Two Sum
    const title = page.locator('#detailTitle');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Two Sum');

    // Tag should reflect Part 8 / LeetCode
    const tag = page.locator('#detailPartTag');
    await expect(tag).toContainText('LeetCode');

    // Active item in sidebar should match
    const activeItem = page.locator('.chapter-nav-item.active');
    await expect(activeItem).toBeVisible();
    await expect(activeItem).toHaveAttribute('data-id', 'lc_two_sum');
  });

  test('should filter lessons using sidebar search', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('#lessonSearchInput');
    await expect(searchInput).toBeVisible();

    // Type 'mongo' in search
    await searchInput.fill('mongo');

    // Items matching mongo should remain visible
    const matchingItem = page.locator('.chapter-nav-item[data-id="mongo_singleton"]');
    await expect(matchingItem).toBeVisible();

    // Non-matching items should be hidden
    const nonMatchingItem = page.locator('.chapter-nav-item[data-id="basic_vars"]');
    await expect(nonMatchingItem).toBeHidden();

    // Clear search using the clear button
    const clearBtn = page.locator('#clearSearchBtn');
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();

    await expect(searchInput).toHaveValue('');
    await expect(nonMatchingItem).toBeVisible();
  });

  test('should navigate sequential lessons with next and previous buttons', async ({ page }) => {
    await page.goto('/?chapter=basic_vars');

    const title = page.locator('#detailTitle');
    await expect(title).toContainText('Variables, := & Zero Values');

    // Click Next Lesson
    const nextBtn = page.locator('#btnNextLesson');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // URL should update to next chapter
    await expect(page).toHaveURL(/((\/\?chapter=)|(\/chapter\/))basic_funcs/);
    await expect(title).toContainText('Functions & Multiple Return Values');

    // Click Prev Lesson
    const prevBtn = page.locator('#btnPrevLesson');
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();

    await expect(page).toHaveURL(/((\/\?chapter=)|(\/chapter\/))basic_vars/);
    await expect(title).toContainText('Variables, := & Zero Values');
  });

  test('should trigger copy actions without errors and update status pill', async ({ page }) => {
    await page.goto('/');

    const copyBtn = page.locator('#copyBtn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(page.locator('#statusTag')).toContainText('Copied Go Code');

    const copyNodeBtn = page.locator('#copyNodeBtn');
    await expect(copyNodeBtn).toBeVisible();
    await copyNodeBtn.click();

    await expect(page.locator('#statusTag')).toContainText('Copied Node Snippet');
  });
});
