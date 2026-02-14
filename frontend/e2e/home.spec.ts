import { test, expect } from '@playwright/test';

test('homepage has title and featured artworks', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/IlluVista/);

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Featured Artworks' })).toBeVisible();
});
