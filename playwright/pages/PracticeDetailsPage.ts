import { Page, expect, Locator } from '@playwright/test';

export class PracticeDetailsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(practiceName: string) {
    await this.page.goto(`http://localhost:3000/practice/${encodeURIComponent(practiceName)}`);
  }

  getNavLinks(): Locator {
    return this.page.locator('nav ul li a');
  }

  getHeading(): Locator {
    return this.page.getByRole('heading', { name: /practice: testing/i }); // Should be dynamic if data is fixed
  }

  getTotalEmployeesText(): Locator {
    return this.page.getByText(/total employees: \d+/i);
  }

  getTable(): Locator {
    return this.page.locator('table');
  }

  getTableHeaders(): Locator {
    return this.page.locator('table thead th');
  }

  getTableRows(): Locator {
    return this.page.locator('table tbody tr');
  }

  getEmployeeNameLinks(): Locator {
    return this.page.locator('table tbody tr td a');
  }
}
