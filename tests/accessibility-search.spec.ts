import { expect, test } from '@playwright/test';
import { HeaderComponent } from '../pages/HeaderComponent';

test('Üst menü araması Enter ile açılır ve arama kutusuna odaklanır', async ({ page }) => {
  const header = new HeaderComponent(page);

  await page.goto('https://www.mavi.com/cart');
  await header.openCart();
  await expect(page).toHaveURL(/\/cart\/?$/);

  await header.focusSearchFromCart();
  await expect(header.searchTrigger).toBeFocused();

  await header.activateFocusedSearch();
  await expect(header.searchInput).toBeVisible();
  await expect(header.searchInput).toBeFocused();
});
