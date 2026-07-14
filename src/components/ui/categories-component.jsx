import { useCategories } from "@/hooks/use-categories";
import useBookFilters, { setCategory } from "@/stores/use-book-filters";
import FilterComponent from "./filter-component";

const CategoriesComponent = () => {
  const { data, isLoading } = useCategories();
  const category = useBookFilters((state) => state.category);

  console.log(category);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setCategory(value);
  };

  return (
    <FilterComponent
      data={data}
      isLoading={isLoading}
      value={category}
      onChange={handleChange}
    />
  );
};

export default CategoriesComponent;
