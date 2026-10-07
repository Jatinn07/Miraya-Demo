import React, { useState } from 'react';
import {
  Heart,
  Share2,
  Sparkles,
  ShieldCheck,
  Award,
  Truck,
  RotateCw,
  Video,
  Check,
  ChevronRight,
  Maximize2,
  Eye,
  Star,
  ArrowRight,
  Info,
  Calendar,
  Send,
} from 'lucide-react';
import { CollectionHeader } from './CollectionHeader';
import { CollectionProductCard } from './CollectionProductCard';
import { ProductEnquiryModal } from './ProductEnquiryModal';
import { Footer } from './Footer';
import {
  CollectionProduct,
  PDP_SOLITAIRE_PRODUCT,
  COLLECTION_PRODUCTS,
} from '../data/collectionProducts';

interface ProductDetailPageProps {
  product?: CollectionProduct;
  onNavigateHome: () => void;
  onNavigateCollection: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  wishlistItems: string[];
  onToggleWishlist: (product: CollectionProduct) => void;
  onAddToCart: (product: CollectionProduct) => void;
  onSelectProduct: (product: CollectionProduct) => void;
  onOpenConsultation: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product = PDP_SOLITAIRE_PRODUCT,
  onNavigateHome,
  onNavigateCollection,
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
  // Category-specific fallbacks to guarantee 5 high quality thumbnail images
  const categoryFallbacks: Record<string, string[]> = {
    rings: [
      '/src/assets/images/pdp_solitaire_hero_1790762967410.jpg',
      '/src/assets/images/pdp_ring_on_hand_1790762989836.jpg',
      '/src/assets/images/gold_ring_1790761801673.jpg',
      '/src/assets/images/ring_hover_view_1790763007443.jpg',
      '/src/assets/images/rings_category_solitaire_1790703087837.jpg',
    ],
    earrings: [
      '/src/assets/images/bhivita_earrings_1790761788020.jpg',
      '/src/assets/images/earrings_hover_1790763020835.jpg',
      '/src/assets/images/bestseller_earrings_1790768947180.jpg',
      '/src/assets/images/floral_earrings_thumb_1790764074763.jpg',
      '/src/assets/images/category_earrings.png',
    ],
    necklaces: [
      '/src/assets/images/bhivita_necklace_1790761816007.jpg',
      '/src/assets/images/necklace_hover_1790763035996.jpg',
      '/src/assets/images/bestseller_necklace_1790768906394.jpg',
      '/src/assets/images/circle_pendant_thumb_1790764103077.jpg',
      '/src/assets/images/category_necklace.png',
    ],
    bracelets: [
      '/src/assets/images/bhivita_bracelet_1790761828857.jpg',
      '/src/assets/images/bracelet_hover_1790763051995.jpg',
      '/src/assets/images/tennis_bracelet_thumb_1790764128140.jpg',
      '/src/assets/images/category_bracelets.png',
      '/src/assets/images/bestseller_bangles_1790768927064.jpg',
    ],
    bangles: [
      '/src/assets/images/bestseller_bangles_1790768927064.jpg',
      '/src/assets/images/category_bangles.png',
      '/src/assets/images/bhivita_bracelet_1790761828857.jpg',
      '/src/assets/images/bracelet_hover_1790763051995.jpg',
      '/src/assets/images/tennis_bracelet_thumb_1790764128140.jpg',
    ],
    pendants: [
      '/src/assets/images/circle_pendant_thumb_1790764103077.jpg',
      '/src/assets/images/category_pendant.png',
      '/src/assets/images/bhivita_necklace_1790761816007.jpg',
      '/src/assets/images/necklace_hover_1790763035996.jpg',
      '/src/assets/images/bestseller_necklace_1790768906394.jpg',
    ],
  };

  const universalFallbacks = [
    '/src/assets/images/pdp_solitaire_hero_1790762967410.jpg',
    '/src/assets/images/pdp_ring_on_hand_1790762989836.jpg',
    '/src/assets/images/gold_ring_1790761801673.jpg',
    '/src/assets/images/ring_hover_view_1790763007443.jpg',
    '/src/assets/images/rings_category_solitaire_1790703087837.jpg',
    '/src/assets/images/bhivita_earrings_1790761788020.jpg',
    '/src/assets/images/bhivita_necklace_1790761816007.jpg',
    '/src/assets/images/bhivita_bracelet_1790761828857.jpg',
  ];

  const categorySpecific = categoryFallbacks[product.category] || categoryFallbacks['rings'];
  const pool = [
    product.primaryImage,
    product.secondaryImage,
    ...(product.galleryImages || []),
    ...categorySpecific,
    ...universalFallbacks,
  ].filter(Boolean) as string[];

