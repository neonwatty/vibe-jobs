import { test, expect } from '@playwright/test'
import * as fs from 'fs'

/**
 * Employee E2E Tests
 *
 * Tests the employee flows: dashboard, profile management, job browsing.
 * Uses the authenticated employee session from auth.setup.ts
 *
 * NOTE: These tests require the alex.chen@example.com account to exist in Supabase.
 * If the account doesn't exist, the auth setup skips and these tests will also skip.
 */

const EMPLOYEE_AUTH_FILE = 'e2e/.auth/employee.json'

// Skip all employee auth tests if the auth file doesn't exist
const employeeAuthExists = () => fs.existsSync(EMPLOYEE_AUTH_FILE)

test.describe('Employee Dashboard', () => {
  test.skip(() => !employeeAuthExists(), 'Employee auth not available - create alex.chen@example.com in Supabase')
  test.use({ storageState: EMPLOYEE_AUTH_FILE })

  test('can view employee dashboard', async ({ page }) => {
    await page.goto('/dashboard')

    // Should see the employee dashboard
    await expect(page.locator('h1')).toBeVisible({ timeout: 30000 })

    // Should have employee-specific navigation
    await expect(page.locator('nav a[href="/jobs"]')).toBeVisible()
    await expect(page.locator('nav a[href="/dashboard/applications"]')).toBeVisible()
    await expect(page.locator('nav a[href="/dashboard/profile"]')).toBeVisible()
  })

  test('can navigate to browse jobs', async ({ page }) => {
    await page.goto('/dashboard')

    // Click on Browse Jobs link
    await page.click('nav a[href="/jobs"]')

    // Should navigate to jobs page
    await page.waitForURL('/jobs**')

    // Should see jobs page content
    await expect(page.locator('h2:has-text("jobs")')).toBeVisible({ timeout: 10000 })
  })

  test('can view applications page', async ({ page }) => {
    await page.goto('/dashboard/applications')

    // Should see applications page
    await expect(page.locator('h1:has-text("My Applications")')).toBeVisible({ timeout: 30000 })
  })
})

test.describe('Employee Profile', () => {
  test.skip(() => !employeeAuthExists(), 'Employee auth not available - create alex.chen@example.com in Supabase')
  test.use({ storageState: EMPLOYEE_AUTH_FILE })

  test('can view profile page', async ({ page }) => {
    await page.goto('/dashboard/profile')

    // Should see profile page heading
    await expect(page.getByRole('heading', { name: 'Your Profile' })).toBeVisible({ timeout: 30000 })

    // Form should be visible (ProfileEditor renders a form)
    await expect(page.locator('form')).toBeVisible({ timeout: 10000 })
  })

  test('can edit profile', async ({ page }) => {
    await page.goto('/dashboard/profile')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Update headline with unique value - find by placeholder text
    const headlineInput = page.locator('input[placeholder*="ships 3x with AI"]')
    await expect(headlineInput).toBeVisible()
    const uniqueHeadline = `AI-Native Developer - Updated ${Date.now()}`
    await headlineInput.fill(uniqueHeadline)

    // Click save button
    await page.getByRole('button', { name: 'Save Profile' }).click()

    // Wait for save to complete (button text changes while saving)
    await expect(page.getByRole('button', { name: 'Saving...' })).not.toBeVisible({ timeout: 15000 })

    // Should see success indication - check the save button is back
    await expect(page.getByRole('button', { name: 'Save Profile' })).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Job Browsing', () => {
  test.skip(() => !employeeAuthExists(), 'Employee auth not available - create alex.chen@example.com in Supabase')
  test.use({ storageState: EMPLOYEE_AUTH_FILE })

  test('can browse jobs page', async ({ page }) => {
    await page.goto('/jobs')

    // Should see jobs page
    await expect(page.locator('h2:has-text("jobs")')).toBeVisible({ timeout: 30000 })

    // Should have sort dropdown
    await expect(page.locator('select')).toBeVisible()
  })

  test('can filter jobs by category', async ({ page }) => {
    await page.goto('/jobs')

    // Wait for page to load
    await expect(page.locator('h2:has-text("jobs")')).toBeVisible({ timeout: 30000 })

    // Click on a role category filter if available
    const filterButton = page.locator('button:has-text("Engineering")').first()
    if (await filterButton.isVisible()) {
      await filterButton.click()

      // Page should still be functional after filter
      await expect(page.locator('h2:has-text("jobs")')).toBeVisible()
    }
  })
})

test.describe('Unauthenticated Employee Routes', () => {
  test('redirects to login when accessing dashboard without auth', async ({ page, context }) => {
    // Clear authentication
    await context.clearCookies()

    await page.goto('/dashboard')

    // Should redirect to login
    await page.waitForURL('/login**', { timeout: 10000 })
  })

  test('redirects to login when accessing profile without auth', async ({ page, context }) => {
    // Clear authentication
    await context.clearCookies()

    await page.goto('/dashboard/profile')

    // Should redirect to login
    await page.waitForURL('/login**', { timeout: 10000 })
  })
})
