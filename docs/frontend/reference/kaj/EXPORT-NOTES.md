# V11 Kaj — export

Copied from hut-sample at commit 8c876a8 on 2026-10-19.

## Contents
- src/versions/v11-kaj/ — the version itself (index.tsx, components, tokens.css, theme.css, fonts.ts, NewsSection.module.css)
- src/content/, src/shared/ — shared content data and components V11 imports
- src/tailwind.css — Tailwind entry; imports V11's theme.css
- src/legacy-base.css — browser-defaults reset that excludes V11
- screenshots/ — reference renders (v11-kaj.png, v11-kaj-v2.png, v11-kaj-original.png)
- docs/project-guide.md, docs/redesign-plan.md, CLAUDE.md — project rules (V11 styling in §7/Tailwind notes)
- package.json — dependencies (Tailwind, React, @fontsource-variable/vazirmatn)

## Registry entry (src/versions/registry.ts)
```ts
  {
    id: 'v11-kaj',
    slug: 'v11',
    name: 'کاج',
    nameEn: 'Kaj',
    emphasis: 'اول چهره دانشگاه، کامل‌شده',
    concept:
      'ادامه الوند با همان سبز کاج و طلایی گندم: عکس دانشگاه با نوار یکدست سامانه‌های روزانه، خبر اصلی کنار عکس خودش، بند «در یک نگاه» با ویدیو و ارقام خط‌کشی‌شده، و دستاوردها و دوره‌ها هر کدام با تصویر خودشان.',
    swatches: ['#0B2F32', '#103D40', '#146D66', '#E7BC65', '#F6F8F5'],
    fonts: 'Vazirmatn',
    load: () => import('./v11-kaj'),
  },
```

## Notes for the receiving app
- V11 is styled with Tailwind utilities; tokens live in tokens.css on [data-version='v11'] and are aliased in theme.css.
- Needs Tailwind preflight on, and legacy-base.css must exclude [data-version='v11'].
- Font: Vazirmatn via @fontsource-variable/vazirmatn (imported in fonts.ts).
- Imports use relative paths (../../../../content, ../../../../shared/...); keep the src/ layout or fix them.
- Not included: the rest of the app (gallery, other versions, router, build config).
