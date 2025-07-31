import { Page, expect } from '@playwright/test';

export class PracticeListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('http://localhost:3000/practice-list');
  }
  async verifyOnPage() {
    await expect(this.page.getByRole('heading', { name: /practice list/i })).toBeVisible();
  }
}
