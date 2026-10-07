import React from 'react';
import { Gem, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { PILLARS_DATA } from '../data/jewelleryData';

const iconMap: Record<string, React.ElementType> = {
  Gem,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
};

export const PillarsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-[#214E34]" />
            <span className="text-sm sm:text-sm tracking-[0.24em] font-semibold text-[#214E34] uppercase">
              THE PILLARS OF MIRAYA
            </span>
            <span className="w-5 h-px bg-[#214E34]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
            What We Believe In
          </h2>

          <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
            Our guiding ethos anchors every sketch, gemological appraisal, and final 
            hand-burnished setting we deliver to our patrons.
          </p>
        </div>

        {/* 4 Equal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS_DATA.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || Gem;
            return (
              <div
                key={pillar.number}
                className="bg-[#E7FFE6]/70 hover:bg-white border border-[#E7FFE6] hover:border-[#214E34]/40 rounded-[16px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-sm group"
              >
                <div>
                  {/* Top: Small pink circular icon & number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-full bg-white text-[#214E34] border border-[#E7FFE6] flex items-center justify-center group-hover:bg-[#214E34] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-[#75686A]/70 tracking-widest font-mono">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Heading in Cormorant Garamond */}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#302326] mb-3 group-hover:text-[#214E34] transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description in Inter */}
                  <p className="text-[#75686A] text-sm sm:text-sm leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7FFE6]/60 flex items-center text-sm font-medium text-[#214E34] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                  <span>Atelier Standard</span>
                  <span className="ml-1">·</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
