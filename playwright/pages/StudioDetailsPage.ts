import { Page, expect, Locator } from '@playwright/test';

export class StudioDetailsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(studioName: string) {
    // Studio name in URL is encoded
    await this.page.goto(`http://localhost:3000/studio/${encodeURIComponent(studioName)}`);
  }

  getNavLinks(): Locator {
    return this.page.locator('nav ul li a');
  }

  getHeading(): Locator {
    return this.page.getByRole('heading', { name: /studio: modern software development/i });
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
