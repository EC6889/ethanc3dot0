# MASTER_GUIDE.md

## 1. Project Overview

**Title:** Ethan C. | Operational Architect Portfolio
**Role:** CX Strategist & Operational Architect
**Concept:** "Terminal to the Future" / "Operational Architect"
**Core Aesthetic:** Dark, Sci-Fi, Cyberpunk-Lite, Glassmorphism, Neon Accents.

This project is a high-performance, visually immersive portfolio built to demonstrate the intersection of strategic operations and technical execution. It uses a "Tri-Core Spectrum" color system (Cyan, Blue, Purple) to represent different facets of the user's expertise.

## 2. Tech Stack

- **Core Framework:** React 18+ (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (PostCSS)
- **Animation:** Framer Motion (Scroll, Layout, Micro-interactions)
- **Icons:** Lucide React
- **Utilities:** jsPDF (Resume Generation), Recharts (Data Viz)

## 3. Architecture & File Structure

```
/src
├── components/          # Major section components
│   ├── ui/              # Reusable UI atoms (GlassCard, Grids, etc.)
│   ├── Hero.tsx         # Landing section with telemetry
│   ├── About.tsx        # Profile & "Module" cards
│   ├── Experience.tsx   # Timeline & Work History
│   ├── Skills.tsx       # Tech stack visualization
│   ├── Projects.tsx     # Case studies with File Tree nav
│   ├── Contact.tsx      # Terminal-style contact form
│   ├── Navbar.tsx       # Sticky nav & Mobile menu
│   └── Footer.tsx       # Footer & Socials
├── constants.ts         # SINGLE SOURCE OF TRUTH for content
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main composition layer
├── index.css            # Global styles & Tailwind imports
└── main.tsx             # Entry point
```

### Key Principles

1.  **Data-Driven:** All text, project data, and experience logs are stored in `constants.ts`. Components render based on this data.
2.  **Composition:** `App.tsx` stacks the major components sequentially.
3.  **Global State:** Minimal global state. Local state is used for component-specific interactions (e.g., selected project, hover states).

## 4. Component Deep Dive

### 4.1. Hero (`Hero.tsx`)

- **Purpose:** Immediate visual impact and persona establishment.
- **Key Features:**
  - **Telemetry:** Displays real-time time, location, network status, and battery (via `useTelemetry` hook).
  - **Parallax:** Background elements move at different speeds using `useScroll` and `useTransform`.
  - **Typewriter:** Cycles through roles (Ops Lead, CX Strategist, etc.).
- **Animation:** Heavy use of `framer-motion` for entrance effects.

### 4.2. About (`About.tsx`)

- **Purpose:** Professional bio and "System Modules" (core competencies).
- **Key Features:**
  - **Perspective Grid:** Uses `PerspectiveGrid` component for a 3D floor effect.
  - **Module Cards:** 2-column grid connected by a central "Data Pipeline".
  - **Connectors:** SVG/Div lines drawn from the center spine to each card.
- **Logic:** `ModuleCard` sub-component handles its own hover state and "lit" status.

### 4.3. Experience (`Experience.tsx`)

- **Purpose:** Work history timeline.
- **Key Features:**
  - **Navigation:** Left sidebar list of roles.
  - **Content:** Right panel details (Responsibilities, Achievements, Tech Stack).
  - **Image Fallback:** Uses `TechLogo` logic to fallback to local images if remote URLs fail.
- **Interaction:** Clicking a role updates the `selectedJob` state and animates the content switch.

### 4.4. Skills (`Skills.tsx`)

- **Purpose:** Visualizing the relationship between Tech Stack and Competencies.
- **Key Features:**
  - **Interactive Lines:** Hovering a skill draws SVG lines to related categories.
  - **Optimization:** Uses `requestAnimationFrame` in `calculateLines` to prevent layout thrashing during rapid mouse movements.
  - **Categories:** "Tech Stack" (Left) vs "Core Modules" (Right).

### 4.5. Projects (`Projects.tsx`)

- **Purpose:** Detailed case studies.
- **Key Features:**
  - **File Tree:** "Windows Explorer" / "VS Code" style navigation sidebar.
  - **Glass Display:** Main content area uses `GlassCard`.
  - **Metrics:** Animated progress bars for project impact.

### 4.6. Contact (`Contact.tsx`)

- **Purpose:** Lead generation.
- **Key Features:**
  - **Terminal Form:** Input fields styled like a command-line interface.
  - **Resume Download:** Generates a PDF on the fly using `jsPDF` and content from `constants.ts`.
  - **Validation:** Simple state-based validation and "sending" simulation.

### 4.7. Footer (`Footer.tsx`)

- **Purpose:** Final navigation, social links, and branding.
- **Key Features:**
  - **3-Column Layout:** Brand/CTA, Quick Links, Connect (Email, LinkedIn, GitHub).
  - **CTA:** "Ready to Collaborate?" with link to Contact section.
  - **Tech Stack:** Displays React, TypeScript, and Tailwind logos.
  - **Minimalist Design:** Clean, cohesive with overall site aesthetic.
- **Styling:** Subtle grid background, cyan accents, monospace typography.

### 4.7. Navbar (`Navbar.tsx`)

- **Purpose:** Navigation and Resume access.
- **Key Features:**
  - **Scroll Awareness:** Changes appearance (glassmorphism) after scrolling.
  - **Active State:** Highlights current section based on scroll position.
  - **Mobile Menu:** Full-screen overlay with "Sci-Fi" entrance animation.
  - **Logo:** Uses AI-generated "EC" logo with circuit board design (`/assets/logo.png`, 200x200px).

### 4.8. Logo & Branding Assets

- **Logo:** `/public/assets/logo.png` (200x200px) - AI-generated "EC" logo with circuit board design in brand colors
- **Favicon:** `/public/favicon.png` (64x64px) - Smaller version of the logo for browser tabs
- **Source:** `/public/assets/logo-source.png` (1024x1024px) - Original high-resolution source image
- **Colors:** Cyan (#22d3ee), Blue (#3b82f6), Purple (#a855f7) gradients
- **Style:** Modern tech aesthetic with circuit board elements and connected nodes


## 5. UI Library (`components/ui`)

These are reusable "atoms" used to build the larger sections.

- **`GlassCard.tsx`**: The fundamental building block. Provides the translucent background, border, and blur effect. Supports `hoverEffect` prop for 3D lift.
- **`InteractiveGrid.tsx`**: Canvas-based starfield background. Responds to mouse movement.
- **`PerspectiveGrid.tsx`**: CSS-3D transformed grid plane for the `About` section floor.
- **`DataPipeline.tsx`**: Vertical animated gradient lines that visually connect sections.
- **`TechLogo.tsx`**: Smart image component that handles loading errors by switching to a local fallback.
- **`BackgroundBoxes.tsx`**: Decorative grid pattern used in `Hero` or `Projects`.

## 6. Styling & Design System

### 6.1. Brand Identity

**Essence:** Precision, Scalability, Futurism.
**Core Concept:** "The Terminal to the Future." The UI mimics a high-end command center—dark, data-rich, and distraction-free.

### 6.2. Color System (The Tri-Core Spectrum)

| Token               | Hex       | Name              | Usage                                       |
| :------------------ | :-------- | :---------------- | :------------------------------------------ |
| `brand-cyan`        | `#22d3ee` | **Neon Cyan**     | Highlights, Active States, Primary Accents. |
| `brand-cyan-dim`    | `#06b6d4` | **Muted Cyan**    | Secondary highlights.                       |
| `brand-cyan-deep`   | `#164e63` | **Deep Cyan**     | Backgrounds, borders.                       |
| `brand-blue`        | `#3b82f6` | **Electric Blue** | Links, Interactive Elements.                |
| `brand-blue-dim`    | `#2563eb` | **Muted Blue**    | Secondary links.                            |
| `brand-blue-deep`   | `#1e3a8a` | **Deep Blue**     | Backgrounds, borders.                       |
| `brand-purple`      | `#a855f7` | **Deep Purple**   | Gradients, Depth Indicators.                |
| `brand-purple-dim`  | `#9333ea` | **Muted Purple**  | Secondary gradients.                        |
| `brand-purple-deep` | `#581c87` | **Deep Purple**   | Backgrounds, borders.                       |

**Backgrounds:**

- `slate-950` (#020617): Void (Main Background)
- `slate-900` (#0f172a): Console (Cards)
- `slate-800` (#1e293b): Border

### 6.3. Typography

**Font Families:**
- **Display:** `Orbitron` (Headers, Section Titles). Geometric, futuristic, purpose-built for tech interfaces.
- **Body:** `Inter` (Paragraphs, UI Labels). Neutral, highly legible, professional.
- **Mono:** `JetBrains Mono` (Tags, Dates, Terminal Inputs). Monospaced, engineered, technical.
- **Accent:** `Audiowide` (CTAs, Special Emphasis). Ultra-tech, retro-futuristic, high-impact.

**Typography Scale:**
- Display: `display-xl` (80px), `display-lg` (56px), `display-md` (40px), `display-sm` (28px)
- Body: `body-lg` (18px), `body-md` (16px), `body-sm` (14px), `body-xs` (12px)
- Mono: `mono-lg` (14px), `mono-md` (12px), `mono-sm` (10px)
- Accent: `accent-lg` (32px), `accent-md` (24px)

**Usage Guidelines:**
- Use `font-display` for all headers and section titles
- Use `font-sans` for body text and descriptions
- Use `font-mono` for data, tags, and technical elements
- Use `font-accent` for CTAs and special emphasis

### 6.4. Iconography & Imagery

- **Icons:** `Lucide-react`. Stroke width `1.5px` or `2px`.
- Visuals: No photography (except for Logo/Favicon). Use CSS-generated gradients, glowing orbs, and grid lines.

### 6.5. Interaction Patterns

- **Hover:** Glow effects, border color shift.
- **Active:** Neon underline or "light up" indicator.
- **Glassmorphism:** `bg-slate-900/40`, `backdrop-blur-md`, `border-slate-800`.

## 7. Animation Guidelines

- **Library:** Use `framer-motion` for all complex animations.
- **Performance:**
  - Use `transform` (x, y, scale, rotate) and `opacity` for smooth 60fps animations.
  - Avoid animating `width`, `height`, `top`, `left` unless absolutely necessary (causes reflow).
  - Use `layout` prop for shared element transitions (e.g., the active tab background in Navbar).
- **Standard Transitions:**
  - `ease: "circOut"` for snappy entrances.
  - `type: "spring"` for physical, tactile interactions.

## 8. Development Rules (For AI & Developers)

1.  **Strict Typing:** Do **NOT** use `any`. Define interfaces in `types.ts` or locally if specific to a component.
2.  **Content Management:** If the user asks to change text, dates, or job descriptions, edit `constants.ts`. Do not hardcode text in components.
3.  **Typography Standards (GLOBAL):**
    - **ALWAYS** use the new typography system for all components
    - Headers: Use `font-display` with `text-display-*` classes (Orbitron font)
    - Body text: Use `font-sans` with `text-body-*` classes (Inter font)
    - Code/Data: Use `font-mono` with `text-mono-*` classes (JetBrains Mono)
    - CTAs/Special: Use `font-accent` with `text-accent-*` classes (Audiowide font)
    - **DO NOT** use arbitrary text sizes - stick to the defined scale
4.  **Aesthetic Consistency:**
    - Always use `slate-950` or `slate-900` for backgrounds.
    - Use `backdrop-blur` and `bg-opacity` for glass effects.
    - Maintain the "Terminal" look: Monospace fonts for labels, uppercase text, "system status" indicators.
4.  **Performance:**
    - When adding scroll listeners, use `useEffect` with cleanup.
    - For heavy visual updates (like the lines in `Skills.tsx`), use `requestAnimationFrame`.
5.  **Mobile First:** Ensure all grids collapse to 1 column on mobile (`md:grid-cols-2`). Check touch targets for buttons.

## 9. How to Modify

- **To Add a Project:** Add a new entry to `PROJECTS_DATA` in `constants.ts`.
- **To Add a Job:** Add to `EXPERIENCE_DATA` in `constants.ts`.
- **To Change Colors:** Update `tailwind.config.js` or use the existing `brand-*` utility classes.
- **To Fix Images:** Ensure images are in `public/assets/` and referenced correctly in `constants.ts`. Use `TechLogo` for external logos to ensure fallbacks work.

## 10. Resume Content (Source of Truth)

_Content used for PDF generation via `scripts/generate-pdf.js`_

**ETHAN C. | CX OPERATIONS MANAGER & STRATEGIST**
Location: Kuala Lumpur, Malaysia | Email: gmeal6889@gmail.com | LinkedIn: linkedin.com/in/echia6889

**PROFESSIONAL PROFILE**
Results-oriented CX Leader with 15+ years of experience managing contact center operations in Hospitality and Logistics. Proven track record of bridging the gap between operational needs and technical solutions. Expert in leading high-performance teams, implementing enterprise software (Zendesk/Salesforce), and driving efficiency through process automation and data analytics.

**CORE COMPETENCIES**

- CX Operations Management
- Digital Transformation & Strategy
- System Implementation (SaaS/CRM)
- Process Improvement & Automation
- Crisis Management & BCP
- Vendor Management & Cost Control
- Data Analytics & Reporting
- Cross-Functional Leadership

**TECHNICAL PROFICIENCY**

- Core Platforms: Zendesk, Genesys Cloud, Salesforce, Cisco UCCX
- Productivity: Google Workspace, Apps Script, Looker Studio
- Collaboration: Lark, Slack, Microsoft Teams
- Integration: Zapier, Webhooks, REST API, Postman
- Hospitality: SiteMinder, Opera PMS, SISTIC

**PROFESSIONAL EXPERIENCE**
_See `constants.ts` or `pdf_content.txt` archive for full history._

- **Ninja Van (2024 – Mar 2025):** Shipper Support Manager
- **Klook Travel (2018 – 2022):** CEG System Manager / Operations Manager
- **Melco Crown Entertainment (2009 – 2017):** Service Quality Manager / Assistant Manager
