import { Clock, Eye, BookOpen, Bookmark, Brain, Headphones, PenLine, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const tips = [
  {
    icon: Clock,
    title: "Set a Reading Schedule",
    description: "Dedicate 20-30 minutes daily at the same time to build a consistent reading habit.",
    category: "Habit",
  },
  {
    icon: Eye,
    title: "Proper Lighting",
    description: "Read in well-lit areas to reduce eye strain. Natural light is best during the day.",
    category: "Health",
  },
  {
    icon: BookOpen,
    title: "Active Reading",
    description: "Engage with the text by asking questions and summarizing key points.",
    category: "Technique",
  },
  {
    icon: Bookmark,
    title: "Use Bookmarks",
    description: "Mark interesting passages or quotes to revisit later for reflection.",
    category: "Tools",
  },
  {
    icon: Brain,
    title: "Take Breaks",
    description: "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    category: "Health",
  },
  {
    icon: Headphones,
    title: "Try Audiobooks",
    description: "Listen during commutes or chores. It's a great way to 'read' while multitasking.",
    category: "Alternative",
  },
  {
    icon: PenLine,
    title: "Keep a Reading Journal",
    description: "Write down thoughts, favorite quotes, and lessons learned from each book.",
    category: "Reflection",
  },
  {
    icon: Star,
    title: "Set Realistic Goals",
    description: "Start with small, achievable targets like 1 book per month, then gradually increase.",
    category: "Motivation",
  },
];

const benefits = [
  {
    icon: Brain,
    title: "Cognitive Enhancement",
    description: "Improves memory, focus, and critical thinking skills",
  },
  {
    icon: BookOpen,
    title: "Knowledge Expansion",
    description: "Broadens perspectives and increases vocabulary",
  },
  {
    icon: Clock,
    title: "Stress Reduction",
    description: "Calms the mind and provides mental relaxation",
  },
];

function ReadingTips() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <Heading
          title="Enhance Your Reading Experience"
          subtitle="Discover practical tips and techniques to make your reading more enjoyable, effective, and rewarding."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="size-5" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                    {tip.category}
                  </span>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {tip.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>

                  <span className="text-xs text-muted-foreground pt-4 border-t block">
                    Tip #{String(index + 1).padStart(2, "0")}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Benefits of Effective Reading</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="shadow-sm">
                    <CardContent className="p-5 text-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <Icon className="size-5" />
                      </div>
                      <h4 className="font-bold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { ReadingTips };
