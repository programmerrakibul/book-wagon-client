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
} from "@mui/material";
import Container from "../../shared/Container/Container";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import { getAlert } from "../../../utilities/getAlert";
import Avatar from "../../../components/Avatar/Avatar";
import Heading from "../../../components/Heading/Heading";
import Loading from "../../../components/Loading/Loading";

const ManageUsers = () => {
  const secureAxios = useSecureAxios();
  const { user: currentUser } = useAuth();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-users", currentUser.email],
    queryFn: async () => {
      const { data } = await secureAxios.get("/users");
      return data?.users;
    },
  });

  const handleRoleChange = async (email, role) => {
    try {
      const { data } = await secureAxios.put(`/users/${email}/role`, { role });

      if (data.modifiedCount) {
        refetch();

        getAlert({
          title: `User role updated to ${role}`,
        });
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
              {/* Desktop Table */}
              <div className="hidden md:block">
                <TableContainer component={Paper} className="shadow-lg!">
                  <Table>
                    <TableHead>
                      <TableRow className="bg-primary/10">
                        <TableCell className="font-bold! text-base!">
                          #
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Avatar
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Name
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Email
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
                          Current Role
                        </TableCell>
                        <TableCell className="font-bold! text-base!">
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
                                <span className="font-semibold text-gray-800">
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
                                <span className="font-medium text-gray-800 text-sm lg:text-base">
                                  {user.name}
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-600 text-sm lg:text-base">
                                {user.email}
                              </TableCell>
                              <TableCell>
                                <div className="badge badge-primary badge-sm gap-1">
                                  {user.role === "admin" && <FaUserShield />}
                                  {user.role === "librarian" && <FaUserTie />}
                                  {user.role === "user" && <FaUsers />}
                                  <span className="capitalize">
                                    {user.role}
                                  </span>
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
                          )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
                {users.map(
                  (user, index) =>
                    currentUser.email !== user.email && (
                      <div
                        key={user._id}
                        className="card bg-base-100 border border-primary/20 shadow-md hover:shadow-xl transition-shadow"
                      >
                        <div className="card-body p-4">
                          <div className="flex gap-4">
                            {/* User Avatar */}
                            <Avatar
                              src={user.photoURL}
                              alt={user.displayName}
                              size="size-16"
                            />

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                              <div className="badge badge-neutral badge-sm mb-2">
                                #{index + 1}
                              </div>
                              <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                                <span className="truncate">{user.name}</span>
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 truncate">
                                {user.email}
                              </p>

                              {/* Current Role Badge */}
                              <div className="mb-3">
                                <span className="text-xs text-gray-500 block mb-1">
                                  Current Role:
                                </span>
                                <div className="badge badge-primary badge-sm gap-1">
                                  {user.role === "admin" && <FaUserShield />}
                                  {user.role === "librarian" && <FaUserTie />}
                                  {user.role === "user" && <FaUsers />}
                                  <span className="capitalize">
                                    {user.role}
                                  </span>
                                </div>
                              </div>

                              {/* Role Change Select */}
                              <div>
                                <label className="text-xs text-gray-500 block mb-1">
                                  Change Role:
                                </label>
                                <select
                                  value={user.role}
                                  onChange={(e) =>
                                    handleRoleChange(user.email, e.target.value)
                                  }
                                  className="select select-bordered select-sm w-full"
                                >
                                  <option value="user">User</option>
                                  <option value="librarian">Librarian</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </>
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center py-12">
                <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Users Found
                </h3>
                <p className="text-gray-500">
                  No registered users in the system yet.
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default ManageUsers;
