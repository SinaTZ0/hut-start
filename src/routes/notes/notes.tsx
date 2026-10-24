import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { NotebookPenIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/primitive/card/card";
import { SectionHead } from "#/components/shared/section-head/section-head";
import { pageMeta } from "#/lib/seo";
import { orpc } from "#/orpc/client";
import { m } from "#/paraglide/messages";
import { NoteCard } from "#/routes/notes/components/note-card";
import { NoteForm } from "#/routes/notes/components/note-form";

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/_notes-layout/notes")({
  // Fills the Query cache on the server, on preload and on navigation; the page reads the same query.
  loader: ({ context }) => context.queryClient.ensureQueryData(orpc.note.list.queryOptions()),
  // Behind a sign-in, so search engines shouldn't list it.
  head: (args) => pageMeta({ args, title: m.notes_title(), index: false }),
  component: NotesPage,
});

/*===== Page =====*/
function NotesPage() {
  const { viewer } = Route.useRouteContext();
  const { data: notes } = useSuspenseQuery(orpc.note.list.queryOptions());
  const queryClient = useQueryClient();
  // Creating or deleting a note changes the list; nothing else on the page depends on it.
  const refresh = () => void queryClient.invalidateQueries({ queryKey: orpc.note.list.key() });

  return (
    <div className="mx-auto max-w-site px-gutter py-section">
      <SectionHead as="h1" id="notes-title" kicker={m.notes_kicker()} title={m.notes_title()} lede={m.notes_lede()} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/*===== New Note =====*/}
        <Card className="self-start">
          <CardHeader>
            <CardTitle>
              <h2>{m.notes_new_heading({ name: viewer.name })}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NoteForm onCreated={refresh} />
          </CardContent>
        </Card>

        {/*===== List =====*/}
        <section aria-label={m.notes_list_label()} className="min-w-0 lg:col-span-2">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-card px-6 py-16 text-center text-muted-foreground">
              <NotebookPenIcon aria-hidden className="size-8 text-brand-text" />
              <p>{m.notes_empty()}</p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {notes.map((note) => (
                <li key={note.id}>
                  <NoteCard note={note} onDeleted={refresh} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
