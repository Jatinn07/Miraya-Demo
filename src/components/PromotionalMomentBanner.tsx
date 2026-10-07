import React from 'react';

export const PromotionalMomentBanner: React.FC = () => {
  return (
    <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-[#531825]">
        {/* Background Image: Model placed toward the right in burgundy background */}
        <img
          src="/src/assets/images/promo_moment_banner_1790764149590.jpg"
          alt="Miraya Diamonds Editorial Jewellery for Every Moment"
          className="w-full h-full object-cover object-right sm:object-[center_20%]"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay for Left Side Script Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A1420] via-[#521724]/90 sm:via-[#521724]/70 to-transparent w-full md:w-[65%]" />

        {/* Left Typography Overlay */}
        <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16">
          <div className="max-w-md">
            <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#FFF4F6] font-normal leading-[1.08] tracking-wide drop-shadow-sm">
              <span className="block">Jewellery for</span>
              <span className="block mt-1 sm:mt-2">Every Moment</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
