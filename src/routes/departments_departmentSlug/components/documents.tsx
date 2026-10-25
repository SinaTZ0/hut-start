import { ChevronDownIcon, DownloadIcon, FileTextIcon } from "lucide-react";

import { Badge } from "#/components/primitive/badge/badge";
import { Button } from "#/components/primitive/button/button";
import { buttonVariants } from "#/components/primitive/button/button.styles";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/primitive/collapsible/collapsible";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "#/components/primitive/item/item";
import { SiteLink } from "#/components/shared/site-link/site-link";
import type { Department, DepartmentDocument, DepartmentTrack } from "#/orpc/department/contract";
import { m } from "#/paraglide/messages";
import { RuledHeading } from "./ruled-heading";

/*===== Documents =====*/

/**
 * The curriculum files per degree, current ones first with older editions folded away. The MSc column also lists each
 * specialisation with its curriculum and course chart; the BSc's charts are already among its files.
 */
export function Documents({ department }: { department: Department }) {
  const byDegree = (degree: DepartmentDocument["degree"]) =>
    department.documents.filter((document) => document.degree === degree);
  const mscTracks = department.fields
    .flatMap((field) => field.tracks)
    .filter((track) => track.degree === "msc" && (track.planUrl || track.chartUrl));

  return (
    <section
      id="department-documents"
      aria-labelledby="department-documents-title"
      className="mx-auto max-w-site scroll-mt-6 px-gutter py-section"
    >
      <RuledHeading id="department-documents-title" number={5} title={m.department_documents_title()} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <DegreeFiles title={m.department_degree_bsc()} documents={byDegree("bsc")} tracks={[]} />
        <DegreeFiles title={m.department_degree_msc()} documents={byDegree("msc")} tracks={mscTracks} />
      </div>
    </section>
  );
}

/*===== Degree Files =====*/

/** One degree's column; nothing when it has neither files nor specialisations with their own. */
function DegreeFiles({
  title,
  documents,
  tracks,
}: {
  title: string;
  documents: DepartmentDocument[];
  tracks: DepartmentTrack[];
}) {
  if (documents.length === 0 && tracks.length === 0) return null;
  const current = documents.filter((document) => !document.archived);
  const archived = documents.filter((document) => document.archived);

  return (
    <div>
      <h3 className="text-h4">{title}</h3>
      <ItemGroup variant="ruled" className="mt-4">
        {current.map((document) => (
          <DocumentRow key={document.id} document={document} />
        ))}
        {tracks.map((track) => (
          <TrackRow key={track.id} track={track} />
        ))}
      </ItemGroup>

      {archived.length > 0 && (
        <Collapsible className="mt-3">
          <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
            {m.department_documents_archived({ count: archived.length })}
            <ChevronDownIcon
              data-icon="inline-end"
              className="transition-transform duration-200 group-data-panel-open/button:rotate-180 motion-reduce:transition-none"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ItemGroup variant="ruled" className="mt-3">
              {archived.map((document) => (
                <DocumentRow key={document.id} document={document} />
              ))}
            </ItemGroup>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

/*===== Document Row =====*/

function DocumentRow({ document }: { document: DepartmentDocument }) {
  return (
    <li>
      <Item render={<SiteLink href={document.url} />}>
        <ItemMedia>
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{document.title}</ItemTitle>
        </ItemContent>
        <ItemActions>
          {/* The file's format is its own name, the same in every language. */}
          <Badge variant="outline" dir="ltr">
            {document.format.toUpperCase()}
          </Badge>
          <DownloadIcon />
        </ItemActions>
      </Item>
    </li>
  );
}

/*===== Track Row =====*/

function TrackRow({ track }: { track: DepartmentTrack }) {
  return (
    <li>
      <Item className="flex-wrap">
        <ItemContent>
          <ItemTitle>{track.name}</ItemTitle>
          {track.note && <ItemDescription>{track.note}</ItemDescription>}
        </ItemContent>
        <ItemActions>
          {track.planUrl && (
            <SiteLink
              href={track.planUrl}
              aria-label={m.department_track_plan_label({ track: track.name })}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <FileTextIcon data-icon="inline-start" />
              {m.department_track_plan()}
            </SiteLink>
          )}
          {track.chartUrl && (
            <SiteLink
              href={track.chartUrl}
              aria-label={m.department_track_chart_label({ track: track.name })}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <DownloadIcon data-icon="inline-start" />
              {m.department_track_chart()}
            </SiteLink>
          )}
        </ItemActions>
      </Item>
    </li>
  );
}
