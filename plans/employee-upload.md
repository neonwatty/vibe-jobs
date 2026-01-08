# Employee Profile Upload

## Philosophy
Vibe Jobs requires users to parse their own resume using an LLM. This serves as a soft filter: if you can't use ChatGPT to convert a resume to JSON, this platform isn't for you.

---

## Upload Flow

1. User uploads their resume (PDF/DOCX) - we store the original
2. User pastes JSON-parsed version of their resume
3. We validate the JSON against our schema
4. Profile is created and stored - they only do this once
5. One-click apply to jobs using stored profile

---

## JSON Schema

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "location": "string",
  "linkedin_url": "string (optional)",

  "experience": [
    {
      "company": "string",
      "title": "string",
      "start_date": "string (YYYY-MM)",
      "end_date": "string (YYYY-MM or 'present')",
      "description": "string"
    }
  ],

  "education": [
    {
      "school": "string",
      "degree": "string",
      "field": "string",
      "year": "number"
    }
  ],

  "ai_tools": ["string"],
  "portfolio_urls": ["string"],
  "availability": "actively_looking | open | not_looking",
  "role_type": "engineer | marketer | sales | product | ops | other"
}
```

---

## Prompt Template (Provided to Users)

We give users this prompt to run with their resume:

```
Parse my resume into the following JSON structure. Be accurate and concise.

{
  "first_name": "",
  "last_name": "",
  "email": "",
  "location": "",
  "linkedin_url": "",
  "experience": [
    {
      "company": "",
      "title": "",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or present",
      "description": ""
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "field": "",
      "year": 0
    }
  ],
  "ai_tools": [],
  "portfolio_urls": [],
  "availability": "actively_looking",
  "role_type": ""
}

For ai_tools, portfolio_urls, availability, and role_type - leave empty if not mentioned, I will fill these in manually.
```

---

## UI Components Needed

- Resume file upload (PDF/DOCX)
- JSON paste textarea with validation
- Schema reference / copy-paste prompt button
- AI tools multi-select (manual input after JSON upload)
- Portfolio URLs input (manual input after JSON upload)
- Availability selector
- Role type selector

---

## Validation Rules

- Required: first_name, last_name, email, role_type
- Email must be valid format
- At least one experience entry recommended (warning, not blocker)
- ai_tools array must not be empty (this is Vibe Jobs after all)

---

## Open Questions

- Do we validate JSON client-side, server-side, or both?
- Do we allow profile editing after creation, or require re-upload?
- Should we show a preview of the parsed profile before saving?
