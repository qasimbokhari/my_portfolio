# SECRETS_EXPOSURE Fix Plan

## Changes

- `src/components/Contact.tsx` — Replace hardcoded EmailJS credentials with environment variables
- `.env.example` — Create new file with placeholder EmailJS credentials
- `vite.config.ts` — Add environment variable type definitions
- `README.md` — Add environment variable setup instructions

## New files

- `.env.example` — Template for environment variables with placeholder values
- `.env` — Local environment file (not committed, created by developer)

## Verification goals

After implementation, ALL of these must be true:

- [ ] `.env.example` exists with placeholder values for EmailJS credentials
- [ ] `.env` file exists locally but is not tracked by git
- [ ] `Contact.tsx` uses `import.meta.env.VITE_EMAILJS_SERVICE_ID` instead of hardcoded "service_8i3bn9k"
- [ ] `Contact.tsx` uses `import.meta.env.VITE_EMAILJS_TEMPLATE_ID` instead of hardcoded "template_hgvudqa"
- [ ] `Contact.tsx` uses `import.meta.env.VITE_EMAILJS_PUBLIC_KEY` instead of hardcoded "IJ9TmEaoO9A4r_DL4"
- [ ] `vite.config.ts` defines the environment variable types for TypeScript
- [ ] No hardcoded EmailJS credentials remain in any source file
- [ ] Application still functions correctly with environment variables
- [ ] README.md documents how to set up environment variables

## Manual verification (for the human)

- Step 1: Create a `.env` file locally with your actual EmailJS credentials
- Step 2: Run `npm run dev` to verify the application starts without errors
- Step 3: Test the contact form to ensure EmailJS integration still works
- Step 4: Verify that committing `.env` is blocked by .gitignore
