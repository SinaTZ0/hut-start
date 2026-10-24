# Kaj: Inventory and Normalization

The homepage in this folder (`src/versions/v11-kaj/`, `screenshots/v11-kaj.png`) is the source of the app's look
([customize-template.md](../../../customize-template.md)). Its scale and spacing are kept, but the values aren't
consistent. This table snaps each value to one token, and every row marked **→** is a value that changes. Review it
before the tokens are written to `src/styles.css`.

Reference only: nothing in this folder is imported or linted.

## Colours

Light and dark come from `tokens.css`. Kaj's role names map onto the template's shadcn names, so the primitives keep
working. The **New** rows are roles the template has no token for.

| Kaj role             | Light     | Dark      | Token                                | Used for                                              |
| -------------------- | --------- | --------- | ------------------------------------ | ----------------------------------------------------- |
| `bg`                 | `#f6f8f5` | `#0d1a1b` | `background`                         | page                                                  |
| `bg-alt`             | `#fbfcfa` | `#0f1e20` | **New** `background-alt`             | header bar, alternating sections (semester, learning) |
| `surface`            | `#ffffff` | `#142628` | `card`, `popover`                    | cards, panels, search popover                         |
| `surface-2`          | `#f0f4f1` | `#112123` | `muted`                              | notices panel, welcome help list                      |
| `chip`               | `#e8f0ec` | `#1b3436` | `accent` (quiet wash)                | hover/selected rows, category chips, image placeholder|
| `text`               | `#15292b` | `#e3ebe8` | `foreground`                         | body text                                             |
| `text-muted`         | `#5a6b6a` | `#9db0ad` | `muted-foreground`                   | ledes, meta, descriptions                             |
| `heading`            | `#103d40` | `#eef4f1` | **New** `heading`                    | headings, card titles, tool icons                     |
| `link`               | `#1b6a64` | `#7fd0c3` | `brand-text`                         | links, kickers, service icons                         |
| `pine-900`           | `#103d40` | `#103d40` | `primary` (hover `pine-950`)         | dark pill (tab fill), card arrow on hover, logo tile  |
| `line`               | `#dfe6e2` | `#22393b` | `border`                             | hairlines, card edges                                 |
| `line-strong`        | `#c8d3ce` | `#2e4a4c` | **New** `border-strong`              | card edge on hover                                    |
| `accent` (gold)      | `#e7bc65` | `#e7bc65` | `highlight`                          | the one call to action, progress, gold marks          |
| `#f0cd84` (raw)      | `#f0cd84` | `#f0cd84` | `highlight-hover`                    | gold button hover (was a raw hex in 2 places) **→**   |
| `on-accent`          | `#0b2f32` | `#0b2f32` | `highlight-foreground`               | text on gold                                          |
| `accent-text`        | `#9a6b14` | `#e7bc65` | **New** `highlight-text`             | gold text on light grounds (nav panel group titles)   |
| `accent-wash`        | gold 22 % | gold 22 % | **New** `highlight-surface`          | current/next milestone, bell icon ground (was `accent/22`) **→** |
| `focus`              | `#1f7a72` | `#7fd0c3` | `ring`                               | keyboard focus                                        |
| `band`               | `#103d40` | `#0f3436` | **New** `band`                       | glance band, learning panel, welcome half, rail button|
| `band-deep`          | `#0b2f32` | `#081f21` | **New** `band-deep`                  | utility bar, hero, footer, band hover                 |
| `on-band`, `white`   | `#f3f6f4` | same      | **New** `on-band`                    | text **and** headings on bands (headings were `white`) **→** |
| `#d3e0dd` `#e6efec` `#e3ebe8` | three raw hexes | same | **New** `on-band-soft` `#dde7e4` | mission, hero lede, footer links: one value **→** |
| `on-band-muted`      | `#a9c0bd` | same      | **New** `on-band-muted`              | captions on bands                                     |

Band lines and washes were nine opacities of white. They snap to four tokens:

| Was                                  | Token                       | Value      |
| ------------------------------------ | --------------------------- | ---------- |
| `white/7`, `white/8` (decor rings)   | `band-decor`                | white 8 %  |
| `white/12` `/14` `/16` `/18` `/20` **→** | `band-line`             | white 14 % |
| `white/22` (department grid)         | `band-line-strong`          | white 22 % |
| `white/55`, `white/60` (outline buttons) **→** | `band-control`    | white 60 % |
| `white/8` (outline button hover)     | `band-hover`                | white 8 %  |

The status pairs (`success`, `warning`, `info`, `destructive`) have no Kaj counterpart. They get retuned to sit
beside pine and gold, and are checked for contrast.

## Radius

