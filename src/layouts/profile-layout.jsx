import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Pencil } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";

const ProfileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.endsWith("/edit") ? "edit" : "overview";

  return (
    <section className="py-5 sm:py-8">
      <Container>
        <Card className="mb-6 shadow-xs">
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              navigate(
                value === "edit"
                  ? "/dashboard/profile/edit"
                  : "/dashboard/profile",
              )
            }
          >
            <TabsList className="grid h-auto w-full grid-cols-2">
              <TabsTrigger
                value="overview"
                className="gap-2 py-3 text-xs sm:text-sm"
              >
                <LayoutDashboard className="size-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="edit"
                className="gap-2 py-3 text-xs sm:text-sm"
              >
                <Pencil className="size-4" />
                Edit profile
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default ProfileLayout;
