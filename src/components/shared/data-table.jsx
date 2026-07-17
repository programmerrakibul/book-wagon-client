import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EmptyState } from "./empty-state";

export function DataTable({
  columns,
  data = [],
  getRowId = (row) => row._id,
  sort,
  onSort,
  emptyState,
  renderCard,
}) {
  const toggleSort = (key) =>
    onSort?.(
      sort?.key === key
        ? { key, direction: sort.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );

  return (
    <>
      {renderCard && (
        <div className="grid gap-4 sm:hidden">
          {data.length
            ? data.map((row) => (
                <div key={getRowId(row)}>{renderCard(row)}</div>
              ))
            : emptyState || <EmptyState />}
        </div>
      )}

      <div className="hidden w-full rounded-xl border bg-card sm:block">
        <ScrollArea className="w-full">
          <Table className="min-w-[540px]">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8"
                        onClick={() => toggleSort(column.key)}
                      >
                        {column.header}
                        {sort?.key === column.key &&
                          (sort.direction === "asc" ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          ))}
                      </Button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length ? (
                data.map((row) => (
                  <TableRow key={getRowId(row)}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={column.cellClassName}
                      >
                        {column.cell ? column.cell(row) : row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="p-0">
                    {emptyState || <EmptyState />}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
