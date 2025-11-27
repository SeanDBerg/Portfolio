# BergOps // Brand Identity & Design System

**Core Philosophy:** "Dark Mode Native."
The aesthetic is designed to mimic a high-end IDE or mission control dashboard. It relies on deep backgrounds, "glassmorphic" depth, and neon accents to guide the eye.

---

## 1. The "Aurora" Color Palette

### Primary Accents (The Aurora Gradient)
These are your "Action" and "Status" colors. Use them for buttons, icons, borders, and highlighting key data.

| Color Name | Hex Code | Tailwind Name | Usage Context |
| :--- | :--- | :--- | :--- |
| **Berg Green** | `#2EFF7B` | `green-400` | **Success / Start.** Use for "Active" statuses, "Go" buttons, and the letter 'B'. |
| **Ops Blue** | `#00C3FF` | `cyan-400` | **Structure / Logic.** Use for links, primary borders, main icons, and the letter 'E/R'. |
| **Intel Purple** | `#9D4EDD` | `purple-500` | **Depth / AI.** Use for gradients, subtle backgrounds, and the letter 'G'. |

### Neutral "Mission Control" Colors (Backgrounds)
**Note:** Do not use pure black (`#000000`). It is too harsh for screens. Use these rich, dark greys to create depth.

| Color Name | Hex Code | Tailwind Name | Usage Context |
| :--- | :--- | :--- | :--- |
| **Void** | `#0F1115` | `slate-950` | **Main Background.** The deepest layer of the app. |
| **Surface** | `#1A1D23` | `slate-900` | **Cards / Modules.** Lighter than the background to show elevation. |
| **Steel** | `#333945` | `slate-700` | **Borders / Dividers.** Subtle separation between sections. |
| **Text** | `#E2E8F0` | `slate-200` | **Primary Text.** Readable, soft white. Never use pure white. |

---

## 2. Typography System

To reinforce the "Engineer/Developer" persona, we use a Technical Stack pairing.

### Primary Font: **Inter** (Headings & UI)
*Clean, invisible, and highly legible. It disappears so the data can stand out.*
* **Weights:** Bold (700) for Headings, Medium (500) for UI Labels.
* **Usage:** All standard page text, blog posts, and navigation.

### Secondary Font: **JetBrains Mono** (Code, Data, & Accents)
*The font of choice for developers. Using this for non-code elements makes the brand feel "native" to software.*
* **Weights:** Regular (400).
* **Usage:**
    * Code snippets.
    * **KPI Numbers:** (e.g., 3.3B, $400k)
    * **Eyebrow Headers:** Small text above main headlines (e.g., // LATEST PROJECTS)
    * **Buttons:** [ VIEW CASE STUDY ]

---

## 3. Logo Strategy & Usage

### Logo Variations Strategy
We use specific file formats for specific mediums to ensure readability and performance.

| Version | File Name | Context & Usage |
| :--- | :--- | :--- |
| **The "Glow"** | `logo-hero-glow.png` | **Screens Only.** Website Hero sections, Slide Decks, Video Intros. Preserves the neon light effect. |
| **The "Flat"** | `logo-vector-print.svg` | **Standard.** Invoices, PDFs, Letterheads, High-Quality Print. Crisp edges without the glow. |
| **The "Monogram"** | `favicon-bo.png` | **Small Scale.** Browser Tabs, Mobile App Icons, Social Media Avatars. |
| **The "Solid"** | `logo-embroidery.dst` | **Merchandise.** Apparel, Pens, Mugs. Gradients are simplified into solid blocks for production. |

### The "BergOps" Logotype Rule
**Strict Rule:** The rounded, geometric typeface used in the 'BergOps' logo is for **Logos Only**.
* It represents our friendly, modern interface.
* All other operational text (website copy, documents, code) must use **Inter** or **JetBrains Mono** to represent our technical precision.

---

## 4. Visual Effects & Implementation

Since the brand relies on light and gradients, use the following specifications for CSS or Design implementations.

### The "BergOps" Gradient
Used for the Logo and massive Headlines.
* **Type:** Linear Gradient
* **Direction:** 90 Degrees
* **Stops:**
    1.  `#2EFF7B` (Berg Green) at 0%
    2.  `#00C3FF` (Ops Blue) at 50%
    3.  `#9D4EDD` (Intel Purple) at 100%

### The "Neon Glow" Effect
Used to highlight primary actions (buttons) or active cards.
* **Border:** 1px Solid (Berg Green or Ops Blue)
* **Shadow:** Drop shadow with the matching accent color.
    * *Rest State:* Spread 15px, Opacity 30%
    * *Hover State:* Spread 25px, Opacity 50%

---

## 5. Visual Rules (Do's & Don'ts)

* ✅ **DO use the "Aurora" colors sparingly.** A dashboard should be mostly dark grey (Void / Surface), with small pops of Green/Blue to guide the eye.
* ✅ **DO use "Glassmorphism."** A slight transparency on your cards (Opacity 80% + Background Blur) looks incredible with these colors.
* ❌ **DON'T use these colors on a white background.** They are too bright and will vibrate against white. This is a dark-mode-only brand.
* ❌ **DON'T use gradients on body text.** It makes paragraphs hard to read. Keep the gradient for the Logo and massive Headlines only.