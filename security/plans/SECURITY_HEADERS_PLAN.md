# SECURITY_HEADERS Fix Plan

## Changes

- `vercel.json` — Add Content-Security-Policy header

## New files

None.

## Verification goals

After implementation, ALL of these must be true:

- [ ] Content-Security-Policy header is present in vercel.json
- [ ] CSP allows 'self' for default resources
- [ ] CSP allows EmailJS domains (api.emailjs.com)
- [ ] CSP allows Cal.com domain (cal.com)
- [ ] CSP allows media CDN (media.qasim.live)
- [ ] CSP allows inline styles for Tailwind CSS
- [ ] All five required headers are present (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] Application still functions correctly with CSP enforced

## Manual verification (for the human)

- Step 1: Deploy the updated vercel.json to Vercel
- Step 2: Open browser DevTools and check the Network tab
- Step 3: Verify all five security headers are present on responses
- Step 4: Test the contact form to ensure EmailJS still works
- Step 5: Test the Cal.com embed to ensure it still loads
- Step 6: Check Console for any CSP violations
