# Next.js 16+ Project Initialization

## Overview
Initialized a high-performance E-commerce frontend with Next.js 16+, Tailwind CSS v4, and TypeScript, configured for Persian (RTL) support.

## Key Features
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Typography**: IRANSans (configured in `layout.tsx` and `globals.css`)
- **Layout**: RTL direction enforced globally
- **Architecture**: Polyglot-ready folder structure

## Directory Structure
```
src/
├── app/                 # App router pages
│   ├── layout.tsx       # Root layout with Font & RTL setup
│   ├── page.tsx         # Home page with Persian greeting
│   └── globals.css      # Global styles & Tailwind theme
├── components/
│   ├── ui/              # Atomic components
│   ├── layout/          # Header, Footer, Sidebar
│   └── features/        # Domain-specific components
├── lib/
│   ├── utils.ts         # cn utility (clsx + tailwind-merge)
│   ├── types/           # Global TypeScript interfaces
│   └── mock/            # Static JSON data
└── styles/              # Global style overrides
```

## Next Steps
1. **Add Font Files**: Place the following files in `public/fonts/`:
   - `IRANSansWeb_Light.woff2`
   - `IRANSansWeb.woff2`
   - `IRANSansWeb_Bold.woff2`
2. **Start Development**: Run `npm run dev` to start the server.
