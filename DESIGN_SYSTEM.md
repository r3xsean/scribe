# Scribe Design System

Shared visual language for the Scribe marketing website and Electron desktop app.
Last updated: 2026-03-12

---

## 1. Design Philosophy

Scribe should feel like a well-crafted tool made by someone who cares. Not enterprise.
Not "AI startup." Think: the confidence of a professional audio editor, the approachability
of a note-taking app, the polish of Arc Browser or Linear.

Key principles:
- **Calm confidence.** Dark, quiet surfaces. Let content breathe.
- **Tactile feedback.** Every interaction should feel physically responsive.
- **Layered depth.** Use subtle elevation and transparency to create spatial hierarchy.
- **Warmth in neutrality.** The zinc palette stays, but we inject life through a single
  accent color and considered use of semantic color.

---

## 2. Color Palette

### 2.1 Background Layers (Zinc-Based, Warm-Shifted)

The existing zinc palette is solid. We refine it by defining explicit layer roles
so every surface has a clear purpose. These map directly to Tailwind v4 zinc values.

```
Layer 0  (App base)         zinc-950   #09090b
Layer 1  (Sidebar / panels) zinc-900   #18181b
Layer 2  (Cards / inputs)   zinc-850   #1e1e22   (custom -- see CSS below)
Layer 3  (Elevated / hover) zinc-800   #27272a
Layer 4  (Active / pressed) zinc-750   #2e2e33   (custom)
```

Custom color definitions for Tailwind v4 (add to globals.css `@theme`):

```css
@theme {
  --color-zinc-850: #1e1e22;
  --color-zinc-750: #2e2e33;
}
```

### 2.2 Primary Accent -- "Soft Violet"

Not blue (overused in AI tools). Not green (conflicts with success). A muted, sophisticated
violet that reads as premium without being flashy. This replaces the current white-button
approach for primary actions.

```
Accent 50   #f3f0ff
Accent 100  #e5deff
Accent 200  #cbbdff
Accent 300  #a78bfa   (primary text-on-dark)
Accent 400  #8b5cf6   (primary interactive)
Accent 500  #7c3aed   (primary solid)
Accent 600  #6d28d9   (hover)
Accent 700  #5b21b6   (pressed)
Accent 900  #2e1065   (very subtle backgrounds)
```

Tailwind v4 theme extension:

```css
@theme {
  --color-accent-50:  #f3f0ff;
  --color-accent-100: #e5deff;
  --color-accent-200: #cbbdff;
  --color-accent-300: #a78bfa;
  --color-accent-400: #8b5cf6;
  --color-accent-500: #7c3aed;
  --color-accent-600: #6d28d9;
  --color-accent-700: #5b21b6;
  --color-accent-900: #2e1065;
}
```

Usage rules:
- Primary buttons: `bg-accent-500` with `hover:bg-accent-600`
- Accent text (links, highlights): `text-accent-300`
- Accent glow (hero, special moments): `shadow-accent-500/20`
- Step indicators (onboarding): Active dot uses `bg-accent-400`
- **Restraint is key.** Accent appears on primary CTAs, active states, and progress
  indicators. Never on large surfaces.

### 2.3 Semantic Colors

These replace the current ad-hoc color usage in JobQueue.

```
Success    base: #22c55e  (green-500)   bg: #22c55e/10   text: #4ade80 (green-400)
Warning    base: #eab308  (yellow-500)  bg: #eab308/10   text: #facc15 (yellow-400)
Error      base: #ef4444  (red-500)     bg: #ef4444/10   text: #f87171 (red-400)
Info       base: #8b5cf6  (accent-400)  bg: #8b5cf6/10   text: #a78bfa (accent-300)
```

Status-to-color mapping for the job queue:
```
pending       zinc-500 / zinc-700 bg    (neutral -- not yet started)
downloading   accent-400 / accent-900 bg (info -- uses brand color instead of blue)
transcribing  yellow-400 / yellow-500/10 bg  (active work)
done          green-400 / green-500/10 bg
error         red-400 / red-500/10 bg
```