  const galleryList: string[] = [];
  for (const img of pool) {
    if (!galleryList.includes(img)) {
      galleryList.push(img);
    }
    if (galleryList.length >= 5) break;
  }
  while (galleryList.length < 5) {
    galleryList.push(universalFallbacks[galleryList.length % universalFallbacks.length]);
  }
  const gallery = galleryList.slice(0, 5);

  const [selectedImage, setSelectedImage] = useState<string>(gallery[0]);

  // Sync selectedImage when product changes
  React.useEffect(() => {
    if (gallery && gallery.length > 0) {
      setSelectedImage(gallery[0]);
    }
  }, [product.id]);

  // Product configurations
  const [selectedMetal, setSelectedMetal] = useState<'rose' | 'yellow' | 'platinum'>('rose');
  const [diamondQuality, setDiamondQuality] = useState<'si' | 'vvs'>('vvs');
  const [selectedCarat, setSelectedCarat] = useState<string>('18K');
  const [selectedRingSize, setSelectedRingSize] = useState<string>('12');
  const [addEngraving, setAddEngraving] = useState<boolean>(false);
  const [engravingText, setEngravingText] = useState<string>('');

  // Pincode check
  const [pincode, setPincode] = useState<string>('302020');
  const [pincodeVerified, setPincodeVerified] = useState<boolean>(true);

  // Search state for header
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<CollectionProduct | null>(null);

  // Complete the suite recommendations (first 5 collection products)
  const suiteRecommendations = COLLECTION_PRODUCTS.slice(0, 5);

