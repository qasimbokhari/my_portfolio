# SITE_DIRECTION.md

**Audit Date:** July 19, 2026  
**Purpose:** Snapshot of current site positioning, structure, and content before repositioning decisions

---

## 1. Current Identity/Positioning

### Hero Section
**File:** `src/components/Hero.tsx` (lines 60-71)

- **Eyebrow:** "Based in Islamabad | Available Nationwide"
- **Headline:** "Qasim Bokhari"
- **Subheadline:** "Commercial & Brand Films · Photography · Motion Graphics · Branding · Event & Wedding Cinematography"
- **CTA:** "Book a Shoot / Get a Quote"

### About Section
**File:** `src/components/About.tsx` (lines 69-79)

- **Bio Copy:** "I'm Qasim Bokhari, a nationwide media producer based in Islamabad. I specialize in commercial video, photography, branding, and motion graphics, taking projects from initial concept all the way through execution and final delivery."
- **Additional Context:** "My approach is completely hands-on. Whether I'm directing a shoot, color grading, or designing in the Adobe Creative Suite, the creative vision stays entirely with me."
- **Services Listed:** Commercial Video, Photography, Motion Graphics, Branding, Premiere Pro, After Effects, Lightroom, Photoshop & Illustrator, Wedding Cinematography, Documentary Films

### Meta Tags & Page Title
**File:** `index.html` (lines 6, 32-33, 39-40, 55)

- **Meta Description:** "Qasim Bokhari — commercial video production in Islamabad. Product films, brand reels, and social media content for restaurants, retail, and growing brands who need content that converts."
- **Page Title:** "Qasim Bokhari | Commercial Video Production — Islamabad"
- **OG Title:** "Qasim Bokhari | Commercial Video Production — Islamabad"
- **OG Description:** "Product films, brand reels, and social media content for restaurants, retail, and growing brands. Based in Islamabad."
- **Twitter Title:** "Qasim Bokhari | Commercial Video Production — Islamabad"
- **Twitter Description:** "Product films, brand reels, and social media content for restaurants, retail, and growing brands. Based in Islamabad."

### Structured Data
**File:** `index.html` (lines 11-27)

- **jobTitle:** "Commercial Video Producer"
- **@type:** "Person"
- **name:** "Qasim Bokhari"

### Inconsistencies Noted
- Hero subheadline lists "Branding" as a service, but About section bio describes specialization as "commercial video, photography, branding, and motion graphics"
- Meta layer consistently emphasizes "commercial video production" as primary identity
- No mention of "creative direction" in any current positioning copy

---

## 2. Site Structure

### Main Sections (in order they appear)
**File:** `src/App.tsx` (lines 74-99)

1. Hero (fullscreen video background)
2. Portfolio (project reel)
3. How It Works (process steps)
4. Services (pricing tiers)
5. About (biography and stats)
6. Testimonials (client reviews)
7. Contact (form and direct details)
8. Booking (Cal.com embed)

### Navigation Items
**File:** `src/components/Header.tsx` (lines 53-61)

- Portfolio, How It Works, Services, About, Testimonials, Contact, Booking

### Portfolio Categories & Project Count
**File:** `src/data/portfolioData.ts` (lines 3-327)

Total projects: 12

1. **Narrative Short Film & Cinema · Ongoing** (1 project: Hostel Diaries)
2. **Commercial Video Production · 2025** (1 project: NUST NEXUS)
3. **Social Media & Reel Production · 2025** (1 project: Instagram Reels)
4. **Corporate Brand Film & Drone Video · 2025** (1 project: Aero Maverick)
5. **Commercial Motion Design & Graphics · 2025** (1 project: NUST Orientation)
6. **Travel & Landscape Photography · 2025** (1 project: Kashmir Travel)
7. **Fine Art & Street Photography · 2025** (1 project: After Rain)
8. **Corporate Event Photography & Videography · 2025** (1 project: Event Showcase)
9. **Portrait & Wedding Photography · 2025** (1 project: Saidpur Shoot)
10. **Activewear Brand Identity** (1 project: Gymaura)
11. **Luxury Fashion Brand Identity** (1 project: Obsydn)
12. **Commercial Photography & Visual Portfolio** (1 project: Selected Works)

### Project Grouping/Filtering
**File:** `src/components/Portfolio.tsx` (lines 165-183)

- No filtering system implemented
- All projects displayed in a single vertical reel
- No category-based grouping or medium-based separation
- Projects are rendered sequentially from `projectsData` array

---

## 3. Services

### Services Listed (exact quotes)
**File:** `src/components/Services.tsx` (lines 5-87)

**Category 1: Commercial & Brand Films**
- Starter Package: "A single-day shoot, ideal for a product promo, short brand video, or single social media campaign. Includes filming, basic editing, and 1-2 final deliverables (e.g., a 30-60 second video)."
- Growth Package: "Multi-shot or multi-location brand film with more complex storytelling. Includes pre-production planning, filming, professional editing, color grading, and 2-4 deliverables (long + short cuts for different platforms)."
- Full Campaign: "Multi-day shoots, multiple deliverables, motion graphics integration, and campaign-level content for brands running larger launches or seasonal pushes."

