import { Page, expect } from '@playwright/test';

export class StudioListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('http://localhost:3000/studio-list');
  }
  async verifyOnPage() {
    await expect(this.page.getByRole('heading', { name: /studio list/i })).toBeVisible();
  }
}
