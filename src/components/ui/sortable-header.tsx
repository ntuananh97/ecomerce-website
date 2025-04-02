import { TableCell } from "./table";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SortableHeaderProps extends React.HTMLAttributes<HTMLTableCellElement> {
  column: string;
  label: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

const SortableHeader = ({
  column,
  label,
  // sortBy,
  // sortOrder,
  onSort,
  className,
  ...props
}: SortableHeaderProps) => {
  // const isActive = sortBy === column;
  
  return (
    <TableCell
      onClick={() => onSort?.(column)}
      // className={cn(
      //   "cursor-pointer hover:bg-muted/50 transition-colors",
      //   className
      // )}
      {...props}
    >
      <Button className={cn("flex items-center font-normal", className)} variant="ghost">
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
        {/* {isActive && (
          <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
        )} */}
      </Button>
    </TableCell>
  );
};

export { SortableHeader }; 