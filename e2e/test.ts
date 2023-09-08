import { expect, test } from '@playwright/test';
import {vi} from "vitest";
import type {InjectedExtension} from "@polkadot/extension-inject/types";

const rococo = `wss%3A%2F%2Frpc.rococo.frequency.xyz`;

test('Select wallet then go to Sign up', async ({page}) => {
  const mockExtensionsList =  {
    talisman: { version: '1.8.3', enable: () => {} },
    'polkadot-js': { version: '0.44.1', enable: () => {} },
  } as any as InjectedExtension;
  await page.addInitScript(() => {
    window.injectedWeb3 = mockExtensionsList;
  });

  await page.goto('/')
  const testEntryPoint = page.getByText('Sign in (rococo WebSocket)');
  await testEntryPoint.click();

  await expect(page.getByRole('button', {name: 'Polkadot Sign in with Polkadot wallet'})).toBeVisible();
  const talismanBtn = page.getByRole('button', { name: 'Talisman Sign in with Talisman wallet'});
  await expect(talismanBtn).toBeVisible();
  await talismanBtn.click();

  await expect(page.getByText('Choose an account for your new DSNP identity:')).toBeVisible();

  expect(page.getByText('Choose Wallet')).toBeInTheDocument();
  const backBtn = page.getByRole('button', { name: 'Back' }) as HTMLButtonElement;
  expect(backBtn).toBeDisabled();

  const nextBtn = page.getByRole('button', { name: 'Next' }) as HTMLButtonElement;
  expect(nextBtn).toBeDisabled();

});
