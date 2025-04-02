import { useState, useCallback } from 'react';

interface SortConfig {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface UseSortingResult {
  sortConfig: SortConfig;
  onSort: (column: string) => void;
  resetSort: (defaultConfig?: SortConfig) => void;
}

interface UseSortingOptions {
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
  onSortChange?: (sortConfig: SortConfig) => void;
}

export function useSorting({
  defaultSortBy = '',
  defaultSortOrder = 'asc',
  onSortChange
}: UseSortingOptions = {}): UseSortingResult {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortBy: defaultSortBy,
    sortOrder: defaultSortOrder
  });

  const onSort = useCallback((column: string) => {
    setSortConfig((prevConfig) => {
      const newOrder: 'asc' | 'desc' = prevConfig.sortBy === column && prevConfig.sortOrder === 'asc' ? 'desc' : 'asc';
      
      const newConfig: SortConfig = {
        sortBy: column,
        sortOrder: newOrder
      };
      
      if (onSortChange) {
        onSortChange(newConfig);
      }
      
      return newConfig;
    });
  }, [onSortChange]);

  const resetSort = useCallback((defaultConfig?: SortConfig) => {
    const newConfig: SortConfig = defaultConfig || {
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder
    };
    
    setSortConfig(newConfig);
    
    if (onSortChange) {
      onSortChange(newConfig);
    }
  }, [defaultSortBy, defaultSortOrder, onSortChange]);

  return {
    sortConfig,
    onSort,
    resetSort
  };
} 