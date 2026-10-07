import React from 'react';

export const CollectionHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#E7FFE6]">
      {/* Background Banner with Model on the Right */}
      <div className="relative w-full h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px]">
        {/* Background Image: Model placed toward the right */}
        <img
          src="/src/assets/images/collection_hero_banner_1790761774650.jpg"
          alt="Miraya Diamonds Collection Jewellery Editorial"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-[center_35%]"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Soft Left Light Green Gradient Overlay to ensure crisp typography readability without covering the model */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E7FFE6] via-[#E7FFE6]/90 sm:via-[#E7FFE6]/75 to-transparent w-full md:w-[70%] lg:w-[60%] pointer-events-none" />

        {/* Content Container (Left Aligned) */}
        <div className="relative max-w-[1340px] mx-auto h-full px-6 sm:px-10 lg:px-14 flex items-center">
          <div className="max-w-lg space-y-1.5 sm:space-y-2 z-10">
            {/* Large Cormorant Garamond Editorial Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.05] tracking-[0.06em] text-[#302326] uppercase">
              <span className="block">OUR</span>
              <span className="block -mt-1 sm:-mt-2">COLLECTION</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-sm sm:text-sm text-[#4E4043] leading-snug pt-1 font-normal">
              Timeless pieces crafted to become part
              <br className="hidden sm:inline" /> of your story
            </p>

            {/* Handwritten / Script style accent line */}
            <div className="font-serif italic text-base sm:text-lg text-[#5D4E51] pt-1 tracking-wide leading-tight">
              Jewellery for Every
              <span className="block sm:inline sm:ml-1">Moment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