**Category 2: Photography**
- Product/Brand Photography: "Studio or on-location product/brand photography, includes editing and retouching. Priced per session (typically 20-40 final images)."
- Event/Corporate Photography: "Full coverage of corporate events, launches, or brand activations, includes edited high-res gallery."

**Category 3: Motion Graphics & Editing**
- Basic Motion Graphics: "Logo animation, text overlays, or simple animated graphics added to existing footage."
- Advanced Motion Design: "Custom animated explainer content, complex graphics packages, or animated ad campaigns."

**Category 4: Branding Support**
- Brand Content Package: "Combined photography + video + basic motion graphics, designed to give a brand a consistent visual identity across platforms — ideal for new businesses building their first content library."

**Category 5: Events & Weddings** (marked as Secondary)
- Event Coverage: "Full-day event or wedding cinematography and photography, edited highlight reel and photo gallery included."

**Category 6: Ongoing Retainers**
- Monthly Content Partner: "Ongoing monthly content production — a set number of videos, photos, and graphics delivered consistently, ideal for brands that need regular social content without hiring in-house."

**Category 7: Freelance & Micro Projects**
- Examples: "Instagram reel edit", "Single product photo", "Short promo clip", "One-off logo animation", "Quick color grading"
- Best For: "Individuals, small businesses, or anyone needing a single deliverable without booking a full shoot or package."

### Branding/Creative Direction Mentions
- "Branding" appears as a service category (Category 4: Branding Support)
- "Branding" is listed in About section services tags
- No mention of "creative direction" as a standalone service
- Branding support is positioned as "combined photography + video + basic motion graphics" rather than strategic creative direction

### Services Intro Copy
**File:** `src/components/Services.tsx` (lines 105-107)

"Full-service media production — commercial video, photography, branding, and motion graphics — at some of the most competitive rates in Pakistan, without compromising on quality."

---

## 4. Recently Added Content

### Gymaura Project
**File:** `src/data/portfolioData.ts` (lines 235-259)

- **ID:** 9
- **Title:** "Gymaura"
- **Category:** "Activewear Brand Identity"
- **Description:** "A premium activewear identity built on precision, motion, and quiet power — developed in collaboration with branding designer Annas Khokhar."
- **Long Description:** "Gymaura was envisioned as a brand that rises above the ordinary, setting a new standard in premium activewear. Developed in collaboration with branding designer Annas Khokhar, the project extended beyond a fitness identity into a full cinematic system — a geometric mark built for motion, a monochrome palette that reads as strength rather than noise, and campaign films where every frame speaks to power, elegance, and focus. From packaging and hangtags to app UI and social presence, the identity was carried consistently across every touchpoint, giving Gymaura a voice that feels engineered, not decorated."
- **Data Fields Used:** id, title, category, description, longDescription, thumbnail, videos (null), gallery (14 images)
- **Special Treatment:** Full-width gallery layout (see ProjectModal.tsx line 85)

### Obsydn Project
**File:** `src/data/portfolioData.ts` (lines 260-281)

- **ID:** 10
- **Title:** "Obsydn"
- **Category:** "Luxury Fashion Brand Identity"
- **Description:** "A heritage luxury identity for the house of Obsydn, est. 1996 — created with branding designer Annas Khokhar."
- **Long Description:** "Obsydn is a luxury fashion identity built on stillness rather than spectacle, created in collaboration with branding designer Annas Khokhar. A refined serif wordmark and a palette of ivory, black, and deep burgundy set the tone for a brand that speaks quietly and lets craftsmanship carry the message. The campaign extended the identity into short cinematic vignettes — After Hours, Between Floors, Private Moments — each exploring closeness, restraint, and the atmosphere of a room rather than the garment alone. The result is a brand world that reads as established heritage, not a launch."
- **Data Fields Used:** id, title, category, description, longDescription, thumbnail, videos (null), gallery (10 images)
- **Special Treatment:** Full-width gallery layout (see ProjectModal.tsx line 85)

### Category/Tagging Pattern Analysis
- Both projects use "Brand Identity" in category naming (Activewear Brand Identity, Luxury Fashion Brand Identity)
- This differs from other projects which use medium-based categories (e.g., "Commercial Video Production", "Travel & Landscape Photography")
- Both projects have no videos (videos: null), unlike most other projects which include video content
- Both projects mention collaboration with "branding designer Annas Khokhar"
- Both projects use the same data structure as other projects (no additional fields)
- Both projects receive special full-width gallery treatment in the modal (CSS class `project-modal--fullwidth`)

---

## 5. SEO/Meta Layer

### Meta Description
**File:** `index.html` (line 6)

"Qasim Bokhari — commercial video production in Islamabad. Product films, brand reels, and social media content for restaurants, retail, and growing brands who need content that converts."

