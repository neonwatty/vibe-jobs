import { test as setup, expect, test } from '@playwright/test'
import * as fs from 'fs'

const EMPLOYER_AUTH_FILE = 'e2e/.auth/employer.json'
const EMPLOYEE_AUTH_FILE = 'e2e/.auth/employee.json'

// Check if auth file exists and is not too old (24 hours)
function isAuthFileValid(filePath: string): boolean {
  try {
    if (!fs.existsSync(filePath)) return false
    const stats = fs.statSync(filePath)
    const hoursSinceModified = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60)
    return hoursSinceModified < 24
  } catch {
    return false
  }
}

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
  // Skip if valid auth file already exists
  if (isAuthFileValid(EMPLOYER_AUTH_FILE)) {
    console.log('Employer auth file exists and is recent. Skipping login.')
    return
  }

  // Go to login page
  await page.goto('/login')

  // Wait for the login form to be fully rendered
  await page.waitForLoadState('networkidle')

  // Wait for the email input to be visible and interactable
  const emailInput = page.locator('input[type="email"]')
  await expect(emailInput).toBeVisible({ timeout: 10000 })

  // Clear and type credentials (instead of fill) to trigger React state updates
  await emailInput.click()
  await emailInput.clear()
  await emailInput.pressSequentially(TEST_EMPLOYER.email, { delay: 10 })

  // Find and fill password
  const passwordInput = page.locator('input[placeholder="••••••••"]')
  await expect(passwordInput).toBeVisible({ timeout: 5000 })
  await passwordInput.click()
  await passwordInput.clear()
  await passwordInput.pressSequentially(TEST_EMPLOYER.password, { delay: 10 })

  // Wait for the submit button to be visible and enabled
  const submitButton = page.getByRole('button', { name: 'Sign in with Email' })
  await expect(submitButton).toBeVisible({ timeout: 5000 })
  await expect(submitButton).toBeEnabled()

  // Submit the form by pressing Enter (more reliable than clicking)
  await passwordInput.press('Enter')

  // Wait for button text to change (indicates submission started)
  await page.waitForTimeout(500)
  let buttonText = await submitButton.textContent()

  // If button still shows "Sign in with Email", the click might not have registered
  if (buttonText === 'Sign in with Email') {
    // Try clicking again with force
    await submitButton.click({ force: true })
    await page.waitForTimeout(500)
    buttonText = await submitButton.textContent()
  }

  // Check for specific error messages (not empty alerts from dev tools)
  const loginError = page.locator('text=Invalid login credentials')
  const genericError = page.locator('.alert-error:has-text("")')

  try {
    // Wait for navigation to happen
    await page.waitForURL((url) => url.pathname !== '/login', { timeout: 30000 })
  } catch {
    // If navigation fails, check for errors
    if (await loginError.isVisible({ timeout: 1000 }).catch(() => false)) {
      throw new Error('Login failed: Invalid credentials. The test account may not exist in Supabase.')
    }
    if (await genericError.isVisible({ timeout: 1000 }).catch(() => false)) {
      const errorText = await genericError.textContent()
      throw new Error(`Login failed with error: ${errorText}`)
    }
    throw new Error(`Login did not redirect. Current URL: ${page.url()}. Button text: ${buttonText}`)
  }

  // Wait for redirect to employer dashboard
  await page.waitForURL('/company**', { timeout: 30000 })

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

  // Wait for the login form to be fully rendered
  await page.waitForLoadState('networkidle')

  // Wait for the email input to be visible and interactable
  const emailInput = page.locator('input[type="email"]')
  await expect(emailInput).toBeVisible({ timeout: 10000 })

  // Fill in credentials
  await emailInput.fill(TEST_EMPLOYEE.email)

  // Find and fill password
  const passwordInput = page.locator('input[placeholder="••••••••"]')
  await expect(passwordInput).toBeVisible({ timeout: 5000 })
  await passwordInput.fill(TEST_EMPLOYEE.password)

  // Wait for the submit button to be visible and enabled
  const submitButton = page.getByRole('button', { name: 'Sign in with Email' })
  await expect(submitButton).toBeVisible({ timeout: 5000 })
  await expect(submitButton).toBeEnabled()

  // Click sign in button
  await submitButton.click()

  // Check if login failed (account may not exist)
  const loginError = page.locator('text=Invalid login credentials')
  const dashboardUrl = page.waitForURL('/dashboard**', { timeout: 15000 }).catch(() => null)

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
