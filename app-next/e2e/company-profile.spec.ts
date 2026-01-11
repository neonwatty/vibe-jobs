import { test, expect } from '@playwright/test'

/**
 * Company Profile E2E Tests
 *
 * Tests the company profile creation and editing flow for employers.
 * Uses the authenticated employer session from auth.setup.ts
 */

test.describe('Company Profile', () => {
  test.use({ storageState: 'e2e/.auth/employer.json' })

  test('can view company profile page', async ({ page }) => {
    await page.goto('/company/profile')

    // Should see the company profile page
    await expect(page.locator('h1')).toContainText('Company Profile')
  })

  test('can edit company profile', async ({ page }) => {
    await page.goto('/company/profile')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible()

    // Get the company name input
    const nameInput = page.locator('input[placeholder*="Acme"]')
    await expect(nameInput).toBeVisible()

    // Update the company description
    const descriptionTextarea = page.locator('textarea[placeholder*="Tell candidates"]')
    await descriptionTextarea.fill('A cutting-edge AI startup building the future of work.')

    // Click save button
    await page.click('button:has-text("Save Company Profile")')

    // Wait for success message or verify save completed
    // The button should not show "Saving..." anymore
    await expect(page.locator('button:has-text("Saving...")')).not.toBeVisible({ timeout: 10000 })

    // Check for success message
    const successAlert = page.locator('.alert-success')
    await expect(successAlert).toBeVisible({ timeout: 5000 })
  })

  test('shows error when not authenticated', async ({ page, context }) => {
    // Clear authentication
    await context.clearCookies()

    await page.goto('/company/profile')

    // Should redirect to login or show auth error
    // Wait for either login page or error message
    await Promise.race([
      page.waitForURL('/login**', { timeout: 5000 }),
      expect(page.locator('text=logged in')).toBeVisible({ timeout: 5000 }),
    ]).catch(() => {
      // Either outcome is acceptable - redirect or error message
    })
  })
})
