import React, { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Tag,
  Check,
  Minus,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CollectionHeader } from './CollectionHeader';
import { CollectionProductCard } from './CollectionProductCard';
import { TrustStrip } from './TrustStrip';
import { PromotionalMomentBanner } from './PromotionalMomentBanner';
import { Footer } from './Footer';
import { CartItemModel, INITIAL_CART_ITEMS } from '../data/cartData';
import {
  COLLECTION_PRODUCTS,
  CollectionProduct,
} from '../data/collectionProducts';

interface CartPageProps {
  onNavigateHome: () => void;
  onNavigateCollection: () => void;
  onNavigateCheckout: () => void;
  onSelectProduct: (product: CollectionProduct) => void;
  onOpenConsultation: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  wishlistItems: string[];
  onToggleWishlist: (product: CollectionProduct) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateHome,
  onNavigateCollection,
  onNavigateCheckout,
  onSelectProduct,
  onOpenConsultation,
  wishlistCount,
  onOpenWishlist,
  wishlistItems,
  onToggleWishlist,
}) => {
  const [cartItems, setCartItems] = useState<CartItemModel[]>(INITIAL_CART_ITEMS);
  const [allSelected, setAllSelected] = useState<boolean>(true);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle quantity changes
  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItemModel[]
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, it) => acc + it.price * it.quantity,
    0
  );
  const discountAmount = couponApplied ? 2500 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gst = Math.round(taxableAmount * 0.03);
  const grandTotal = taxableAmount + gst;

  // Recommendations: 5 products from collection
  const recommendedProducts = COLLECTION_PRODUCTS.slice(3, 8);

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* 1. HEADER (Same Miraya Header) */}
      <CollectionHeader
        cartCount={totalItemCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => {}}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory="all"
        onSelectCategory={() => onNavigateCollection()}
      />

      <main className="flex-1 bg-white">
        {/* 2. CART HERO BANNER (Matching Screenshot 1) */}
        <section className="relative w-full overflow-hidden bg-[#E7FFE6]">
          <div className="relative w-full h-[220px] sm:h-[250px] md:h-[270px]">
            {/* Banner Background Image */}
            <img
              src="/src/assets/images/cart_hero_banner_1790764042104.jpg"
              alt="Miraya Diamonds Cart Jewellery Collection"
              className="absolute inset-0 w-full h-full object-cover object-right"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            {/* Soft Warm Light Green Gradient Overlay for Left Typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E7FFE6] via-[#E7FFE6]/95 sm:via-[#E7FFE6]/80 to-transparent w-full md:w-[65%]" />

            {/* Left Content Overlay */}
            <div className="relative max-w-[1340px] mx-auto h-full px-6 sm:px-10 lg:px-14 flex items-center">
              <div className="max-w-md space-y-2 z-10">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-[#8E7E82]">
                  <button
                    onClick={onNavigateHome}
                    className="hover:text-[#214E34] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2]" />
                  <span className="text-[#214E34] font-medium">Cart</span>
                </nav>

                {/* Heading (Cormorant Garamond) */}
                <div className="relative inline-block">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#302326] tracking-wide">
                    Your Cart
                  </h1>
                  {/* Subtle Pink Underline Accent */}
                  <div className="w-20 sm:w-24 h-0.5 bg-[#214E34] rounded-full mt-1.5" />
                </div>

                {/* Subtitle */}
                <p className="text-sm sm:text-sm text-[#665659] pt-1">
                  A few more steps it make it yours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CART MAIN LAYOUT (Two Columns: ~63% Left, ~37% Right) */}
        <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7FFE6] p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
              <h3 className="font-serif text-2xl text-[#302326]">
                Your Shopping Bag is Empty
              </h3>
              <p className="text-sm text-[#75686A]">
                Explore our solitaire creations and handcrafted jewellery heirlooms.
              </p>
              <button
                onClick={onNavigateCollection}
                className="px-6 py-2.5 bg-[#214E34] text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#193D29] transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ================= LEFT: CART ITEMS CARD (~63%) ================= */}
              <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-[#E7FFE6] p-5 sm:p-7 shadow-xs space-y-6">
                {/* Header Row: Checkbox + Clear Cart */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E7FFE6]">
                  <label className="flex items-center gap-2.5 text-sm font-medium text-[#302326] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => setAllSelected(e.target.checked)}
                      className="accent-[#214E34] w-4 h-4 rounded-sm cursor-pointer"
                    />
                    <span>
                      {totalItemCount} Items selected for purchase
                    </span>
                  </label>

                  <button
                    onClick={handleClearCart}
                    className="text-sm text-[#8E7E82] hover:text-[#214E34] transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Individual Cart Items List */}
                <div className="divide-y divide-[#E7FFE6] space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#E7FFE6]/30 border border-[#E7FFE6] p-2 shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              In Stock
                            </span>
                            <span className="text-sm text-[#8E7E82]">
                              SKU: {item.sku}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-sm font-semibold text-[#302326]">
                            {item.name}
                          </h3>

                          <p className="text-sm text-[#75686A]">
                            {item.metal} • {item.diamond}
                          </p>
                        </div>
                      </div>

                      {/* Price & Quantity Controls */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                        <span className="font-semibold text-sm sm:text-base text-[#302326]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Rounded Quantity Control Pill */}
                        <div className="flex items-center border border-[#E7FFE6] rounded-full p-1 bg-[#E7FFE6]/30 text-sm">
                          <button
                            onClick={() => handleUpdateQty(item.id, -1)}
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#55484A] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-medium text-[#302326]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item.id, 1)}
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#55484A] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Card Footer: Guarantee & Continue Shopping */}
                <div className="pt-4 border-t border-[#E7FFE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 text-[#55484A]">
                    <div className="w-4 h-4 rounded-full bg-[#214E34] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Prices include certified hallmarking & BIS 916 guarantee.</span>
                  </div>

                  <button
                    onClick={onNavigateCollection}
                    className="text-[#214E34] font-medium hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* ================= RIGHT: ORDER SUMMARY & OFFERS (~37%) ================= */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                {/* 1. ORDER SUMMARY CARD */}
                <div className="bg-white rounded-2xl border border-[#E7FFE6] p-5 sm:p-7 shadow-xs space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#302326] font-normal tracking-wide pb-1">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm pt-1 border-t border-[#E7FFE6]">
                    <div className="flex items-center justify-between text-[#55484A] pt-2">
                      <span>Subtotal ({totalItemCount} items)</span>
                      <span className="font-medium text-[#302326]">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[#55484A]">
                      <div className="flex items-center gap-1.5">
                        <span>Estimated Shipping</span>
                        <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase border border-emerald-200">
                          Insured
                        </span>
                      </div>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>

                    {couponApplied && (
                      <div className="flex items-center justify-between text-[#214E34]">
                        <span>Coupon (AURORAFIRST)</span>
                        <span className="font-medium">-₹2,500</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[#55484A]">
                      <span>Applicable GST (3%)</span>
                      <span className="font-medium text-[#302326]">
                        ₹{gst.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#E7FFE6] pt-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-sm sm:text-base text-[#302326]">
                        Grand Total
                      </span>
                      <span className="font-bold text-lg sm:text-xl text-[#302326]">
                        ₹{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA: Continue -> Checkout */}
                  <button
                    onClick={onNavigateCheckout}
                    className="w-full py-3 px-6 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* 100% Secure Checkout Card */}
                  <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-xl p-3 flex items-center gap-3 text-left mt-3">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#E7FFE6] flex items-center justify-center text-[#214E34] shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#302326]">
                        100% Secure Checkout
                      </span>
                      <span className="block text-sm text-[#8E7E82]">
                        Your transaction and card details are encrypted.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. COUPONS & OFFERS CARD */}
                <div className="bg-white rounded-2xl border border-[#E7FFE6] p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-semibold text-[#302326]">
                      <Tag className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>Coupons & Offers</span>
                    </div>
                    <button className="text-sm text-[#214E34] hover:underline">
                      View All
                    </button>
                  </div>

                  <div className="p-3 bg-[#E7FFE6]/60 rounded-xl border border-dashed border-[#214E34]/40 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 bg-[#214E34] text-white rounded text-sm font-bold tracking-wider uppercase inline-block">
                        AURORAFIRST
                      </span>
                      <p className="text-sm text-[#55484A]">
                        ₹2,500 OFF on your first purchase
                      </p>
                    </div>

                    <button
                      onClick={() => setCouponApplied(!couponApplied)}
                      className="px-4 py-1.5 bg-white border border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white rounded-full text-sm font-semibold tracking-wider transition-colors cursor-pointer shrink-0"
                    >
                      {couponApplied ? 'REMOVE' : 'APPLY'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. TRUST STRIP (4-Column Horizontal Matching Screenshots) */}
        <TrustStrip />

        {/* 5. YOU MAY ALSO LIKE (5 Products Horizontal Reusing CollectionProductCard) */}
        <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 bg-white">
          <div className="text-center space-y-1.5 pb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#302326] font-normal tracking-wide">
              You May Also Like
            </h2>
            <p className="text-sm text-[#75686A]">
              Handpicked fine jewellery treasures curated for your collection
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {recommendedProducts.map((p) => (
              <CollectionProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlistItems.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={(item) => {
                  setCartItems((prev) => [
                    ...prev,
                    {
                      id: `cart-${Date.now()}`,
                      name: item.name,
                      sku: item.sku,
                      metal: item.metal || '18kt Gold',
                      diamond: item.stone || 'Diamond',
                      price: item.price,
                      quantity: 1,
                      image: item.primaryImage,
                      inStock: true,
                    },
                  ]);
                }}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>

        {/* 6. PROMOTIONAL MOMENT BANNER (Deep Burgundy Wide Banner) */}
        <PromotionalMomentBanner />
      </main>

      {/* 7. FOOTER */}
      <Footer
        onSelectCategory={() => onNavigateCollection()}
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
};
