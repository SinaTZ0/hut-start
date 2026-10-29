import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import {
  BookOpenIcon,
  BriefcaseIcon,
  FilesIcon,
  FlaskConicalIcon,
  GraduationCapIcon,
  type LucideIcon,
  ScaleIcon,
  SchoolIcon,
  SearchXIcon,
} from "lucide-react";
import { useCallback } from "react";

import { ItemGroup } from "#/components/primitive/item/item";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { FileRow } from "#/components/shared/file-row/file-row";
import { PageHero } from "#/components/shared/page-hero/page-hero";
import { RuledHeading } from "#/components/shared/ruled-heading/ruled-heading";
import { SearchField } from "#/components/shared/search-field/search-field";
import { useSearchText } from "#/hooks/use-search-text";
import { formatDate, formatNumber } from "#/lib/locale";
import { matchesSearch, searchWords } from "#/lib/persian-text";
import { listSearchDefaults, listSearchSchema } from "#/lib/search-params";
import { pageMeta } from "#/lib/seo";
import { PAGE_DRAWINGS } from "#/lib/university/drawings";
import { cn } from "#/lib/utils";
import { orpc } from "#/orpc/client";
import type { LibraryIcon } from "#/orpc/library/constants";
import { m } from "#/paraglide/messages";

/*===== Query =====*/
const formsQuery = () => orpc.library.forms.queryOptions();

/*===== Icons =====*/
const SECTION_ICONS: Record<LibraryIcon, LucideIcon> = {
  graduation: GraduationCapIcon,
  education: SchoolIcon,
  research: FlaskConicalIcon,
  faculty: BriefcaseIcon,
  guides: BookOpenIcon,
  regulations: ScaleIcon,
  files: FilesIcon,
};

/*===== Route =====*/
export const Route = createFileRoute("/_site-layout/forms")({
  // Only the search text; `group` is unused here and falls away.
  validateSearch: listSearchSchema.pick({ q: true }),
  search: { middlewares: [stripSearchParams({ q: listSearchDefaults.q })] },
  loader: ({ context }) => context.queryClient.ensureQueryData(formsQuery()),
  head: (args) => pageMeta({ args, title: m.service_forms(), description: m.forms_description() }),
  component: FormsPage,
});

/*===== Page =====*/

/**
 * The university's forms and regulations: numbered sections, each with its headed groups of files, under a search over
 * every file's title. The section links under the search jump to each section.
 */
function FormsPage() {
  const { data } = useSuspenseQuery(formsQuery());
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const changeQuery = useCallback(
    (next: string) => void navigate({ search: { q: next }, replace: true, resetScroll: false }),
    [navigate],
  );
  const [text, setText] = useSearchText({ value: q, onCommit: changeQuery });

  const words = searchWords(q);
  const sections = data.sections
    .map((section, index) => ({
      ...section,
      number: index + 1,
      groups: section.groups
        .map((group) => ({
          ...group,
          documents: group.documents.filter((document) =>
            matchesSearch(words, [document.title, group.title, section.title]),
          ),
        }))
        .filter((group) => group.documents.length > 0),
    }))
    .filter((section) => section.groups.length > 0);
  const countOf = (section: (typeof data.sections)[number]) =>
    section.groups.reduce((sum, group) => sum + group.documents.length, 0);

  return (
    <>
      <PageHero
        id="forms-title"
        crumbs={[{ label: m.service_forms() }]}
        title={m.service_forms()}
        lede={m.forms_lede()}
        drawing={PAGE_DRAWINGS.documents}
      >
        <SearchField
          label={m.forms_search_label()}
          placeholder={m.forms_search_placeholder()}
          value={text}
          onValueChange={setText}
        />
        <nav aria-label={m.forms_sections_label()}>
          <ul className="flex flex-wrap gap-2">
            {data.sections.map((section) => {
              const Icon = SECTION_ICONS[section.icon];
              return (
                <li key={section.key}>
                  <a href={`#forms-${section.key}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    <Icon data-icon="inline-start" />
                    {section.title}
                    <span className="text-muted-foreground">{formatNumber(countOf(section))}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHero>

      {/*===== Sections =====*/}
      <div aria-live="polite">
        {sections.length === 0 && (
          <div className="mx-auto max-w-site px-gutter pb-section">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-card px-6 py-16 text-center text-muted-foreground">
              <SearchXIcon aria-hidden className="size-8 text-brand-text" />
              <p>{m.hub_empty({ query: q })}</p>
            </div>
          </div>
        )}
        {sections.map((section, index) => (
          <section
            key={section.key}
            id={`forms-${section.key}`}
            aria-labelledby={`forms-${section.key}-title`}
            className={cn("scroll-mt-24 border-t", index % 2 === 0 ? "bg-background-alt" : "bg-background")}
          >
            <div className="mx-auto max-w-site px-gutter py-12 md:py-14">
              <RuledHeading id={`forms-${section.key}-title`} number={section.number} title={section.title} />
              <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-2">
                {section.groups.map((group) => (
                  <div key={group.id}>
                    <h3 className="flex items-baseline gap-2 text-h4">
                      {group.title}
                      <span className="text-caption font-normal text-muted-foreground">
                        {m.forms_file_count({ count: group.documents.length })}
                      </span>
                    </h3>
                    <ItemGroup variant="ruled" className="mt-3">
                      {group.documents.map((document) => (
                        <FileRow key={document.id} title={document.title} url={document.url} format={document.format} />
                      ))}
                    </ItemGroup>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {data.updatedAt && (
        <p className="mx-auto max-w-site border-t px-gutter py-8 text-body-sm text-muted-foreground">
          {m.phonebook_updated({ date: formatDate(data.updatedAt, { dateStyle: "long" }) })}
        </p>
      )}
    </>
  );
}
