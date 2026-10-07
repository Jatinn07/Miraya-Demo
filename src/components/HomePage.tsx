import React, { useState } from 'react';
import { CollectionHeader } from './CollectionHeader';
import { StackedHeroCarousel } from './StackedHeroCarousel';
import { ShopByCategorySection } from './ShopByCategorySection';
import { NewArrivalsSection, NewArrivalProduct } from './NewArrivalsSection';
import { MostLovedProductsSection } from './MostLovedProductsSection';
import { OurCollectionSection } from './OurCollectionSection';
import { BestSellerSection } from './BestSellerSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { TrustStrip } from './TrustStrip';
import { Footer } from './Footer';
import {
  COLLECTION_PRODUCTS,
  CollectionProduct,
} from '../data/collectionProducts';

interface HomePageProps {
  onNavigateHome: () => void;
  onNavigateCollection: () => void;
  onNavigateAbout: () => void;
  onNavigateCart: () => void;
  onNavigatePdp: (product: CollectionProduct) => void;
  onOpenWishlist: () => void;
  onOpenConsultation: () => void;
  cartCount: number;
  wishlistCount: number;
  wishlistItems: string[];
  onToggleWishlist: (product: CollectionProduct) => void;
  onAddToCart: (product: CollectionProduct) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateHome,
  onNavigateCollection,
  onNavigateCart,
  onNavigatePdp,
  onOpenWishlist,
  onOpenConsultation,
  cartCount,
  wishlistCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectNewArrival = (p: NewArrivalProduct) => {
    const matched =
      COLLECTION_PRODUCTS.find((cp) =>
        cp.name.toLowerCase().includes(p.name.toLowerCase())
      ) || COLLECTION_PRODUCTS[0];
    onNavigatePdp(matched);
  };

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* 1. HEADER (Miraya Two-Level Header) */}
      <CollectionHeader
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onNavigateCart}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory="all"
        onSelectCategory={() => onNavigateCollection()}
        onOpenConsultation={onOpenConsultation}
      />

      <main className="flex-1 bg-white">
        {/* 2. HERO SECTION: PREMIUM PHYSICAL STACKED CARD CAROUSEL */}
        <StackedHeroCarousel onExploreCollection={onNavigateCollection} />

        {/* 3. TRUST STRIP */}
        <TrustStrip />

        {/* 4. SECTION 2: SHOP BY CATEGORY */}
        <ShopByCategorySection
          onSelectCategory={() => {
            onNavigateCollection();
          }}
        />

        {/* 5. SECTION 3: NEW ARRIVALS */}
        <NewArrivalsSection
          onShopNow={onNavigateCollection}
          onSelectProduct={handleSelectNewArrival}
        />

        {/* ======================================================= */}
        {/* OUR MOST LOVED PRODUCTS (Between New Arrivals & Our Collection) */}
        {/* ======================================================= */}
        <MostLovedProductsSection
          onSelectCategory={() => onNavigateCollection()}
        />

        {/* 6. SECTION 4: OUR COLLECTION */}
        <OurCollectionSection
          onViewAll={onNavigateCollection}
          onSelectProduct={onNavigatePdp}
        />

        {/* ======================================================= */}
        {/* BANNER 2 (100% Full-Bleed Width: Between Our Collection and Best Seller) */}
        {/* ======================================================= */}
        <section className="w-full overflow-hidden select-none">
          <img
            src="/src/assets/images/banners/banner_2.png"
            alt="Miraya Diamonds Atelier Edition"
            className="w-full h-auto object-cover block cursor-pointer transition-opacity duration-300 hover:opacity-95"
            onClick={onNavigateCollection}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </section>

        {/* 7. SECTION 5: BEST SELLER */}
        <BestSellerSection
          onSelectCategory={() => {
            onNavigateCollection();
          }}
        />

        {/* 8. SECTION 6: TESTIMONIALS */}
        <TestimonialsSection />

        {/* ======================================================= */}
        {/* BANNER 3 (100% Full-Bleed Width: Between Testimonials and FAQs) */}
        {/* ======================================================= */}
        <section className="w-full overflow-hidden select-none">
          <img
            src="/src/assets/images/banners/banner_3.png"
            alt="Miraya Diamonds Bridal & Heritage"
            className="w-full h-auto object-cover block cursor-pointer transition-opacity duration-300 hover:opacity-95"
            onClick={onNavigateCollection}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </section>

        {/* 9. SECTION 7: FREQUENTLY ASKED QUESTION (Directly above Footer) */}
        <FAQSection />
      </main>

      {/* 10. FOOTER */}
      <Footer
        onSelectCategory={() => onNavigateCollection()}
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
};
