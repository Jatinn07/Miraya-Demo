import React from 'react';
import { Award, CheckCircle, PackageCheck, LifeBuoy } from 'lucide-react';
import { CONFIDENCE_CARDS } from '../data/jewelleryData';

const iconMap: Record<string, React.ElementType> = {
  Award,
  CheckCircle,
  PackageCheck,
  LifeBuoy,
};

export const ConfidenceSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-[#214E34]" />
            <span className="text-sm sm:text-sm tracking-[0.24em] font-semibold text-[#214E34] uppercase">
              THE PATRON GUARANTEE
            </span>
            <span className="w-5 h-px bg-[#214E34]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
            Confidence in Every Sparkle
          </h2>

          <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
            Our uncompromising promise to your precious moments.
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONFIDENCE_CARDS.map((card) => {
            const Icon = iconMap[card.icon] || Award;
            return (
              <div
                key={card.title}
                className="bg-[#E7FFE6]/60 hover:bg-white border border-[#E7FFE6] hover:border-[#214E34]/30 rounded-[16px] p-6 text-center flex flex-col items-center justify-between transition-all duration-300 shadow-2xs hover:shadow-sm group"
              >
                <div className="flex flex-col items-center">
                  {/* Pink Icon */}
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E7FFE6] text-[#214E34] flex items-center justify-center mb-4 group-hover:bg-[#214E34] group-hover:text-white transition-colors duration-300 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Heading */}
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#302326] mb-2 group-hover:text-[#214E34] transition-colors">
                    {card.title}
                  </h3>

                  {/* Short Supporting Text */}
                  <p className="text-[#75686A] text-sm sm:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E7FFE6]/60 w-full text-sm font-medium text-[#214E34] uppercase tracking-wider">
                  Guaranteed Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