### 2.4 Text Hierarchy

```
Primary text     zinc-100  #f4f4f5    (headings, body, important content)
Secondary text   zinc-400  #a1a1aa    (labels, descriptions, metadata)
Tertiary text    zinc-500  #71717a    (placeholders, disabled, hints)
Muted text       zinc-600  #52525b    (timestamps, very low priority)
```

### 2.5 Borders and Dividers

```
Subtle divider     zinc-800/50     (panel borders, section dividers)
Default border     zinc-800        (card borders, input borders)
Hover border       zinc-700        (interactive element hover)
Focus border       accent-500      (keyboard focus rings -- CHANGE from zinc)
Active border      zinc-600        (selected items)
```

---

## 3. Typography

### 3.1 Font Stack

```css
--font-sans: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", "Fira Code", ui-monospace, monospace;
```

Inter is the recommended primary font. If you want to avoid a font download for the
Electron app, the system stack alone is acceptable -- Inter matters more for the website.

### 3.2 Type Scale

```
Display    text-4xl   (36px)  font-semibold  tracking-tight  leading-tight
           Website hero headline only.

H1         text-3xl   (30px)  font-semibold  tracking-tight  leading-tight
           Onboarding step titles.

H2         text-xl    (20px)  font-semibold  tracking-tight  leading-snug
           Section headings, modal titles.

H3         text-base  (16px)  font-semibold  tracking-tight  leading-normal
           Card titles, app header "Scribe" wordmark.

Body       text-sm    (14px)  font-normal    tracking-normal leading-relaxed
           Default body text, descriptions.

Caption    text-xs    (12px)  font-medium    tracking-normal leading-normal
           Status labels, metadata, secondary info.

Micro      text-[10px]        font-medium    tracking-wider  leading-normal  uppercase
           Badges, tiny labels. Use sparingly.

Overline   text-xs    (12px)  font-medium    tracking-wider  uppercase
           Section labels in settings (already used -- keep this pattern).
```

### 3.3 Typography Rules

- **Headings** always use `tracking-tight`. This creates visual density and premium feel.
- **Body text** uses default tracking. Never tighten body copy.
- **Labels and overlines** use `uppercase tracking-wider` to create clear visual separation.
- **Maximum line length** for transcript text: `max-w-prose` (65ch). Readability matters.
- **Monospace** only for URLs, file paths, and technical output.

---

## 4. Spacing System

Use Tailwind's default 4px grid. Key spacing tokens:

```
Micro gap        gap-1      (4px)    Between badge icon and text
Small gap        gap-2      (8px)    Between related elements in a row
Default gap      gap-3      (12px)   Between form fields, list items
Section gap      gap-6      (24px)   Between sections within a panel
Page gap         gap-8      (32px)   Between major page sections
Panel padding    p-5        (20px)   Interior padding of cards and modals
Page padding     p-6 / p-8  (24-32)  Page-level padding
```

### 4.1 Spacing Rules

- **Sidebar width:** Keep 380px (`w-[380px]`). This is well-proportioned.
- **Content max-width (onboarding):** Keep `max-w-lg` (32rem / 512px).
- **Content max-width (website):** `max-w-5xl` (64rem / 1024px) for content sections,
  `max-w-7xl` (80rem / 1280px) for the full-width hero.
- **Minimum touch target:** 32x32px for all interactive elements (already met).

---

## 5. Border Radius

```
Small      rounded        (4px)   Badges, tiny elements
Default    rounded-lg     (8px)   Buttons, inputs, cards, job items
Large      rounded-xl     (12px)  Modals, onboarding cards, hero cards
XL         rounded-2xl    (16px)  App icon, large feature cards (website)
```

Rule: Nested elements should have a smaller radius than their parent.
A card with `rounded-xl` contains buttons with `rounded-lg`.

---

## 6. Shadows and Elevation

### 6.1 Shadow Tokens

```css
--shadow-sm:     0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:     0 4px 12px rgba(0, 0, 0, 0.3);
--shadow-lg:     0 8px 30px rgba(0, 0, 0, 0.4);
--shadow-xl:     0 16px 50px rgba(0, 0, 0, 0.5);
--shadow-glow:   0 0 40px rgba(139, 92, 246, 0.15);   /* accent glow */
```

