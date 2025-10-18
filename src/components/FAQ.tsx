import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQ({ 
  title = "Frequently Asked Questions", 
  subtitle = "Find answers to common questions about CSA San Francisco Chapter",
  faqs,
  className = ""
}: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className={`py-16 section-light ${className}`}>
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <Card 
              key={faq.id} 
              className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-csa-accent/20 hover:border-l-csa-accent"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-csa-accent/20 focus:ring-inset"
                  aria-expanded={openItems.has(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-secondary pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.has(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-csa-accent transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.has(faq.id) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@csasfo.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-csa-accent text-white rounded-lg hover:bg-csa-accent/90 transition-colors duration-200 font-medium"
            >
              Contact Us
            </a>
            <a
              href="https://www.linkedin.com/groups/14049487/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-csa-accent text-csa-accent rounded-lg hover:bg-csa-accent hover:text-white transition-colors duration-200 font-medium"
            >
              Join LinkedIn Group
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
