# App Identity: Mood, Tone & Theme

The site of Hamedan University of Technology (دانشگاه صنعتی همدان). Its look comes from the "Kaj" (کاج, pine)
homepage in [reference/kaj/](./reference/kaj/): deep pine teal from the slopes of Alvand, a wheat-gold accent, and a
cool off-white page. The theme values live in `src/styles.css` and the primitives' `*.styles.ts`; keep this page in
step with them.

## Mood

- **Calm**: a cool off-white page, one font, hairline borders and soft shadows. Colour comes from the pine bands and
  the photographs, not from decoration.
- **Official**: a public university, not a campaign. Plain statements over slogans, figures set in ruled rows, and
  the emblem on every page.
- **Rooted**: the campus under Alvand is the first thing a visitor sees. Pine bands (`band`, `band-deep`) frame the
  page at the top, the middle and the foot.
- **Focused**: gold (`highlight`) marks the one action that matters on each band. Everything else is pine or neutral.
- **Practical**: the systems students use every day (portal, email, library, the semester calendar) sit within one
  click of the first screen.

## Tone (copy)

Persian is the reference copy; every other language carries the same tone in its own idiom, not a word-for-word
translation ([i18n.md](./i18n.md)).

- Formal and warm: address the reader as «شما» (in English: plain, polite, second person).
- Persian digits and the Persian thousands separator «٬»; Jalali dates. These come from the locale through the
  formatting helpers, never typed into a message. Phone numbers, e-mail addresses and URLs are set `dir="ltr"` in
  every language.
- Say what something is or does, in short sentences: «دانشگاهی دولتی و مهندسی‌محور در دامنه الوند…», not superlatives.
  The one place for a line with some lift is the hero («جایی برای یادگیری، پژوهش و ساختن.»).
- Headings are short noun phrases («در یک نگاه», «گروه‌های آموزشی»); links and buttons name the destination or the
  action («مشاهده تقویم», «راهنمای نودانشجویان»), never «اینجا کلیک کنید».
- Dates and deadlines are relative where it helps («۳ روز دیگر», «در جریان») and always give the date as well.
- English follows the university's own English name, "Hamedan University of Technology", and the same plain register.

## Brand

- **Logo**: the university emblem, a white transparent PNG. On light grounds it is drawn as a mask in `currentColor`
  (pine); on bands it stays white. It always sits beside the visible university name, so it is decorative (`alt=""`).
  Icon tiles that hold it are `rounded-sm`, 48px.
- **Photography**: real photographs of the campus, its people and events. The hero is the campus with Alvand behind
  it, edge to edge, under a pine scrim (`bg-hero-scrim`) that keeps the text on it readable. News and achievement
  photos sit in fixed ratios (`aspect-wide`, `aspect-photo`, `video`) and zoom slightly on hover. Labels on photos are
  `Badge variant="media"`.
- **Signature drawings**: each department has its own engineering sketch in the manner of a Da Vinci notebook (fine
  ink lines, cross-hatching, construction circles, dimension lines, exploded views; for electrical engineering a
  dynamo, a transformer, a Volta pile and field lines). Each is one transparent WebP in
  `public/images/departments/<slug>/` used as a CSS mask, so it takes a single theme colour: `art-ink` (ink on paper in
  light, pale lines in dark) behind a page's hero (`art-sheet`), `art-band` on a pine band (`art-band`), and
  `currentColor` for a small vignette (`mask-art`). The drawing sits at the top of the page or on a band, never behind
  body text, fades out downward and stays faint under the title. Its empty side is the start, so English mirrors it. It
  never moves. The department page echoes it in type: section numbers in gold, a ruler (`ruler`) after each heading,
  and figures hung from dimension lines.
- **Home drawings**: the home page has drawings of its own in the same hand, in `public/images/home/` (listed in
  `src/lib/university/drawings.ts`): Avicenna's tomb before Alvand with an astrolabe across the glance band, a
  seedling among gears in the learning panel's corner, a book, dividers and an iwan in the welcome panel's corner (kept
  small, clear of its text), and a telescope and microscope under the research units' introduction (`art-ink`). Each
  department's cell in the glance grid carries its mark (`mark.webp`, its key object cut from its hero drawing). The
  photo hero takes no drawing. The home echoes the department page too: its figures hang from dimension lines, and
  the news, semester and achievements heads draw a ruler to their link (`SectionHead ruled`).
