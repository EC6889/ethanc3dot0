# Ethan C. | Operational Architect Portfolio

A high-end, tech-forward portfolio designed for a CX Strategist & Operational Architect. This project visualizes the bridge between abstract strategy and concrete technical execution through a "Terminal to the Future" aesthetic.

## 🚀 Features

- **Immersive "Blast Door" Transitions:** Scroll-driven entrance and exit animations that physically separate content sections.
- **Terminal Aesthetic:** Monospaced typography, command-line style headers, and "system status" micro-interactions.
- **Dynamic Data Visualization:** Skill proficiency meters and "Action Module" experience layouts.
- **Fluid Navigation:** Magnetic "sliding pill" navbar and "curtain reveal" mobile menu.
- **High-Performance Animations:** Built with `framer-motion` for 60fps scroll-linked physics.
- **Dark Mode Core:** A strict `slate-950` palette with neon cyan/blue accents (The "Tri-Core Spectrum").

## 🛠️ Tech Stack

- **Framework:** React 18+ (TypeScript)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Utilities:** jsPDF (Resume generation)

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔍 Code Quality

### Linting

```bash
npm run lint          # Check for code issues
npm run lint:fix      # Auto-fix issues where possible
```

### Formatting

```bash
npm run format        # Format all code with Prettier
```

### Configuration

- **ESLint**: Configured with ESLint v9 flat config (`eslint.config.js`)
  - TypeScript + React plugins enabled
  - Lenient rules for portfolio content (allows quotes in JSX, console.log)
  - Auto-ignores build files and scripts
- **Prettier**: Consistent code formatting (`.prettierrc.json`)
- **EditorConfig**: Cross-editor consistency (`.editorconfig`)

## 📦 Deployment

Deploy to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy dist
```

## 🛡️ Error Handling

The app includes an Error Boundary component that catches and displays errors gracefully with a cyberpunk-themed error screen.

## ⚡ Performance

- React.memo applied to pure components (Footer, Navbar, legal pages)
- Optimized bundle size (~450KB gzipped)
- Lazy loading can be added for routes if needed

## 📂 Structure

- `components/` - UI building blocks (Hero, About, Experience, etc.)
- `constants.ts` - Content data (Experience logs, Project case studies)
- `types.ts` - TypeScript interfaces
- `Brand Guideline.md` - Design system documentation

## 🎨 Design System

The design follows the "Operational Architect" persona:

- **Font Family:** Space Grotesk (Display), Inter (Body), JetBrains Mono (Data).
- **Colors:** Slate (Void), Cyan (Strategy), Blue (Tech), Purple (Ops).

## 📄 License

Proprietary portfolio content.
