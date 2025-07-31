import { Page, expect } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('http://localhost:3000/');
  }

  async getHeader() {
    return this.page.getByRole('banner');
  }

  async getNavLinks() {
    return this.page.locator('nav ul li a');
  }

  async getHeading() {
    return this.page.getByRole('heading', { name: /employee list/i });
  }

  async getAddEmployeeButton() {
    return this.page.getByRole('button', { name: /add employee/i });
  }

  async getFilterTextbox(label: string) {
    return this.page.getByRole('textbox', { name: new RegExp(label, 'i') });
  }

  async getStudioCombobox() {
    return this.page.getByRole('combobox').nth(0);
  }

  async getPracticeCombobox() {
    return this.page.getByRole('combobox').nth(1);
  }

  async getTable() {
    return this.page.locator('table');
  }

  async getTableHeaders() {
    return this.page.locator('table thead th');
  }

  async getNoEmployeesRow() {
    return this.page.getByText('No employees found');
  }
  async verifyOnPage() {
    await expect(this.page.getByRole('heading', { name: /employee list/i })).toBeVisible();
  }
}
