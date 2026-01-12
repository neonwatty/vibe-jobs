import { test as setup, expect, test } from '@playwright/test'

const EMPLOYER_AUTH_FILE = 'e2e/.auth/employer.json'
const EMPLOYEE_AUTH_FILE = 'e2e/.auth/employee.json'

/**
 * Test account credentials
 * These accounts should be created in Supabase for E2E testing
 */
const TEST_EMPLOYER = {
  email: 'test-employer@aistartup.com',
  password: 'password123',
}

const TEST_EMPLOYEE = {
  email: 'test-employee@example.com',
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

  // Navigate to job posting page and wait for company data to load
  // This ensures the company data is cached in localStorage for subsequent tests
  await page.goto('/company/jobs/new')
  await expect(page.locator('h1:has-text("Post a Job")')).toBeVisible({ timeout: 30000 })

  // Wait for the form buttons to be enabled (indicates company data is loaded and cached)
  await expect(page.locator('button:has-text("Save as Draft")')).toBeEnabled({ timeout: 30000 })

  // Save the authentication state (includes localStorage with company cache)
  await page.context().storageState({ path: EMPLOYER_AUTH_FILE })
})

setup('authenticate as employee', async ({ page }) => {
  // Go to login page
  await page.goto('/login')

  // Fill in credentials
  await page.fill('input[type="email"]', TEST_EMPLOYEE.email)
  await page.fill('input[type="password"]', TEST_EMPLOYEE.password)

  // Click sign in button
  await page.click('button[type="submit"]')

  // Check if login failed (account may not exist)
  const loginError = page.locator('text=Invalid login credentials')
  const dashboardUrl = page.waitForURL('/dashboard**', { timeout: 10000 }).catch(() => null)

  // Wait for either error or redirect
  const result = await Promise.race([
    loginError.waitFor({ timeout: 5000 }).then(() => 'error'),
    dashboardUrl.then(() => 'success'),
  ]).catch(() => 'timeout')

  if (result === 'error') {
    // Account doesn't exist - skip this setup
    // Tests using employee auth will be skipped
    console.log('Employee test account does not exist. Skipping employee auth setup.')
    console.log('Create the account in Supabase: test-employee@example.com / password123')
    test.skip()
    return
  }

  // Verify we're on the EMPLOYEE dashboard
  await expect(page.locator('nav a[href="/jobs"]')).toBeVisible({ timeout: 10000 })

  // Save the authentication state
  await page.context().storageState({ path: EMPLOYEE_AUTH_FILE })
})
