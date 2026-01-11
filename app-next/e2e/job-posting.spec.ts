import { test, expect } from '@playwright/test'

/**
 * Job Posting E2E Tests
 *
 * Tests the job posting creation flow for employers.
 * Uses the authenticated employer session from auth.setup.ts
 */

test.describe('Job Posting', () => {
  test.use({ storageState: 'e2e/.auth/employer.json' })

  test('can navigate to post job page', async ({ page }) => {
    await page.goto('/company')

    // Click on Post Job link
    await page.click('a[href="/company/jobs/new"]')

    // Should see the post job page
    await expect(page).toHaveURL('/company/jobs/new')
    await expect(page.locator('h1')).toContainText('Post a Job')
  })

  test('can create a draft job posting', async ({ page }) => {
    await page.goto('/company/jobs/new')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible()

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

  test('can view and manage existing jobs', async ({ page }) => {
    await page.goto('/company/jobs')

    // Should see the manage jobs page
    await expect(page.locator('h1')).toContainText('Manage Jobs')

    // Should have at least one job (from previous test or existing data)
    // Look for either Drafts or Active sections
    const hasJobs = await page.locator('.card').count() > 0
    expect(hasJobs).toBeTruthy()
  })

  test('validates required fields', async ({ page }) => {
    await page.goto('/company/jobs/new')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible()

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
