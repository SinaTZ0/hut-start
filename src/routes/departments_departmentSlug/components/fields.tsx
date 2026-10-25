import type { CSSProperties } from "react";

import {
  Card,
  CardBody,
  CardContent,
  CardDescription,
  CardHeader,
  CardKicker,
  CardTitle,
} from "#/components/primitive/card/card";
import { cn } from "#/lib/utils";
import type { DepartmentField, DepartmentTrack } from "#/orpc/department/contract";
import type { Degree } from "#/orpc/department/constants";
import { m } from "#/paraglide/messages";
import { admitsStudents, type Drawings } from "../content";
import { RuledHeading } from "./ruled-heading";

/*===== Fields =====*/

const DEGREE_LABELS: Record<Degree, () => string> = {
  bsc: m.department_degree_bsc,
  msc: m.department_degree_msc_short,
};

/**
 * One card per field: its drawing, what it covers, and the specialisations each degree admits students to. In a
 * department that admits no one, the fields are the subject areas it teaches, with no degree rows.
 */
export function Fields({ fields, drawings }: { fields: DepartmentField[]; drawings: Drawings | null }) {
  const degrees = admitsStudents(fields);

  return (
    <section
      id="department-fields"
      aria-labelledby="department-fields-title"
      className="scroll-mt-6 border-y bg-background-alt"
    >
      <div className="mx-auto max-w-site px-gutter py-section">
        <RuledHeading
          id="department-fields-title"
          number={2}
          title={degrees ? m.department_fields_title() : m.department_areas_title()}
        />
        <p className="mt-5 max-w-2xl text-muted-foreground">
          {degrees
            ? m.department_fields_lede({ count: fields.length })
            : m.department_areas_lede({ count: fields.length })}
        </p>

        <ul className={cn("mt-12 grid gap-5", gridColumns(fields.length))}>
          {fields.map((field, index) => (
            <li key={field.id}>
              <FieldCard
                field={field}
                number={index + 1}
                drawings={drawings}
                wide={fields.length === 1}
                degrees={degrees}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Columns that leave no row half empty: three fields (or five, six) fill rows of three, two a row of two. */
function gridColumns(count: number): string {
  if (count === 1) return "";
  if (count === 2) return "sm:grid-cols-2";
  if (count % 3 === 0 || count === 5) return "sm:grid-cols-2 lg:grid-cols-3";
  return "sm:grid-cols-2 lg:grid-cols-4";
}

/*===== Field Card =====*/

/**
 * A field's drawing, name and degrees. A department with one field (`wide`) gets one card across the section, its
 * drawing beside the text, rather than a narrow card with the rest of the row empty.
 */
function FieldCard({
  field,
  number,
  drawings,
  wide,
  degrees,
}: {
  field: DepartmentField;
  number: number;
  drawings: Drawings | null;
  wide: boolean;
  /** Whether the department admits students at all; if not, the track count and degree rows would only say "none". */
  degrees: boolean;
}) {
  const kicker = (
    <CardHeader>
      <CardKicker>
        <span>{m.department_field_number({ number })}</span>
        {degrees && <span>{m.department_field_tracks({ count: field.tracks.length })}</span>}
      </CardKicker>
    </CardHeader>
  );
  const art = drawings && (
    <div
      aria-hidden
      style={{ "--art": `url("${drawings.field(field.key)}")` } as CSSProperties}
      className={cn("h-40 mask-art text-heading/70", wide && "m-(--card-spacing) sm:h-auto sm:w-2/5 sm:shrink-0")}
    />
  );
  const text = (
    <>
      <CardHeader>
        <CardTitle>
          <h3>{field.name}</h3>
        </CardTitle>
        <CardDescription>{field.summary}</CardDescription>
      </CardHeader>
      {degrees && (
        <CardContent>
          <dl className="flex flex-col gap-3 border-t border-dashed border-border-strong pt-5">
            <DegreeRow degree="bsc" tracks={field.tracks} />
            <DegreeRow degree="msc" tracks={field.tracks} />
          </dl>
        </CardContent>
      )}
    </>
  );

  if (wide) {
    return (
      <Card size="lg" orientation="horizontal">
        {art}
        <CardBody>
          {kicker}
          {text}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card size="lg" className="h-full">
      {kicker}
      {art && <CardContent>{art}</CardContent>}
      {text}
    </Card>
  );
}

/*===== Degree Row =====*/

/** The field's specialisations at one degree, or a dash when it admits no one at that degree. */
function DegreeRow({ degree, tracks }: { degree: Degree; tracks: DepartmentTrack[] }) {
  const names = tracks.filter((track) => track.degree === degree).map((track) => track.name);

  return (
    <div className="flex gap-3">
      <dt
        className={cn(
          "w-16 shrink-0 text-caption font-bold",
          names.length > 0 ? "text-highlight-text" : "text-muted-foreground",
        )}
      >
        {DEGREE_LABELS[degree]()}
      </dt>
      {names.length > 0 ? (
        <dd className="flex flex-col text-body-sm">
          {names.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </dd>
      ) : (
        <dd className="text-body-sm text-muted-foreground">
          <span aria-hidden>—</span>
          <span className="sr-only">{m.department_field_closed()}</span>
        </dd>
      )}
    </div>
  );
}
