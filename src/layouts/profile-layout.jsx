import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/utils";
import { LayoutDashboard, Pencil } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";

const ProfileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.endsWith("/edit") ? "edit" : "overview";

  return (
    <section className="py-5 sm:py-8">
      <Container>
        <Card className="mb-6 shadow-xs py-0">
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
              {[
                {
                  label: "Overview",
                  value: "overview",
                  icon: LayoutDashboard,
                },
                {
                  label: "Edit profile",
                  value: "edit",
                  icon: Pencil,
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "gap-2 py-3 text-xs sm:text-sm",

                    {
                      "text-primary font-medium": tab.value === currentTab,
                      "text-muted-foreground": tab.value !== currentTab,
                    },
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
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
