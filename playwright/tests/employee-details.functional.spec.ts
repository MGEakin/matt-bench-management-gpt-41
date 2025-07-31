import { test, expect } from '@playwright/test';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage';

// ISTQB-compliant functional tests for Employee Details page

test.describe('Employee Details Functional Tests', () => {
  test('Page loads and URL is correct', async ({ page }) => {
    const details = new EmployeeDetailsPage(page);
    await details.goto(6); // Consultant for Cloud – Cloud
    await expect(page).toHaveURL(/\/employee\/6$/);
  });

  test('Navigation links are present', async ({ page }) => {
    const details = new EmployeeDetailsPage(page);
    await details.goto(6);
    const navLinks = await details.getNavLinks();
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText(/employee list/i);
    await expect(navLinks.nth(1)).toHaveText(/studio list/i);
    await expect(navLinks.nth(2)).toHaveText(/practice list/i);
    await expect(navLinks.nth(3)).toHaveText(/region list/i);
    await expect(navLinks.nth(4)).toHaveText(/location list/i);
  });

  test('Loading indicator is visible', async ({ page }) => {
    const details = new EmployeeDetailsPage(page);
    await details.goto(6);
    await expect(await details.getLoadingIndicator()).toBeVisible();
  });

  test('Dev Tools button is present', async ({ page }) => {
    const details = new EmployeeDetailsPage(page);
    await details.goto(6);
    await expect(await details.getDevToolsButton()).toBeVisible();
  });
});
