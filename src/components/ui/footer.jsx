import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "lucide-react";
import { Link } from "react-router";
import { Container } from "./container";
import { Logo } from "./logo";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/books", label: "All Books" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="grid gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Your trusted online bookstore for discovering and purchasing the
            best books across all genres.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">Contact Info</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPinIcon className="size-4 shrink-0" />
              Rangpur, Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="size-4 shrink-0" />
              +880 188841-9206
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="size-4 shrink-0" />
              rakibul00206@gmail.com
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Subscribe for the latest book updates and deals.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <Input
              type="email"
              placeholder="Your email"
              className="h-9 text-xs"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <SendIcon className="size-4" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </form>
        </div>
      </Container>

      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} BookWagon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export { Footer };
