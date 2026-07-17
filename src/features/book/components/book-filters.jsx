import { useCallback } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import useBookFilters, { resetFilters, setSearch } from "@/store/use-book-filters";

import FilterComponent from "./filter-component";
import SortComponent from "./sort-component";

function BookFilters() {
  const { search, sort, category } = useBookFilters();
  const hasActiveFilters = Boolean(search || sort || category);

  const handleSearch = useCallback((val) => setSearch(val), []);

  return (
    <div className="my-8 grid grid-cols-1 gap-3 md:grid-cols-4">
      <Search
        onChange={handleSearch}
        className="md:col-span-2"
        placeholder="Search by book name, author..."
      />
      <FilterComponent />
      <div className="flex gap-2">
        <div className="flex-1">
          <SortComponent />
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={resetFilters}
            aria-label="Reset filters"
          >
            <RotateCcw className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default BookFilters;
