# Overview

This is a dynamic React-based resume website for Sean Berg, featuring role-based content switching and PDF generation capabilities. The application allows users to switch between different professional roles (General Manager, Frontend Developer, IT Manager, and Project Manager) with tailored resume content for each role. The site is optimized for static hosting and includes interactive features like PDF downloads and smooth scroll animations.

# Recent Changes

**November 27, 2025** - Configured for Replit environment:
- Updated `vite.config.ts` to use base path "/" (removed GitHub Pages `/Portfolio/` path)
- Added `host: "0.0.0.0"` to Vite server config for Replit proxy compatibility
- Installed all npm dependencies
- Configured workflow "Start application" running `npm run dev` on port 5000
- Configured static deployment with build command and docs output directory
- Updated `.gitignore` to exclude build outputs (docs, dist) and npm logs
- Verified application runs correctly in Replit environment

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for type safety and modern development
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** with custom CSS variables for consistent styling and theming
- **Framer Motion** for smooth page transitions and animations
- **Component-based architecture** with reusable UI components organized by feature

## Static Site Generation
- **Static deployment** with builds output to `/docs` directory
- **Base path configuration** set to "/" for Replit hosting
- **No backend dependencies** - all data is embedded in the JavaScript bundle
- **Asset optimization** with automatic bundling and minification

## State Management
- **Custom React hooks** for role switching (`useResumeRole`) and scroll-based animations
- **Local state management** using React's built-in useState and useEffect
- **Role-based data switching** with transition animations between different resume versions

## Scroll-Based Animations
- **Custom scroll hooks** (`useScrollResize`, `useExperienceScrollResize`, `useJobScrollResize`) for dynamic content resizing
- **Intersection-based animations** that respond to scroll position relative to navigation bar
- **Section enlargement/shrinkage** based on viewport position for enhanced user experience

## PDF Generation
- **Client-side PDF generation** using jsPDF library loaded dynamically
- **Role-specific PDF exports** with custom formatting and styling
- **Automatic content formatting** with page breaks and professional layout

## Navigation System
- **Configuration-driven navigation** with toggleable sections via `navigationConfig`
- **Fixed navigation bar** with scroll-responsive styling
- **Overlay controls** for role switching and PDF download functionality

## Data Architecture
- **Typed data structures** for resume content with interfaces for consistency
- **Role-based data mapping** with separate content for each professional role
- **Static data files** embedded in the application bundle for offline functionality

## Design System
- **Shadcn/ui components** for consistent UI elements and accessibility
- **Custom CSS classes** for scroll-based animations and transitions
- **Responsive design** with mobile-first approach and breakpoint-based layouts
- **Professional color scheme** with CSS custom properties for easy theming

# External Dependencies

## UI and Styling
- **@radix-ui/react-*** - Accessible UI primitives for dialogs, tooltips, and form components
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Animation library for smooth transitions and interactions
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Additional icon sets including FontAwesome and social media icons

## Development Tools
- **Vite** - Build tool and development server
- **TypeScript** - Type checking and enhanced developer experience
- **@replit/vite-plugins** - Replit-specific development enhancements

## PDF Generation
- **jsPDF** - Client-side PDF generation library loaded via CDN

## External Fonts and Assets
- **Google Fonts (Inter)** - Typography loaded via CDN
- **FontAwesome** - Icon fonts loaded via CDN for resume styling

## Database Configuration (Prepared but Unused)
- **Drizzle ORM** with PostgreSQL configuration present but not actively used
- **@neondatabase/serverless** - Database connection library included for potential future use

Note: The application is currently designed as a static site with embedded data, but includes database infrastructure for potential future backend integration.