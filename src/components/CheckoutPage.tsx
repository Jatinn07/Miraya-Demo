import React, { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  MapPin,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CollectionHeader } from './CollectionHeader';
import { TrustStrip } from './TrustStrip';
import { PromotionalMomentBanner } from './PromotionalMomentBanner';
import { Footer } from './Footer';
import { INITIAL_CART_ITEMS } from '../data/cartData';

interface CheckoutPageProps {
  onNavigateHome: () => void;
  onNavigateCollection: () => void;
  onNavigateCart: () => void;
  onOpenConsultation: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigateHome,
  onNavigateCollection,
  onNavigateCart,
  onOpenConsultation,
  wishlistCount,
  onOpenWishlist,
}) => {
  // Form fields matching Screenshot 2
  const [fullName, setFullName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('+91 9696969696');
  const [pincode, setPincode] = useState('636363');
  const [address, setAddress] = useState('23, Royal Heritage Boulevard');
  const [apartment, setApartment] = useState('Flat 101, Tower A');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [landmark, setLandmark] = useState('Near City Mall');
  const [saveAddress, setSaveAddress] = useState(true);

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'free' | 'express'>('free');

  // Search state for header
  const [searchQuery, setSearchQuery] = useState('');

  // Payment completed modal state
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculation values matching reference
  const subtotal = 123745;
  const shippingFee = deliveryMethod === 'express' ? 99 : 0;
  const gst = 3712;
  const totalAmount = subtotal + shippingFee + gst;

  const handleUseSavedAddress = () => {
    setFullName('Piyush Sharma');
    setPhoneNumber('+91 9869698984');
    setPincode('302020');
    setAddress('23,24 Paradise Heights, Civil Lines');
    setApartment('Penthouse B');
    setCity('Jaipur');
    setState('Rajasthan');
    setLandmark('Opposite Central Park');
  };

  const handleDetectLocation = () => {
    setPincode('302020');
    setCity('Jaipur');
    setState('Rajasthan');
  };

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* 1. HEADER (Same Miraya Header) */}
      <CollectionHeader
        cartCount={3}
        wishlistCount={wishlistCount}
        onOpenCart={onNavigateCart}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory="all"
        onSelectCategory={() => onNavigateCollection()}
      />

      <main className="flex-1 bg-white">
        {/* 2. CHECKOUT HERO BANNER (Matching Screenshot 2) */}
        <section className="relative w-full overflow-hidden bg-[#E7FFE6]">
          <div className="relative w-full h-[220px] sm:h-[250px] md:h-[270px]">
            {/* Banner Background Image */}
            <img
              src="/src/assets/images/cart_hero_banner_1790764042104.jpg"
              alt="Miraya Diamonds Checkout"
              className="absolute inset-0 w-full h-full object-cover object-right"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            {/* Soft Warm Light Green Gradient Overlay for Left Typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E7FFE6] via-[#E7FFE6]/95 sm:via-[#E7FFE6]/80 to-transparent w-full md:w-[65%]" />

            {/* Left Content Overlay */}
            <div className="relative max-w-[1340px] mx-auto h-full px-6 sm:px-10 lg:px-14 flex items-center">
              <div className="max-w-md space-y-2 z-10">
                {/* Breadcrumb: Home > Cart > Checkout */}
                <nav className="flex items-center space-x-2 text-sm text-[#8E7E82]">
                  <button
                    onClick={onNavigateHome}
                    className="hover:text-[#214E34] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2]" />
                  <button
                    onClick={onNavigateCart}
                    className="hover:text-[#214E34] transition-colors cursor-pointer"
                  >
                    Cart
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2]" />
                  <span className="text-[#214E34] font-medium">Checkout</span>
                </nav>

                {/* Heading (Cormorant Garamond) */}
                <div className="relative inline-block">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#302326] tracking-wide">
                    Checkout
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

        {/* 3. CHECKOUT MAIN LAYOUT (Two Columns: ~61% Left, ~39% Right) */}
        <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ================= LEFT: FORMS (~61%) ================= */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* CARD 1: SHIPPING ADDRESS */}
              <div className="bg-white rounded-2xl border border-[#E7FFE6] p-5 sm:p-7 shadow-xs space-y-5">
                {/* Header: Pink Number 1 + Title + Use Saved Address */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E7FFE6]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#214E34] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                      1
                    </div>
                    <h2 className="font-semibold text-sm sm:text-base text-[#302326]">
                      Shipping Address
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleUseSavedAddress}
                    className="text-sm text-[#214E34] font-medium hover:underline cursor-pointer"
                  >
                    Use Saved Address
                  </button>
                </div>

                {/* Form Fields Matching Screenshot 2 */}
                <div className="space-y-4 text-sm">
                  {/* Row 1: Full Name, Phone, Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        Full Name <span className="text-[#214E34]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        Phone Number <span className="text-[#214E34]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 9696969696"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-[#75686A]">
                          Pincode <span className="text-[#214E34]">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleDetectLocation}
                          className="text-sm text-[#214E34] hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <MapPin className="w-2.5 h-2.5" />
                          <span>Detect Location</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="636363"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Address & Apartment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        Address (House No., Building, Street) <span className="text-[#214E34]">*</span>
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your complete address"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        Apartment, Suite, etc. (Optional)
                      </label>
                      <input
                        type="text"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="e.g. Flat 101, Tower A"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>
                  </div>

                  {/* Row 3: City, State, Landmark */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        City <span className="text-[#214E34]">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Jaipur"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        State <span className="text-[#214E34]">*</span>
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34] cursor-pointer"
                      >
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm text-[#75686A]">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Near City Mall"
                        className="w-full bg-white border border-[#E7FFE6] rounded-lg px-3 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                      />
                    </div>
                  </div>

                  {/* Checkbox: Save this address for future orders */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-sm text-[#55484A] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="accent-[#214E34] w-4 h-4 rounded-sm cursor-pointer"
                      />
                      <span>Save this address for future orders</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* CARD 2: DELIVERY METHOD */}
              <div className="bg-white rounded-2xl border border-[#E7FFE6] p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#E7FFE6]">
                  <div className="w-6 h-6 rounded-full bg-[#214E34] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    2
                  </div>
                  <h2 className="font-semibold text-sm sm:text-base text-[#302326]">
                    Delivery Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Free Shipping */}
                  <label
                    onClick={() => setDeliveryMethod('free')}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                      deliveryMethod === 'free'
                        ? 'border-[#214E34] bg-[#E7FFE6]/50 ring-1 ring-[#214E34]/30'
                        : 'border-[#E7FFE6] hover:border-[#214E34]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          deliveryMethod === 'free'
                            ? 'border-[#214E34]'
                            : 'border-[#B2D8B1]'
                        }`}
                      >
                        {deliveryMethod === 'free' && (
                          <div className="w-2 h-2 rounded-full bg-[#214E34]" />
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E7FFE6] flex items-center justify-center text-[#214E34] shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-[#302326]">
                          Free Shipping
                        </span>
                        <span className="block text-sm text-[#8E7E82]">
                          Delivery in 4–6 business days
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-emerald-600">
                      Free
                    </span>
                  </label>

                  {/* Option 2: Express Delivery */}
                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                      deliveryMethod === 'express'
                        ? 'border-[#214E34] bg-[#E7FFE6]/50 ring-1 ring-[#214E34]/30'
                        : 'border-[#E7FFE6] hover:border-[#214E34]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          deliveryMethod === 'express'
                            ? 'border-[#214E34]'
                            : 'border-[#B2D8B1]'
                        }`}
                      >
                        {deliveryMethod === 'express' && (
                          <div className="w-2 h-2 rounded-full bg-[#214E34]" />
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E7FFE6] flex items-center justify-center text-[#214E34] shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-[#302326]">
                          Express Delivery
                        </span>
                        <span className="block text-sm text-[#8E7E82]">
                          Delivery in 1–2 business days
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-[#302326]">
                      ₹99
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* ================= RIGHT: ORDER SUMMARY (~39%) ================= */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-[#E7FFE6] p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7FFE6]">
                <h2 className="font-serif text-xl sm:text-2xl text-[#302326] font-normal tracking-wide">
                  Order Summary
                </h2>
                <button
                  onClick={onNavigateCart}
                  className="text-sm text-[#214E34] font-medium hover:underline cursor-pointer"
                >
                  Edit Cart
                </button>
              </div>

              {/* 3 Line Items List Matching Screenshot 2 */}
              <div className="divide-y divide-[#E7FFE6] space-y-3">
                {INITIAL_CART_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="pt-3 first:pt-0 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#E7FFE6]/30 border border-[#E7FFE6] p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#302326]">
                          {item.name}
                        </h4>
                        <span className="block text-sm text-[#8E7E82]">
                          18K Gold | Diamond
                        </span>
                        <span className="block text-sm text-[#75686A]">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-[#302326]">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation Rows */}
              <div className="space-y-2.5 text-sm pt-3 border-t border-[#E7FFE6]">
                <div className="flex items-center justify-between text-[#55484A]">
                  <span>Subtotal (3 items)</span>
                  <span className="font-medium text-[#302326]">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#55484A]">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-emerald-600 font-medium' : 'text-[#302326] font-medium'}>
                    {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#55484A]">
                  <span>GST (3%)</span>
                  <span className="font-medium text-[#302326]">
                    ₹{gst.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E7FFE6] pt-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-sm sm:text-base text-[#302326]">
                    Total Amount
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-[#302326]">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Primary CTA: Continue to Payment */}
              <button
                onClick={() => setOrderPlaced(true)}
                className="w-full py-3 px-6 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Security box */}
              <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-xl p-3 flex items-center gap-3 text-left mt-3">
                <div className="w-7 h-7 rounded-full bg-white border border-[#E7FFE6] flex items-center justify-center text-[#214E34] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-[#302326]">
                    100% Secure Checkout
                  </span>
                  <span className="block text-sm text-[#8E7E82]">
                    Your information is always safe with us.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TRUST STRIP (4-Column Horizontal Matching Screenshots) */}
        <TrustStrip />

        {/* 5. PROMOTIONAL MOMENT BANNER */}
        <PromotionalMomentBanner />
      </main>

      {/* 6. ORDER CONFIRMATION / PAYMENT MODAL */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-[#E7FFE6] animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#E7FFE6] border-2 border-[#214E34] flex items-center justify-center text-[#214E34] mx-auto shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl text-[#302326]">
              Order Confirmed with Miraya Atelier
            </h3>

            <p className="text-sm text-[#75686A] leading-relaxed">
              Thank you, <strong>{fullName}</strong>. Your luxury heirloom items totaling <strong>₹{totalAmount.toLocaleString()}</strong> have been registered. You will receive an SMS and tracking link via Sequel Armored Logistics.
            </p>

            <div className="bg-[#E7FFE6]/30 p-3 rounded-xl border border-[#E7FFE6] text-sm text-[#55484A]">
              Estimated Insured Delivery: <strong>Tomorrow, 2:00 PM</strong> to {city} ({pincode}).
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  onNavigateCollection();
                }}
                className="flex-1 py-2.5 bg-[#214E34] text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#193D29] transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  onNavigateHome();
                }}
                className="flex-1 py-2.5 border border-[#214E34] text-[#214E34] rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#E7FFE6] transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FOOTER */}
      <Footer
        onSelectCategory={() => onNavigateCollection()}
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
};
