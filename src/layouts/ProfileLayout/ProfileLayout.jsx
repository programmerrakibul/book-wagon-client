import { Outlet, useLocation, useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Tabs, Tab, Box } from "@mui/material";
import Container from "../../pages/shared/Container/Container";

const ProfileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { to: "/dashboard/profile", label: "Overview", icon: <MdDashboard /> },
    { to: "/dashboard/profile/edit", label: "Edit Profile", icon: <FaEdit /> },
  ];

  // Determine current tab value based on location
  const currentTab = location.pathname === "/dashboard/profile/edit" ? 1 : 0;

  const handleTabChange = (event, newValue) => {
    navigate(menuItems[newValue].to);
  };

  return (
    <>
      <section className="py-5">
        <Container>
          {/* MUI Tabs Navigation */}
          <div className="card bg-base-100 shadow-lg mb-6 sm:mb-8">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    fontWeight: 500,
                    color: "#6b7280",
                    minHeight: { xs: "56px", md: "64px" },
                    "&.Mui-selected": {
                      color: "hsl(var(--p))",
                      fontWeight: 600,
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "hsl(var(--p))",
                    height: 3,
                  },
                }}
              >
                {menuItems.map((item, index) => (
                  <Tab
                    key={index}
                    label={
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    }
                  />
                ))}
              </Tabs>
            </Box>
          </div>

          {/* Content Area */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProfileLayout;
