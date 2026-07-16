import { create } from "zustand";

const initialState = {
  category: "",
  search: "",
  sort: "",
  page: 1,
  limit: 10,
};

const useBookFilters = create(() => initialState);

export const setCategory = (category) => {
  useBookFilters.setState({ category, page: 1 });
};

export const setSearch = (search) => {
  useBookFilters.setState({ search, page: 1 });
};

export const setSort = (sort) => {
  useBookFilters.setState({ sort, page: 1 });
};

export const setPage = (page) => useBookFilters.setState({ page });

export const setLimit = (limit) => useBookFilters.setState({ limit, page: 1 });

export const resetFilters = () => {
  useBookFilters.setState(initialState);
};

export default useBookFilters;
