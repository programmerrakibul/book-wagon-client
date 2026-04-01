import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaUserShield, FaUserTie } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Container from "../../shared/Container/Container";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import { getAlert } from "../../../utilities/getAlert";
import Avatar from "../../../components/Avatar/Avatar";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";
import { useSearchParams } from "react-router";
import TablePaginationComponent from "../../../components/TablePaginationComponent/TablePaginationComponent";

const ManageUsers = () => {
  const secureAxios = useSecureAxios();
  const { user: currentUser } = useAuth();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "manage-users",
      currentUser.email,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const { data } = await secureAxios.get("/users", {
        params: {
          page,
          limit,
          search,
          sortBy,
          sortOrder,
        },
      });

      return data || {};
    },
  });

  const handleRoleChange = async (email, role) => {
    try {
      const { data } = await secureAxios.put("/users/update-role", {
        role,
        email,
      });

      if (data.success) {
        refetch();

        getAlert({
          title: `User role updated to ${role}`,
        });
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err.message ||
        "An unexpected error occurred!";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const users = data?.data || [];
  const { totalDocs } = data?.pagination || {};

  return (
    <>
      <title>Manage Users - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header */}
          <Heading
            title={
              <>
                <FaUsers className="text-primary inline-block mr-2" />
                Manage Users
              </>
            }
            subtitle="Manage user roles and permissions"
          />

          {/* Users Table */}
          {users?.length > 0 ? (
            <>
              <TableContainer component={Paper} className="shadow-lg!">
                <Table aria-label="users table">
                  <TableHead>
                    <TableRow className="bg-primary/10">
                      <TableCell className="font-bold! text-base!">#</TableCell>
                      <TableCell className="font-bold! text-base!">
                        Avatar
                      </TableCell>
                      <TableCell className="font-bold! text-base!">
                        Name
                      </TableCell>
                      <TableCell className="font-bold! text-base!">
                        Email
                      </TableCell>
                      <TableCell className="font-bold! text-base! min-w-40">
                        Current Role
                      </TableCell>
                      <TableCell className="font-bold! text-base! min-w-[130px]">
                        Change Role
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(
                      (user, index) =>
                        currentUser.email !== user.email && (
                          <TableRow
                            key={user._id}
                            className="hover:bg-base-200 transition-colors"
                          >
                            <TableCell>
                              <span className="font-semibold ">
                                {index + 1}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Avatar
                                src={user.photoURL}
                                alt={user.displayName}
                              />
                            </TableCell>
                            <TableCell>
                              <span className="font-medium  text-sm lg:text-base">
                                {user.name}
                              </span>
                            </TableCell>
                            <TableCell className=" text-sm lg:text-base">
                              {user.email}
                            </TableCell>
                            <TableCell>
                              <div className="badge badge-primary badge-sm gap-1">
                                {user.role === "admin" && <FaUserShield />}
                                {user.role === "librarian" && <FaUserTie />}
                                {user.role === "user" && <FaUsers />}
                                <span className="capitalize">{user.role}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <select
                                value={user.role}
                                onChange={(e) =>
                                  handleRoleChange(user.email, e.target.value)
                                }
                                className="select select-bordered select-sm"
                              >
                                <option value="user">User</option>
                                <option value="librarian">Librarian</option>
                                <option value="admin">Admin</option>
                              </select>
                            </TableCell>
                          </TableRow>
                        ),
                    )}
                  </TableBody>
                </Table>

                <TablePaginationComponent total={totalDocs} />
              </TableContainer>
            </>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center py-12">
                <FaUsers className="text-6xl  mx-auto mb-4" />
                <h3 className="text-xl font-semibold  mb-2">No Users Found</h3>
                <p className="">No registered users in the system yet.</p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default ManageUsers;
