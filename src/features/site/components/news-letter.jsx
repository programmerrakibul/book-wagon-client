import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send, BookOpen, Users, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import bgImage from "@/assets/newsletter.jpg";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
});

function NewsLetter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Successfully subscribed to our newsletter!");
    reset();
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-secondary/25 to-primary/30" />
      </div>

      <Container>
        <div className="bg-card/55 backdrop-blur-sm shadow-2xl overflow-hidden relative z-10 rounded-xl border">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block p-4 sm:p-5 bg-primary/20 rounded-full mb-4 sm:mb-6">
                  <Mail className="size-10 sm:size-12 lg:size-14 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 text-muted-foreground">
                  Stay updated with the latest book arrivals, exclusive offers,
                  and reading recommendations delivered straight to your inbox.
                </p>
              </div>

              <div className="flex-1 w-full max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex h-10 w-full rounded-md border bg-background pl-11 sm:pl-12 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        {...register("email")}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1.5">{errors.email.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Spinner className="size-4" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    Subscribe Now
                  </Button>

                  <p className="text-xs sm:text-sm text-center text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                  <BookOpen className="size-5 text-primary" />
                  <span className="text-2xl sm:text-3xl font-bold text-primary">10K+</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Subscribers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                  <LayoutGrid className="size-5 text-primary" />
                  <span className="text-2xl sm:text-3xl font-bold text-primary">Weekly</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Updates</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                  <Users className="size-5 text-primary" />
                  <span className="text-2xl sm:text-3xl font-bold text-primary">100%</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Free</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { NewsLetter };
