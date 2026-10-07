import React, { useState } from 'react';
import { CollectionHeader } from './CollectionHeader';
import { HeroSection } from './HeroSection';
import { DifferenceSection } from './DifferenceSection';
import { OriginHeritageSection } from './OriginHeritageSection';
import { PillarsSection } from './PillarsSection';
import { SparkleArtSection } from './SparkleArtSection';
import { ChaptersSection } from './ChaptersSection';
import { AuroraDifferenceSection } from './AuroraDifferenceSection';
import { ConfidenceSection } from './ConfidenceSection';
import { FinalCtaSection } from './FinalCtaSection';
import { Footer } from './Footer';
import { FEATURED_PRODUCTS, ProductItem } from '../data/jewelleryData';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onNavigateCollection: () => void;
  onNavigateCart: () => void;
  onOpenWishlist: () => void;
  onOpenConsultation: () => void;
  onQuickView: (product: ProductItem) => void;
  onLearnMoreAurora: (data: { title: string; detail: string }) => void;
  cartCount: number;
  wishlistCount: number;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onNavigateCollection,
  onNavigateCart,
  onOpenWishlist,
  onOpenConsultation,
  onQuickView,
  onLearnMoreAurora,
  cartCount,
  wishlistCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FFFAFA] text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* HEADER */}
      <CollectionHeader
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onNavigateCart}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory="about"
        onSelectCategory={() => onNavigateCollection()}
      />

      <main className="flex-1">
        {/* BRAND HERO */}
        <HeroSection
          onExplore={onNavigateCollection}
          onBookConsultation={onOpenConsultation}
        />

        {/* THE MIRAYA DIFFERENCE */}
        <div id="difference-section">
          <DifferenceSection />
        </div>

        {/* ORIGIN & HERITAGE */}
        <OriginHeritageSection />

        {/* THE PILLARS */}
        <PillarsSection />

        {/* THE ART BEHIND EVERY SPARKLE */}
        <SparkleArtSection />

        {/* DESIGNED FOR EVERY CHAPTER */}
        <ChaptersSection
          onSelectCategory={() => onNavigateCollection()}
          onQuickView={onQuickView}
          featuredProducts={FEATURED_PRODUCTS}
        />

        {/* THE AURORA DIFFERENCE */}
        <AuroraDifferenceSection
          onLearnMore={(title, detail) => onLearnMoreAurora({ title, detail })}
        />

        {/* CONFIDENCE */}
        <ConfidenceSection />

        {/* FINAL CTA */}
        <FinalCtaSection
          onShopJewellery={onNavigateCollection}
          onContactUs={onOpenConsultation}
        />
      </main>

      {/* FOOTER */}
      <Footer
        onSelectCategory={() => onNavigateCollection()}
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
};
