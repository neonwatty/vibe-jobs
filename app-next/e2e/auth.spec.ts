import { test, expect } from '@playwright/test'

/**
 * Auth E2E Tests
 *
 * Tests authentication flows including signup validation.
 * These tests focus on the UI behavior, not the OAuth providers.
 */

test.describe('Blocked Domain Validation', () => {
  test('shows error when employer signs up with personal email', async ({ page }) => {
    // Simulate the server redirect that happens when a blocked domain is detected
    await page.goto('/signup?error=blocked_domain&email=test@gmail.com')

    // Should see the error state UI
    await expect(page.getByRole('heading', { name: 'Work email required' })).toBeVisible({ timeout: 10000 })

    // Should show the blocked email address
    await expect(page.locator('text=test@gmail.com')).toBeVisible()

    // Should show the error message paragraph
    await expect(page.getByText('Please use your work email to sign up')).toBeVisible()

    // Should have retry button
    await expect(page.getByRole('button', { name: 'Try with work email' })).toBeVisible()

    // Should have option to switch to employee signup
    await expect(page.getByRole('button', { name: 'Sign up as job seeker instead' })).toBeVisible()
  })

  test('can retry with work email after blocked domain error', async ({ page }) => {
    await page.goto('/signup?error=blocked_domain&email=test@gmail.com')

    // Wait for error page to load
    await expect(page.getByRole('heading', { name: 'Work email required' })).toBeVisible({ timeout: 10000 })

    // Click retry button
    await page.getByRole('button', { name: 'Try with work email' }).click()

    // Should go back to role selection
    await expect(page.getByRole('heading', { name: 'Join Vibe Jobs' })).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('How do you want to use Vibe Jobs?')).toBeVisible()
  })

  test('can switch to employee signup after blocked domain error', async ({ page }) => {
    await page.goto('/signup?error=blocked_domain&email=test@gmail.com')

    // Wait for error page to load
    await expect(page.getByRole('heading', { name: 'Work email required' })).toBeVisible({ timeout: 10000 })

    // Click switch to employee button
    await page.getByRole('button', { name: 'Sign up as job seeker instead' }).click()

    // Should show employee auth page
    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Sign up to start applying')).toBeVisible()
  })

  test('employer signup shows work email requirement notice', async ({ page }) => {
    await page.goto('/signup')

    // Select employer role
    await page.getByText("I'm hiring").click()

    // Should see the employer auth page with work email notice
    await expect(page.getByRole('heading', { name: 'Create employer account' })).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Work email required')).toBeVisible()
    await expect(page.getByText('company email address')).toBeVisible()
  })
})

test.describe('Signup Flow', () => {
  test('can navigate signup as employee', async ({ page }) => {
    await page.goto('/signup')

    // Should see role selection
    await expect(page.getByRole('heading', { name: 'Join Vibe Jobs' })).toBeVisible({ timeout: 10000 })

    // Select employee role
    await page.getByText("I'm looking for work").click()

    // Should see employee auth options
    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible({ timeout: 5000 })

    // Should have back button
    await expect(page.getByText('Back')).toBeVisible()

    // OAuth buttons should be present (signup mode uses "Sign up with...")
    await expect(page.getByRole('button', { name: 'Sign up with Google' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign up with GitHub' })).toBeVisible()
  })

  test('can navigate signup as employer', async ({ page }) => {
    await page.goto('/signup')

    // Select employer role
    await page.getByText("I'm hiring").click()

    // Should see employer auth options
    await expect(page.getByRole('heading', { name: 'Create employer account' })).toBeVisible({ timeout: 5000 })

    // Should show work email requirement
    await expect(page.getByText('Work email required')).toBeVisible()

    // OAuth buttons should be present
    await expect(page.getByRole('button', { name: 'Sign up with Google' })).toBeVisible()
  })

  test('can go back from auth step to role selection', async ({ page }) => {
    await page.goto('/signup')

    // Select a role
    await page.getByText("I'm looking for work").click()
    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible({ timeout: 5000 })

    // Click back
    await page.getByText('Back').click()

    // Should be back at role selection
    await expect(page.getByRole('heading', { name: 'Join Vibe Jobs' })).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Login Page', () => {
  test('can view login page', async ({ page }) => {
    await page.goto('/login')

    // Should see login page
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible({ timeout: 10000 })

    // OAuth buttons should be present (login mode uses "Continue with...")
    await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Continue with GitHub' })).toBeVisible()

    // Should have link to signup
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible()
  })

  test('can navigate from login to signup', async ({ page }) => {
    await page.goto('/login')

    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible({ timeout: 10000 })

    // Click signup link
    await page.getByRole('link', { name: 'Sign up' }).click()

    // Should navigate to signup
    await page.waitForURL('/signup')
    await expect(page.getByRole('heading', { name: 'Join Vibe Jobs' })).toBeVisible({ timeout: 5000 })
  })
})
