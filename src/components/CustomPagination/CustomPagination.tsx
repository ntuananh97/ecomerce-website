import React, { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const generatePagination = useCallback(() => {
    const items: (number | string)[] = [];

    // Nếu tổng số trang ít hơn hoặc bằng 5, hiển thị tất cả các số trang
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include the first page
    items.push(1);

    // Add ellipsis if necessary before the current page range
    if (currentPage > 3) items.push("ellipsis-start");

    // Determine the range of surrounding pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add the pages within the range, avoiding duplicates
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    // Add ellipsis before the last page if necessary
    if (currentPage < totalPages - 2) items.push("ellipsis-end");

    // Always include the last page if not already included
    if (totalPages > 1 && items[items.length - 1] !== totalPages) {
      items.push(totalPages);
    }

    return items;
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className={cn("flex justify-end items-center", className)}>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        )}
        {generatePagination().map((item, index) => {
          if (item === "ellipsis-start" || item === "ellipsis-end") {
            return (
              <PaginationItem key={`${item}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const page = item as number;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {!isLastPage && (
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