Tailwind usage:
```
Cards on Layer 1:     shadow-sm
Modals:               shadow-xl
Dropdown menus:       shadow-lg
Hero section CTA:     shadow-lg + shadow-glow (via custom class)
```

### 6.2 Glow Effect (Special Use)

For hero section CTA and onboarding "Get Started" button:

```css
.glow-accent {
  box-shadow:
    0 0 20px rgba(139, 92, 246, 0.15),
    0 0 60px rgba(139, 92, 246, 0.08);
}

.glow-accent-strong {
  box-shadow:
    0 0 20px rgba(139, 92, 246, 0.25),
    0 0 80px rgba(139, 92, 246, 0.12);
}
```

---

## 7. Animation Specifications

### 7.1 Core Timing Tokens

```
Instant       100ms    opacity changes, color transitions
Fast          150ms    button presses, hover states, border changes
Default       250ms    panel transitions, card state changes
Smooth        350ms    modal open, content reveal, layout shifts
Slow          500ms    page transitions, onboarding step changes
Dramatic      700ms    hero section entrance, first-load animations
```

### 7.2 Easing Curves

```css
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);      /* default for most UI */
--ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);     /* for symmetrical motion */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);  /* for playful bounces */
--ease-smooth:     cubic-bezier(0.25, 0.1, 0.25, 1);   /* for subtle transitions */
```

Usage rules:
- **Elements entering** the screen: `ease-out` (fast start, gentle stop -- feels responsive)
- **Elements leaving** the screen: `ease-in-out`
- **Hover/press states:** `ease-out` with `fast` duration
- **Modals and overlays:** `ease-out` with `smooth` duration
- **Spring easing** only for: button scale feedback, step indicator transitions

### 7.3 Animation Definitions (CSS)

Replace the current globals.css animations with this expanded set:

```css
/* --- Entrances --- */

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-scale {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* --- Feedback --- */

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.7; }
}

@keyframes progress-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse-ring {
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}

/* --- Backdrop --- */

@keyframes backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* --- Website-only --- */

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### 7.4 Utility Classes

```css
/* Entrances */
.animate-fade-in        { animation: fade-in 250ms var(--ease-out) both; }
.animate-fade-in-up     { animation: fade-in-up 350ms var(--ease-out) both; }
.animate-fade-in-down   { animation: fade-in-down 300ms var(--ease-out) both; }
.animate-fade-in-scale  { animation: fade-in-scale 350ms var(--ease-out) both; }
.animate-slide-in-right { animation: slide-in-right 350ms var(--ease-out) both; }
.animate-slide-in-left  { animation: slide-in-left 350ms var(--ease-out) both; }

/* Modal */
.animate-backdrop       { animation: backdrop-in 200ms ease-out both; }
.animate-modal          { animation: modal-in 350ms var(--ease-out) both; }

/* Feedback */
.animate-spin           { animation: spin 1s linear infinite; }
.progress-active        { animation: pulse-subtle 2s ease-in-out infinite; }
.progress-shimmer       {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  background-size: 200% 100%;
  animation: progress-shimmer 1.5s ease-in-out infinite;
}

/* Website */
.animate-float          { animation: float 4s ease-in-out infinite; }
.animate-gradient       {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease-in-out infinite;
}

