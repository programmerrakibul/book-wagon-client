import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaUserShield, FaUserTie } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Container from "../../shared/Container/Container";
import useSecureAxios from "../../../hooks/useSecureAxios";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import { getAlert } from "../../../utilities/getAlert";
import Avatar from "../../../components/Avatar/Avatar";

const ManageUsers = () => {
  const secureAxios = useSecureAxios();
  const { user: currentUser } = useAuth();

  const {
    data: users,
    isPending,
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

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ActionSpinner />
      </div>
    );
  }

  return (
    <>
      <title>Manage Users - BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FaUsers className="text-primary" />
              Manage Users
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Manage user roles and permissions
            </p>
          </div>

          {/* Users Table */}
          {users?.length > 0 ? (
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra">
                  <thead className="bg-linear-to-r from-primary/10 to-secondary/10">
                    <tr>
                      <th className="text-sm lg:text-base">#</th>
                      <th className="text-sm lg:text-base">Avatar</th>
                      <th className="text-sm lg:text-base">Name</th>
                      <th className="text-sm lg:text-base">Email</th>
                      <th className="text-sm lg:text-base">Current Role</th>
                      <th className="text-sm lg:text-base">Change Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(
                      (user, index) =>
                        currentUser.email !== user.email && (
                          <tr key={user._id} className="hover">
                            <td className="font-semibold">{index + 1}</td>
                            <td>
                              <Avatar
                                src={user.photoURL}
                                alt={user.displayName}
                              />
                            </td>
                            <td className="font-medium text-sm lg:text-base">
                              <div className="flex items-center gap-2">
                                {user.name}
                              </div>
                            </td>
                            <td className="text-sm lg:text-base text-gray-600">
                              {user.email}
                            </td>
                            <td>
                              <div className="badge badge-primary badge-sm sm:badge-md gap-1">
                                {user.role === "admin" && <FaUserShield />}
                                {user.role === "librarian" && <FaUserTie />}
                                {user.role === "user" && <FaUsers />}
                                <span className="capitalize">{user.role}</span>
                              </div>
                            </td>
                            <td>
                              <select
                                value={user.role}
                                onChange={(e) =>
                                  handleRoleChange(user.email, e.target.value)
                                }
                                className="select select-bordered select-xs sm:select-sm w-full max-w-xs"
                              >
                                <option value="user">User</option>
                                <option value="librarian">Librarian</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
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
            </div>
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
