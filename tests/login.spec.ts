import {test,expect} from '@playwright/test';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

test('page loads with correct title and form visible', async ({ page }) => {

  // TODO 1: Assert page title contains "Swag Labs"
    await expect(page).toHaveTitle(/Swag Labs/);
// TODO 2: Assert the username input is visible
// (use getByPlaceholder — placeholder text is "Username")
    await expect(
      page.getByPlaceholder('Username')
    ).toBeVisible();
// TODO 3: Assert the login button is visible
// (use getByRole — role "button", name "Login")
    await expect(
      page.getByRole('button', { name: 'Login' })
    ).toBeVisible();
  });

test('standard user can loginto saucedemo successfully',async({page})=>{

    await expect(page).toHaveTitle(/Swag Labs/);
    //enter username and password and click login button
    // TODO 4: Fill username using getByPlaceholder
    await page.getByPlaceholder('Username').fill('standard_user');
    // TODO 5: Fill password using getByPlaceholder
    await page.getByPlaceholder('Password').fill('secret_sauce');
    // TODO 6: Click the Login button using getByRole
    await page.getByRole('button', { name: 'Login' }).click();
    //expect the user redirected to the inventory page after successful login
    // TODO 7: Assert the URL now contains "inventory.html"
    await expect(page).toHaveURL(/inventory.html/);
    // TODO 8: Assert the heading "Products" is visible (getByRole)
    //  await expect(
    //   page.getByRole('heading', { name: 'Products' })
    // ).toBeVisible();
    await expect(
       page.getByText('Products', { exact: true })
    ).toBeVisible();

});

 test('locked out user sees an error message', async ({ page }) => {

  // TODO 9: Log in with "locked_out_user" / "secret_sauce"
    await page.getByPlaceholder('Username').fill('locked_out_user');

    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    const error = page.locator('[data-test="error"]');
// TODO 10: Assert the error message is visible
// locator: page.locator('[data-test="error"]')
    await expect(error).toBeVisible();
// TODO 11: Assert the error text contains "locked out"
    await expect(error).toContainText('locked out');
  });

});

