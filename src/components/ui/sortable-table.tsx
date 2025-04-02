import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell
} from "./table";
import { SortableHeader } from "./sortable-header";
import Loading from "@/components/Loading";

export interface SortableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  renderCell?: (item: T, index: number) => ReactNode;
}

interface SortableTableProps<T> {
  columns: SortableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  // sortBy?: string;
  // sortOrder?: "asc" | "desc";
  onSort?: (column: string) => void;
  keyExtractor: string;
  noDataMessage?: string;
  loadingComponent?: ReactNode;
  className?: string;
}

export function SortableTable<T >({
  columns,
  data,
  isLoading = false,
  // sortBy,
  // sortOrder,
  onSort,
  keyExtractor,
  noDataMessage = "No data found",
  loadingComponent,
  className
}: SortableTableProps<T>) {
  const getCellContent = (item: T, key: string) => {
    const value = item[key as keyof T];
    // Handle undefined or convert to string if needed
    return value !== undefined ? String(value) : '';
  };

  return (
    <div className={`rounded-md border ${className || ''}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              return column.sortable ? (
                <SortableHeader
                  key={column.key}
                  column={column.key}
                  label={column.label}
                  // sortBy={sortBy}
                  // sortOrder={sortOrder}
                  onSort={onSort}
                  className={column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : ""}
                />
              ) : (
                <TableCell
                  key={column.key}
                  className={column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : ""}
                >
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {loadingComponent || <Loading />}
              </TableCell>
            </TableRow>
          ) : data.length ? (
            data.map((item, index) => {
              const key = item[keyExtractor as keyof typeof item] as string;
              return (
                <TableRow key={key}>
                  {columns.map((column) => (
                    <TableCell 
                      key={`${String(key)}-${column.key}`}
                      className={column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : ""}
                    >
                      {column.renderCell ? column.renderCell(item, index) : getCellContent(item, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noDataMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 