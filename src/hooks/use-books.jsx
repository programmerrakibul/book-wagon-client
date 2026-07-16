import { getBooks } from "@/api/book";
import useAuthStore from "@/stores/use-auth-store";
import useBookFilters from "@/stores/use-book-filters";
import { useQuery } from "@tanstack/react-query";

const useBooks = (isLibrarian = false) => {
  const search = useBookFilters((state) => state.search);
  const page = useBookFilters((state) => state.page);
  const limit = useBookFilters((state) => state.limit);
  const sort = useBookFilters((state) => state.sort);
  const category = useBookFilters((state) => state.category);
  const user = useAuthStore((state) => state.user);
  const email = user?.email;
  const queryPayload = { search, page, limit, sort, category };
  const queryKey = ["books", ...Object.values(queryPayload)];

  isLibrarian === true && (queryPayload["email"] = email);
  isLibrarian === true && queryKey.push(email, "librarian");

  return useQuery({
    queryKey,
    queryFn: () => getBooks(queryPayload),
    staleTime: 1000 * 60 * 60,
    placeholderData: (previousData) => previousData,
  });
};

export default useBooks;