/* Stagger delays (for lists) */
.delay-0   { animation-delay: 0ms; }
.delay-1   { animation-delay: 50ms; }
.delay-2   { animation-delay: 100ms; }
.delay-3   { animation-delay: 150ms; }
.delay-4   { animation-delay: 200ms; }
.delay-5   { animation-delay: 250ms; }
```

### 7.5 Where Animations Apply (Specific Locations)

**Electron App:**

| Location | Animation | Spec |
|---|---|---|
| Onboarding step transitions | `fade-in-up` | 350ms, ease-out. Each step fades up when entering. |
| Onboarding step indicators | Scale + color transition | 300ms, ease-spring. Active dot scales to 100%, inactive to 75%. |
| Onboarding "Get Started" button | `fade-in-up` with delay | 500ms, ease-out, 200ms delay. Appears after heading. |
| Job added to queue | `fade-in-up` | 250ms, ease-out. New job slides up into list. |
| Job status badge change | Color transition | 150ms, ease-out. Background and text color blend. |
| Progress bar fill | Width transition | 500ms, ease-out. Already implemented -- keep it. |
| Progress bar shimmer | `progress-shimmer` overlay | Runs while active. Adds polish to progress bars. |
| Transcript view load | `fade-in` | 250ms, ease-out. Content fades in when job selected. |
| Transcript "Copied" feedback | `fade-in-scale` then auto-fade | 150ms in, hold 2s, 150ms out. |
| Settings modal open | Backdrop: `backdrop-in` 200ms. Panel: `modal-in` 350ms. | Two-phase entrance. |
| Settings modal close | Reverse: opacity to 0, scale to 0.96 | 200ms, ease-in-out. |
| Hover on job card | Background + border transition | 150ms, ease-out. Already implemented. |
| Button press | `active:scale-[0.97]` | Instant via transform. Feels physical. |
| Input focus | Border color + subtle `ring` | 150ms, ease-out. Ring uses accent-500/25. |

**Website:**

| Location | Animation | Spec |
|---|---|---|
| Hero headline | `fade-in-up` | 700ms, ease-out, triggers on load. |
| Hero subheadline | `fade-in-up` | 700ms, ease-out, 100ms delay. |
| Hero CTA button | `fade-in-up` + glow pulse | 700ms, ease-out, 200ms delay. Glow subtly pulses. |
| Hero app screenshot | `fade-in-scale` | 700ms, ease-out, 300ms delay. Scales from 0.95 to 1. |
| Feature cards | `fade-in-up` staggered | 350ms each, 100ms stagger between cards. Trigger on scroll. |
| Floating decorative elements | `float` | 4s, ease-in-out, infinite. Ambient motion. |
| Gradient background | `gradient-shift` | 8s, ease-in-out, infinite. Slow-moving color. |
| Scroll-triggered sections | `fade-in-up` | 400ms, ease-out. Use IntersectionObserver. |

---

## 8. Component Patterns

### 8.1 Buttons

**Primary (accent):**
```
Base:     bg-accent-500 text-white rounded-lg px-5 py-2.5 text-sm font-medium
Hover:    hover:bg-accent-600
Active:   active:scale-[0.97]
Focus:    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400
          focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
Disabled: disabled:opacity-40 disabled:pointer-events-none
Transition: transition-all duration-150 ease-out
```

**Secondary:**
```
Base:     bg-zinc-800 text-zinc-100 rounded-lg px-5 py-2.5 text-sm font-medium
          border border-zinc-700
Hover:    hover:bg-zinc-750 hover:border-zinc-600
Active:   active:scale-[0.97]
Focus:    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500
          focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
Disabled: disabled:opacity-40 disabled:pointer-events-none
Transition: transition-all duration-150 ease-out
```

**Ghost:**
```
Base:     bg-transparent text-zinc-400 rounded-lg px-4 py-2 text-sm font-medium
Hover:    hover:bg-zinc-800 hover:text-zinc-200
Active:   active:scale-[0.97]
Focus:    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600
          focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
Disabled: disabled:opacity-40 disabled:pointer-events-none
Transition: transition-all duration-150 ease-out
```

**Icon button (settings gear, close, etc.):**
```
Base:     w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400
Hover:    hover:bg-zinc-800 hover:text-zinc-200
Active:   active:scale-[0.95]
Transition: transition-all duration-150 ease-out
```

**Large CTA (website hero, onboarding "Get Started"):**
```
Base:     bg-accent-500 text-white rounded-xl px-8 py-3.5 text-base font-semibold
          glow-accent
