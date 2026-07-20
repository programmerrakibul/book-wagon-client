import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { MessageCircleQuestion } from "lucide-react";
import { useNavigate } from "react-router";
import { faqs } from "../data/faqs";

function FAQ() {
  const navigate = useNavigate();

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <Heading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services"
        />

        <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border rounded-xl px-4 sm:px-6 shadow-sm"
              >
                <AccordionTrigger className="text-sm sm:text-base lg:text-lg py-4 sm:py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-4 sm:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <div className="max-w-2xl mx-auto bg-card border rounded-xl p-6 sm:p-8 shadow-sm">
            <MessageCircleQuestion className="size-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Can't find the answer you're looking for? Our support team is here
              to help.
            </p>
            <Button onClick={() => navigate("/contact-us")}>
              Contact Support
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { FAQ };