| Was                                                         | Token          | Used for                                             |
| ----------------------------------------------------------- | -------------- | ---------------------------------------------------- |
| `rounded-xs` (2px), `rounded-[4px]` **→**                   | `xs` 2px       | hairline bars: kicker dash, today marker, term track |
| `rounded-sm` (10px), `rounded-xl` (12px) **→**, `rounded-[14px]` **→** | `sm` 10px | buttons, inputs, tooltip, search rows, icon tiles, date tile, thumbnails |
| `rounded-md` (16px)                                         | `md` 16px      | cards, service rail, notices panel, search popover   |
| `rounded-lg` (22px)                                         | `lg` 22px      | big panels: semester, research units, learning panel, welcome, glance photo, department grid |
| `rounded-full`                                              | `full`         | pills, round icon buttons                            |

**→ Card radius:** news cards were 16px, but achievement cards and learning rows were 22px. All content cards
become `md` 16px. `lg` is kept for the large panels a section is built on.

## Type

Vazirmatn Variable (already self-hosted). Kaj's `step-*` sizes and the ~10 arbitrary `leading-[…]` values become
named styles: `text-<name>` sets size, line height and weight together.

| Style      | Size                         | Line height | Weight | Was                                                                 |
| ---------- | ---------------------------- | ----------- | ------ | ------------------------------------------------------------------- |
| `display`  | step-5 · clamp(40 → 72px)    | 1.3         | 900    | hero name                                                           |
| `h1`       | step-4 · clamp(28 → 40px)    | 1.45        | 800    | section titles (SectionHead, learning panel), page titles           |
| `h2`       | step-3 · clamp(24 → 32px)    | 1.4         | 800    | sub-sections: department count, research units, welcome (was `leading-normal`) **→** |
| `h3`       | step-2 · 22px                | 1.6         | 800    | featured story/achievement (1.7 **→**), notices title, department names (1.5 **→**) |
| `h4`       | step-1 · 18px                | 1.6         | 800    | unit titles, spotlight caption, brand name                          |
| `title`    | step-0 · 15px                | 1.8         | 800    | card titles: news was 700 **→**, achievements and learning 800      |
| `stat`     | step-4                       | 1.3         | 800    | glance figures                                                      |
| `stat-sm`  | step-3                       | 1.25        | 800    | semester day digits                                                 |
| `body-lg`  | step-1 · 18px                | 1.9         | 400    | hero lede                                                           |
| `body`     | step-0 · 15px                | 1.8         | 400    | default text                                                        |
| `body-sm`  | step--1 · 13px               | 2           | 400    | summaries, ledes, mission; 1.8/1.9/2.1 **→** 2                      |
| `caption`  | step--2 · 12px               | 1.7         | 400    | meta, dates, descriptions; 1.6/1.8 **→** 1.7                        |
| `kicker`   | step--1 · 13px               | 1.8         | 600    | SectionHead kicker                                                  |
| `nav`      | step--1 · 13px               | 1.8         | 600    | desktop nav links (step-0 in the phone drawer)                      |
| `button`   | step-0 · 15px                | 1.8         | 700    | hero buttons 15px, welcome buttons 13px **→** one size              |

- **Constraint fix:** `text-[0.625rem]` (10px) on the English brand line (header, footer) and the month in the
  notices date tile goes up to `caption` 12px.
- Weights in between snap: tooltip `font-[650]` **→** 600.
- English uppercase tracking: `0.06em` **→** `tracking-wider` (0.05em), `0.12em` **→** `tracking-widest` (0.1em).

## Spacing and Layout

| Kaj                              | Becomes                                      |
| -------------------------------- | -------------------------------------------- |
| `space-2xs/xs/s/m/l` 4/8/16/24/40 | Tailwind `1 / 2 / 4 / 6 / 10`               |
| `space-xl` clamp(56 → 96px)       | `--spacing-section` (`py-section`)          |
| `roomy` = xl + m, achievements gap = xl + s **→** | one `--spacing-section-lg` (xl + 24px) |
| `gutter` clamp(16 → 40px)         | `--spacing-gutter` (`px-gutter`)            |
| `edge` clamp(16 → 72px)           | `--spacing-edge` (full-bleed header, hero)  |
| `--max` 1240px                    | `--container-site` 77.5rem (was 75rem)      |
| `@media (min-width: 761px)` in the view transitions **→** | `md` (768px), like everything else |

**→ Paddings.** Kaj uses 18, 20, 22, 24, 26, 28 and 30px almost at random. Three rules:

- **Cell** (rail cells, nav rows, search rows, list rows): `px-5 py-4` (20/16). The service-rail cells keep
  `px-3 py-5` because they stack icon, title and description.
- **Card**: `p-5`, `sm:p-6` (20 → 24). Was `px-[22px] pt-[18px] pb-5` (news), `p-6` (achievements),
  `px-7 py-6.5` (lead achievement).
- **Feature** (featured story, lead achievement, band panels): `sm:p-8` (32); welcome and research-units panels `sm:p-10` (40).

Inner gaps `gap-2.5`, `gap-3.5` and `gap-x-[18px]` **→** `2 / 3 / 4`. Icon nudges `mt-[3px]` **→** `mt-0.5`.

