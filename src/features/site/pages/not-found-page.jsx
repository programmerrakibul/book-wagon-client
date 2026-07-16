import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  ArrowLeft,
  BookOpen,
  Headphones,
  Home,
  Info,
  SearchX,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

const helpfulLinks = [
  { icon: BookOpen, label: "Browse Books", to: "/all-books" },
  { icon: Info, label: "About Us", to: "/about" },
  { icon: Headphones, label: "Contact Support", to: "/contact" },
];

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | BookWagon";
  }, []);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Container>
        <div className="relative mx-auto max-w-lg text-center">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: 6 + i * 4,
                height: 6 + i * 4,
                top: `${15 + i * 12}%`,
                left: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-destructive/10">
              <SearchX className="size-12 text-destructive" />
            </div>

            <h1 className="mb-2 text-5xl font-bold text-foreground">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="mb-8 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>

            <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="size-4" />
                Go Back
              </Button>
              <Button asChild>
                <Link to="/">
                  <Home className="size-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {helpfulLinks.map((link) => (
                <Card
                  key={link.label}
                  className="transition-colors hover:border-primary/50"
                >
                  <CardContent className="flex flex-col items-center gap-2 py-4">
                    <link.icon className="size-5 text-primary" />
                    <Link
                      to={link.to}
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
