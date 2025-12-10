import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { format, getYear } from "date-fns";
import useAuth from "../../../../hooks/useAuth";
import Avatar from "../../../../components/Avatar/Avatar";
import useRole from "../../../../hooks/useRole";
import Loading from "../../../../components/Loading/Loading";

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const joinedYear = getYear(new Date(user.metadata.creationTime));

  if (roleLoading) {
    return <Loading />;
  }

  const profileStats = [
    { label: "Books Ordered", value: "12", icon: "📚" },
    { label: "Pending Books", value: "3", icon: "📖" },
    { label: "Returned", value: "9", icon: "✅" },
    { label: "Member Since", value: joinedYear, icon: "🎯" },
  ];

  return (
    <>
      <title>Profile Overview - BookWagon</title>

      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Profile Overview
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          View your account information and activity
        </p>
      </div>

      {/* Profile Card */}
      <div className="card bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/20 mb-6 sm:mb-8">
        <div className="card-body p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Avatar */}
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              size="size-24 sm:size-28 lg:size-32"
            />

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  {user.displayName}
                </h3>
                {user.emailVerified && (
                  <MdVerified
                    className="text-primary text-xl sm:text-2xl"
                    title="Verified"
                  />
                )}
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">
                <FaEnvelope className="inline mr-2" />
                {user.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {/* Role Badge */}
                {role === "admin" && (
                  <div className="badge badge-error badge-sm sm:badge-md gap-1">
                    <FaUser className="text-xs" />
                    <span className="text-xs sm:text-sm">Admin</span>
                  </div>
                )}
                {role === "librarian" && (
                  <div className="badge badge-warning badge-sm sm:badge-md gap-1">
                    <FaUser className="text-xs" />
                    <span className="text-xs sm:text-sm">Librarian</span>
                  </div>
                )}
                {role === "user" && (
                  <div className="badge badge-primary badge-sm sm:badge-md gap-1">
                    <FaUser className="text-xs" />
                    <span className="text-xs sm:text-sm">Member</span>
                  </div>
                )}
                {user.emailVerified && (
                  <div className="badge badge-success badge-sm sm:badge-md gap-1">
                    <FaCheckCircle className="text-xs" />
                    <span className="text-xs sm:text-sm">Verified</span>
                  </div>
                )}
                <div className="badge badge-secondary badge-sm sm:badge-md gap-1">
                  <FaCalendarAlt className="text-xs" />
                  <span className="text-xs sm:text-sm">
                    Joined {joinedYear}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
          Activity Statistics
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {profileStats.map((stat, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body p-4 sm:p-5 lg:p-6 text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Details */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Account Details
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3 sm:pb-4">
              <span className="text-sm sm:text-base font-semibold text-gray-700 w-full sm:w-48 mb-1 sm:mb-0">
                Full Name:
              </span>
              <span className="text-sm sm:text-base text-gray-600">
                {user.displayName || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3 sm:pb-4">
              <span className="text-sm sm:text-base font-semibold text-gray-700 w-full sm:w-48 mb-1 sm:mb-0">
                Email Address:
              </span>
              <span className="text-sm sm:text-base text-gray-600">
                {user.email || "Not provided"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3 sm:pb-4">
              <span className="text-sm sm:text-base font-semibold text-gray-700 w-full sm:w-48 mb-1 sm:mb-0">
                Email Verified:
              </span>
              <span className="text-sm sm:text-base">
                {user.emailVerified ? (
                  <span className="text-success flex items-center gap-1">
                    <FaCheckCircle /> Yes
                  </span>
                ) : (
                  <span className="text-warning flex items-center gap-1">
                    <FaRegCircleXmark />
                    No
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3 sm:pb-4">
              <span className="text-sm sm:text-base font-semibold text-gray-700 w-full sm:w-48 mb-1 sm:mb-0">
                Account Created:
              </span>
              <span className="text-sm sm:text-base text-gray-600">
                {format(new Date(user.metadata.creationTime), "MMMM dd, yyyy")}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-sm sm:text-base font-semibold text-gray-700 w-full sm:w-48 mb-1 sm:mb-0">
                Last Sign In:
              </span>
              <span className="text-sm sm:text-base text-gray-600">
                {user.metadata.lastSignInTime
                  ? format(
                      new Date(user.metadata.lastSignInTime),
                      "MMMM dd, yyyy"
                    )
                  : "Not available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
