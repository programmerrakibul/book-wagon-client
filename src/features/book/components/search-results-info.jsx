import { useCategories } from "@/features/book/hooks/use-categories";
import useBookFilters from "@/store/use-book-filters";
import { useMemo } from "react";
import { sortOptions } from "../constants";

function SearchResultsInfo({ totalDocs = 0 }) {
  const { search, sort, category } = useBookFilters();
  const { data: categories = [] } = useCategories();

  const categoryName = useMemo(() => {
    if (!category || categories.length === 0) return "";

    return categories.find((c) => c._id === category)?.name;
  }, [category, categories]);
  const sortLabel = useMemo(() => {
    if (!sort) return "";

    return sortOptions.find((o) => o.value === sort)?.label;
  }, [sort]);

  if (!search && !sort && !category) return null;
  const parts = [];
  if (search) parts.push(`"${search}"`);
  if (categoryName) parts.push(categoryName);
  if (sortLabel) parts.push(sortLabel);

  const description = parts.join(" · ");

  return (
    <p className="mb-6 text-sm text-muted-foreground">
      {search && (
        <>
          Search results for{" "}
          <span className="font-medium text-foreground">{search}</span>
        </>
      )}
      {!search && description && (
        <>
          Filtered by{" "}
          <span className="font-medium text-foreground">{description}</span>
        </>
      )}
      <span className="ml-1">
        &mdash; {totalDocs} {totalDocs === 1 ? "book" : "books"} found
      </span>
    </p>
  );
}

export default SearchResultsInfo;
