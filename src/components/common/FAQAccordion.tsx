import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ToolFAQ } from '../../types';

interface FAQAccordionProps {
  faqs: ToolFAQ[];
  title?: string;
  className?: string;
}

export function FAQAccordion({
  faqs,
  title = 'Frequently Asked Questions',
  className = ''
}: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className={`rounded-2xl border border-[#26372A] bg-[#121C15] p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#55D66F]/10 border border-[#55D66F]/20 text-[#55D66F]">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F7F1]">
          {title}
        </h2>
      </div>

      <div className="divide-y divide-[#26372A]/70">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                id={`faq-btn-${index}`}
                onClick={() => toggleIndex(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="flex w-full items-start justify-between gap-4 text-left font-medium text-[#F1F7F1] hover:text-[#9DF0AA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55D66F]"
              >
                <span className="text-base sm:text-lg font-semibold">{faq.question}</span>
                <span
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#26372A] bg-[#0D1510] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#55D66F] border-[#55D66F]/40' : 'text-[#A7B5A9]'
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="mt-3 text-sm sm:text-base leading-relaxed text-[#A7B5A9] pr-8"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
