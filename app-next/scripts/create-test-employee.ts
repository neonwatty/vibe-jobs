/**
 * Create Test Employee Account
 *
 * Run with: npx tsx scripts/create-test-employee.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY environment variable
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:')
  if (!supabaseUrl) console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseServiceKey) console.error('  - SUPABASE_SERVICE_ROLE_KEY')
  console.error('\nSet these in .env.local or export them before running this script.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const TEST_EMPLOYEE = {
  email: 'alex.chen@example.com',
  password: 'password123',
  firstName: 'Alex',
  lastName: 'Chen',
}

async function createTestEmployee() {
  console.log('Creating test employee account...')
  console.log(`  Email: ${TEST_EMPLOYEE.email}`)

  // Check if user already exists
  const { data: existingUsers } = await supabase.auth.admin.listUsers()
  const existingUser = existingUsers?.users?.find(u => u.email === TEST_EMPLOYEE.email)

  if (existingUser) {
    console.log('  User already exists with ID:', existingUser.id)

    // Check if they have a user record
    const { data: userRecord } = await supabase
      .from('users')
      .select('*')
      .eq('id', existingUser.id)
      .single()

    if (!userRecord) {
      console.log('  Creating user record...')
      await supabase.from('users').insert({
        id: existingUser.id,
        email: TEST_EMPLOYEE.email,
        role: 'employee'
      })
    } else {
      console.log('  User record exists with role:', userRecord.role)
    }

    // Check if they have a profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', existingUser.id)
      .single()

    if (!profile) {
      console.log('  Creating profile...')
      await supabase.from('profiles').insert({
        user_id: existingUser.id,
        first_name: TEST_EMPLOYEE.firstName,
        last_name: TEST_EMPLOYEE.lastName,
        email: TEST_EMPLOYEE.email,
        headline: 'Test Employee for E2E',
        role_type: 'engineer',
        ai_tools: ['Claude Code', 'Cursor'],
        availability: 'actively_looking',
        profile_complete: true
      })
    } else {
      console.log('  Profile exists')
    }

    console.log('\nTest employee account ready!')
    return
  }

  // Create new user
  console.log('  Creating auth user...')
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: TEST_EMPLOYEE.email,
    password: TEST_EMPLOYEE.password,
    email_confirm: true,
    user_metadata: {
      first_name: TEST_EMPLOYEE.firstName,
      last_name: TEST_EMPLOYEE.lastName
    }
  })

  if (authError) {
    console.error('Failed to create auth user:', authError.message)
    process.exit(1)
  }

  console.log('  Created auth user with ID:', authData.user.id)

  // Create user record
  console.log('  Creating user record...')
  const { error: userError } = await supabase.from('users').insert({
    id: authData.user.id,
    email: TEST_EMPLOYEE.email,
    role: 'employee'
  })

  if (userError) {
    console.error('Failed to create user record:', userError.message)
  }

  // Create profile
  console.log('  Creating profile...')
  const { error: profileError } = await supabase.from('profiles').insert({
    user_id: authData.user.id,
    first_name: TEST_EMPLOYEE.firstName,
    last_name: TEST_EMPLOYEE.lastName,
    email: TEST_EMPLOYEE.email,
    headline: 'Test Employee for E2E',
    role_type: 'engineer',
    ai_tools: ['Claude Code', 'Cursor'],
    availability: 'actively_looking',
    profile_complete: true
  })

  if (profileError) {
    console.error('Failed to create profile:', profileError.message)
  }

  console.log('\nTest employee account created successfully!')
  console.log(`  Email: ${TEST_EMPLOYEE.email}`)
  console.log(`  Password: ${TEST_EMPLOYEE.password}`)
}

createTestEmployee().catch(console.error)