Hover:    hover:bg-accent-600 hover:glow-accent-strong
Active:   active:scale-[0.97]
Transition: transition-all duration-200 ease-out
```

### 8.2 Text Inputs and Textareas

```
Base:     w-full bg-zinc-850 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm
          text-zinc-100 placeholder:text-zinc-600
Focus:    focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25
Hover:    hover:border-zinc-700 (when not focused)
Transition: transition-all duration-150 ease-out
```

Key change from current: Focus state now uses accent color instead of zinc-600.
This provides clearer feedback and ties inputs to the brand.

### 8.3 Select Dropdowns

```
Base:     bg-zinc-850 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm
          text-zinc-100 appearance-none cursor-pointer
Focus:    focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25
Hover:    hover:border-zinc-700
Transition: transition-all duration-150 ease-out
```

Add a custom chevron via background-image or a positioned SVG. The native dropdown
arrow looks cheap. Use a zinc-400 chevron-down icon.

### 8.4 Cards (Job Queue Items)

```
Default:  bg-zinc-900/50 border border-transparent rounded-lg p-3
Hover:    hover:bg-zinc-900 hover:border-zinc-800
Selected: bg-zinc-850 border-accent-500/30 ring-1 ring-accent-500/10
Transition: transition-all duration-150 ease-out
```

Key change: Selected state now uses a subtle accent border instead of zinc-700.
This makes the active selection more visually distinct without being loud.

### 8.5 Modal / Dialog

```
Backdrop:  fixed inset-0 bg-black/60 backdrop-blur-sm animate-backdrop
Panel:     bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl
           max-w-md w-full max-h-[80vh] overflow-hidden animate-modal
Header:    px-5 py-4 border-b border-zinc-800/50
Content:   p-5 overflow-y-auto
```

Key change: Added `backdrop-blur-sm` to the overlay and proper entrance animations.

### 8.6 Progress Bars

```
Track:    w-full h-1 bg-zinc-800 rounded-full overflow-hidden
Fill:     h-full rounded-full transition-all duration-500 ease-out
Shimmer:  Apply .progress-shimmer as an overlay on active fills
```

Fill colors by status (already defined in semantic colors section):
- downloading: bg-accent-400
- transcribing: bg-yellow-400
- done: bg-green-400
- error: bg-red-400

### 8.7 Status Badges

```
Base:     text-[10px] font-medium px-1.5 py-0.5 rounded
```

Apply semantic background and text colors per status.

### 8.8 Scrollbar Styling (Keep Current, Minor Refinement)

```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
```

Changed: thumb default from #3f3f46 to #27272a (more subtle when idle), hover
remains visible.

---

## 9. Iconography

- **Style:** Outline (stroke) icons, 1.5px stroke weight for 20-24px icons, 2px for 16px.
- **Source:** Heroicons (already used). Keep this. Consistent, high-quality.
- **Size tokens:** `w-3.5 h-3.5` (14px, inline), `w-4 h-4` (16px, buttons), `w-5 h-5` (20px, default), `w-10 h-10` (40px, empty states).
- **Color:** Icons inherit text color. Default `text-zinc-400`, lighten on hover.

---

## 10. Website-Specific Recommendations

### 10.1 Hero Section

The hero needs to immediately communicate three things: (1) this is a transcription tool,
(2) it is free and offline, (3) it looks and feels premium.

**Layout:**
```
Full-width, min-h-screen, centered content.
Background: zinc-950 base with two large, blurred gradient orbs.
  - Top-left orb: accent-500 at 6% opacity, 600px diameter, blurred 120px.
  - Bottom-right orb: accent-700 at 4% opacity, 500px diameter, blurred 100px.
  - Apply .animate-gradient to slowly shift position.
```

**Content stack (vertically centered):**
```
1. Small badge/chip:  "Free & Offline" in accent-300 text, accent-900 bg,
                       rounded-full, px-3 py-1, text-xs font-medium.
                       Animate: fade-in-up, 700ms, 0ms delay.

2. Headline:          "Transcribe videos with AI that runs on your machine."
                       text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100
                       max-w-3xl mx-auto text-center leading-tight.
                       Animate: fade-in-up, 700ms, 100ms delay.

