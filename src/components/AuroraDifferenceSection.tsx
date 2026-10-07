import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AURORA_CARDS } from '../data/jewelleryData';

interface AuroraDifferenceSectionProps {
  onLearnMore: (title: string, detail: string) => void;
}

export const AuroraDifferenceSection: React.FC<AuroraDifferenceSectionProps> = ({
  onLearnMore,
}) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-[#214E34]" />
            <span className="text-sm sm:text-sm tracking-[0.24em] font-semibold text-[#214E34] uppercase">
              EXCELLENCE IN EVERY DETAIL
            </span>
            <span className="w-5 h-px bg-[#214E34]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
            The Aurora Difference
          </h2>

          <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
            Where your confidence meets our craft.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AURORA_CARDS.map((card) => (
            <div
              key={card.number}
              className="bg-white border border-[#E7FFE6] hover:border-[#214E34]/40 rounded-[16px] overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-2xs hover:shadow-sm"
            >
              <div>
                {/* Editorial image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-[#E7FFE6]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle corner number tag */}
                  <div className="absolute top-3 left-3 bg-[#FFFAFA]/90 backdrop-blur-xs font-mono text-sm font-semibold text-[#302326] px-2.5 py-0.5 rounded-full border border-[#E7FFE6]">
                    {card.number}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="font-serif text-xl font-medium text-[#302326] group-hover:text-[#214E34] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#75686A] text-sm sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Action row: LEARN MORE -> and small circular arrow button */}
              <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-[#E7FFE6]/40 mt-2">
                <button
                  onClick={() => onLearnMore(card.title, card.detail)}
                  className="text-sm font-semibold tracking-wider text-[#214E34] hover:text-[#193D29] uppercase cursor-pointer"
                >
                  LEARN MORE →
                </button>

                <button
                  onClick={() => onLearnMore(card.title, card.detail)}
                  className="w-8 h-8 rounded-full border border-[#E7FFE6] bg-[#FFFAFA] group-hover:bg-[#214E34] group-hover:border-[#214E34] group-hover:text-white text-[#302326] flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  aria-label={`Learn more about ${card.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
