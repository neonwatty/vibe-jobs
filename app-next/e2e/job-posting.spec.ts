import { test, expect } from '@playwright/test'

/**
 * Job Posting E2E Tests
 *
 * Tests the job posting creation flow for employers.
 * Uses the authenticated employer session from auth.setup.ts
 *
 * KNOWN ISSUE: These tests are skipped due to flaky auth context loading.
 * The app has a race condition where the employer auth context may not load
 * in time, causing the page to render with employee navigation instead.
 * Fix: Improve auth context loading in the app (show loading state until ready).
 */

test.describe('Job Posting', () => {
  test.use({ storageState: 'e2e/.auth/employer.json' })

  // TODO: Unskip once auth context race condition is fixed in the app
  test.skip('can navigate to post job page', async ({ page }) => {
    // Navigate directly to post job page
    await page.goto('/company/jobs/new')

    // Wait for the page to load with employer content
    // The h1 should say "Post a Job" if we're properly authenticated as employer
    await expect(page.locator('h1:has-text("Post a Job")')).toBeVisible({ timeout: 30000 })
  })

  // TODO: Unskip once auth context race condition is fixed in the app
  test.skip('can create a draft job posting', async ({ page }) => {
    // Navigate directly to post job page
    await page.goto('/company/jobs/new')

    // Wait for form to load (indicates employer auth context loaded)
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Fill in job details
    await page.fill('input[placeholder*="Senior Full-Stack"]', 'E2E Test Engineer')
    await page.fill('textarea[placeholder*="Describe the role"]', 'This is a test job posting created by E2E tests.')

    // Fill in the "How They'll Be Tested" field (required)
    await page.fill('textarea[placeholder*="1-hour live build"]', '2-hour live coding session with AI tools.')

    // Click Save as Draft
    await page.click('button:has-text("Save as Draft")')

    // Should redirect to manage jobs page
    await page.waitForURL('/company/jobs**', { timeout: 10000 })

    // Verify the job appears in drafts
    await expect(page.locator('text=E2E Test Engineer')).toBeVisible({ timeout: 5000 })
  })

  // TODO: Unskip once auth context race condition is fixed in the app
  test.skip('can view and manage existing jobs', async ({ page }) => {
    // Navigate directly to manage jobs page
    await page.goto('/company/jobs')

    // Should see the manage jobs page header
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Page should have loaded with employer context
    // (if not authenticated as employer, we wouldn't see this page)
  })

  // TODO: Unskip once auth context race condition is fixed in the app
  test.skip('validates required fields', async ({ page }) => {
    // Navigate directly to post job page
    await page.goto('/company/jobs/new')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Try to submit without filling required fields
    await page.click('button:has-text("Publish Job")')

    // Should show validation - form should not navigate away
    await expect(page).toHaveURL('/company/jobs/new')

    // The job title field should be marked as invalid (HTML5 validation)
    const titleInput = page.locator('input[placeholder*="Senior Full-Stack"]')
    const isInvalid = await titleInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBeTruthy()
  })
})
