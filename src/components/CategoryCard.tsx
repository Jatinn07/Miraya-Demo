import React from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
  fallbackUrl?: string;
  onClick?: () => void;
  aspectClass?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  fallbackUrl,
  onClick,
  aspectClass = 'aspect-[16/10]',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl md:rounded-[22px] overflow-hidden cursor-pointer select-none bg-[#F7EFEF] border border-black/5 ${aspectClass} shadow-xs hover:shadow-md transition-shadow duration-300`}
    >
      {/* 1. Zoomable Image Container */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          onError={(e) => {
            if (fallbackUrl) {
              (e.currentTarget as HTMLImageElement).src = fallbackUrl;
            }
          }}
          className="w-full h-full object-cover object-center transform transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] will-change-transform motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* 2. Soft Bottom Shadow Overlay for Text Legibility (As seen in screenshot) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

      {/* 3. Category Title with Delicate White Underline (Exactly as in screenshot) */}
      <div className="absolute bottom-4 left-5 sm:bottom-5 sm:left-6 z-10 pointer-events-none">
        <div className="relative inline-block pb-1">
          <span 
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500 }}
            className="font-serif text-[16px] text-white font-medium tracking-wide drop-shadow-sm select-none block leading-tight"
          >
            {title}
          </span>

          {/* Underline beneath the text - animates from left to right on hover */}
          <span
            className="absolute left-0 bottom-0 h-[1.5px] bg-white w-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
