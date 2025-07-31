import { Page, expect } from '@playwright/test';

export class RegionListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('http://localhost:3000/region-list');
  }
  async verifyOnPage() {
    await expect(this.page.getByRole('heading', { name: /region list/i })).toBeVisible();
  }
}
