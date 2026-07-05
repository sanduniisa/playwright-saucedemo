import { test, expect } from '@playwright/test';

test.describe('Inventory Page', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');

    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

  });

  test('product page shows the Products heading', async ({ page }) => {
// TODO 1: Assert heading "Products" is visible using getByRole
    // await expect(
    //   page.getByRole('heading', { name: 'Products' })
    // ).toBeVisible();
    await expect(
       page.getByText('Products', { exact: true })
    ).toBeVisible();

  });

  test('can add Sauce Labs Backpack to cart', async ({ page }) => {
// TODO 2: Click the Add to cart button for Sauce Labs Backpack
// locator: page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
// TODO 3: Assert cart badge shows "1"
// locator: page.locator('.shopping_cart_badge')
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

  });

  test('cart badge count increases when two items are added', async ({ page }) => {
// TODO 4: Add Sauce Labs Backpack to cart
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
// TODO 5: Add Sauce Labs Bike Light to cart
// data-test="add-to-cart-sauce-labs-bike-light"
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
// TODO 6: Assert cart badge shows "2"
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('2');

  });

  test('clicking the cart icon navigates to cart page', async ({ page }) => {
// TODO 1: Click the shopping cart icon
// locator: page.locator('.shopping_cart_link')
    await page.locator('.shopping_cart_link').click();
// TODO 2: Assert URL contains "cart.html"
    await expect(page).toHaveURL(/cart.html/);
// TODO 3: Assert heading "Your Cart" is visible
    // await expect(
    //   page.getByRole('heading', { name: 'Your Cart' })
    // ).toBeVisible();
    await expect(
         page.getByText('Your Cart', { exact: true })
    ).toBeVisible();

  });

  test('clicking a product name opens the product detail page', async ({ page }) => {
// TODO 4: Click on the text "Sauce Labs Backpack"
// use getByText with exact: true
    await page.getByText('Sauce Labs Backpack', { exact: true }).click();
// TODO 5: Assert URL contains "inventory-item.html"
    await expect(page).toHaveURL(/inventory-item.html/);
// TODO 6: Assert the "Add to cart" button is visible on the detail page
    await expect(
      page.getByRole('button', { name: 'Add to cart' })
    ).toBeVisible();

  });

  test('can sort products by price low to high', async ({ page }) => {
// TODO 1: Select "Price (low to high)" from the sort dropdown

// locator: page.locator('[data-test="product-sort-container"]')
// action: .selectOption('lohi')
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption('lohi');
// TODO 2: Get the first product price text
// locator: page.locator('.inventory_item_price').first()
// TODO 3: Assert the first price is "$7.99" (cheapest product)
    await expect(
      page.locator('.inventory_item_price').first()
    ).toHaveText('$7.99');

  });

});