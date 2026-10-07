import React from 'react';
import { Quote } from 'lucide-react';

export const DifferenceSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Luxury female model image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative max-w-md lg:max-w-none mx-auto">
              {/* Backing decorative card */}
              <div className="absolute -inset-3 bg-[#E7FFE6] rounded-[20px] -rotate-1 border border-[#E7FFE6]/70 -z-10" />

              <div className="rounded-[16px] overflow-hidden border border-[#E7FFE6] shadow-sm bg-white">
                <img
                  src="/src/assets/images/model_difference_portrait_1790703061481.jpg"
                  alt="Miraya Diamonds fine diamond jewellery portrait capturing subtle grace"
                  className="w-full h-[460px] sm:h-[520px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating micro accent pill */}
              <div className="absolute -bottom-4 right-6 bg-white py-2 px-4 rounded-full border border-[#E7FFE6] shadow-xs text-sm font-medium tracking-wide text-[#302326]">
                <span className="text-[#214E34] font-semibold">Bespoke</span> · Tailored to Your Silhouette
              </div>
            </div>
          </div>

          {/* RIGHT: Text content, quote box, and 3 compact statistics */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-px bg-[#214E34]" />
              <span className="text-sm sm:text-sm tracking-[0.22em] font-semibold text-[#214E34] uppercase">
                THE MIRAYA DIFFERENCE
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
              More Than Jewellery.{' '}
              <span className="text-[#214E34] block sm:inline">
                A Reflection of You.
              </span>
            </h2>

            {/* Descriptive paragraph */}
            <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
              True luxury does not clamor for attention; it commands presence through 
              balance, purity, and intimacy. We design each Miraya piece as a natural 
              extension of your personal narrative—intricately contoured to move with 
              your body and illuminate your truest moments.
            </p>

            {/* Quote / Testimonial Box */}
            <div className="bg-[#E7FFE6] border-l-2 border-[#214E34] rounded-r-[12px] p-5 sm:p-6 space-y-3">
              <Quote className="w-5 h-5 text-[#214E34]/60 rotate-180" />
              <p className="text-[#302326] font-serif text-base sm:text-lg italic leading-relaxed">
                “Jewellery is not mere ornament; it is the quiet resonance of a woman’s 
                courage, grace, and most cherished chapters.”
              </p>
              <div className="text-sm tracking-[0.2em] font-semibold text-[#214E34] uppercase">
                — MIRAYA DESIGN ARTIST
              </div>
            </div>

            {/* Three Compact Statistics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#E7FFE6]">
              <div className="p-3 sm:p-4 rounded-[12px] bg-white border border-[#E7FFE6]">
                <div className="text-lg sm:text-2xl font-semibold text-[#302326] font-sans tracking-tight">
                  18K & PT
                </div>
                <div className="text-sm sm:text-sm text-[#75686A] mt-1 font-medium">
                  Precious Metals
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-[12px] bg-white border border-[#E7FFE6]">
                <div className="text-lg sm:text-2xl font-semibold text-[#214E34] font-sans tracking-tight">
                  100%
                </div>
                <div className="text-sm sm:text-sm text-[#75686A] mt-1 font-medium">
                  Conflict Free
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-[12px] bg-white border border-[#E7FFE6]">
                <div className="text-lg sm:text-2xl font-semibold text-[#302326] font-sans tracking-tight">
                  Lifetime
                </div>
                <div className="text-sm sm:text-sm text-[#75686A] mt-1 font-medium">
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
