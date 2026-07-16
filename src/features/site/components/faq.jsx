import { useNavigate } from "react-router";
import { MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "How do I place an order?",
    answer:
      "Browse our collection, select your desired book, and click 'Order Now'. Fill in your delivery details and confirm your order. You'll receive a confirmation email with your order details.",
  },
  {
    id: "faq-2",
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery for orders within Bangladesh.",
  },
  {
    id: "faq-3",
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 3-5 business days within Dhaka and 5-7 business days for other cities in Bangladesh. Express delivery options are available for faster shipping.",
  },
  {
    id: "faq-4",
    question: "Can I cancel or modify my order?",
    answer:
      "Yes, you can cancel your order from your dashboard if it's still in 'Pending' status. Once the order is shipped, cancellation is not possible. For modifications, please contact our support team.",
  },
  {
    id: "faq-5",
    question: "Do you offer book returns or exchanges?",
    answer:
      "We accept returns within 7 days of delivery if the book is damaged or defective. The book must be in its original condition. Please contact our support team to initiate a return.",
  },
  {
    id: "faq-6",
    question: "How can I track my order?",
    answer:
      "You can track your order status from the 'My Orders' section in your dashboard. You'll also receive email notifications when your order status changes.",
  },
  {
    id: "faq-7",
    question: "Are the books original or reprints?",
    answer:
      "All books in our collection are 100% original and sourced directly from authorized publishers and distributors. We guarantee the authenticity of every book we sell.",
  },
  {
    id: "faq-8",
    question: "Do you offer discounts or promotions?",
    answer:
      "Yes! We regularly offer seasonal discounts, bundle deals, and special promotions. Subscribe to our newsletter to stay updated on the latest offers and new arrivals.",
  },
];

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
              Can't find the answer you're looking for? Our support team is here to help.
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
