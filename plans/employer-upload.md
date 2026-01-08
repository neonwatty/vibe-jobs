# Employer Job Posting Upload

## Philosophy
Same bar as employees: if you're posting on Vibe Jobs, you can use an LLM to structure your job description. This signals you're an AI-forward company.

---

## Upload Flow

1. Employer uploads job description (plain text or PDF) - we store the original
2. Employer pastes JSON-parsed version of the job posting
3. We validate the JSON against our schema
4. Employer adds "How You'll Be Tested" section (the differentiator)
5. Job is posted and searchable

---

## JSON Schema

```json
{
  "company_name": "string",
  "job_title": "string",
  "location_type": "remote | hybrid | onsite",
  "location_details": "string (optional, e.g., 'San Francisco, CA')",

  "role_category": "engineer | marketer | sales | product | ops | other",
  "experience_level": "entry | mid | senior | lead",
  "employment_type": "full_time | part_time | contract",

  "description": "string (full job description)",

  "ai_tools_required": ["string"],
  "ai_proficiency": "familiar | proficient | expert",

  "salary_min": "number (required)",
  "salary_max": "number (required)",

  "how_youll_be_tested": "string (description of interview/test format)"
}
```

---

## Prompt Template (Provided to Employers)

We give employers this prompt to run with their job description:

```
Parse this job description into the following JSON structure. Be accurate and concise.

{
  "company_name": "",
  "job_title": "",
  "location_type": "remote | hybrid | onsite",
  "location_details": "",
  "role_category": "engineer | marketer | sales | product | ops | other",
  "experience_level": "entry | mid | senior | lead",
  "employment_type": "full_time | part_time | contract",
  "description": "",
  "ai_tools_required": [],
  "ai_proficiency": "familiar | proficient | expert",
  "salary_min": null,
  "salary_max": null,
  "how_youll_be_tested": ""
}

For ai_tools_required, ai_proficiency, and how_youll_be_tested - leave empty if not mentioned, I will fill these in manually.
```

---

## Suggested Test Formats (By Role)

Employers can write their own or pick from templates:

### Engineers
- "1-hour live build: We'll give you a problem and watch you solve it using your preferred AI tools."
- "24-hour take-home: Build a small feature end-to-end. Use any tools you want."

### Marketing
- "2-hour campaign challenge: Create a launch campaign for our product using AI tools. Walk us through your process."
- "Ad copy test: Write 5 variations for a target audience. Show us your prompts and iterations."

### Sales
- "1-hour prospecting challenge: Research a target account and draft a personalized outreach sequence using AI."
- "Mock pitch: Present our product to a simulated prospect. Prep using whatever tools you want."

### Product
- "PRD sprint: Write a product spec for a feature we describe. 2 hours, any tools allowed."
- "Strategy walkthrough: Show us a past product decision and how you'd use AI to improve the process."

---

## UI Components Needed

- Job description file upload (TXT/PDF) or paste
- JSON paste textarea with validation
- Schema reference / copy-paste prompt button
- "How You'll Be Tested" textarea with suggested templates
- AI tools multi-select
- AI proficiency level selector
- Salary range inputs (optional)
- Preview before posting

---

## Validation Rules

- Required: company_name, job_title, role_category, employment_type, description
- ai_tools_required must not be empty
- how_youll_be_tested must be non-empty (required)
- salary_min and salary_max are both required (no "competitive salary" allowed)
- salary_max must be >= salary_min

---

## Open Questions

- Do employers need accounts, or can they post with just email verification?
- Can employers edit posted jobs, or must they re-upload?
- Do we show applicant count publicly on job listings?
