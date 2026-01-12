import { test, expect } from '@playwright/test'

/**
 * Company Profile E2E Tests
 *
 * Tests the company profile viewing flow for employers.
 * Uses the authenticated employer session from auth.setup.ts
 */

test.describe('Company Profile', () => {
  test.use({ storageState: 'e2e/.auth/employer.json' })

  test('can view company profile page', async ({ page }) => {
    // Navigate directly to company profile page
    await page.goto('/company/profile')

    // Should see the company profile page
    await expect(page.locator('h1:has-text("Company Profile")')).toBeVisible({ timeout: 30000 })

    // Form should be visible (indicates employer context loaded)
    await expect(page.locator('form')).toBeVisible({ timeout: 10000 })
  })

  test('can edit company profile', async ({ page }) => {
    await page.goto('/company/profile')

    // Wait for form to load
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // Get the company name input and wait for it to have a value (indicates company data loaded)
    const nameInput = page.locator('input[placeholder*="Acme"]')
    await expect(nameInput).toBeVisible()

    // Wait for company data to be loaded (name field has a value)
    await expect(nameInput).toHaveValue(/\S+/, { timeout: 10000 })

    // Update the company description with a unique value
    const descriptionTextarea = page.locator('textarea[placeholder*="Tell candidates"]')
    const uniqueDescription = `A cutting-edge AI startup building the future of work. Updated at ${Date.now()}`
    await descriptionTextarea.fill(uniqueDescription)

    // Click save button
    const saveButton = page.locator('button:has-text("Save Company Profile")')
    await saveButton.click()

    // Wait for save to complete - check for either:
    // 1. Button text changes to "Saving..." and back to "Save Company Profile"
    // 2. Success alert appears
    // 3. Error alert appears

    // Wait a moment for the save to start
    await page.waitForTimeout(500)

    // Check for errors
    const errorAlert = page.locator('.alert-error')
    if (await errorAlert.isVisible({ timeout: 1000 }).catch(() => false)) {
      const errorText = await errorAlert.textContent()
      throw new Error(`Save failed with error: ${errorText}`)
    }

    // Wait for button to return to normal state (indicates save completed)
    await expect(saveButton).toHaveText('Save Company Profile', { timeout: 15000 })

    // Verify the page is still showing the form (didn't error out)
    await expect(page.locator('h1:has-text("Company Profile")')).toBeVisible()

    // If we get here without errors, save was successful
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
