# Designer Portfolio Template Manual

This project is a modern, data-driven portfolio starter built with Next.js and React. It is designed for designers who want a polished one-page portfolio with reusable sections, easy content editing, and a clean folder structure.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser at http://localhost:3000

## What This Project Does

The template renders a designer portfolio from structured content stored in JSON and uses reusable React components for each section. Instead of hardcoding everything in one file, the app is split into clear folders so content, layout, and styling can be updated independently.

## Folder Structure Guide

### src/app
This is the route layer of the app.

- [src/app/page.tsx](src/app/page.tsx) redirects the homepage to the default designer profile.
- [src/app/[slug]/page.tsx](src/app/[slug]/page.tsx) renders a portfolio based on the URL slug.
- [src/app/api/contact/route.ts](src/app/api/contact/route.ts) handles the contact form endpoint.

### src/components/designer-v1
This folder contains the UI sections of the portfolio.

Each subfolder represents a section of the page:

- [src/components/designer-v1/hero](src/components/designer-v1/hero) — intro section with headline and image
- [src/components/designer-v1/navbar](src/components/designer-v1/navbar) — top navigation
- [src/components/designer-v1/sidebar](src/components/designer-v1/sidebar) — social links
- [src/components/designer-v1/featuredProjects](src/components/designer-v1/featuredProjects) — featured work cards
- [src/components/designer-v1/designProcess](src/components/designer-v1/designProcess) — design workflow or process steps
- [src/components/designer-v1/caseStudies](src/components/designer-v1/caseStudies) — detailed case study content
- [src/components/designer-v1/tools](src/components/designer-v1/tools) — tools and stack section
- [src/components/designer-v1/contact](src/components/designer-v1/contact) — contact information and form
- [src/components/designer-v1/footer](src/components/designer-v1/footer) — footer content
- [src/components/designer-v1/strip](src/components/designer-v1/strip) — visual separators between sections

Each component also has a matching CSS module for styling.

### src/data
This folder stores the actual portfolio content.

- [src/data/varun.json](src/data/varun.json) is the main content source for the example portfolio.
- You can edit names, bio, projects, SEO, theme colors, navigation items, and contact info here.

### src/lib
This folder contains helper logic for the app.

- [src/lib/designers.ts](src/lib/designers.ts) maps slugs to designer data.
- [src/lib/mail.ts](src/lib/mail.ts) contains the email sending logic for the contact form.

### src/templates/designers-v1
This folder contains the main template assembly for the portfolio layout.

- [src/templates/designers-v1/index.tsx](src/templates/designers-v1/index.tsx) composes the page by rendering the sections in the correct order.

### src/types
This folder defines TypeScript types used to keep the content structure consistent.

- [src/types/designer.ts](src/types/designer.ts) describes the shape of the designer data.

### src/styles
This folder holds shared global styling.

- [src/styles/global.css](src/styles/global.css) contains the global CSS used across the project.

### public
This folder contains static assets that are served directly by the app.

- [public/resources/images](public/resources/images) stores images for the hero, projects, tools, and other sections.

### scripts
This folder includes helper scripts for the project.

- [scripts/tree.cjs](scripts/tree.cjs) generates the project tree for documentation or inspection.

## How to Customize the Portfolio

### 1. Change the portfolio content
Update [src/data/varun.json](src/data/varun.json) to change:

- personal profile information
- social links
- hero text and CTA
- featured projects
- design process steps
- tools and technologies
- contact details
- SEO metadata and theme colors

### 2. Replace images and media
Place new images in [public/resources/images](public/resources/images) and update the relevant paths in [src/data/varun.json](src/data/varun.json).

### 3. Rename or add sections
If you want to change the structure of the page, edit the section rendering in [src/templates/designers-v1/index.tsx](src/templates/designers-v1/index.tsx) and the corresponding component in [src/components/designer-v1](src/components/designer-v1).

### 4. Add a new designer profile
To add another portfolio, create a new data entry and register it in [src/lib/designers.ts](src/lib/designers.ts). The URL slug will be the key used for routing.

## Common Commands

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build locally
- `npm run lint` — run the Biome linter
- `npm run format` — format the codebase
- `npm run tree` — print the project folder tree

## Notes

This template is already set up with a sample designer profile named Varun. You can treat it as a starter project and replace the content, visuals, and branding to create your own portfolio quickly.