### Open Graph Tags
**File:** `index.html` (lines 29-41)

- **OG Type:** "website"
- **OG URL:** "https://qasim.live"
- **OG Title:** "Qasim Bokhari | Commercial Video Production — Islamabad"
- **OG Description:** "Product films, brand reels, and social media content for restaurants, retail, and growing brands. Based in Islamabad."
- **OG Image:** "https://media.qasim.live/photos_webpg/thumb03-1600w.webp"

### Twitter Card Tags
**File:** `index.html` (lines 36-41)

- **Twitter Card:** "summary_large_image"
- **Twitter URL:** "https://qasim.live"
- **Twitter Title:** "Qasim Bokhari | Commercial Video Production — Islamabad"
- **Twitter Description:** "Product films, brand reels, and social media content for restaurants, retail, and growing brands. Based in Islamabad."
- **Twitter Image:** "https://media.qasim.live/photos_webpg/thumb03-1600w.webp"

### Structured Data (JSON-LD)
**File:** `index.html` (lines 11-27)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Qasim Bokhari",
  "jobTitle": "Commercial Video Producer",
  "url": "https://qasim.live",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Islamabad",
    "addressCountry": "PK"
  },
  "sameAs": [
    "https://instagram.com/qasim.arw"
  ]
}
```

### Current Positioning Reflection
- All meta tags consistently emphasize "commercial video production" as the primary identity
- No mention of "creative direction" or broader strategic positioning
- Focus is on execution (films, reels, content) rather than strategy/creative leadership
- Structured data jobTitle is "Commercial Video Producer"

---

## 6. Design/Tone Consistency Check

### Design System
**File:** `src/index.css` (lines 1-111)

- **Primary Display Font:** Cormorant Garamond (serif, italic/normal weights 300-600)
- **Body Font:** Inter (sans-serif, weights 300-700)
- **Color Palette:**
  - Background: `#080808` (near-black)
  - Gold accent: `#c9a84c`
  - Silver: `#888888`
  - White: `#f0ede8`
  - Deep: `#111111`
  - Surface: `#1a1a1a`

### Dark/Gold Cinematic Aesthetic Application
- Consistently applied across all sections (hero, portfolio, services, about, testimonials, contact)
- Gold used for: CTAs, active states, section labels, italic text emphasis, hover states
- Near-black backgrounds throughout with subtle gradients
- Letterbox bars in hero section for cinematic framing
- Grayscale filters on images with color reveal on hover

### Branding Projects (Gymaura/Obsydn) Special Treatment
**File:** `src/index.css` (lines 794-805)

```css
/* Full-width gallery for Gymaura and Obsydn */
.project-modal--fullwidth .modal-gallery {
  column-count: 1;
  column-gap: 0;
  padding: 0 0 80px;
}
.project-modal--fullwidth .modal-gallery-img {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto 40px;
  display: block;
}
```

**File:** `src/components/ProjectModal.tsx` (line 85)

```typescript
const isFullWidthGallery = selectedProject.title === "Gymaura" || selectedProject.title === "Obsydn";
```

### Consistency Assessment
- Typography and color scheme are consistent across branding projects
- Special full-width gallery layout for Gymaura/Obsydn (vs 2-column for other projects)
- Same modal structure, hero treatment, and overall visual language
- No visual divergence from dark/gold aesthetic
- The special gallery treatment suggests these projects are positioned differently but maintains design consistency

---

## Open Questions

1. **Primary Identity Shift:** Should the meta layer (jobTitle, meta descriptions, OG tags) shift from "Commercial Video Producer" to reflect creative direction as the primary identity while keeping video production as a capability?

2. **Portfolio Categorization:** The current category system mixes medium (e.g., "Commercial Video Production") with outcome (e.g., "Activewear Brand Identity"). Should categories be restructured to separate "medium" from "service type" for clearer filtering?

3. **Services Hierarchy:** "Branding Support" is currently positioned as a combined content package rather than strategic creative direction. Should this be elevated to a primary service offering with clearer distinction from execution-focused services?

4. **Project Filtering:** With 12 projects spanning different mediums and service types, should a filtering system be added to help users navigate between "video production," "photography," and "branding" work?

5. **Branding Project Presentation:** Gymaura and Obsydn currently use the same data structure as other projects but receive special gallery treatment. Should they have additional metadata fields (e.g., "client," "branding deliverables," "collaborators") to better represent the scope of branding work?

6. **Hero Section Positioning:** The hero subheadline lists "Branding" alongside execution services. Should this be rephrased to emphasize creative direction as the primary offering with video/photography as delivery mechanisms?

7. **About Section Bio:** The current bio describes specialization as "commercial video, photography, branding, and motion graphics." Should this be rewritten to lead with creative direction and strategic brand work?

8. **Testimonials Relevance:** Current testimonials focus on video production quality and delivery. Should new testimonials be sought that speak to strategic creative direction and brand-building outcomes?
