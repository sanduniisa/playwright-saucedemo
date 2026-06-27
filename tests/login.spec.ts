import {test,expect} from '@playwright/test';

test('standard user can loginto saucedemo',async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Swag Labs/);
    //enter username and password and click login button
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    //expect the user redirected to the inventory page after successful login
    await expect(page).toHaveURL(/inventory.html/);

});

test('locked out user sees an error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const error = page.locator('[data-test="error"]');

  await expect(error).toBeVisible();
  await expect(error).toContainText('Epic sadface: Sorry, this user has been locked out.');
});
