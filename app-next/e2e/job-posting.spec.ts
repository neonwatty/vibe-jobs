import { test, expect } from '@playwright/test'

/**
 * Job Posting E2E Tests
 *
 * Tests the job posting creation flow for employers.
 * Uses the authenticated employer session from auth.setup.ts
 *
 * Note: The DashboardLayout navigation race condition has been fixed by using
 * URL path as a fallback for role detection while auth loads. However, page-level
 * loading checks still depend on company data being fetched, which can be slow.
 */

test.describe('Job Posting', () => {
  test.use({ storageState: 'e2e/.auth/employer.json' })

  test('can view and manage existing jobs', async ({ page }) => {
    // Navigate directly to manage jobs page
    await page.goto('/company/jobs')

    // Should see the manage jobs page header
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Page should have loaded with employer context
    // (if not authenticated as employer, we wouldn't see this page)
  })

  // This test depends on company data loading, which can be slow/flaky
  test('can navigate to post job page', async ({ page }) => {
    // First visit manage jobs to ensure auth is fully loaded
    await page.goto('/company/jobs')
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Then navigate to post job
    await page.click('a:has-text("Post New Job"), a:has-text("Post Your First Job")')

    // Wait for the page to load with employer content
    await expect(page.locator('h1:has-text("Post a Job")')).toBeVisible({ timeout: 30000 })
  })

  test('can create a draft job posting', async ({ page }) => {
    // First visit manage jobs to ensure auth is fully loaded
    await page.goto('/company/jobs')
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Navigate to post job page
    await page.goto('/company/jobs/new')

    // Wait for form to load (indicates employer auth context loaded)
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Wait for the Save as Draft button to be enabled (company data loaded)
    const saveButton = page.locator('button:has-text("Save as Draft")')
    await expect(saveButton).toBeEnabled({ timeout: 30000 })

    // Fill in job details with unique title to avoid conflicts
    const uniqueTitle = `E2E Test Job ${Date.now()}`
    await page.fill('input[placeholder*="Senior Full-Stack"]', uniqueTitle)
    await page.fill('textarea[placeholder*="Describe the role"]', 'This is a test job posting created by E2E tests.')

    // Fill in the "How They'll Be Tested" field (required)
    await page.fill('textarea[placeholder*="1-hour live build"]', '2-hour live coding session with AI tools.')

    // Click Save as Draft
    await saveButton.click()

    // Should redirect to manage jobs page
    await page.waitForURL('/company/jobs**', { timeout: 10000 })

    // Verify the job appears in drafts (use unique title)
    await expect(page.locator(`text=${uniqueTitle}`)).toBeVisible({ timeout: 5000 })
  })

  test('validates required fields', async ({ page }) => {
    // First visit manage jobs to ensure auth is fully loaded
    await page.goto('/company/jobs')
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Navigate to post job page
    await page.goto('/company/jobs/new')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Wait for the Publish Job button to be enabled (company data loaded)
    const publishButton = page.locator('button:has-text("Publish Job")')
    await expect(publishButton).toBeEnabled({ timeout: 30000 })

    // Try to submit without filling required fields
    await publishButton.click()

    // Should show validation - form should not navigate away
    await expect(page).toHaveURL('/company/jobs/new')

    // The job title field should be marked as invalid (HTML5 validation)
    const titleInput = page.locator('input[placeholder*="Senior Full-Stack"]')
    const isInvalid = await titleInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBeTruthy()
  })
})
