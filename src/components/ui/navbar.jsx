import { AvatarDropdown } from "@/components/ui/avatar-dropdown";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthStore, { logoutUser } from "@/store/use-auth-store";
import { toggleTheme } from "@/store/use-theme-store";
import { cn } from "@/utils/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { Container } from "./container";
import { Logo } from "./logo";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/books", label: "Books" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

function Navbar() {
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-14 items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler onThemeChange={toggleTheme} />

          {user ? (
            <AvatarDropdown />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button asChild size="sm">
                <Link to="/auth/login">Login</Link>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                {!user && (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild size="sm">
                      <Link to="/auth/login" onClick={() => setOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </div>
                )}
                {user && (
                  <div className="mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        logoutUser();
                        setOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}

export { Navbar };