3. Subheadline:       "Paste a YouTube or TikTok link. Get a transcript in seconds.
                       No cloud. No API keys. No subscriptions."
                       text-lg text-zinc-400 max-w-xl mx-auto text-center leading-relaxed.
                       Animate: fade-in-up, 700ms, 200ms delay.

4. CTA button group:  Primary: "Download for Windows" (large CTA style + glow).
                       Secondary: "View on GitHub" (ghost button).
                       Both centered, gap-4.
                       Animate: fade-in-up, 700ms, 300ms delay.

5. App screenshot:    Rounded-2xl border border-zinc-800 shadow-xl.
                       Positioned below CTA with generous spacing (mt-16).
                       Animate: fade-in-scale, 700ms, 400ms delay.
                       Optional: subtle .animate-float on a decorative element nearby.
```

**Hero "Don'ts":**
- No particle effects, no matrix-style backgrounds, no typing animations.
- No excessive gradients. Two subtle orbs max.
- No 3D transforms or parallax. Keep it flat and fast.

### 10.2 Feature Section

Three to four cards in a grid. Each card:
```
bg-zinc-900 border border-zinc-800/50 rounded-2xl p-8
Hover: hover:border-zinc-700 transition-all duration-250
```

Each card contains:
- Icon (24px, text-accent-300)
- Heading (text-lg font-semibold)
- Description (text-sm text-zinc-400)

Suggested features to highlight:
1. "Runs Locally" -- lock/shield icon. Privacy angle.
2. "Whisper AI" -- cpu/chip icon. Quality angle.
3. "Paste & Go" -- link icon. Simplicity angle.
4. "Multiple Languages" -- globe icon. Capability angle.

Stagger animation: each card fades in 100ms after the previous, triggered on scroll.

### 10.3 How It Works Section

Three-step horizontal flow with connecting lines.
Each step is a numbered circle (accent-500 bg, white text) with label below.
```
1. Paste a link  -->  2. AI transcribes locally  -->  3. Copy your transcript
```
Use thin lines (`h-px bg-zinc-800`) to connect steps on desktop, stack vertically on mobile.

### 10.4 Footer

Minimal. zinc-900 bg, zinc-500 text. Links: GitHub, privacy note ("Your data never leaves
your machine"), version number. No heavy footer needed for a single-product site.

---

## 11. App-Specific Recommendations

### 11.1 Onboarding Wizard Refinements

**Step indicators:** Change from zinc dots to accent-colored. Active and completed steps
use `bg-accent-400`, upcoming use `bg-zinc-700`. Add `transition-all duration-300
ease-spring` for the scale + color change.

**Step transitions:** When moving between steps, the outgoing step should fade out
(150ms, opacity to 0, slight translateY -8px) and the incoming step should use
`fade-in-up` (350ms). This creates a clear directional flow.

**Welcome screen app icon:** Replace the zinc gradient background with:
```
bg-gradient-to-br from-accent-600 to-accent-800
```
This gives the icon visual weight and brand presence.

**"Get Started" button:** Switch from `bg-zinc-100 text-zinc-900` to the primary
accent button style. Add `glow-accent` for extra presence.

### 11.2 Main View Refinements

**Header:** The "Scribe" wordmark could be enriched:
```
Text:   text-base font-semibold tracking-tight text-zinc-100
Accent: Add a small accent-400 dot or underline below/beside the wordmark.
        Or: "Scribe" in text-zinc-100 with a subtle text-accent-300 on the "S".
