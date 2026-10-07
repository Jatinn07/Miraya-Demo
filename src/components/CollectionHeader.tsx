import React, { useState, useRef } from 'react';
import { Search, ChevronDown, Menu, X, Phone, Heart, User, ShoppingBag } from 'lucide-react';

interface CollectionHeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateHome: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenConsultation?: () => void;
}

interface MenuColumnData {
  featured: string[];
  styles: string[];
  occasions: string[];
  metals: string[];
  prices: string[];
  karatages: string[];
  shopFor: string[];
}

const DEFAULT_MENU_DATA: MenuColumnData = {
  featured: ['All Rings', 'New Arrival', 'Best Seller', 'Most Gifted'],
  styles: ['Cocktail', 'Couple Bands', 'Modern', 'Open', 'Vanki', 'Bespoke Solitaire'],
  occasions: ['Everyday', 'Workwear', 'Party', 'Proposal', 'Engagement'],
  metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
  prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
  karatages: ['9kt', '14kt', '18kt', '22kt'],
  shopFor: ['Women', 'Men', 'Unisex'],
};

const CATEGORY_MEGA_MENUS: Record<string, MenuColumnData> = {
  rings: {
    featured: ['All Rings', 'New Arrival', 'Best Seller', 'Most Gifted'],
    styles: ['Cocktail', 'Couple Bands', 'Modern', 'Open', 'Vanki', 'Solitaire Eternity'],
    occasions: ['Everyday', 'Workwear', 'Party', 'Proposal', 'Engagement'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Men', 'Unisex'],
  },
  earrings: {
    featured: ['All Earrings', 'New Arrival', 'Best Seller', 'Daily Studs'],
    styles: ['Studs', 'Drops & Danglers', 'Hoops & Huggies', 'Jhumkas', 'Sui Dhaga', 'Ear Cuffs'],
    occasions: ['Everyday', 'Workwear', 'Party', 'Cocktail', 'Wedding'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Kids', 'Unisex'],
  },
  bracelets: {
    featured: ['All Bracelets', 'New Arrival', 'Best Seller', 'Tennis Classics'],
    styles: ['Tennis Bracelets', 'Chain Bracelets', 'Charm Bracelets', 'Cuffs', 'Mangalsutra Bracelets'],
    occasions: ['Everyday', 'Workwear', 'Party', 'Milestone', 'Gifting'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Men', 'Unisex'],
  },
  bangles: {
    featured: ['All Bangles', 'New Arrival', 'Best Seller', 'Eternity Kada'],
    styles: ['Daily Wear Bangles', 'Eternity Bangles', 'Kadas', 'Openable Bangles', 'Bridal Chooda Sets'],
    occasions: ['Everyday', 'Workwear', 'Festive', 'Wedding', 'Tradition'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Bridal', 'Unisex'],
  },
  pendants: {
    featured: ['All Pendants', 'New Arrival', 'Best Seller', 'Solitaire Pendants'],
    styles: ['Solitaire Pendants', 'Alphabet & Initials', 'Religious & Spiritual', 'Heart Pendants', 'Floral Motifs'],
    occasions: ['Everyday', 'Workwear', 'Party', 'Anniversary', 'Gifting'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Men', 'Kids'],
  },
  necklaces: {
    featured: ['All Necklaces', 'New Arrival', 'Best Seller', 'Bridal Cascades'],
    styles: ['Chokers', 'Collar Necklaces', 'Tennis Necklaces', 'Layered Sets', 'Mangalsutra'],
    occasions: ['Everyday', 'Cocktail', 'Gala', 'Festive', 'Wedding'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Bridal', 'Unisex'],
  },
  gifting: {
    featured: ['Gift Guide 2026', 'Best Sellers', 'Most Gifted', 'Curated Sets'],
    styles: ['Under ₹15,000', 'Under ₹30,000', 'Birthday Gifts', 'Anniversary Heirlooms', 'Valentine Edits'],
    occasions: ['Anniversary', 'Birthday', 'Wedding Gift', 'Self Love', 'Celebration'],
    metals: ['Diamond', 'Gemstone', 'Pearl', 'Gold', 'Plain Gold', 'Rose Gold', 'Silver', 'Solitaire'],
    prices: ['Under 10k', 'Under 15k', 'Under 20k', 'Under 30k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Men', 'Unisex'],
  },
  bridal: {
    featured: ['The Bridal Trousseau', 'Solitaire Engagement', 'Wedding Bands', 'Grand Sets'],
    styles: ['Engagement Rings', 'Wedding Chokers', 'Bridal Polki & Diamond', 'Nath & Maang Tikka', 'Reception Glamour'],
    occasions: ['Roka', 'Engagement', 'Haldi & Mehendi', 'Wedding Day', 'Reception'],
    metals: ['Diamond Solitaires', 'Uncut Gemstones', 'Platinum 950', '22KT Hallmarked Gold', 'Rose Gold'],
    prices: ['Under 30k', 'Under 50k', 'Under 90k', 'Above 90k', 'Bespoke Heirlooms'],
    karatages: ['14kt', '18kt', '22kt', 'Platinum'],
    shopFor: ['The Bride', 'The Groom', 'Bridal Party'],
  },
  all: {
    featured: ['All Heirlooms', 'The Solitaire Series', 'Bhivita Signature', 'Aurora Diamond Suite'],
    styles: ['Cocktail', 'Minimalist Classics', 'Royal Heritage', 'Contemporary Art Deco', 'Eternity Bands'],
    occasions: ['Everyday', 'Workwear', 'Cocktail', 'Red Carpet', 'Wedding'],
    metals: ['Lab-Grown Solitaires', 'Natural Certified Gems', '18KT Rose Gold', '18KT Yellow Gold', 'Platinum'],
    prices: ['Under 10k', 'Under 20k', 'Under 50k', 'Under 90k', 'Above 90k'],
    karatages: ['9kt', '14kt', '18kt', '22kt'],
    shopFor: ['Women', 'Men', 'Unisex'],
  },
};

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigateHome,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navCategories = [
    { label: 'Rings', id: 'rings' },
    { label: 'Earrings', id: 'earrings' },
    { label: 'Bracelet', id: 'bracelets' },
    { label: 'Bangles', id: 'bangles' },
    { label: 'Pendant', id: 'pendants' },
    { label: 'Necklace', id: 'necklaces' },
    { label: 'Gifting', id: 'gifting' },
    { label: 'Bridal', id: 'bridal' },
    { label: 'Collection', id: 'all' },
  ];

  const handleMouseEnter = (catId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredCategory(catId);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setHoveredCategory(null);
    }, 220);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleItemClick = (targetItemText: string) => {
    onSelectCategory(hoveredCategory || 'all');
    setIsMenuOpen(false);
    setHoveredCategory(null);
  };

  const currentMenuData = hoveredCategory
    ? CATEGORY_MEGA_MENUS[hoveredCategory] || DEFAULT_MENU_DATA
    : DEFAULT_MENU_DATA;

  return (
    <header className="w-full bg-white z-40 sticky top-0 shadow-xs relative">
      {/* ROW 1: White Row with Logo, Large Search, and Utility Icons */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-[#302326] hover:text-[#214E34] focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* LEFT: MIRAYA DIAMONDS Brand Logo */}
        <div
          onClick={onNavigateHome}
          className="cursor-pointer flex items-center group shrink-0 py-0.5"
        >
          <img
            src="/miraya_logo.png"
            alt="Miraya Diamonds – Elevating Love with Diamonds"
            className="h-10 sm:h-12 md:h-13 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* CENTER: Large Rounded Search Field */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for rings, necklaces, solitaire diamonds..."
              className="w-full bg-white border border-[#E7FFE6] focus:border-[#214E34] rounded-full py-2 sm:py-2.5 pl-6 pr-12 text-sm sm:text-base text-[#302326] placeholder-[#8E7E82] focus:outline-none focus:ring-1 focus:ring-[#214E34]/30 transition-all shadow-2xs font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#214E34] pointer-events-none">
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
            </div>
          </div>
        </div>

        {/* RIGHT: Consult Atelier + Wishlist + User + Bag */}
        <div className="flex items-center gap-2 sm:gap-4 text-[#302326]">
          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="hidden xl:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#75686A] hover:text-[#214E34] rounded-full border border-transparent hover:border-[#E7FFE6] transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#214E34]" />
              <span>Consult Atelier</span>
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#302326] hover:text-[#214E34] transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#214E34] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Account Icon */}
          <button
            onClick={onOpenConsultation}
            className="p-2 text-[#302326] hover:text-[#214E34] transition-colors cursor-pointer"
            aria-label="Account"
          >
            <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
          </button>

          {/* Shopping Bag Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#302326] hover:text-[#214E34] transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#214E34] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Row (visible on small mobile) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for rings"
            className="w-full bg-[#FAF5F6] border border-[#E7FFE6] rounded-full py-2.5 pl-4 pr-10 text-sm text-[#302326] placeholder-[#8E7E82] focus:outline-none"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214E34]" />
        </div>
      </div>

      {/* ROW 2: Primary Dark Forest Green Strip (#214E34) */}
      <div className="w-full bg-[#214E34] text-white shadow-xs relative">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-10 overflow-x-auto no-scrollbar">
            {navCategories.map((item) => {
              const isHovered = hoveredCategory === item.id;
              const isActive = activeCategory === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative py-2.5 sm:py-3.5"
                >
                  <button
                    onClick={() => {
                      onSelectCategory(item.id);
                      setIsMenuOpen(false);
                      setHoveredCategory(null);
                    }}
                    className={`flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                      isHovered || isActive
                        ? 'text-white font-bold opacity-100'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-white/80 shrink-0 transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-white' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* ======================================================= */}
        {/* MEGA MENU DROPDOWN (Matches User's Reference Screenshot) */}
        {/* ======================================================= */}
        {isMenuOpen && (
          <div
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 right-0 top-full bg-[#FAFAF8] border-b border-x border-[#E7FFE6] shadow-[0_25px_50px_rgba(0,0,0,0.18)] z-50 animate-fadeIn"
          >
            <div className="max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-10">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-7 sm:gap-9 lg:gap-12 text-left">
                {/* Column 1: FEATURED */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      FEATURED
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.featured.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 2: STYLE & OCCASION */}
                <div className="space-y-7">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      STYLE
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.styles.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      OCCASION
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.occasions.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 3: METAL & STONE */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      METAL & STONE
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.metals.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 4: PRICE */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      PRICE
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.prices.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 5: KARATAGE & SHOP FOR */}
                <div className="space-y-7">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      KARATAGE
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.karatages.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-[#214E34] uppercase pb-2 border-b border-[#214E34]/20">
                      SHOP FOR
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {currentMenuData.shopFor.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className="text-sm text-[#4E4043] hover:text-[#214E34] hover:translate-x-1 transition-all duration-150 cursor-pointer block text-left"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E4E6]">
                <div
                  className="cursor-pointer flex items-center"
                  onClick={() => {
                    onNavigateHome();
                    setMobileMenuOpen(false);
                  }}
                >
                  <img
                    src="/miraya_logo.png"
                    alt="Miraya Diamonds"
                    className="h-8 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#302326] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                {navCategories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-4 text-sm font-semibold text-[#302326] hover:text-[#214E34] hover:bg-[#E7FFE6] rounded-full transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 text-[#8E7E82] -rotate-90" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#F0E4E6]">
              <button
                onClick={() => {
                  onNavigateHome();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#214E34] text-white rounded-full text-sm font-semibold uppercase tracking-wider text-center cursor-pointer"
              >
                Back to Atelier Home
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
