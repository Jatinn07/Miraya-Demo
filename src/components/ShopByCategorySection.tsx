import React from 'react';
import { CategoryCard } from './CategoryCard';
import braceletImg from '../assets/images/categories/bracelet.png';
import kidsImg from '../assets/images/categories/kids.png';

interface ShopByCategorySectionProps {
  onSelectCategory?: (category: string) => void;
}

export const ShopByCategorySection: React.FC<ShopByCategorySectionProps> = ({
  onSelectCategory,
}) => {
  const braceletSrc = (braceletImg as any)?.src || braceletImg;
  const kidsSrc = (kidsImg as any)?.src || kidsImg;

  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-[50px] bg-white select-none">
      {/* SECTION HEADER (Strictly 36px Title and 14px Subtitle as instructed) */}
      <div className="text-center space-y-1.5 pb-[20px]">
        <h2 className="font-serif font-bold text-[36px] text-[#2C1D20] tracking-wide leading-tight">
          Shop By Category
        </h2>
        <p 
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 500 }}
          className="font-serif text-[16px] text-[#75686A] tracking-normal"
        >
          Discover the Art of Fine Jewellery
        </p>
      </div>

      {/* 5 CATEGORY CARDS LAYOUT: TOP ROW (2 Large) + BOTTOM ROW (3 Cards) */}
      {/* Grid spacing and gap are strictly 20px as instructed */}
      <div className="space-y-[20px]">
        {/* ROW 1: Earrings (Left) | Rings (Right) (50% / 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          <CategoryCard
            title="Earings"
            image="/src/assets/images/category_earrings.png"
            fallbackUrl="https://i.ibb.co/ccW0mfNn/image-12.png"
            aspectClass="aspect-[16/10] sm:aspect-[16/9.5]"
            onClick={() => handleCategoryClick('earrings')}
          />
          <CategoryCard
            title="Rings"
            image="/src/assets/images/category_rings.png"
            fallbackUrl="https://i.ibb.co/BV0p4sN7/image-16.png"
            aspectClass="aspect-[16/10] sm:aspect-[16/9.5]"
            onClick={() => handleCategoryClick('rings')}
          />
        </div>

        {/* ROW 2: Pendent | Bracelets | Kids (3 Equal Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px]">
          <CategoryCard
            title="Pendent"
            image="/src/assets/images/category_pendant.png"
            fallbackUrl="https://i.ibb.co/xtbwCWyY/image-19.png"
            aspectClass="aspect-[16/11] sm:aspect-[4/3.3]"
            onClick={() => handleCategoryClick('pendants')}
          />
          <CategoryCard
            title="Bracelets"
            image={braceletSrc}
            fallbackUrl="https://i.ibb.co/XrXsLghQ/img-2.png"
            aspectClass="aspect-[16/11] sm:aspect-[4/3.3]"
            onClick={() => handleCategoryClick('bracelets')}
          />
          <CategoryCard
            title="Kids"
            image={kidsSrc}
            fallbackUrl="https://i.ibb.co/ynSD9Ftb/img-3.png"
            aspectClass="aspect-[16/11] sm:aspect-[4/3.3]"
            onClick={() => handleCategoryClick('kids')}
          />
        </div>
      </div>
    </section>
  );
};
