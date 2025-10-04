"use client";

import * as React from "react";
import { WATCHLIST_TABLE_HEADER } from "@/lib/constants";

// Minimal, self-contained ShadCN-like Table primitives
const cx = (...c: Array<string | undefined>) => c.filter(Boolean).join(" ");

const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<"table">>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={cx("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"thead">>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cx("[&_tr]:border-b", className)} {...props} />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cx("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tfoot">>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cx("bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<"tr">>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cx(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"th">>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cx(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"td">>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cx("p-4 align-middle", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<"caption">>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cx("mt-4 text-left text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
);
TableCaption.displayName = "TableCaption";

export default function WatchlistTable() {
  const headers = WATCHLIST_TABLE_HEADER;

  // Sample data to match the header columns (text-only, left-aligned)
  const rows = [
    ["Apple Inc.", "AAPL", "$226.12", "+1.24%", "$3.70T", "35.2", "—", "—"],
    ["Microsoft Corp.", "MSFT", "$412.45", "-0.32%", "$3.27T", "38.7", "—", "—"],
    ["NVIDIA Corp.", "NVDA", "$855.09", "+2.15%", "$2.11T", "74.9", "—", "—"],
  ];

  return (
    <Table className="min-w-[720px]">
      <TableHeader>
        <TableRow>
          {headers.map((h) => (
            <TableHead key={h} className="text-left">
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {row.map((cell, i) => (
              <TableCell key={i} className="text-left">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>Your tracked stocks at a glance.</TableCaption>
    </Table>
  );
}
