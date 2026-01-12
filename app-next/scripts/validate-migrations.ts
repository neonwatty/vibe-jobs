#!/usr/bin/env npx tsx
/**
 * Validates Supabase migration files
 * - Checks naming convention (timestamp_description.sql)
 * - Ensures files are not empty
 * - Checks for common SQL syntax issues
 */

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const MIGRATIONS_DIR = join(process.cwd(), 'supabase/migrations')

// Migration filename pattern: YYYYMMDDHHMMSS_description.sql
const MIGRATION_PATTERN = /^(\d{14})_([a-z][a-z0-9_]*)\.sql$/

interface ValidationResult {
  file: string
  errors: string[]
  warnings: string[]
}

async function validateMigrations(): Promise<boolean> {
  console.log('Validating migrations in:', MIGRATIONS_DIR)
  console.log('')

  let hasErrors = false
  const results: ValidationResult[] = []

  try {
    const files = await readdir(MIGRATIONS_DIR)
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort()

    if (sqlFiles.length === 0) {
      console.log('No migration files found.')
      return true
    }

    console.log(`Found ${sqlFiles.length} migration file(s)`)
    console.log('')

    // Track timestamps to detect duplicates
    const timestamps: Map<string, string> = new Map()

    for (const file of sqlFiles) {
      const result: ValidationResult = { file, errors: [], warnings: [] }

      // Check filename format
      const match = file.match(MIGRATION_PATTERN)
      if (!match) {
        result.errors.push(
          `Invalid filename format. Expected: YYYYMMDDHHMMSS_description.sql`
        )
      } else {
        const [, timestamp, description] = match

        // Check for duplicate timestamps
        if (timestamps.has(timestamp)) {
          result.errors.push(
            `Duplicate timestamp with: ${timestamps.get(timestamp)}`
          )
        }
        timestamps.set(timestamp, file)

        // Warn if description is too short
        if (description.length < 3) {
          result.warnings.push('Description is very short, consider being more descriptive')
        }
      }

      // Read and validate file content
      const filePath = join(MIGRATIONS_DIR, file)
      const content = await readFile(filePath, 'utf-8')

      // Check if file is empty
      if (content.trim().length === 0) {
        result.errors.push('Migration file is empty')
      } else {
        // Basic SQL syntax checks
        const lines = content.split('\n')
        const nonCommentLines = lines.filter(
          line => !line.trim().startsWith('--') && line.trim().length > 0
        )

        if (nonCommentLines.length === 0) {
          result.warnings.push('Migration only contains comments')
        }

        // Check for common issues
        if (content.includes('DROP DATABASE')) {
          result.errors.push('Migration contains DROP DATABASE - this is dangerous!')
        }

        if (content.includes('TRUNCATE') && !content.includes('CASCADE')) {
          result.warnings.push('TRUNCATE without CASCADE may fail due to foreign keys')
        }

        // Check for missing semicolons at statement ends
        // (Just check if the file ends with a semicolon)
        const lastPart = content.trimEnd()
        if (lastPart.length > 0 && !lastPart.endsWith(';')) {
          result.warnings.push('File does not end with a semicolon')
        }
      }

      results.push(result)
    }

    // Print results
    for (const result of results) {
      const hasIssues = result.errors.length > 0 || result.warnings.length > 0

      if (result.errors.length > 0) {
        hasErrors = true
        console.log(`❌ ${result.file}`)
        for (const error of result.errors) {
          console.log(`   ERROR: ${error}`)
        }
      } else if (result.warnings.length > 0) {
        console.log(`⚠️  ${result.file}`)
      } else {
        console.log(`✅ ${result.file}`)
      }

      for (const warning of result.warnings) {
        console.log(`   WARNING: ${warning}`)
      }

      if (hasIssues) {
        console.log('')
      }
    }

    console.log('')
    if (hasErrors) {
      console.log('❌ Validation failed with errors')
    } else {
      console.log('✅ All migrations passed validation')
    }

    return !hasErrors
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error('Migration directory not found:', MIGRATIONS_DIR)
      return false
    }
    throw err
  }
}

// Run validation
validateMigrations()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Validation error:', err)
    process.exit(1)
  })
