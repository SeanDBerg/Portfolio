# BergOps - Business Summary & Services

A specialized "Dark Mode Native" business frontage for Sean Berg's portfolio, designed to showcase high-level operations consulting services. This section mimics high-end IDEs or mission control dashboards, utilizing the "Aurora" design system to guide user attention.

## Features

- **"Dark Mode Native" Aesthetic**: Deep backgrounds with "glassmorphic" depth and neon accents.
- **Aurora Design System**: Custom color palette (Berg Green, Ops Blue, Intel Purple) for visual hierarchy.
- **Bot-Protected Contact Form**: Client-side and server-side validation with honeypots and adaptive timeouts.
- **Responsive Layout**: Seamless experience across desktop, tablet, and mobile devices.

## Quick Start

This section operates within the same React application as the dynamic resume.

### Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start development server:
    ```bash
    npm run dev
    ```

3.  The Summary section is the default landing page.

## System Architecture

### Frontend Architecture

-   **React 18** with TypeScript.
-   **Tailwind CSS** configured with the `aurora` color palette (see `tailwind.config.ts`).
-   **Framer Motion** for entrance animations and scroll-triggered effects.
-   **Lucide React** & **React Icons** for consistent, technical iconography.

### Component Structure

-   `Summary/Hero.tsx`: Main landing area with "Aurora" gradient text and call-to-action.
-   `Summary/ServicesGap.tsx`: "What I Do" section using grid layouts to display service competencies.
-   `Summary/CTASection.tsx`: The primary conversion point. Contains the secure contact form.

### Security Features (Contact Form)

-   **Honeypot Fields**: Hidden fields (`website`, `subject`, `url`) to trap bots.
-   **Time-to-Complete**: Submissions under 2 seconds are flagged as bot activity.
-   **Origin Validation**: Strict checking of `window.location.origin` against allowed domains.
-   **Cloudflare Turnstile**: Adaptive CAPTCHA challenges for suspicious activity.

## Design System (Aurora)

The "BergOps" identity is defined in `BRANDING.md` and implemented via `tailwind.config.ts`.

-   **Berg Green (`#2EFF7B`)**: Success / Start / Active status.
-   **Ops Blue (`#00C3FF`)**: Structure / Logic / Links.
-   **Intel Purple (`#9D4EDD`)**: Depth / AI / Background gradients.

## Customization

To modify business content:

1.  Edit `client/src/components/Summary/*.tsx` files.
2.  Update constants in `client/src/data/` if dynamic data extraction is implemented in the future.
3.  Adjust risk scores and threshold settings in `CTASection.tsx` for the contact form.
