import { test } from '@playwright/test';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { StudioListPage } from '../pages/StudioListPage';
import { PracticeListPage } from '../pages/PracticeListPage';
import { RegionListPage } from '../pages/RegionListPage';
import { LocationListPage } from '../pages/LocationListPage';

test.describe('Smoke Tests', () => {
  test('Employee List page loads', async ({ page }) => {
    const employeeList = new EmployeeListPage(page);
    await employeeList.goto();
    await employeeList.verifyOnPage();
  });

  test('Studio List page loads', async ({ page }) => {
    const studioList = new StudioListPage(page);
    await studioList.goto();
    await studioList.verifyOnPage();
  });

  test('Practice List page loads', async ({ page }) => {
    const practiceList = new PracticeListPage(page);
    await practiceList.goto();
    await practiceList.verifyOnPage();
  });

  test('Region List page loads', async ({ page }) => {
    const regionList = new RegionListPage(page);
    await regionList.goto();
    await regionList.verifyOnPage();
  });

  test('Location List page loads', async ({ page }) => {
    const locationList = new LocationListPage(page);
    await locationList.goto();
    await locationList.verifyOnPage();
  });
});
