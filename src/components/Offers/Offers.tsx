import React from "react";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Offers.css";

function FAQ() {
  const faqs = [
    {
      question: "What services does Capital Stay Rentals offer?",
      answer: `
        Capital Stay Dubai offers end-to-end vacation rental and property management services. 
        For guests, we provide fully furnished and serviced apartments with amenities like 
        free Wi-Fi, housekeeping, 24/7 support, and access to facilities such as pools and gyms. 
        For property owners, we handle everything from marketing and guest bookings to maintenance 
        and revenue optimization.
      `,
    },
    {
      question: "Why choose Capital Stay Holiday Homes?",
      answer: `
        Capital Stay Holiday Homes are strategically located in prime areas across Dubai, including 
        Downtown, Marina, and Business Bay. They offer home-like comfort with spacious layouts, 
        modern amenities, and full kitchens—ideal for families, business travelers, and tourists 
        seeking both convenience and value.
      `,
    },
    {
      question: "What are the benefits of staying in a holiday home?",
      answer: `
        Staying in a holiday home with Capital Stay Dubai means enjoying the comfort of a fully 
        furnished apartment, the flexibility to cook your own meals, and access to building 
        amenities. You also get more privacy and space than a hotel, along with 24/7 customer support 
        for a stress-free stay.
      `,
    },
    {
      question: "How are holiday homes cost-effective?",
      answer: `
        Holiday homes offer a more budget-friendly option, especially for longer stays or group 
        travel. With full kitchen facilities, you can save on dining expenses, and the added space 
        reduces the need for booking multiple hotel rooms—delivering more value overall.
      `,
    },
    {
      question: "What makes Capital Stay Holiday Homes unique?",
      answer: `
        Capital Stay Dubai stands out through its curated selection of prime-located properties, 
        personalized guest services, and seamless booking experience. We also offer airport transfers, 
        optional housekeeping, pet-friendly options, and flexible long-term rental plans—making your 
        stay convenient and memorable.
      `,
    },
  ];
  

  return (
    <div className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="text-black fw-bold text-center mb-4">Frequently Asked Questions</h2>
        <Accordion>
          {faqs.map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
