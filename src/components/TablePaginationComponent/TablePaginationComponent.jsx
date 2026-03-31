import { TablePagination } from "@mui/material";
import { useSearchParams } from "react-router";

const TablePaginationComponent = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  const handlePageChange = (_event, page) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set("page", page + 1);
      newParams.set("limit", limit);

      return newParams;
    });
  };

  const handleRowsPerPageChange = (event) => {
    console.log(event.target.value);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set("page", 1);
      newParams.set("limit", event.target.value);

      return newParams;
    });
  };

  return (
    <>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        onPageChange={handlePageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default TablePaginationComponent;
