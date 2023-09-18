import { expect, test } from '@playwright/test';
import type { InjectedExtension } from '@polkadot/extension-inject/types';

// const rococo = `wss%3A%2F%2Frpc.rococo.frequency.xyz`;

const expectStepHasTitle = async (page: any, step: string, title: string): Promise<void> => {
  const step1 = page.locator('.circle', { hasText: step });
  await expect(step1).toBeVisible();
  let step1Title = await step1.getAttribute('data-title');
  expect(step1Title).toEqual(title);
};

test('Select wallet then go to Sign up', async ({ page }) => {
  const mockExtensionsList = {
    talisman: { version: '1.8.3', enable: () => {} },
    'polkadot-js': { version: '0.44.1', enable: () => {} }
  } as any as InjectedExtension;
  await page.addInitScript(() => {
    window.injectedWeb3 = mockExtensionsList;
  });

  await page.goto('/');
  const testEntryPoint = page.getByText('Sign in (rococo WebSocket)');
  await testEntryPoint.click();

  await expect(
    page.getByRole('button', { name: 'Polkadot Sign in with Polkadot' })
  ).toBeVisible();
  const talismanBtn = page.getByRole('button', { name: 'Talisman Sign in with Talisman' });
  await expect(talismanBtn).toBeVisible();
  // await talismanBtn.click();
  // await expect(page.getByText('Choose an account for your new DSNP identity:')).toBeVisible();
  //
  // await expectStepHasTitle(page, '1', 'Select Address');
  // await expectStepHasTitle(page, '2', 'Choose Handle');
  // await expectStepHasTitle(page, '3', 'Register');
  //
  // const backBtn = page.getByRole('button', { name: 'Back' });
  // await expect(backBtn).toBeDisabled();
  //
  // const nextBtn = page.getByRole('button', { name: 'Next' });
  // await expect(nextBtn).toBeDisabled();
});
