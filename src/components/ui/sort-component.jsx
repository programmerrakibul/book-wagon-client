import useBookFilters, { setSort } from "@/stores/use-book-filters";
import FilterComponent from "./filter-component";

const sortOptions = [
  {
    _id: "kx7m9p2",
    slug: "price-asc",
    name: "Price: Low to High",
  },
  {
    _id: "b4v8n1t",
    slug: "price-desc",
    name: "Price: High to Low",
  },
  {
    _id: "q9r3w6z",
    slug: "name-asc",
    name: "Name: A to Z",
  },
  {
    _id: "f2j7g4x",
    slug: "name-desc",
    name: "Name: Z to A",
  },
  {
    _id: "l5k8m3c",
    slug: "createdAt-desc",
    name: "Newest First",
  },
  {
    _id: "h1v9p6s",
    slug: "createdAt-asc",
    name: "Oldest First",
  },
];

const SortComponent = () => {
  const sort = useBookFilters((state) => state.sort);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setSort(value);
  };

  return (
    <FilterComponent
      data={sortOptions}
      value={sort}
      onChange={handleChange}
      defaultLabel="Sort By"
    />
  );
};

export default SortComponent;
