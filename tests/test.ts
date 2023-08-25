import { expect, test } from '@playwright/test';

test('sign-in page has expected h1', async ({ page }) => {
  await page.goto('/signin');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});

test('sign-up page has expected h1', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
});
