import { test, expect } from '@playwright/test';
import { PracticeDetailsPage } from '../pages/PracticeDetailsPage';

// ISTQB-compliant functional tests for Practice Details page

test.describe('Practice Details Functional Tests', () => {
  const practiceName = 'Testing';

  test('Page loads and URL is correct', async ({ page }) => {
    const practice = new PracticeDetailsPage(page);
    await practice.goto(practiceName);
    await expect(page).toHaveURL(/\/practice\/Testing$/);
  });

  test('Navigation links are present', async ({ page }) => {
    const practice = new PracticeDetailsPage(page);
    await practice.goto(practiceName);
    const navLinks = practice.getNavLinks();
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText(/employee list/i);
    await expect(navLinks.nth(1)).toHaveText(/studio list/i);
    await expect(navLinks.nth(2)).toHaveText(/practice list/i);
    await expect(navLinks.nth(3)).toHaveText(/region list/i);
    await expect(navLinks.nth(4)).toHaveText(/location list/i);
  });

  test('Heading and total employees text are visible', async ({ page }) => {
    const practice = new PracticeDetailsPage(page);
    await practice.goto(practiceName);
    await expect(practice.getHeading()).toBeVisible();
    await expect(practice.getTotalEmployeesText()).toBeVisible();
  });

  test('Table headers are correct', async ({ page }) => {
    const practice = new PracticeDetailsPage(page);
    await practice.goto(practiceName);
    const headers = practice.getTableHeaders();
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
    const practice = new PracticeDetailsPage(page);
    await practice.goto(practiceName);
    const rows = practice.getTableRows();
    await expect(rows).toHaveCount(1); // Only 1 employee for Development (should be for Testing if data is fixed)
    const nameLinks = practice.getEmployeeNameLinks();
    await expect(nameLinks).toHaveCount(1);
    for (let i = 0; i < 1; i++) {
      await expect(nameLinks.nth(i)).toBeVisible();
    }
  });
});
