import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useBookFilters, { setSort } from "@/store/use-book-filters";
import { useCallback } from "react";
import { sortOptions } from "../constants";

const SortComponent = () => {
  const sort = useBookFilters((state) => state.sort);

  const handleSort = useCallback(
    (val) => setSort(val === "default" ? "" : val),
    [],
  );

  return (
    <Select value={sort} onValueChange={handleSort}>
      <SelectTrigger>
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            title={option.label}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortComponent;