  // Stateful enquiry form
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryMobile, setEnquiryMobile] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');

  const isWishlisted = wishlistItems.includes(product.id);

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* 1. HEADER (Same Miraya Header) */}
      <CollectionHeader
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory="rings"
        onSelectCategory={(cat) => {
          onNavigateCollection();
        }}
        onOpenConsultation={onOpenConsultation}
      />

      <main className="flex-1 bg-white">
        {/* 2. BREADCRUMB */}
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-3">
          <nav className="flex items-center space-x-2 text-sm text-[#8E7E82] font-sans overflow-x-auto no-scrollbar py-1">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#214E34] transition-colors cursor-pointer shrink-0 font-semibold"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
            <button
              onClick={onNavigateCollection}
              className="hover:text-[#214E34] transition-colors cursor-pointer shrink-0 font-semibold"
            >
              Collection
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
            <button
              onClick={onNavigateCollection}
              className="hover:text-[#214E34] transition-colors cursor-pointer shrink-0 font-semibold capitalize"
            >
              {product.category}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
            <span className="text-[#214E34] font-semibold truncate max-w-xs sm:max-w-md">
              {product.name}
            </span>
          </nav>
        </div>

        {/* 3. MAIN PRODUCT AREA (Two-Column Layout Matching Reference 2) */}
        <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ================= LEFT: PRODUCT IMAGE GALLERY (~52%) ================= */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4">
              <div className="flex flex-col-reverse sm:flex-row gap-4 items-start">
                {/* Vertical Thumbnails (Exactly 5 thumbnails displayed) */}
                <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl p-1 bg-white border transition-all cursor-pointer overflow-hidden shadow-2xs ${
                        selectedImage === img
                          ? 'border-[#214E34] ring-2 ring-[#214E34]/40 shadow-sm scale-105'
                          : 'border-[#E7FFE6] hover:border-[#214E34]/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover object-center rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Product Image Container - Pure white background, enlarged high-impact view without green padding */}
                <div className="flex-1 w-full relative bg-white rounded-2xl p-0 flex items-center justify-center min-h-[500px] sm:min-h-[580px] md:min-h-[640px] border border-neutral-200/70 overflow-hidden group shadow-xs">
                  {/* Top-Left Badge: NATURAL SOLITAIRE */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-xs border border-neutral-200 text-sm font-semibold tracking-wider uppercase text-[#302326] rounded-full shadow-2xs">
                      Natural Solitaire
                    </span>
                  </div>

                  {/* Top-Right Tools: Share */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: product.name,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border border-neutral-200 text-[#55484A] hover:text-[#214E34] flex items-center justify-center transition-colors shadow-2xs cursor-pointer font-semibold"
                      aria-label="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Displayed Jewellery Image - Fill container completely edge-to-edge with no green space */}
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full min-h-[500px] sm:min-h-[580px] md:min-h-[640px] object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Bottom Interactive Tool Capsules */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={onOpenConsultation}
                      className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-neutral-200/80 text-sm font-semibold text-[#302326] hover:text-[#214E34] hover:border-[#214E34] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>LIVE ART TRY-ON</span>
                    </button>

                    <button
                      onClick={() => {
                        const nextIdx = (gallery.indexOf(selectedImage) + 1) % gallery.length;
                        setSelectedImage(gallery[nextIdx]);
                      }}
                      className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-neutral-200/80 text-sm font-semibold text-[#302326] hover:text-[#214E34] hover:border-[#214E34] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>360° VIEW</span>
                    </button>

                    <div className="hidden sm:flex px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-neutral-200/80 text-sm font-semibold text-[#75686A] items-center gap-1.5 shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>HOVER TO ZOOM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 3 Trust Badge Capsules Under Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-xl p-3 flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#E7FFE6] border border-[#214E34]/30 flex items-center justify-center text-[#214E34] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wide">
                      100% CERTIFIED
                    </span>
                    <span className="block text-sm text-[#8E7E82]">
                      IGI & SGL Authenticated
                    </span>
                  </div>
                </div>

                <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-xl p-3 flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#E7FFE6] border border-[#214E34]/30 flex items-center justify-center text-[#214E34] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wide">
                      BIS HALLMARKED
                    </span>
                    <span className="block text-sm text-[#8E7E82]">
                      750 (18K) Gold Purity
                    </span>
                  </div>
                </div>

                <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-xl p-3 flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#E7FFE6] border border-[#214E34]/30 flex items-center justify-center text-[#214E34] shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wide">
                      INSURED TRANSIT
                    </span>
                    <span className="block text-sm text-[#8E7E82]">
                      All India Doorstep Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT: PRODUCT INFORMATION (~48%) ================= */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5">
              {/* Eyebrow & SKU */}
              <div className="flex items-center justify-between text-sm text-[#8E7E82] tracking-wider uppercase font-semibold">
                <span className="text-[#214E34]">
                  {product.collection || 'BESPOKE ARTIST · THE SOLITAIRE COLLECTION'}
                </span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title (Cormorant Garamond) */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#302326] leading-tight tracking-[0.02em]">
                {product.name}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-0.5 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#302326]">
                  {product.rating} / 5.0
                </span>
                <span className="text-[#8E7E82]">
                  ({product.reviewsCount || 148} Person Reviews)
                </span>
              </div>

              {/* Price & Discount */}
              <div className="space-y-1 pt-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#302326]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm sm:text-base text-[#9A8B8E] line-through font-normal">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 bg-[#E7FFE6] text-[#214E34] border border-[#214E34]/30 rounded-md text-sm font-semibold tracking-wider uppercase">
                    {product.discount || '11% OFF'}
                  </span>
                </div>
                <p className="text-sm text-[#8E7E82]">
                  Prices inclusive of all taxes. Free lifetime insured shipping all over India.
                </p>
                <p className="text-sm text-[#55484A] font-medium pt-0.5">
                  Or pay ₹18,852/mo with interest-free 3-month EMI.
                </p>
              </div>

              {/* SECTION: SELECTED METAL */}
              <div className="pt-4 border-t border-[#E7FFE6] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-[#302326] text-xs sm:text-sm">
                      Selected Metal:
                    </span>
                    <span className="text-[#214E34] font-bold text-xs sm:text-sm">
                      {selectedMetal === 'rose'
                        ? '18KT ROSE GOLD'
                        : selectedMetal === 'yellow'
                        ? '18KT YELLOW GOLD'
                        : 'PLATINUM 950'}
                    </span>
                  </div>
                  <button className="text-xs sm:text-sm text-[#75686A] hover:text-[#214E34] underline transition-colors cursor-pointer">
                    Customized Gold
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setSelectedMetal('rose')}
                    className={`py-2.5 px-3 rounded-full border flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                      selectedMetal === 'rose'
                        ? 'border-[#214E34] bg-[#E7FFE6] ring-1 ring-[#214E34]/30 shadow-2xs'
                        : 'border-[#E7FFE6] bg-white hover:border-[#214E34]/40 hover:bg-[#FFFAFA]'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#E5A19B] border border-black/10 shrink-0 shadow-2xs" />
                    <div className="text-left leading-tight">
                      <span className="block text-xs sm:text-sm font-semibold text-[#302326] uppercase whitespace-nowrap">
                        Rose Gold
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#75686A]">18KT</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMetal('yellow')}
                    className={`py-2.5 px-3 rounded-full border flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                      selectedMetal === 'yellow'
                        ? 'border-[#214E34] bg-[#E7FFE6] ring-1 ring-[#214E34]/30 shadow-2xs'
                        : 'border-[#E7FFE6] bg-white hover:border-[#214E34]/40 hover:bg-[#FFFAFA]'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F3D17A] border border-black/10 shrink-0 shadow-2xs" />
                    <div className="text-left leading-tight">
                      <span className="block text-xs sm:text-sm font-semibold text-[#302326] uppercase whitespace-nowrap">
                        Yellow Gold
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#75686A]">18KT</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMetal('platinum')}
                    className={`py-2.5 px-3 rounded-full border flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                      selectedMetal === 'platinum'
                        ? 'border-[#214E34] bg-[#E7FFE6] ring-1 ring-[#214E34]/30 shadow-2xs'
                        : 'border-[#E7FFE6] bg-white hover:border-[#214E34]/40 hover:bg-[#FFFAFA]'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#D6DCE5] border border-black/10 shrink-0 shadow-2xs" />
                    <div className="text-left leading-tight">
                      <span className="block text-xs sm:text-sm font-semibold text-[#302326] uppercase whitespace-nowrap">
                        Platinum
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#75686A]">950 Pure</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* SECTION: DIAMOND QUALITY TIER */}
              <div className="pt-4 border-t border-[#E7FFE6] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold uppercase tracking-wider text-[#302326] text-xs sm:text-sm">
                    Diamond Quality Tier
                  </span>
                  <span className="text-xs sm:text-sm text-[#214E34] font-semibold tracking-wide">
                    Natural Solitaire
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setDiamondQuality('si')}
                    className={`p-3.5 sm:px-5 sm:py-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      diamondQuality === 'si'
                        ? 'border-[#214E34] bg-[#E7FFE6] ring-1 ring-[#214E34]/30 shadow-2xs'
                        : 'border-[#E7FFE6] bg-white hover:border-[#214E34]/40 hover:bg-[#FFFAFA]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-[#302326] tracking-wide">
                        SI + IJ
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black/5 text-[#75686A] uppercase tracking-wider">
                        Standard
                      </span>
                    </div>
                    <span className="block text-xs sm:text-[13px] text-[#75686A] leading-relaxed">
                      Slightly Included, Warm Sparkle
                    </span>
                  </button>

                  <button
                    onClick={() => setDiamondQuality('vvs')}
                    className={`p-3.5 sm:px-5 sm:py-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      diamondQuality === 'vvs'
                        ? 'border-[#214E34] bg-[#E7FFE6] ring-1 ring-[#214E34]/30 shadow-2xs'
                        : 'border-[#E7FFE6] bg-white hover:border-[#214E34]/40 hover:bg-[#FFFAFA]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-[#302326] tracking-wide">
                        VVS + EF
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#214E34] text-white uppercase tracking-wider">
                        Selected
                      </span>
                    </div>
                    <span className="block text-xs sm:text-[13px] text-[#75686A] leading-relaxed">
                      Very Very Slight, Colorless White
                    </span>
                  </button>
                </div>
              </div>

              {/* SECTION: CARAT SELECTOR */}
              <div className="pt-4 border-t border-[#E7FFE6] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold uppercase tracking-wider text-[#302326] text-xs sm:text-sm">
                      Carat:
                    </span>
                    <span className="text-[#214E34] font-bold text-xs sm:text-sm">{selectedCarat}</span>
                  </div>
                  <button className="text-xs sm:text-sm text-[#75686A] hover:text-[#214E34] underline transition-colors cursor-pointer">
                    Size Guide
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  {['14K', '16K', '18K', '20K', '22K'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCarat(c)}
                      className={`flex-1 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                        selectedCarat === c
                          ? 'border-[#214E34] bg-[#214E34] text-white shadow-2xs'
                          : 'border-[#E7FFE6] bg-white text-[#55484A] hover:border-[#214E34]/50 hover:bg-[#FFFAFA]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION: INDIAN RING SIZE */}
              <div className="pt-4 border-t border-[#E7FFE6] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold uppercase tracking-wider text-[#302326] text-xs sm:text-sm">
                      Indian Ring Size:
                    </span>
                    <span className="text-[#214E34] font-bold text-xs sm:text-sm">{selectedRingSize}</span>
                  </div>
                  <button className="text-xs sm:text-sm text-[#75686A] hover:text-[#214E34] underline transition-colors cursor-pointer">
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {['10', '12', '14', '16', '18', 'BESPOKE SIZE'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedRingSize(s)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                        selectedRingSize === s
                          ? 'border-[#214E34] bg-[#214E34] text-white shadow-2xs'
                          : 'border-[#E7FFE6] bg-white text-[#55484A] hover:border-[#214E34]/50 hover:bg-[#FFFAFA]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION: ENGRAVING CUSTOMIZATION */}
              <div className="pt-4 border-t border-[#E7FFE6]">
                <label className="flex items-center gap-2.5 text-xs sm:text-sm text-[#55484A] font-semibold tracking-wide cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={addEngraving}
                    onChange={(e) => setAddEngraving(e.target.checked)}
                    className="accent-[#214E34] w-4 h-4 rounded-sm cursor-pointer"
                  />
                  <span>ADD FREE LASER ATELIER ENGRAVING</span>
                </label>
                {addEngraving && (
                  <div className="mt-3 pl-6">
                    <input
                      type="text"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="e.g. Forever & Always · 24.12.26"
                      maxLength={24}
                      className="w-full text-sm px-3.5 py-2.5 border border-[#E7FFE6] bg-white rounded-xl focus:outline-none focus:border-[#214E34] shadow-2xs"
                    />
                  </div>
                )}
              </div>

              {/* ======================================================= */}
              {/* STATEFUL LUXURY ENQUIRY CARD (Enquire About This Product) */}
              {/* ======================================================= */}
              <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-[24px] p-5 sm:p-6 space-y-4.5 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E7FFE6] flex items-center justify-center text-[#214E34] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[18px] sm:text-xl text-[#302326] font-normal tracking-wide">
                      Enquire About This Product
                    </h3>
                    <p className="text-sm text-[#75686A] font-light mt-0.5 leading-relaxed">
                      Our experts will get back to you within 24 hours with details, pricing and customisation options.
                    </p>
                  </div>
                </div>

                {enquirySubmitted ? (
                  /* GORGEOUS LUXURY CONFIRMATION SCREEN */
                  <div className="bg-white border border-[#E7FFE6] rounded-2xl p-5 text-center space-y-4 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-[#214E34] font-normal">
                        Enquiry Sent Successfully
                      </h4>
                      <p className="text-sm sm:text-base text-[#332427] font-sans">
                        Thank you, <span className="font-semibold">{enquiryName}</span>! Your private consultation request has been logged.
                      </p>
                    </div>

                    {/* Captured High-Context Selection Details */}
                    <div className="bg-[#E7FFE6]/30 rounded-xl p-3.5 text-left text-sm space-y-2 border border-[#E7FFE6]">
                      <div className="font-semibold text-[#214E34] uppercase tracking-wider text-sm">Captured Specifications:</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[#55484A]">
                        <div><strong>Product:</strong> {product.name}</div>
                        <div><strong>SKU:</strong> {product.sku || 'EMR-34820'}</div>
                        <div>
                          <strong>Metal:</strong>{' '}
                          {selectedMetal === 'rose'
                            ? 'Rose Gold 18KT'
                            : selectedMetal === 'yellow'
                            ? 'Yellow Gold 18KT'
                            : 'Platinum 950'}
                        </div>
                        <div>
                          <strong>Diamond:</strong>{' '}
                          {diamondQuality === 'vvs' ? 'VVS - EF Premium' : 'SI - IJ Standard'}
                        </div>
                        <div><strong>Carat:</strong> {selectedCarat}</div>
                        <div><strong>Ring Size:</strong> {selectedRingSize}</div>
                        {addEngraving && engravingText && (
                          <div className="col-span-2 truncate"><strong>Engraving:</strong> "{engravingText}"</div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#75686A] leading-relaxed">
                      Our luxury client advisor will connect with you on <span className="font-semibold text-[#302326]">{enquiryMobile}</span> shortly to guide you through customization and finalizing your order.
                    </p>

                    <div className="pt-1 flex justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => {
                          setEnquirySubmitted(false);
                          setEnquiryName('');
                          setEnquiryMobile('');
                          setEnquiryEmail('');
                          setEnquiryMessage('');
                        }}
                        className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xs hover:scale-[1.02] active:scale-98"
                      >
                        Enquire Again
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ENQUIRY INPUT FORM */
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!enquiryName.trim()) {
                        setEnquiryError('Please enter your name.');
                        return;
                      }
                      if (!enquiryMobile.trim()) {
                        setEnquiryError('Please enter your mobile number.');
                        return;
                      }
                      setEnquiryError('');
                      setEnquirySubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    {enquiryError && (
                      <div className="bg-[#FFF0F0] border border-red-200 text-red-700 text-sm px-3.5 py-2 rounded-xl">
                        {enquiryError}
                      </div>
                    )}

                    {/* Captured Options Preview (Mini Badge) */}
                    <div className="flex flex-wrap gap-1.5 text-sm uppercase font-semibold text-[#214E34]/80 tracking-wider bg-white rounded-xl p-2.5 border border-[#E7FFE6]">
                      <span className="bg-[#E7FFE6] px-2 py-0.5 rounded-md">
                        {selectedMetal === 'rose' ? 'Rose Gold' : selectedMetal === 'yellow' ? 'Yellow Gold' : 'Platinum'}
                      </span>
                      <span className="bg-[#E7FFE6] px-2 py-0.5 rounded-md">
                        {diamondQuality === 'vvs' ? 'VVS-EF' : 'SI-IJ'}
                      </span>
                      <span className="bg-[#E7FFE6] px-2 py-0.5 rounded-md">{selectedCarat} Carat</span>
                      <span className="bg-[#E7FFE6] px-2 py-0.5 rounded-md">Size {selectedRingSize}</span>
                    </div>

                    {/* Two-Column Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wider uppercase">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={enquiryName}
                          onChange={(e) => setEnquiryName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full bg-white border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wider uppercase">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={enquiryMobile}
                          onChange={(e) => setEnquiryMobile(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50"
                        />
                      </div>
                    </div>

                    {/* Email (Optional) */}
                    <div className="space-y-1">
                      <label className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wider uppercase">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50"
                      />
                    </div>

                    {/* Requirements / Message (Optional) */}
                    <div className="space-y-1">
                      <label className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wider uppercase">
                        Message / Requirements (Optional)
                      </label>
                      <textarea
                        rows={2.5}
                        value={enquiryMessage}
                        onChange={(e) => setEnquiryMessage(e.target.value)}
                        placeholder="Tell us your requirements (ring size, customization, budget, etc.)"
                        className="w-full bg-white border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50 resize-none"
                      />
                    </div>

                    {/* Primary submit button (Auto-expands based on text with standard padding) */}
                    <div className="pt-1 flex justify-start">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#214E34] hover:bg-[#1C3E2A] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-98 whitespace-nowrap"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Enquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* VIRTUAL ATELIER CONSULTATION (Standardized CTA button) */}
              <div className="flex justify-start">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#E7FFE6] hover:bg-[#d8fad7] border border-[#214E34]/30 rounded-full text-sm font-semibold text-[#214E34] tracking-wider uppercase transition-all duration-300 shadow-2xs hover:scale-[1.02] active:scale-98 cursor-pointer whitespace-nowrap"
                >
                  <Video className="w-4 h-4" />
                  <span>Book 1-on-1 Virtual Atelier Consultation</span>
                </button>
              </div>

              {/* ESTIMATED DELIVERY & COD AVAILABILITY */}
              <div className="bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-xl p-4 space-y-3">
                <span className="block text-sm sm:text-base font-semibold text-[#302326] tracking-wider uppercase">
                  ESTIMATED DELIVERY & COD AVAILABILITY
                </span>

                <div className="flex items-center gap-2.5">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 bg-white border border-[#E7FFE6] rounded-lg px-3.5 py-2 text-sm text-[#302326] focus:outline-none focus:border-[#214E34]"
                  />
                  <button
                    onClick={() => setPincodeVerified(true)}
                    className="inline-flex items-center justify-center px-7 py-3 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xs hover:scale-[1.02] active:scale-98"
                  >
                    Verify
                  </button>
                </div>

                {pincodeVerified && (
                  <div className="flex items-center gap-2 text-sm text-[#214E34] pt-0.5">
                    <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                    <span>
                      Delivery by <strong>Tomorrow, 2:00 PM</strong> to Jaipur ({pincode}) via Sequel Armored Logistics.
                    </span>
                  </div>
                )}
              </div>

              {/* SPECIFICATION SUMMARY ROW */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#E7FFE6] text-center">
                <div className="py-2">
                  <span className="block text-sm text-[#8E7E82] uppercase tracking-wider">
                    DIAMOND WT
                  </span>
                  <span className="block text-base font-semibold text-[#302326] mt-0.5">
                    0.65 Carat
                  </span>
                </div>
                <div className="py-2 border-x border-[#E7FFE6]">
                  <span className="block text-sm text-[#8E7E82] uppercase tracking-wider">
                    GROSS WT
                  </span>
                  <span className="block text-base font-semibold text-[#302326] mt-0.5">
                    4.82 Grams
                  </span>
                </div>
                <div className="py-2">
                  <span className="block text-sm text-[#8E7E82] uppercase tracking-wider">
                    GUARANTEE
                  </span>
                  <span className="block text-base font-semibold text-[#214E34] mt-0.5">
                    Lifetime Buyback
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. UNVEILING THE CRAFT & PURITY SECTION */}
        <section className="bg-[#E7FFE6]/30 py-16 sm:py-20 border-t border-[#E7FFE6]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-3">
            <span className="text-sm sm:text-base font-semibold text-[#214E34] uppercase tracking-[0.2em] block">
              ABSOLUTE INTEGRITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#302326] font-normal tracking-wide">
              Unveiling the Craft & Purity
            </h2>
            <p className="text-sm sm:text-sm text-[#75686A] max-w-xl mx-auto leading-relaxed">
              Every gram of gold accounted for, every facet certified by the world's strictest laboratories.
            </p>

            {/* 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
              {/* CARD 01: Product Specifications Table */}
              <div className="bg-white rounded-2xl p-6 border border-[#E7FFE6] shadow-xs space-y-3">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#302326] pb-2 border-b border-[#E7FFE6]">
                  Product Specifications
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Product Type', val: 'Ring' },
                    { label: 'Metal', val: '18KT Rose Gold' },
                    { label: 'Net Weight', val: '4.820 g' },
                    { label: 'Gross Weight', val: '4.950 g' },
                    { label: 'Diamond Weight', val: '0.65 ct' },
                    { label: 'Diamond Colour', val: 'E - F' },
                    { label: 'Diamond Clarity', val: 'VVS1' },
                    { label: 'Diamond Shape', val: 'Round Brilliant' },
                    { label: 'Setting Type', val: 'Prong & Pavé' },
                    { label: 'Finish', val: 'High Polish' },
                    { label: 'Occasion', val: 'Engagement, Wedding, Gifting' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 border-b border-[#E7FFE6] text-sm"
                    >
                      <span className="text-[#8E7E82]">{row.label}</span>
                      <span className="font-medium text-[#302326]">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 02: Ring Dimension & Measurement Illustration */}
              <div className="bg-white rounded-2xl p-6 border border-[#E7FFE6] shadow-xs flex flex-col justify-between items-center text-center">
                <div className="w-full">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#302326] pb-2 border-b border-[#E7FFE6]">
                    Proportions & Calibration
                  </h3>
                  <div className="py-6 flex flex-col items-center justify-center">
                    <span className="text-base font-semibold text-[#214E34] tracking-widest block mb-2">
                      6.2 mm
                    </span>
                    {/* Ring Diagram SVG */}
                    <div className="w-36 h-36 relative flex items-center justify-center">
                      <svg viewBox="0 0 120 120" className="w-full h-full text-[#E5A19B]">
                        <line x1="20" y1="20" x2="100" y2="20" stroke="#214E34" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="60" cy="70" r="38" fill="none" stroke="currentColor" strokeWidth="4" />
                        <circle cx="60" cy="70" r="32" fill="none" stroke="#214E34" strokeWidth="1" strokeOpacity="0.4" />
                        {/* Solitaire Diamond on top */}
                        <polygon points="60,24 68,34 52,34" fill="#FFFFFF" stroke="#214E34" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#8E7E82] max-w-xs mt-3">
                      Calibrated for optimal optical light return and ergonomic all-day comfort.
                    </p>
                  </div>
                </div>

                <div className="pt-2 w-full flex justify-center">
                  <button
                    onClick={onOpenConsultation}
                    className="inline-flex items-center justify-center px-7 py-3 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xs hover:scale-[1.02] active:scale-98"
                  >
                    View Size on Hand
                  </button>
                </div>
              </div>

              {/* CARD 03: IGI Certified Natural Diamond */}
              <div className="bg-white rounded-2xl p-6 border border-[#E7FFE6] shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E7FFE6] border border-[#214E34]/30 flex items-center justify-center text-[#214E34] shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[#302326]">
                        IGI Certified Natural Diamond
                      </h4>
                      <span className="text-sm text-[#8E7E82]">
                        International Gemological Institute
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#75686A] leading-relaxed">
                    Comes with an international certificate ensuring authenticity, quality and peace of mind.
                  </p>

                  <div className="pt-1 flex justify-center sm:justify-start">
                    <button
                      onClick={() => window.open('https://www.igi.org', '_blank')}
                      className="inline-flex items-center justify-center px-7 py-3 border border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer text-center whitespace-nowrap shadow-xs hover:scale-[1.02] active:scale-98"
                    >
                      View Certificate
                    </button>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E7FFE6] text-sm text-[#55484A]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>100% Natural Diamonds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>BIS Hallmarked Gold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>Lifetime Exchange & Buyback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#214E34]" />
                      <span>Free & Insured Delivery Across India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER STORIES SECTION */}
        <section className="py-14 sm:py-18 bg-white border-b border-[#E7FFE6]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E7FFE6]">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#302326] font-normal tracking-wide">
                  Customer Stories
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-[#302326]">4.8 out of 5</span>
                <div className="flex items-center gap-0.5 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#8E7E82]">(148 Reviews)</span>
                <button className="text-[#214E34] font-semibold hover:underline ml-2">
                  View All →
                </button>
              </div>
            </div>

            {/* 3 Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-[#E7FFE6]/30 p-6 rounded-2xl border border-[#E7FFE6] space-y-3">
                <div className="flex items-center gap-1 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#55484A] leading-relaxed italic">
                  “The ring is even more beautiful in person. The craftsmanship is exceptional!”
                </p>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#E7FFE6]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#214E34] text-white flex items-center justify-center text-sm font-semibold">
                      A
                    </div>
                    <span className="font-medium text-[#302326]">Aditi S.</span>
                  </div>
                  <span className="text-sm text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
              </div>

              <div className="bg-[#E7FFE6]/30 p-6 rounded-2xl border border-[#E7FFE6] space-y-3">
                <div className="flex items-center gap-1 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#55484A] leading-relaxed italic">
                  “Absolutely loved it! Elegant, timeless and perfect for my engagement.”
                </p>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#E7FFE6]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#214E34] text-white flex items-center justify-center text-sm font-semibold">
                      R
                    </div>
                    <span className="font-medium text-[#302326]">Riya M.</span>
                  </div>
                  <span className="text-sm text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
              </div>

              <div className="bg-[#E7FFE6]/30 p-6 rounded-2xl border border-[#E7FFE6] space-y-3">
                <div className="flex items-center gap-1 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#55484A] leading-relaxed italic">
                  “Such fine detailing. The filigree work makes it truly special.”
                </p>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#E7FFE6]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#214E34] text-white flex items-center justify-center text-sm font-semibold">
                      S
                    </div>
                    <span className="font-medium text-[#302326]">Sneha K.</span>
                  </div>
                  <span className="text-sm text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. THE MIRAYA LEGACY SECTION (Matching Reference 2) */}
        <section className="py-16 sm:py-22 bg-[#E7FFE6]/40 relative overflow-hidden">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-sm sm:text-base font-semibold text-[#8E7E82] tracking-[0.2em] uppercase">
                  THE MIRAYA LEGACY
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#302326] leading-tight">
                  Crafted for{' '}
                  <span className="text-[#214E34]">Life's Brightest Moments</span>
                </h2>

                <p className="font-serif italic text-base sm:text-lg text-[#5D4E51]">
                  “A celebration of love, craftsmanship and timeless beauty.”
                </p>

                <p className="text-sm sm:text-sm text-[#75686A] leading-relaxed max-w-xl">
                  At Miraya Diamonds, every piece is a reflection of rare artistry and uncompromising quality. Handcrafted by skilled artisans, our jewellery brings together modern elegance and timeless craftsmanship — designed to be a part of your most precious moments.
                </p>

                {/* 3 Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EADCE0]">
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#214E34]">
                      34 Hours
                    </span>
                    <span className="block text-sm sm:text-sm text-[#8E7E82] uppercase tracking-wider mt-0.5">
                      HANDCRAFTED PRECISION
                    </span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#214E34]">
                      0.65 Ct
                    </span>
                    <span className="block text-sm sm:text-sm text-[#8E7E82] uppercase tracking-wider mt-0.5">
                      TIMELESS BRILLIANCE
                    </span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#214E34]">
                      18KT
                    </span>
                    <span className="block text-sm sm:text-sm text-[#8E7E82] uppercase tracking-wider mt-0.5">
                      PURE & AUTHENTIC
                    </span>
                  </div>
                </div>

                {/* Handwritten Accent */}
                <div className="pt-2 text-sm sm:text-base font-serif italic text-[#214E34]">
                  More than jewellery. A feeling.
                  <span className="block text-sm uppercase font-sans tracking-widest text-[#8E7E82] not-italic mt-0.5">
                    CRAFTED FOR A BRIGHTER TOMORROW
                  </span>
                </div>
              </div>

              {/* Right Image Composition in Arch Frame */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/src/assets/images/pdp_ring_on_hand_1790762989836.jpg"
                    alt="Miraya Diamonds Ring on Hand"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating Seal Badge */}
                <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-full p-4 border border-[#E7D3D7] shadow-xl text-center flex flex-col items-center justify-center w-28 h-28">
                  <Sparkles className="w-5 h-5 text-[#214E34] mb-1" />
                  <span className="text-sm font-semibold tracking-wider text-[#302326] uppercase">
                    FINE DIAMONDS
                  </span>
                  <span className="text-sm text-[#8E7E82] uppercase tracking-widest">
                    LASTING STORIES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. COMPLETE THE BHIVITA SUITE SECTION */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7FFE6]">
              <div>
                <span className="text-sm sm:text-base font-semibold text-[#214E34] tracking-[0.2em] uppercase block">
                  HARMONIOUS ENSEMBLES
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#302326] font-normal tracking-wide mt-1">
                  Complete the Bhivita Suite
                </h2>
              </div>
              <button
                onClick={onNavigateCollection}
                className="text-sm font-semibold text-[#214E34] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>EXPLORE ALL CURATED SETS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reusing CollectionProductCard with Smooth Hover Crossfade! */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {suiteRecommendations.map((item) => (
                <CollectionProductCard
                  key={item.id}
                  product={item}
                  isWishlisted={wishlistItems.includes(item.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onEnquire={(p) => setEnquiryModalProduct(p)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER (Exact existing Footer with Macro Ring visual) */}
      <Footer
        onSelectCategory={(cat) => {
          onNavigateCollection();
        }}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 9. PRODUCT ENQUIRY POPUP MODAL */}
      <ProductEnquiryModal
        isOpen={Boolean(enquiryModalProduct)}
        onClose={() => setEnquiryModalProduct(null)}
        product={enquiryModalProduct}
      />
    </div>
  );
};
