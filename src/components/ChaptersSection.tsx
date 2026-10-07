import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductItem } from '../data/jewelleryData';

interface ChaptersSectionProps {
  onSelectCategory: (category: string) => void;
  onQuickView: (product: ProductItem) => void;
  featuredProducts: ProductItem[];
}

export const ChaptersSection: React.FC<ChaptersSectionProps> = ({
  onSelectCategory,
  onQuickView,
  featuredProducts,
}) => {
  const categoryCards = [
    {
      id: 'rings',
      title: 'Rings',
      badge: 'Solitaires & Bands',
      image: '/src/assets/images/rings_category_solitaire_1790703087837.jpg',
      text: 'Symbolize love, commitment, and individuality.',
      cta: 'VIEW RINGS →',
      matchedProduct: featuredProducts[0],
    },
    {
      id: 'necklaces',
      title: 'Necklaces',
      badge: 'Chokers & Cascades',
      image: '/src/assets/images/hero_jewellery_model_1790703049237.jpg',
      text: 'Designed to celebrate elegance and every occasion.',
      cta: 'VIEW NECKLACES →',
      matchedProduct: featuredProducts[1],
    },
    {
      id: 'bracelets',
      title: 'Bracelets & Bangles',
      badge: 'Tennis & Cuffs',
      image: '/src/assets/images/model_difference_portrait_1790703061481.jpg',
      text: 'Celebrate refined expression in beautiful form.',
      cta: 'VIEW BRACELETS →',
      matchedProduct: featuredProducts[2],
    },
  ];

  return (
    <section id="chapters-section" className="py-16 sm:py-20 lg:py-24 bg-[#FFFAFA] border-b border-[#E7FFE6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-5 h-px bg-[#214E34]" />
            <span className="text-sm sm:text-sm tracking-[0.24em] font-semibold text-[#214E34] uppercase">
              CRAFTED FOR LIFE'S MOMENTS
            </span>
            <span className="w-5 h-px bg-[#214E34]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-[#302326] font-medium">
            Designed for Every Chapter
          </h2>

          <p className="text-[#75686A] text-sm sm:text-base leading-relaxed font-normal">
            Whether embarking on an eternal pledge, honoring a landmark triumph, or 
            indulging in personal adoration, discover pieces shaped for your milestone.
          </p>
        </div>

        {/* 3 Product Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categoryCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-[#E7FFE6] hover:border-[#214E34]/50 rounded-[16px] overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              {/* Image Container with Badge */}
              <div className="relative overflow-hidden bg-[#E7FFE6] aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3]">
                <img
                  src={card.image}
                  alt={`Miraya Diamonds ${card.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Image Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Small Badge in Image */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-sm uppercase tracking-wider font-semibold text-[#302326] border border-[#E7FFE6]/80 shadow-2xs flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#214E34]" />
                  <span>{card.badge}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#302326] group-hover:text-[#214E34] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#75686A] text-sm sm:text-sm mt-2 leading-relaxed">
                    {card.text}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7FFE6]/60 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (card.matchedProduct) {
                        onQuickView(card.matchedProduct);
                      } else {
                        onSelectCategory(card.id);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#214E34] hover:text-[#193D29] tracking-wider uppercase transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>{card.cta}</span>
                  </button>

                  <span className="text-sm text-[#75686A] font-mono">
                    Explore
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Below Cards: Centered Pink Pill Button */}
        <div className="mt-12 sm:mt-14 text-center">
          <button
            onClick={() => onSelectCategory('collections')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-[0.08em] uppercase transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md"
          >
            <span>Explore All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
