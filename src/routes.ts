import { index, layout, rootRoute, route } from "@tanstack/virtual-file-routes";

// The route tree, declared in code so route slices stay flat folders under `src/routes/` (CLAUDE.md → Route Slices).
// File paths are relative to `src/routes/`. The TanStack Start plugin turns this into `src/routeTree.gen.ts`.
export const routes = rootRoute("__root.tsx", [
  layout("site_layout/site-layout.tsx", [
    index("home/home.tsx"),
    route("/auth", "auth/auth.tsx"),
    route("/feedback", "feedback/feedback.tsx"),
    route("/privacy", "privacy/privacy.tsx"),
    route("/consultation", "consultation/consultation.tsx"),
    route("/departments/$departmentSlug", "departments_departmentSlug/departments-department-slug.tsx"),
    route("/articles/$articleId", "articles_articleId/articles-article-id.tsx"),
    layout("notes_layout/notes-layout.tsx", [route("/notes", "notes/notes.tsx")]),
  ]),

  /*===== Server Routes =====*/
  // No component: each answers HTTP requests itself (`server.handlers`).
  route("/api/auth/$", "api_auth/api-auth.ts"),
  route("/rpc/$", "rpc/rpc.ts"),
  route("/healthz", "healthz/healthz.ts"),
  route("/robots.txt", "robots/robots.ts"),
  route("/sitemap.xml", "sitemap/sitemap.ts"),
]);
