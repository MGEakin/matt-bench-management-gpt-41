import { test, expect } from '@playwright/test';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe('Employee List Functional Tests', () => {
  test('Page loads and heading is visible', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    await expect(await employeeList.getHeading()).toBeVisible();
  });

  test('Navigation links are present', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    const navLinks = await employeeList.getNavLinks();
    await expect(navLinks).toHaveCount(5);
    await expect(navLinks.nth(0)).toHaveText(/employee list/i);
    await expect(navLinks.nth(1)).toHaveText(/studio list/i);
    await expect(navLinks.nth(2)).toHaveText(/practice list/i);
    await expect(navLinks.nth(3)).toHaveText(/region list/i);
    await expect(navLinks.nth(4)).toHaveText(/location list/i);
  });

  test('Add Employee button is present', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    await expect(await employeeList.getAddEmployeeButton()).toBeVisible();
  });

  test('All filter fields are present', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    const filterLabels = [
      'Filter by name',
      'Filter by title',
      'Filter by region',
      'Filter by location',
      'Filter by skill level',
      'Filter by current assignment',
    ];
    for (const label of filterLabels) {
      await expect(await employeeList.getFilterTextbox(label)).toBeVisible();
    }
    await expect(await employeeList.getStudioCombobox()).toBeVisible();
    await expect(await employeeList.getPracticeCombobox()).toBeVisible();
  });

  test('Table headers are correct', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    const headers = await employeeList.getTableHeaders();
    const expected = [
      'Name',
      'Title',
      'Studio',
      'Practice',
      'Region',
      'Location',
      'Skill Level',
      'Current Assignment',
      'Actions',
    ];
    for (let i = 0; i < expected.length; i++) {
      await expect(headers.nth(i)).toHaveText(expected[i]);
    }
  });

  test('No employees row is shown when no data', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    await expect(await employeeList.getNoEmployeesRow()).toBeVisible();
  });
});
