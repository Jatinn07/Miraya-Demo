import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'all' | 'rings' | 'necklace' | 'bracelets' | 'earrings' | 'bangels';
}

export const FAQSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [openId, setOpenId] = useState<number | null>(null);

  const categories = [
    'All',
    'Rings',
    'Necklace',
    'Bracelets',
    'Earrings',
    'Bangels',
  ];

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'What materials are your jewellery pieces made from?',
      answer:
        'All Miraya Diamonds jewellery is handcrafted in certified 18KT and 22KT BIS-hallmarked solid gold, adorned with VVS-clarity conflict-free certified lab-grown and natural diamonds, as well as genuine royal gemstones sourced ethically.',
      category: 'all',
    },
    {
      id: 2,
      question: 'How do I choose the right ring/bracelet/necklace size?',
      answer:
        'We offer a comprehensive interactive Size Guide with printable measurement charts for ring sizes (US/India scales), wrist circumferences for bangles/bracelets, and standard collarbone lengths for necklaces. You can also book a complimentary video consultation with our concierge.',
      category: 'rings',
    },
    {
      id: 3,
      question: 'How should I care for and maintain my jewellery?',
      answer:
        'Store your jewellery in the individual Miraya velvet pouches provided to prevent scratching. Clean gently using lukewarm water, mild organic soap, and a soft-bristled brush. Avoid direct contact with perfumes, chlorinated water, and harsh domestic chemicals. We also offer lifetime complimentary cleaning and inspection at any of our boutique salons.',
      category: 'all',
    },
    {
      id: 4,
      question: 'Do you offer returns, exchanges, or refunds?',
      answer:
        'Yes, we provide a 15-day no-questions-asked return and exchange policy on all standard unworn pieces with security tags and certificates intact. Custom-engraved and bespoke bridal creations are eligible for lifetime exchange and buyback guarantees.',
      category: 'all',
    },
    {
      id: 5,
      question: 'How long does delivery take, and can I track my order?',
      answer:
        'Domestic orders within India are dispatched via fully insured tamper-evident express couriers (Blue Dart / Sequel Logistics) and typically arrive within 3 to 5 business days. Once dispatched, an SMS and email with live GPS tracking coordinates and OTP delivery security will be sent to you.',
      category: 'all',
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-white py-18 sm:py-24 lg:py-28 select-none">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* 1. HEADER (Sophisticated Serif Title + Sans Subtitle) */}
        {/* ======================================================= */}
        <div className="text-center space-y-2.5 pb-8 sm:pb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] text-[#2C1D20] font-normal tracking-wide">
            Frequently Asked Question
          </h2>
          <p className="text-sm sm:text-base text-[#7A6C70] font-sans tracking-normal font-medium">
            Know the answer for your questions
          </p>
        </div>

        {/* ======================================================= */}
        {/* 2. CATEGORY FILTER TABS (Pill Buttons Centered) */}
        {/* Active: Solid Forest Green (#214E34) with white text */}
        {/* Inactive: Soft Mint Green (#E7FFE6) with Forest Green text */}
        {/* ======================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pb-10 sm:pb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-[15px] font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-[#214E34] text-white shadow-sm scale-100'
                    : 'bg-[#E7FFE6] hover:bg-[#E7FFE6] text-[#214E34]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* 3. ACCORDION LIST LAYOUT (Pill-Shaped Rounded Cards) */}
        {/* Forest Green (#214E34) border, numbered 1-5, right-aligned arrow */}
        {/* ======================================================= */}
        <div className="space-y-4 sm:space-y-4.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`w-full border-[1.5px] border-[#214E34] bg-white shadow-2xs hover:shadow-md transition-all duration-300 ${
                  isOpen ? 'rounded-[32px] sm:rounded-[36px]' : 'rounded-full'
                }`}
              >
                {/* Accordion Trigger Header - Vertically Centered with Pill Shape */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className={`w-full px-7 sm:px-10 py-4.5 min-h-[68px] sm:min-h-[72px] flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none transition-all duration-300 ${
                    isOpen ? 'rounded-t-[32px] sm:rounded-t-[36px]' : 'rounded-full'
                  }`}
                >
                  <div className="flex items-center gap-3.5 text-base sm:text-[17px] font-sans text-[#332427] my-auto">
                    <span className="font-bold text-[#214E34] shrink-0 text-base sm:text-lg">
                      {faq.id}.
                    </span>
                    <span className="font-semibold leading-normal group-hover:text-[#214E34] transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  {/* Right-aligned downward arrow icon */}
                  <ChevronDown
                    className={`w-5 h-5 text-[#214E34] shrink-0 transition-transform duration-300 ease-in-out ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {/* Smooth Animated Answer Container with Zero Corner Stretching */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="px-7 sm:px-10 pb-6 sm:pb-7">
                    <div className="border-t border-[#E7FFE6] pt-4 text-sm sm:text-[15px] text-[#635357] leading-relaxed pl-5 sm:pl-7">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
