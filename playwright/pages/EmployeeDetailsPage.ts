import { Page, expect } from '@playwright/test';

export class EmployeeDetailsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto(employeeId: number) {
    await this.page.goto(`http://localhost:3000/employee/${employeeId}`);
  }

  getNavLinks() {
    return this.page.locator('nav ul li a');
  }

  getLoadingIndicator() {
    return this.page.getByText('Loading...');
  }

  getDevToolsButton() {
    return this.page.getByRole('button', { name: /open next.js dev tools/i });
  }
}
