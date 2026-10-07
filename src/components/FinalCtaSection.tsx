import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onShopJewellery: () => void;
  onContactUs: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onShopJewellery,
  onContactUs,
}) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#E7FFE6] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered White Rounded Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-[24px] border border-[#E7FFE6] p-8 sm:p-12 lg:p-16 text-center shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Sparkle Decoration */}
          <div className="absolute top-4 right-6 text-[#E7FFE6] pointer-events-none">
            <Sparkles className="w-12 h-12" />
          </div>
          <div className="absolute bottom-4 left-6 text-[#E7FFE6] pointer-events-none">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="relative z-10 space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#214E34]" />
              <span className="text-sm sm:text-sm tracking-[0.25em] font-semibold text-[#214E34] uppercase">
                YOUR JOURNEY BEGINS HERE
              </span>
              <span className="w-6 h-px bg-[#214E34]" />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[50px] leading-[1.12] text-[#302326] font-medium">
              Find Something That Feels Like You
            </h2>

            {/* Supporting Text */}
            <p className="text-[#75686A] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Explore jewellery created to celebrate your story, style, and every meaningful moment.
            </p>

            {/* Two Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {/* PRIMARY: SHOP JEWELLERY */}
              <button
                onClick={onShopJewellery}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md"
              >
                <span>SHOP JEWELLERY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* SECONDARY: CONTACT US */}
              <button
                onClick={onContactUs}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-[#E7FFE6] text-[#302326] rounded-full text-sm font-semibold tracking-[0.08em] uppercase border border-[#302326] hover:border-[#214E34] transition-all duration-200 cursor-pointer"
              >
                <span>CONTACT US</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
