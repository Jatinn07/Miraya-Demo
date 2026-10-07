import React, { useState, useMemo } from 'react';
import { CollectionHeader } from './CollectionHeader';
import { CollectionHero } from './CollectionHero';
import { CollectionBreadcrumb } from './CollectionBreadcrumb';
import { CollectionToolbar } from './CollectionToolbar';
import { CollectionProductCard } from './CollectionProductCard';
import { CollectionPagination } from './CollectionPagination';
import { FilterDrawer, FilterState } from './FilterDrawer';
import { ProductEnquiryModal } from './ProductEnquiryModal';
import { Footer } from './Footer';
import { COLLECTION_PRODUCTS, CollectionProduct } from '../data/collectionProducts';

interface CollectionPageProps {
  onNavigateHome: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  wishlistItems: string[]; // product IDs
  onToggleWishlist: (product: CollectionProduct) => void;
  onAddToCart: (product: CollectionProduct) => void;
  onSelectProduct: (product: CollectionProduct) => void;
  onOpenConsultation: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onNavigateHome,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount,
  wishlistItems,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [enquiryProduct, setEnquiryProduct] = useState<CollectionProduct | null>(null);

  // Active filter state
  const [filters, setFilters] = useState<FilterState>({
    category: ['all'],
    priceRange: '',
    materials: [],
    stones: [],
    occasions: [],
    collections: [],
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...COLLECTION_PRODUCTS];

    // Primary top category tab filter
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter drawer: Category
    if (filters.category.length > 0 && !filters.category.includes('all')) {
      list = list.filter((p) => filters.category.includes(p.category));
    }

    // Filter drawer: Price Range
    if (filters.priceRange) {
      if (filters.priceRange === 'under-5000') {
        list = list.filter((p) => p.price < 5000);
      } else if (filters.priceRange === '5000-10000') {
        list = list.filter((p) => p.price >= 5000 && p.price <= 10000);
      } else if (filters.priceRange === '10000-25000') {
        list = list.filter((p) => p.price >= 10000 && p.price <= 25000);
      } else if (filters.priceRange === '25000-plus') {
        list = list.filter((p) => p.price >= 25000);
      }
    }

    // Filter drawer: Material
    if (filters.materials.length > 0) {
      list = list.filter((p) => p.metal && filters.materials.includes(p.metal));
    }

    // Filter drawer: Stone
    if (filters.stones.length > 0) {
      list = list.filter((p) => p.stone && filters.stones.includes(p.stone));
    }

    // Filter drawer: Occasion
    if (filters.occasions.length > 0) {
      list = list.filter((p) => p.occasion && filters.occasions.includes(p.occasion));
    }

    // Filter drawer: Collection
    if (filters.collections.length > 0) {
      list = list.filter((p) => p.collection && filters.collections.includes(p.collection));
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.carat.toLowerCase().includes(q) ||
          (p.metal && p.metal.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* 1. TWO-LEVEL HEADER (Row 1: Logo, Search, Icons | Row 2: #214E34 Nav Bar) */}
      <CollectionHeader
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setCurrentPage(1);
        }}
        onOpenConsultation={onOpenConsultation}
      />

      <main className="flex-1 bg-white">
        {/* 2. COLLECTION HERO BANNER */}
        <CollectionHero />

        {/* 3. BREADCRUMB */}
        <CollectionBreadcrumb
          onNavigateHome={onNavigateHome}
          activeCategoryName={activeCategory}
        />

        {/* 4. PRODUCT LISTING TOOLBAR */}
        <CollectionToolbar
          totalCount={1228}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFilters={false}
          onToggleFilters={() => setIsFilterDrawerOpen(true)}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
        />

        {/* 5. 5-COLUMN PRODUCT GRID (With Smooth Secondary Image Hover Crossfade) */}
        <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-base text-[#75686A]">No products found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setFilters({
                    category: ['all'],
                    priceRange: '',
                    materials: [],
                    stones: [],
                    occasions: [],
                    collections: [],
                  });
                  setSearchQuery('');
                }}
                className="inline-flex items-center justify-center px-7 py-3 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer whitespace-nowrap shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {filteredProducts.map((product) => (
                <CollectionProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistItems.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                  onEnquire={(prod) => setEnquiryProduct(prod)}
                />
              ))}
            </div>
          )}
        </section>

        {/* 6. PAGINATION */}
        <CollectionPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* 7. LEFT-SIDE SLIDING FILTER DRAWER (Matching Reference 1) */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() =>
          setFilters({
            category: ['all'],
            priceRange: '',
            materials: [],
            stones: [],
            occasions: [],
            collections: [],
          })
        }
        totalFilteredCount={128}
      />

      {/* 8. LUXURY FOOTER (With Macro Diamond Ring Visual) */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 9. PRODUCT ENQUIRY POPUP MODAL */}
      <ProductEnquiryModal
        isOpen={Boolean(enquiryProduct)}
        onClose={() => setEnquiryProduct(null)}
        product={enquiryProduct}
      />
    </div>
  );
};
