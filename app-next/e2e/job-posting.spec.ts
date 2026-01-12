import { test, expect } from '@playwright/test'

/**
 * Job Posting E2E Tests
 *
 * Tests the job posting CRUD flow for employers.
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

/**
 * Job Lifecycle Tests
 *
 * Tests the full lifecycle of a job posting:
 * Create draft → Publish → Pause → Activate → Delete
 *
 * These tests are sequential and depend on each other.
 * Using describe.serial() to run tests in order with shared state.
 */
test.describe.serial('Job Lifecycle', () => {
  test.use({ storageState: 'e2e/.auth/employer.json' })

  // Store the unique job title across tests - generated once per test run
  const testJobTitle = `E2E Lifecycle Test ${Date.now()}`

  test('can create and publish a job', async ({ page }) => {
    // Navigate to post job page
    await page.goto('/company/jobs/new')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Wait for form buttons to be enabled
    const publishButton = page.locator('button:has-text("Publish Job")')
    await expect(publishButton).toBeEnabled({ timeout: 30000 })

    // Fill in all required job details
    await page.fill('input[placeholder*="Senior Full-Stack"]', testJobTitle)
    await page.fill('textarea[placeholder*="Describe the role"]', 'This is a comprehensive test job posting for lifecycle testing.')

    // Fill in the "How They'll Be Tested" field (required)
    await page.fill('textarea[placeholder*="1-hour live build"]', '2-hour live coding session where candidates demonstrate AI-assisted development.')

    // Click Publish Job
    await publishButton.click()

    // Should redirect to manage jobs page
    await page.waitForURL('/company/jobs**', { timeout: 10000 })

    // Verify the job appears and has Active status
    await expect(page.locator(`text=${testJobTitle}`)).toBeVisible({ timeout: 5000 })
    // The job row should contain an Active badge
    const jobRow = page.locator('.card').filter({ hasText: testJobTitle })
    await expect(jobRow.locator('.badge:has-text("Active")')).toBeVisible()
  })

  test('published job appears on public jobs page', async ({ page }) => {
    // Navigate to public jobs page
    await page.goto('/jobs')

    // Wait for jobs to load
    await expect(page.locator('h2:has-text("jobs")')).toBeVisible({ timeout: 30000 })

    // The published job should be visible on the public jobs page
    await expect(page.locator(`text=${testJobTitle}`)).toBeVisible({ timeout: 10000 })
  })

  test('can pause an active job', async ({ page }) => {
    // Navigate to manage jobs
    await page.goto('/company/jobs')
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Find the job row and open its menu
    const jobRow = page.locator('.card').filter({ hasText: testJobTitle })
    await expect(jobRow).toBeVisible({ timeout: 5000 })

    // Click the three-dot menu button
    await jobRow.locator('button.btn-ghost').click()

    // Click "Pause Job"
    await page.click('button:has-text("Pause Job")')

    // Wait for the status to update
    await expect(jobRow.locator('.badge:has-text("Paused")')).toBeVisible({ timeout: 5000 })
  })

  test('paused job does not appear on public jobs page', async ({ page }) => {
    // Navigate to public jobs page
    await page.goto('/jobs')

    // Wait for jobs to load
    await expect(page.locator('h2:has-text("jobs")')).toBeVisible({ timeout: 30000 })

    // The paused job should NOT be visible on the public jobs page
    await expect(page.locator(`text=${testJobTitle}`)).not.toBeVisible({ timeout: 5000 })
  })

  test('can activate a paused job', async ({ page }) => {
    // Navigate to manage jobs
    await page.goto('/company/jobs')
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Find the job row and open its menu
    const jobRow = page.locator('.card').filter({ hasText: testJobTitle })
    await expect(jobRow).toBeVisible({ timeout: 5000 })

    // Click the three-dot menu button
    await jobRow.locator('button.btn-ghost').click()

    // Click "Activate Job"
    await page.click('button:has-text("Activate Job")')

    // Wait for the status to update
    await expect(jobRow.locator('.badge:has-text("Active")')).toBeVisible({ timeout: 5000 })
  })

  // Note: Edit job functionality not implemented yet
  // test('can edit a job', async ({ page }) => { ... })

  test('can delete a job', async ({ page }) => {
    // Navigate to manage jobs
    await page.goto('/company/jobs')
    await expect(page.locator('h1:has-text("Manage Jobs")')).toBeVisible({ timeout: 30000 })

    // Find the job row and open its menu
    const jobRow = page.locator('.card').filter({ hasText: testJobTitle })
    await expect(jobRow).toBeVisible({ timeout: 5000 })

    // Click the three-dot menu button
    await jobRow.locator('button.btn-ghost').click()

    // Set up dialog handler before clicking delete
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm')
      await dialog.accept()
    })

    // Click "Delete Job"
    await page.click('button:has-text("Delete Job")')

    // Wait for the job to disappear
    await expect(page.locator(`text=${testJobTitle}`)).not.toBeVisible({ timeout: 5000 })
  })
})
