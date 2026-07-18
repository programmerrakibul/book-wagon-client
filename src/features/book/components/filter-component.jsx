import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/book/hooks/use-categories";
import useBookFilters, { setCategory } from "@/store/use-book-filters";
import { useCallback } from "react";

const FilterComponent = () => {
  const category = useBookFilters((state) => state.category);
  const { data: categories = [] } = useCategories();

  const handleFilter = useCallback(
    (val) => setCategory(val === "all" ? "" : val),
    [],
  );

  return (
    <Select value={category} onValueChange={handleFilter}>
      <SelectTrigger>
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" title="All Categories">All Categories</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat._id} value={cat._id} title={cat.name}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterComponent;
