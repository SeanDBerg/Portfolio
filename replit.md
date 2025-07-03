# Sean Berg - Dynamic Resume Website

## Overview

This is a static React website showcasing Sean Berg's professional experience with dynamic role-based content switching and PDF generation capabilities. The application is optimized for GitHub Pages hosting and requires no backend infrastructure.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables and animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks for local state management

### Static Site Generation
- **Deployment Target**: GitHub Pages (static hosting)
- **Build Output**: Compiled to `docs/` directory for GitHub Pages compatibility
- **Base Path**: Configured for `/Portfolio/` subdirectory hosting

## Key Components

### Role-Based Content System
- **Dynamic Resume Switching**: Four different resume versions (General Manager, Frontend Developer, IT Manager, Project Manager)
- **Content Management**: Centralized resume data in `resumeData.ts` with type-safe interfaces
- **Smooth Transitions**: Fade animations during role switching using CSS transitions

### PDF Generation
- **Client-Side PDF**: jsPDF library for generating downloadable PDFs
- **Role-Specific PDFs**: Each resume role generates a tailored PDF version
- **Dynamic Loading**: PDF library loaded on-demand to reduce initial bundle size

### Responsive Design System
- **Mobile-First**: Responsive layouts optimized for all screen sizes
- **Custom Animations**: Framer Motion for page transitions and scroll-based animations
- **Scroll-Based UI**: Custom hooks for scroll-triggered layout changes and section resizing

### Navigation System
- **Configurable Sections**: Navigation controlled via `navigation.ts` config
- **Section Visibility**: Summary and Projects sections hidden by default, Resume always visible
- **Sticky Navigation**: Responsive navigation bar with scroll-based styling

## Data Flow

### Resume Data Management
1. **Data Source**: Static resume data stored in TypeScript interfaces
2. **Role Selection**: User selects role via overlay component
3. **Content Rendering**: Components receive role-specific data and re-render
4. **PDF Generation**: Selected role data passed to PDF generator

### User Interface Flow
1. **Initial Load**: Default to resume section with General Manager role
2. **Role Switching**: Overlay provides role selection with smooth transitions
3. **Section Navigation**: Top navigation allows switching between visible sections
4. **PDF Download**: Generate and download role-specific PDF resume

## External Dependencies

### Core Dependencies
- **React Ecosystem**: react, react-dom, react-icons
- **UI Components**: @radix-ui/* for accessible component primitives
- **Styling**: tailwindcss, class-variance-authority, clsx, tailwind-merge
- **Animation**: framer-motion for smooth transitions
- **PDF Generation**: jsPDF loaded via CDN
- **Form Handling**: @hookform/resolvers, zod for validation

### Development Dependencies
- **Build Tools**: vite, @vitejs/plugin-react
- **Replit Integration**: @replit/vite-plugin-cartographer, @replit/vite-plugin-runtime-error-modal
- **TypeScript**: Full TypeScript support with strict configuration
- **Tailwind**: @tailwindcss/typography, @tailwindcss/vite

### External CDN Resources
- **Fonts**: Google Fonts (Inter font family)
- **Icons**: Font Awesome 6.4.0 via CDN
- **PDF Library**: jsPDF 2.5.1 via CDN

## Deployment Strategy

### GitHub Pages Deployment
- **Build Command**: `npm run build` outputs to `docs/` directory
- **Base Path**: Configured for `/Portfolio/` subdirectory
- **Static Assets**: All assets bundled and optimized by Vite
- **Deploy Script**: Automated deployment via npm script

### Local Development
- **Development Server**: Vite dev server on port 5000
- **Hot Reload**: Fast refresh for development
- **Type Checking**: TypeScript compilation with strict mode

### Production Optimization
- **Bundle Splitting**: Vite automatic code splitting
- **Asset Optimization**: CSS and JavaScript minification
- **CDN Resources**: External libraries loaded from CDN to reduce bundle size

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

Note: While the project includes Drizzle configuration and database-related dependencies, the current implementation is designed as a static website without database functionality. The database configuration may be utilized in future iterations for dynamic content management.