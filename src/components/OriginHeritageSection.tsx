import React from 'react';
import { Hammer, Compass, Gem, Sparkles } from 'lucide-react';

export const OriginHeritageSection: React.FC = () => {
  const steps = [
    { number: '01', title: 'Craft', description: 'Ancestral Karigar Guilds', icon: Hammer },
    { number: '02', title: 'Design', description: 'Sculptural Balance', icon: Compass },
    { number: '03', title: 'Source', description: 'Top 1% Conflict-Free', icon: Gem },
    { number: '04', title: 'Polish', description: 'Zero-Tolerance Glow', icon: Sparkles },
  ];

  return (
    <section id="origin-heritage-section" className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Text Content & 4-Step Timeline */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-px bg-[#214E34]" />
              <span className="text-sm sm:text-sm tracking-[0.22em] font-semibold text-[#214E34] uppercase">
                ORIGIN & HERITAGE
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
              The Story Behind Miraya
            </h2>

            {/* Body Copy */}
            <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
              Born from a generational legacy of Indian gemstone connoisseurship, Miraya 
              merges classical royal craftsmanship with cutting-edge optical physics. 
              Our ateliers in Surat and Mumbai employ master jewelers whose families have 
              shaped noble heirlooms for more than four decades.
            </p>

            <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
              Every solitaire in our collection is hand-vetted for crystal purity, table 
              symmetry, and scintillation fire before a single metal claw is raised.
            </p>

            {/* Horizontal Four-Step Timeline */}
            <div className="pt-6">
              <div className="text-sm tracking-[0.18em] uppercase font-semibold text-[#302326] mb-4">
                The Four Pillars of Creation
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="bg-white border border-[#E7FFE6] rounded-[12px] p-3.5 sm:p-4 text-center hover:border-[#214E34] transition-colors group"
                    >
                      <div className="w-8 h-8 mx-auto rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-semibold text-[#214E34] tracking-wider">
                        {step.number}
                      </div>
                      <div className="font-serif text-base font-medium text-[#302326] mt-0.5">
                        {step.title}
                      </div>
                      <div className="text-sm text-[#75686A] mt-1 leading-tight">
                        {step.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Close-up artisan jeweller craftsmanship image */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-md lg:max-w-none mx-auto">
              <div className="rounded-[16px] overflow-hidden border border-[#E7FFE6] shadow-sm bg-white">
                <img
                  src="/src/assets/images/artisan_craftsmanship_loupe_1790703075420.jpg"
                  alt="Master jeweler using precision tweezers to set a diamond into an 18K gold ring"
                  className="w-full h-[420px] sm:h-[480px] lg:h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Label: HANDCRAFTED WITH PRECISION */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#E7FFE6] shadow-sm flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#214E34] animate-pulse" />
                <span className="text-sm tracking-[0.16em] uppercase font-semibold text-[#302326]">
                  HANDCRAFTED WITH PRECISION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
