import { Page, expect } from '@playwright/test';

export class LocationListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('http://localhost:3000/location-list');
  }
  async verifyOnPage() {
    await expect(this.page.getByRole('heading', { name: /location list/i })).toBeVisible();
  }
}