```
Keep it very subtle. The header should feel sturdy and quiet.

**Left sidebar border:** Change `border-r border-zinc-800/50` to a slightly more
defined `border-r border-zinc-800`. The current 50% opacity makes the panel division
too ambiguous.

**URL input textarea:** Apply the updated focus style with accent ring. The current
zinc-600 focus border is indistinguishable from content.

**Job queue empty state:** The current icon + text is fine. Add a very subtle dashed
border illustration or make the icon use `text-zinc-700` (slightly lighter than zinc-800)
for better visibility without feeling heavy.

**Job queue cards -- selected state:** Change from `bg-zinc-800 border border-zinc-700`
to `bg-zinc-850 border-accent-500/30 ring-1 ring-accent-500/10`. This introduces the
accent color only at the point of active user focus, which is psychologically correct --
the accent draws attention to "where you are."

**Transcript view:** Add `max-w-prose` (65ch) to the transcript text container. Long lines
hurt readability. The transcript content area should also have slightly more generous
vertical padding (`py-6` instead of `py-4`).

**Copy button success state:** The green checkmark and text are good. Add
`animate-fade-in-scale` (150ms) when the "Copied" state appears for tactile feedback.

### 11.3 Settings Modal

**Backdrop:** Add `backdrop-blur-sm` to the overlay div. This is a small touch that
makes the modal feel like it exists in a physical layer above the app.

**Modal entrance:** Replace `animate-fade-in` with the two-phase animation:
backdrop uses `animate-backdrop`, panel uses `animate-modal`.

**Model cards -- active indicator:** The current green "Active" text is fine. Consider
adding a tiny `w-1.5 h-1.5 rounded-full bg-green-400` dot next to it for scanability.

**Download progress bars in settings:** Apply the same `progress-shimmer` overlay used
in the job queue for consistency.

---

## 12. Interaction Patterns

### 12.1 Focus Management

- All focus rings use `focus-visible` (not `focus`) to avoid showing rings on mouse click.
- Focus ring: `ring-2 ring-accent-400 ring-offset-2 ring-offset-zinc-950`.
- Tab order should flow logically: URL input -> language select -> transcribe button
  in the sidebar; job list items are focusable via arrow keys if keyboard nav is added.

### 12.2 Loading States

- Skeleton screens are overkill for this app. Use spinners for short waits (<3s)
  and progress bars for long operations.
- Spinner: `w-5 h-5 border-2 border-zinc-700 border-t-accent-400 rounded-full animate-spin`.
  Change from zinc-300 top border to accent-400. Ties loading to brand.
- Disabled state on buttons while loading: `opacity-40 pointer-events-none`.

### 12.3 Empty States

Empty states should feel inviting, not dead. Use:
- A relevant icon at `w-10 h-10` in `text-zinc-700`
- Primary message in `text-sm text-zinc-500`
- Secondary message in `text-xs text-zinc-600`
- Optional: a subtle dashed border area suggesting "drop content here"

### 12.4 Hover and Active Feedback

Every interactive element must respond to hover within 150ms:
- **Buttons:** background color shift.
- **Cards:** background + border lightening.
- **Icons:** color shift from zinc-400 to zinc-200.
- **Links:** color shift + underline (website only).

Active (pressed) feedback:
- **Buttons:** `active:scale-[0.97]` -- creates physical press sensation.
- **Cards:** `active:scale-[0.99]` -- subtler, since cards are larger.

---

## 13. Complete globals.css Reference

Below is what the updated globals.css should contain. This consolidates all
tokens, animations, and utility classes defined above.

```css
@import "tailwindcss";

@theme {
  --color-zinc-850: #1e1e22;
  --color-zinc-750: #2e2e33;

  --color-accent-50:  #f3f0ff;
  --color-accent-100: #e5deff;
  --color-accent-200: #cbbdff;
  --color-accent-300: #a78bfa;
  --color-accent-400: #8b5cf6;
  --color-accent-500: #7c3aed;
  --color-accent-600: #6d28d9;
  --color-accent-700: #5b21b6;
  --color-accent-900: #2e1065;

  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}

body {
  @apply bg-zinc-950 text-zinc-100 font-sans;
  -webkit-app-region: no-drag;
  user-select: none;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #27272a; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #3f3f46; }

/* --- Keyframes --- */

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-scale {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.7; }
}
@keyframes progress-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse-ring {
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.4); opacity: 0; }
}
@keyframes backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.96) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* --- Animation utilities --- */

