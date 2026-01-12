/**
 * Create Test Employee Account
 * Run with: doppler run -- npx tsx scripts/create-test-employee.ts
 *
 * Creates the test employee account used by E2E tests:
 * - Email: test-employee@example.com
 * - Password: password123
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables.')
  console.error('Need: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  console.error('')
  console.error('Run with: doppler run -- npx tsx scripts/create-test-employee.ts')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const TEST_EMPLOYEE = {
  email: 'test-employee@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'Employee',
}

async function main() {
  console.log('Creating test employee account...')
  console.log(`Email: ${TEST_EMPLOYEE.email}`)
  console.log('')

  // Step 1: Check if user already exists
  const { data: existingUsers } = await supabase.auth.admin.listUsers()
  const existingUser = existingUsers?.users.find(u => u.email === TEST_EMPLOYEE.email)

  let userId: string

  if (existingUser) {
    console.log('User already exists in Auth, using existing account.')
    userId = existingUser.id
  } else {
    // Step 2: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: TEST_EMPLOYEE.email,
      password: TEST_EMPLOYEE.password,
      email_confirm: true, // Auto-confirm email
    })

    if (authError) {
      console.error('Failed to create auth user:', authError.message)
      process.exit(1)
    }

    userId = authData.user.id
    console.log('Created auth user:', userId)
  }

  // Step 3: Check if user record exists
  const { data: existingUserRecord } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single()

  if (!existingUserRecord) {
    // Create user record with employee role
    const { error: userError } = await supabase.from('users').insert({
      id: userId,
      email: TEST_EMPLOYEE.email,
      role: 'employee',
    })

    if (userError) {
      console.error('Failed to create user record:', userError.message)
      process.exit(1)
    }
    console.log('Created user record with role: employee')
  } else {
    console.log('User record already exists')
  }

  // Step 4: Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (!existingProfile) {
    // Create employee profile
    const { error: profileError } = await supabase.from('profiles').insert({
      user_id: userId,
      email: TEST_EMPLOYEE.email,
      first_name: TEST_EMPLOYEE.firstName,
      last_name: TEST_EMPLOYEE.lastName,
      headline: 'Test Employee for E2E Testing',
      role_type: 'engineer',
      ai_tools: ['Claude Code', 'Cursor'],
      availability: 'actively_looking',
      profile_complete: true,
    })

    if (profileError) {
      console.error('Failed to create profile:', profileError.message)
      process.exit(1)
    }
    console.log('Created employee profile')
  } else {
    console.log('Profile already exists')
  }

  console.log('')
  console.log('Test employee account ready!')
  console.log('---')
  console.log(`Email: ${TEST_EMPLOYEE.email}`)
  console.log(`Password: ${TEST_EMPLOYEE.password}`)
  console.log('')
  console.log('You can now run E2E tests with employee authentication.')
}

main().catch(console.error)