- **Form drawings**: the public forms (`/feedback`, `/consultation`) each have one in `public/images/forms/` (listed in
  `FORM_DRAWINGS`): a quill, a sealed letter and a balance scale for complaints; an open book with dividers, a compass
  and a lantern for consultation. Each sits in the far corner of its page's pine rail (`mask-art text-art-band`), under
  the steps; the receipt's tracking code hangs from a dimension line.
- **Rules out**: stock photography, illustrations other than the signature drawings, gradients as decoration, a second
  accent colour, and gold on large areas.
- **References**: the Kaj homepage source and screenshot in [reference/kaj/](./reference/kaj/), and its
  [normalization table](./reference/kaj/normalization.md), which records every value that was snapped to a token.

## Motion

The site answers the visitor with small, quick movements: everything clickable responds to hover, keyboard focus and
being used, but nothing moves on its own or calls attention to itself.

- **Every interactive thing responds**, subtly. A link card lifts (darker edge, `shadow-md`), its photo zooms to 1.03
  and its arrow disc fills pine; a forward arrow nudges ahead a few pixels; a row takes the `accent` wash; a disclosure
  chevron turns; a tab switcher's pill slides to the chosen tab while its content cross-fades in from that side; a panel that opens grows out of its trigger while
  what follows glides aside (the Collapsible primitive). A new component gets the same kind of response.
- **CSS transitions first**: motion inside a page is a CSS transition on the real element, through the primitives
  (Tabs' indicator and panels, Collapsible's height). It stays sharp, can be interrupted mid-way and needs no library.
- **View transitions where CSS can't follow**: moving between pages, and a change CSS can't animate, such as one block
  of content replacing another of a different height (a public form and its receipt) or a list that filters or
  reorders. Those use React's `<ViewTransition>`, not hand-written measuring and animating code
  ([view-transitions.md](./view-transitions.md#animating-more)).
- **Small and short**: colour and shadow over 200ms, movement and scale over 300ms, `ease-out`. Distances stay within a
  few pixels and scale within 1.03. No bounce, spring, parallax, looping or attention-seeking animation, and nothing
  that delays an action.
- **Hover and focus match**: whatever a hover shows, keyboard focus shows too.
- **Reduced motion** turns the movement off (`motion-safe:` on the movement, `motion-reduce:transition-none`); colour
  changes may stay.

## Theme

- Use the theme's Tailwind classes (`bg-primary`, `text-muted-foreground`, `text-h2`…), never raw hex or the Tailwind
  palette. A new colour or type style is declared in `src/styles.css` first.
- Token names follow shadcn so the primitives keep working. **Naming trap**: the brand call-to-action fill is
  `highlight`; shadcn's `accent` is the quiet wash for hover and selected states.
- Beyond shadcn's names: `background-alt` (alternating sections), `heading`, `border-strong` (card edge on hover),
  `highlight-text` and `highlight-surface` (gold text and the gold wash on light grounds), and the band family:
  `band`, `band-deep`, `on-band`, `on-band-soft`, `on-band-muted`, `band-line`, `band-line-strong`, `band-control`,
  `band-hover`, `band-decor`. Text, borders and buttons on a band use the band tokens, never `primary` or
  `foreground`.
- **Dark mode** is the `.dark` class on `<html>` (the theme toggle). Recolour through the tokens, never by theme in
  component code. The bands stay dark in both themes.
- Icons are Lucide. Their stroke width is set in `styles.css`; change it with a `stroke-*` class, not the `strokeWidth`
  prop.

## Constraints

These come from the language and accessibility, not from taste, so they hold whatever the design:

- Persian needs tall lines: keep line heights generous and text at 12px or larger. The same type styles serve
  English.
- Both directions: the layout mirrors between Persian (right-to-left) and English (left-to-right), and
  forward-pointing icons point the way the text reads. The code rules are in
  [architecture.md](./architecture.md#language-direction-and-accessibility) and [i18n.md](./i18n.md).
- Text pairs at least 4.5:1; control edges, focus rings and large text at least 3:1. Check new colours in both themes.
- Every interactive element shows a visible keyboard focus. Status colours travel with an icon or a word, never colour
  alone. Movement respects `prefers-reduced-motion` (`motion-safe:` / `motion-reduce:`).
- Tap targets are at least 40px.
