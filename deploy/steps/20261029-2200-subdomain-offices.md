---
run:
  - seed pages offices library
---

Sixteen office pages moved from the university's subsites (the three vice-presidencies, research affairs, faculty
recruitment, the press, the library, industry liaison, the central laboratory, and the student affairs offices) were
added in src/db/pages/offices-*.ts, with their files. The seed now loads only the offices and file sections it's
missing, so this adds those and leaves the offices already on the server, and any edits to them, as they are. It
downloads 39 photos and book covers, a minute or two.
