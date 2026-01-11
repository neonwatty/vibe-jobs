import { test as setup, expect } from '@playwright/test'

const EMPLOYER_AUTH_FILE = 'e2e/.auth/employer.json'

/**
 * Test account credentials
 * These accounts should be created in Supabase for E2E testing
 */
const TEST_EMPLOYER = {
  email: 'test-employer@aistartup.com',
  password: 'password123',
}

setup('authenticate as employer', async ({ page }) => {
  // Go to login page
  await page.goto('/login')

  // Fill in credentials
  await page.fill('input[type="email"]', TEST_EMPLOYER.email)
  await page.fill('input[type="password"]', TEST_EMPLOYER.password)

  // Click sign in button
  await page.click('button[type="submit"]')

  // Wait for redirect to employer dashboard
  await page.waitForURL('/company**', { timeout: 10000 })

  // Verify we're on the EMPLOYER dashboard (not generic dashboard)
  // Look for employer-specific navigation link (use nav selector to avoid matching dashboard card)
  await expect(page.locator('nav a[href="/company/jobs"]')).toBeVisible({ timeout: 10000 })

  // Also verify we see "Employer Dashboard" heading
  await expect(page.locator('h1:has-text("Employer Dashboard")')).toBeVisible({ timeout: 5000 })

  // Save the authentication state
  await page.context().storageState({ path: EMPLOYER_AUTH_FILE })
})