.animate-fade-in        { animation: fade-in 250ms var(--ease-out) both; }
.animate-fade-in-up     { animation: fade-in-up 350ms var(--ease-out) both; }
.animate-fade-in-down   { animation: fade-in-down 300ms var(--ease-out) both; }
.animate-fade-in-scale  { animation: fade-in-scale 350ms var(--ease-out) both; }
.animate-slide-in-right { animation: slide-in-right 350ms var(--ease-out) both; }
.animate-slide-in-left  { animation: slide-in-left 350ms var(--ease-out) both; }
.animate-backdrop       { animation: backdrop-in 200ms ease-out both; }
.animate-modal          { animation: modal-in 350ms var(--ease-out) both; }
.animate-spin           { animation: spin 1s linear infinite; }
.animate-float          { animation: float 4s ease-in-out infinite; }
.animate-gradient       { background-size: 200% 200%; animation: gradient-shift 8s ease-in-out infinite; }

.progress-active  { animation: pulse-subtle 2s ease-in-out infinite; }
.pulse-ring       { animation: pulse-ring 1.5s ease-out infinite; }
.progress-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  background-size: 200% 100%;
  animation: progress-shimmer 1.5s ease-in-out infinite;
}

/* Stagger delays */
.delay-0 { animation-delay: 0ms; }
.delay-1 { animation-delay: 50ms; }
.delay-2 { animation-delay: 100ms; }
.delay-3 { animation-delay: 150ms; }
.delay-4 { animation-delay: 200ms; }
.delay-5 { animation-delay: 250ms; }

/* Glow effects */
.glow-accent {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.15), 0 0 60px rgba(139, 92, 246, 0.08);
}
.glow-accent-strong {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.25), 0 0 80px rgba(139, 92, 246, 0.12);
}
```

---

## 14. Migration Checklist (Current App)

Changes needed to bring the current app in line with this system:

- [ ] Update globals.css with the @theme block and full animation set above.
- [ ] Replace `bg-zinc-100 text-zinc-900` primary buttons with `bg-accent-500 text-white`.
- [ ] Change all `focus:border-zinc-600` to `focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25`.
- [ ] Change `active:scale-[0.98]` to `active:scale-[0.97]` for consistency.
- [ ] Update onboarding step indicator active color from `bg-zinc-300` to `bg-accent-400`.
- [ ] Update Welcome screen icon gradient from zinc to accent.
- [ ] Update selected job card border from `border-zinc-700` to `border-accent-500/30`.
- [ ] Update JobQueue downloading status from blue to accent (brand-consistent).
- [ ] Add `backdrop-blur-sm` to Settings modal overlay.
- [ ] Replace Settings modal `animate-fade-in` with `animate-modal`.
- [ ] Add `max-w-prose` to transcript text in TranscriptView.
- [ ] Update spinner border-top color from `zinc-300/400` to `accent-400`.
- [ ] Change sidebar divider from `border-zinc-800/50` to `border-zinc-800`.

---

## 15. Design Token Summary (Quick Reference)

```
BACKGROUNDS        zinc-950 / zinc-900 / zinc-850* / zinc-800 / zinc-750*
TEXT               zinc-100 / zinc-400 / zinc-500 / zinc-600
ACCENT             accent-500 (base) / accent-400 (light) / accent-300 (text) / accent-600 (hover)
SUCCESS            green-400 text / green-500/10 bg
WARNING            yellow-400 text / yellow-500/10 bg
ERROR              red-400 text / red-500/10 bg
BORDER             zinc-800 (default) / zinc-700 (hover) / accent-500/50 (focus)
RADIUS             rounded-lg (default) / rounded-xl (modal) / rounded-2xl (hero cards)
ANIMATION FAST     150ms ease-out
ANIMATION DEFAULT  250ms ease-out
ANIMATION SMOOTH   350ms ease-out
ANIMATION SLOW     500ms ease-out
ANIMATION DRAMATIC 700ms ease-out
EASING DEFAULT     cubic-bezier(0.16, 1, 0.3, 1)
EASING SPRING      cubic-bezier(0.34, 1.56, 0.64, 1)
FONT PRIMARY       Inter / system stack
FONT MONO          JetBrains Mono / system mono
```
