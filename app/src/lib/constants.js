/**
 * Vibe Jobs Constants
 */

// Blocked personal email domains for employer signups
export const BLOCKED_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.co.in',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'yandex.com',
  'mail.com',
  'gmx.com',
  'fastmail.com',
  'tutanota.com',
  'hey.com'
])

/**
 * Check if an email domain is blocked for employer signup
 */
export function isBlockedDomain(email) {
  const domain = email?.split('@')[1]?.toLowerCase()
  return BLOCKED_EMAIL_DOMAINS.has(domain)
}

/**
 * Extract domain from email
 */
export function extractDomain(email) {
  return email?.split('@')[1]?.toLowerCase()
}

// AI Tools organized by category
export const AI_TOOLS = {
  coding: [
    'Claude Code',
    'Cursor',
    'GitHub Copilot',
    'Codeium',
    'Windsurf',
    'Replit AI',
    'Tabnine',
    'Amazon CodeWhisperer'
  ],
  chat: [
    'Claude',
    'ChatGPT',
    'Gemini',
    'Perplexity',
    'Grok',
    'Mistral'
  ],
  writing: [
    'Claude',
    'ChatGPT',
    'Jasper',
    'Copy.ai',
    'Notion AI',
    'Grammarly AI'
  ],
  image: [
    'Midjourney',
    'DALL-E',
    'Stable Diffusion',
    'Figma AI',
    'Canva AI',
    'Adobe Firefly'
  ],
  video: [
    'Runway',
    'Pika',
    'ElevenLabs',
    'Descript',
    'Synthesia'
  ],
  automation: [
    'Zapier AI',
    'Make',
    'n8n',
    'Bardeen'
  ],
  data: [
    'Julius AI',
    'ChatGPT Code Interpreter',
    'Tableau AI'
  ],
  nocode: [
    'v0',
    'Bolt',
    'Lovable',
    'Framer AI'
  ]
}

// Flattened list of all AI tools
export const ALL_AI_TOOLS = Object.values(AI_TOOLS).flat()

// Unique list (removing duplicates like Claude/ChatGPT that appear in multiple categories)
export const UNIQUE_AI_TOOLS = [...new Set(ALL_AI_TOOLS)].sort()

// Role categories
export const ROLE_CATEGORIES = [
  { value: 'engineer', label: 'Engineer' },
  { value: 'designer', label: 'Designer' },
  { value: 'product', label: 'Product' },
  { value: 'marketer', label: 'Marketer' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'writer', label: 'Writer' },
  { value: 'other', label: 'Other' }
]

// Experience levels
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead / Principal' }
]

// Employment types
export const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' }
]

// Location types
export const LOCATION_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' }
]

// AI proficiency levels
export const AI_PROFICIENCY_LEVELS = [
  { value: 'familiar', label: 'Familiar', description: 'Basic understanding and occasional use' },
  { value: 'proficient', label: 'Proficient', description: 'Regular use in daily workflow' },
  { value: 'expert', label: 'Expert', description: 'Advanced techniques and custom workflows' }
]

// Availability statuses
export const AVAILABILITY_STATUSES = [
  { value: 'actively_looking', label: 'Actively Looking', description: 'Ready to interview now' },
  { value: 'open', label: 'Open to Opportunities', description: 'Not actively searching but open to the right role' },
  { value: 'not_looking', label: 'Not Looking', description: 'Not interested in new opportunities' }
]

// AI culture levels for companies
export const AI_CULTURE_LEVELS = [
  { value: 'encouraged', label: 'AI Encouraged', description: 'AI tools are welcome but not required' },
  { value: 'expected', label: 'AI Expected', description: 'Team members are expected to use AI tools' },
  { value: 'required', label: 'AI Required', description: 'AI fluency is a job requirement' }
]

// Application statuses
export const APPLICATION_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'secondary' },
  { value: 'reviewed', label: 'Reviewed', color: 'accent' },
  { value: 'interviewing', label: 'Interviewing', color: 'accent' },
  { value: 'rejected', label: 'Rejected', color: 'error' },
  { value: 'offer', label: 'Offer', color: 'success' },
  { value: 'withdrawn', label: 'Withdrawn', color: 'error' }
]

// Job statuses
export const JOB_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'closed', label: 'Closed' }
]

// Salary range filter options
export const SALARY_RANGES = [
  { min: 0, label: 'Any' },
  { min: 100000, label: '$100k+' },
  { min: 150000, label: '$150k+' },
  { min: 200000, label: '$200k+' },
  { min: 250000, label: '$250k+' }
]

// Test format templates by role
export const TEST_FORMAT_TEMPLATES = {
  engineer: "1-hour live build: We'll give you a design and watch you build it with your AI tools. No whiteboard puzzles - just real coding with the tools you actually use.",
  designer: "2-hour design challenge: Create mockups for a feature we describe. Use Figma AI, Midjourney, or whatever tools you prefer.",
  product: "2-hour PRD sprint: Write a product spec for a feature we describe. Any tools allowed - we want to see how you think and work.",
  marketer: "1-hour campaign brief: Create a go-to-market plan for a product launch. Show us your AI-assisted research and copywriting process.",
  sales: "30-min pitch prep: We'll give you a prospect profile. Show us how you use AI to research, personalize, and prepare.",
  ops: "1-hour automation challenge: Design a workflow automation for a process we describe. Use Zapier, Make, or whatever tools you prefer.",
  writer: "1-hour content creation: Write a blog post or marketing copy on a topic we provide. Show us your AI-assisted writing workflow.",
  other: "Practical skills assessment: We'll design a test relevant to your specific role that lets you demonstrate your AI-augmented workflow."
}
