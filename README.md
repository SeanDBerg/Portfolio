# Sean Berg - Dynamic Resume Website

A static React website showcasing Sean Berg's professional experience with role-based content switching and PDF generation capabilities. Perfect for GitHub Pages hosting.

## Features

- **Dynamic Role Switching**: Switch between 4 different resume versions:
  - General Manager
  - Frontend Developer  
  - IT Manager
  - Project Manager
- **PDF Generation**: Download tailored PDF resumes for each role
- **Responsive Design**: Professional layout optimized for all devices
- **Static Hosting**: No backend required - perfect for GitHub Pages

## Quick Start

### For GitHub Pages Deployment

1. Fork or clone this repository
2. Enable GitHub Pages in repository settings
3. Set source to "Deploy from a branch" and select `main` branch
4. Your resume will be available at `https://yourusername.github.io/repository-name`

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Static File Structure

The built website is completely static and consists of:
- `index.html` - Main HTML file
- `assets/` - CSS and JavaScript bundles
- All resume data is embedded in the JavaScript bundle

## Customization

To customize with your own resume data:

1. Edit `client/src/data/resumeData.ts`
2. Update contact information in `client/src/components/Header.tsx`
3. Rebuild with `npm run build`

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite (build tool)
- PDF generation via jsPDF

## Browser Support

Modern browsers including Chrome, Firefox, Safari, and Edge.