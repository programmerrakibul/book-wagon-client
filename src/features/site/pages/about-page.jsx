import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";

import missionImg from "@/assets/mission.png";
import visionImg from "@/assets/vision.png";
import ourStoryImg from "@/assets/our_story.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { icon: BookOpen, value: "50,000+", label: "Books Available" },
  { icon: Users, value: "120,000+", label: "Happy Readers" },
  { icon: Globe, value: "30+", label: "Countries Served" },
  { icon: Award, value: "15+", label: "Years of Excellence" },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | BookWagon";
  }, []);

  return (
    <main className="space-y-16 py-12">
      <section className="relative overflow-hidden bg-primary/5 py-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About BookWagon
            </h1>
            <p className="text-lg text-muted-foreground">
              Connecting readers with the stories that shape their world
            </p>
          </motion.div>
        </Container>
      </section>

      <Container>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="grid items-center gap-8 md:grid-cols-2"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2010, BookWagon began as a small neighborhood bookstore with a big dream:
              to make quality literature accessible to everyone, everywhere. What started with a
              single shelf of curated titles has grown into a global platform serving over 120,000
              readers across 30+ countries.
            </p>
            <p className="text-muted-foreground">
              We believe that every book is a doorway to a new perspective. Our team of passionate
              bibliophiles hand-picks every title, ensuring our collection represents the best of
              contemporary fiction, timeless classics, and groundbreaking non-fiction.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={ourStoryImg}
              alt="Our Story"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.section>
      </Container>

      <section className="bg-primary/5 py-16">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2 className="mb-2 text-3xl font-bold text-foreground">By The Numbers</h2>
            <p className="text-muted-foreground">Our impact in numbers</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="text-center">
                  <CardContent className="flex flex-col items-center gap-3 py-6">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="size-6 text-primary" />
                    </div>
                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-16">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <div className="order-2 overflow-hidden rounded-xl md:order-1">
              <img src={missionImg} alt="Our Mission" className="h-full w-full object-cover" />
            </div>
            <div className="order-1 space-y-4 md:order-2">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground">
                To inspire a lifelong love of reading by curating diverse, high-quality book
                collections and delivering them with care to readers around the globe. We strive
                to break down barriers to literacy and make every bookworm&apos;s dream library
                a reality.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              <p className="text-muted-foreground">
                We envision a world where every person has access to the books that educate, entertain,
                and empower them. BookWagon aims to be the most trusted and beloved destination for
                readers everywhere, fostering a global community united by the joy of reading.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl">
              <img src={visionImg} alt="Our Vision" className="h-full w-full object-cover" />
            </div>
          </motion.section>
        </div>
      </Container>
    </main>
  );
}
