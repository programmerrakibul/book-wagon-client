import { getBookById, getBooks } from "@/api/book";
import useAuthStore from "@/stores/use-auth-store";
import useBookFilters from "@/stores/use-book-filters";
import { useQuery } from "@tanstack/react-query";

const placeholderData = (previousData) => previousData;
const STALE_TIME = 1000 * 60 * 60;

export const useBooks = (isLibrarian = false) => {
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
    staleTime: STALE_TIME,
    placeholderData,
  });
};

export const useBookById = (id) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    staleTime: STALE_TIME,
    placeholderData,
  });
};
