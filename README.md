# Qasim Bokhari - Portfolio Website

A cinematic portfolio website showcasing cinematography, photography, and video editing work.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your EmailJS credentials in `.env`:
     - Get credentials from https://www.emailjs.com/
     - `VITE_EMAILJS_SERVICE_ID`: Your EmailJS service ID
     - `VITE_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
     - `VITE_EMAILJS_PUBLIC_KEY`: Your EmailJS public key

3. Run the app:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

## Project Structure

- `src/components/` - React components (Hero, Portfolio, Contact, etc.)
- `src/data/` - Portfolio data and testimonials
- `public/` - Static assets