**→ Column ratios.** The `fr` pairs collapse to three: news 1.8 : 1 **→** 2 : 1. Achievements 1.05 : 1 and welcome
1.1 : 1 **→** 1 : 1. Research units 0.8 : 1.7 and learning 0.75 : 1.25 **→** 1 : 2. They become plain
`grid-cols-2` / `grid-cols-3` + `col-span-2`, with no arbitrary values. The header mega-panel (1.2 + 3 × 1) and the
footer (1.5 + 3 × 1 + 1.3) keep their shapes as named grid utilities.

**Aspect ratios** stay as they are, with tokens for the two non-standard ones: `aspect-wide` 16 / 7 (news cards,
learning on phones) and `aspect-photo` 16 / 10 (glance photo), plus Tailwind's `video`, `2/1` and `4/3`.

## Shadows

| Was                                       | Token                                        |
| ----------------------------------------- | -------------------------------------------- |
| `--shadow` (card hover, rail, popover, drawer, tooltip) | `elevation-md`                  |
| first layer of `--shadow` only            | `elevation-sm` (inputs, resting controls)    |
| play button `0 0 0 8px gold/28` → `12px gold/22` on hover | `shadow-play`, `shadow-play-hover` |
| hero `text-shadow` (three values)         | one `text-shadow-photo` **→**                |
| hero gradient scrim (arbitrary `bg-[linear-gradient…]`) | `@utility bg-hero-scrim` in `styles.css` |

## Recurring Pieces and Their One Rule

| Piece                         | Was                                                                 | Rule                                                              |
| ----------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Content card** (news, achievement, learning row) | border → `line-strong` + shadow on hover ✓ | same, radius `md` **→**                                    |
| **Card arrow circle**         | achievements: `size-8`, filled `chip` → pine. Learning: `size-10`, outlined → pine **→** | `size-10`, filled `accent` → `primary` on card hover |
| **Row in a joined grid**      | rail, menus, search: `chip`. Research units: `surface-2` **→**. Welcome help: `surface` **→** | hover = `accent` wash everywhere                     |
| **Cell on a band**            | rail "all" button, all-services link: `band` → `band-deep`; departments: → gold | band → `band-deep`; departments keep the gold fill (the one gold hover, it's a call to action) |
| **Gold button**               | `bg-accent hover:bg-[#f0cd84]`, `min-h-12`, `px-6` or `px-5.5` **→** | `Button variant="highlight" size="lg"`: `h-12 px-6`, `button` style |
| **Outline button on band**    | `border-white/55` or `/60` **→**, hover white border + `white/8`   | `Button variant="outline-band"`: `band-control` → `on-band`, `band-hover` |
| **Text link**                 | underline on hover ✓; some also shift colour, footer contact gold → white **→** | underline on hover. A link in a list also shifts to `brand-text` (or `on-band` on a band); a gold link stays gold |
| **Badge on a photo**          | white/pine-900 ("خبر ویژه") vs pine-950/white ("در کانون توجه") **→** | one `Badge variant="media"`: `band-deep` / `on-band`               |
| **Pill / chip**               | `py-px`, `py-0.5`, `py-[3px]`, `py-1`, `px-2.5 … 3.5` **→**       | `Badge`: `px-3 py-0.5`, `caption` semibold                        |
| **Icon tile**                 | logo `rounded-xl` 40/48, footer logo 48, book `rounded-[14px]` 56, help `rounded-xl` 44 **→** | `rounded-sm`, 44px (help, bell) or 48px (logos, book) |
| **Section heading**           | SectionHead; learning panel copies it by hand (`mb-3.5` vs `mb-1.5`); welcome has a kicker without the dash **→** | all three use the shared `section-head` (`onBand` on bands) |
| **Icon button**               | `size-8` on phones **→** (below the 40px tap target)               | `size-10` always (constraint fix)                                 |
| **Motion**                    | 150, 200, 300, 400ms **→**                                          | colour/shadow 200ms; rotate/scale 300ms; photo zoom 300ms         |

## Constraints the Design Breaks

| Issue                                                          | Fix                                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| 10px text in three places                                      | `caption` 12px (above)                                     |
| Gold text `#9a6b14` on `bg` 4.38 : 1, on `surface-2` 4.22 : 1, on `chip` 4.04 : 1 (needs 4.5) | `highlight-text` `#8f6312`: 4.57 – 5.30 on every light ground |
| Search input edge `line-strong` on white 1.54 : 1 (controls need 3 : 1) | `input` token `#7a8d89` (3.0–3.5 on every light ground), dark `#5a7678` (3.2 on `card`, 3.6 on `background`) |
| Header icon buttons 32px on phones                             | 40px                                                       |

Every other text pair passes in both themes. The lowest are `text-muted` on `chip` at 4.83, gold-deep on white at
4.68 and `ring` on `bg` at 4.81.

## Not in the Export (designed later, in the same language)

- Form controls (inputs, select, textarea, field errors) for sign-in and notes; only the search input exists.
- Disabled, loading, empty and error states.
- Toasts, dropdown menus, sheets and tooltips as primitives (the semester tooltip is the only reference).
- The template's own pages (sign-in, notes) and the English layout (`/en`).
