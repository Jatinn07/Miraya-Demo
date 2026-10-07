import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const SparkleArtSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Two overlapping/adjacent images with floating badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Image: Female jewellery model */}
              <div className="w-[82%] sm:w-[78%] rounded-[16px] overflow-hidden border border-[#E7FFE6] shadow-sm bg-white">
                <img
                  src="/src/assets/images/model_difference_portrait_1790703061481.jpg"
                  alt="Fine jewellery diamond showcase"
                  className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping Secondary Image: Artisan workbench */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 w-[52%] sm:w-[50%] rounded-[14px] overflow-hidden border-2 border-white shadow-lg bg-white">
                <img
                  src="/src/assets/images/artisan_craftsmanship_loupe_1790703075420.jpg"
                  alt="Precision artisan diamond setting bench"
                  className="w-full h-[220px] sm:h-[260px] object-cover hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Small Floating Badge: Zero-Tolerance Setting Precision */}
              <div className="absolute top-6 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E7FFE6] shadow-sm flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E7FFE6] flex items-center justify-center text-[#214E34]">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-[#302326] uppercase">
                  Zero-Tolerance Setting Precision
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Eyebrow, Heading, Body copy & two statistics cards */}
          <div className="lg:col-span-6 space-y-6 mt-8 lg:mt-0">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-px bg-[#214E34]" />
              <span className="text-sm sm:text-sm tracking-[0.22em] font-semibold text-[#214E34] uppercase">
                THE ART BEHIND EVERY SPARKLE
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
              The Art Behind Every Sparkle
            </h2>

            {/* Body Copy */}
            <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
              A diamond’s brilliance is an optical dialogue between natural rough clarity 
              and human mastery. Our master lapidaries study every facet angle down to 
              fractions of a degree, calibrating the crown and pavilion to maximize light 
              refraction without light leakage.
            </p>

            <ul className="space-y-2.5 pt-1 text-sm sm:text-sm text-[#302326]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#214E34] shrink-0" />
                <span>Hearts & Arrows optical symmetry verification under microscope</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#214E34] shrink-0" />
                <span>Micro-sculpted prongs ensuring maximum diamond pavilion exposure</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#214E34] shrink-0" />
                <span>Flawless 18K gold and 950 platinum hand-burnished satin finish</span>
              </li>
            </ul>

            {/* Two Statistics Cards (with subtle pink backgrounds) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E7FFE6]">
              <div className="bg-[#E7FFE6] border border-[#E7FFE6] rounded-[14px] p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-semibold font-sans text-[#302326] tracking-tight">
                  34+ Hrs
                </div>
                <div className="text-sm text-[#75686A] font-medium mt-1">
                  Average Handcrafting Time
                </div>
                <div className="text-sm text-[#214E34] mt-2 font-medium tracking-wide">
                  Ancestral bench mastery per solitaire piece
                </div>
              </div>

              <div className="bg-[#E7FFE6] border border-[#E7FFE6] rounded-[14px] p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-semibold font-sans text-[#214E34] tracking-tight">
                  100%
                </div>
                <div className="text-sm text-[#75686A] font-medium mt-1">
                  Hand Selected Solitaires
                </div>
                <div className="text-sm text-[#302326] mt-2 font-medium tracking-wide">
                  Zero fluorescence & supreme luster index
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
