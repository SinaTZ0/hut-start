import type { ComponentProps } from "react";

import { cn } from "#/lib/utils";
import {
  tableBodyClasses,
  tableCaptionClasses,
  tableCellClasses,
  tableClasses,
  tableContainerClasses,
  tableFooterClasses,
  tableHeadClasses,
  tableHeaderClasses,
  tableRowClasses,
} from "./table.styles";

/*===== Table =====*/

/** A data table in a bordered box that scrolls sideways on its own when its columns don't fit. */
function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className={tableContainerClasses}>
      <table data-slot="table" className={cn(tableClasses, className)} {...props} />
    </div>
  );
}

/*===== Compound Parts =====*/

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(tableHeaderClasses, className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(tableBodyClasses, className)} {...props} />;
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn(tableFooterClasses, className)} {...props} />;
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn(tableRowClasses, className)} {...props} />;
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
  return <th data-slot="table-head" className={cn(tableHeadClasses, className)} {...props} />;
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn(tableCellClasses, className)} {...props} />;
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn(tableCaptionClasses, className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
