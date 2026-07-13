import { getBooks } from "@/api/book";
import useBookFilters from "@/stores/use-book-filters";
import { useQuery } from "@tanstack/react-query";

const useBooks = () => {
  const search = useBookFilters((state) => state.search);
  const page = useBookFilters((state) => state.page);
  const limit = useBookFilters((state) => state.limit);
  const sort = useBookFilters((state) => state.sort);
  const category = useBookFilters((state) => state.category);

  return useQuery({
    queryKey: ["books", search, page, limit, sort, category],
    queryFn: () => getBooks({ search, page, limit, sort, category }),
    staleTime: 1000 * 60 * 60,
    placeholderData: (previousData) => previousData,
  });
};

export default useBooks;
