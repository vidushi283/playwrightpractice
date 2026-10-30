import { test, expect } from '../fixtures';
import { standardUser } from '../test-data/users';
import { getCredentials } from '../utils/env';

test.describe('Login', () => {
  test('standard user can log in', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.open();
    const { username, password } = getCredentials();
    await loginPage.login(username, password);

    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('invalid password shows an error', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login(standardUser.username, 'wrong');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
