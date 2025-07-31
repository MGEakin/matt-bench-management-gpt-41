import { test, expect } from '@playwright/test';
import { StudioDetailsPage } from '../pages/StudioDetailsPage';

// ISTQB-compliant functional tests for Studio Details page

test.describe('Studio Details Functional Tests', () => {
  const studioName = 'Modern Software Development';

  test('Page loads and URL is correct', async ({ page }) => {
    const studio = new StudioDetailsPage(page);
    await studio.goto(studioName);
    await expect(page).toHaveURL(/\/studio\/Modern%20Software%20Development$/);
  });

  test('Navigation links are present', async ({ page }) => {
    const studio = new StudioDetailsPage(page);
    await studio.goto(studioName);
    const navLinks = studio.getNavLinks();
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText(/employee list/i);
    await expect(navLinks.nth(1)).toHaveText(/studio list/i);
    await expect(navLinks.nth(2)).toHaveText(/practice list/i);
    await expect(navLinks.nth(3)).toHaveText(/region list/i);
    await expect(navLinks.nth(4)).toHaveText(/location list/i);
  });

  test('Heading and total employees text are visible', async ({ page }) => {
    const studio = new StudioDetailsPage(page);
    await studio.goto(studioName);
    await expect(studio.getHeading()).toBeVisible();
    await expect(studio.getTotalEmployeesText()).toBeVisible();
  });

  test('Table headers are correct', async ({ page }) => {
    const studio = new StudioDetailsPage(page);
    await studio.goto(studioName);
    const headers = studio.getTableHeaders();
    const expected = [
      'Name',
      'Title',
      'Studio',
      'Region',
      'Location',
      'Skill Level',
      'Current Assignment',
    ];
    for (let i = 0; i < expected.length; i++) {
      await expect(headers.nth(i)).toHaveText(expected[i]);
    }
  });

  test('Table rows and employee name links are present', async ({ page }) => {
    const studio = new StudioDetailsPage(page);
    await studio.goto(studioName);
    const rows = studio.getTableRows();
    await expect(rows).toHaveCount(5);
    const nameLinks = studio.getEmployeeNameLinks();
    await expect(nameLinks).toHaveCount(5);
    for (let i = 0; i < 5; i++) {
      await expect(nameLinks.nth(i)).toBeVisible();
    }
  });
});
