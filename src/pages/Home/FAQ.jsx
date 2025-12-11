import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: "panel1",
      question: "How do I place an order?",
      answer:
        "Browse our collection, select your desired book, and click 'Order Now'. Fill in your delivery details and confirm your order. You'll receive a confirmation email with your order details.",
    },
    {
      id: "panel2",
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery for orders within Bangladesh.",
    },
    {
      id: "panel3",
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 3-5 business days within Dhaka and 5-7 business days for other cities in Bangladesh. Express delivery options are available for faster shipping.",
    },
    {
      id: "panel4",
      question: "Can I cancel or modify my order?",
      answer:
        "Yes, you can cancel your order from your dashboard if it's still in 'Pending' status. Once the order is shipped, cancellation is not possible. For modifications, please contact our support team.",
    },
    {
      id: "panel5",
      question: "Do you offer book returns or exchanges?",
      answer:
        "We accept returns within 7 days of delivery if the book is damaged or defective. The book must be in its original condition. Please contact our support team to initiate a return.",
    },
    {
      id: "panel6",
      question: "How can I track my order?",
      answer:
        "You can track your order status from the 'My Orders' section in your dashboard. You'll also receive email notifications when your order status changes.",
    },
    {
      id: "panel7",
      question: "Are the books original or reprints?",
      answer:
        "All books in our collection are 100% original and sourced directly from authorized publishers and distributors. We guarantee the authenticity of every book we sell.",
    },
    {
      id: "panel8",
      question: "Do you offer discounts or promotions?",
      answer:
        "Yes! We regularly offer seasonal discounts, bundle deals, and special promotions. Subscribe to our newsletter to stay updated on the latest offers and new arrivals.",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        {/* Header */}
        <Heading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services"
        />

        {/* FAQ Accordions */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                marginBottom: 2,
                borderRadius: "12px !important",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: "0 0 16px 0",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <FaChevronDown className="text-primary text-sm sm:text-base" />
                }
                sx={{
                  padding: { xs: "12px 16px", sm: "16px 20px" },
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.1rem", lg: "1.15rem" },
                    fontWeight: 600,
                    color: "#1f2937",
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: { xs: "12px 16px 20px", sm: "16px 20px 24px" },
                  backgroundColor: "#f9fafb",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    color: "#4b5563",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="card bg-base-100 shadow-lg max-w-2xl mx-auto">
            <div className="card-body p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Can't find the answer you're looking for? Our support team is
                here to help.
              </p>
              <Button handleClick={() => navigate("/contact-us")}>
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
