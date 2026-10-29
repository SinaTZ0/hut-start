import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/primitive/table/table";
import type { Office } from "#/orpc/office/contract";
import { m } from "#/paraglide/messages";

/*===== Schedule Tables =====*/

/** The office's opening hours, a table per period (the library's two halves of the year), side by side when wide. */
export function ScheduleTables({ schedules }: { schedules: Office["schedules"] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {schedules.map((schedule) => (
        <Table key={schedule.title}>
          <TableCaption>{schedule.title}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">{m.office_schedule_service()}</TableHead>
              {schedule.columns.map((column) => (
                <TableHead key={column} scope="col">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.rows.map((row) => (
              <TableRow key={row.label}>
                <TableHead scope="row">{row.label}</TableHead>
                {/* Cells repeat («تعطیل»), so each is keyed by its column. */}
                {row.cells.map((cell, index) => (
                  <TableCell key={schedule.columns[index]}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
