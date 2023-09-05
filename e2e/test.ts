import { expect, test } from '@playwright/test';

const rococo = `wss%3A%2F%2Frpc.rococo.frequency.xyz`;
test('sign-in page has expected h1', async ({ page }) => {
  await page.goto('/signin');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});

test('sign-up page has expected h1', async ({ page }) => {
  await page.goto('/signup/?rpc=' + rococo);
  await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
});
