import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface NewArrivalProduct {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
}

interface NewArrivalsSectionProps {
  onShopNow?: () => void;
  onSelectProduct?: (product: NewArrivalProduct) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  onShopNow,
  onSelectProduct,
}) => {
  // Initial products matching the screenshot
  const initialProducts: NewArrivalProduct[] = [
    {
      id: 'na-1',
      name: 'Bhivita 22KT Earring',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/bhivita_earrings_1790761788020.jpg',
    },
    {
      id: 'na-2',
      name: '22KT Gold Ring',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/gold_ring_1790761801673.jpg',
    },
    {
      id: 'na-3',
      name: 'Bhivita 22KT Bracelet',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/bhivita_bracelet_1790761828857.jpg',
    },
    {
      id: 'na-4',
      name: 'Bhivita 22KT Necklace',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/bhivita_necklace_1790761816007.jpg',
    },
    {
      id: 'na-5',
      name: 'Solitaire Pendant 22KT',
      price: '₹34,800',
      originalPrice: '₹37,500',
      image: '/src/assets/images/circle_pendant_thumb_1790764103077.jpg',
    },
    {
      id: 'na-6',
      name: 'Bhivita Floral Studs',
      price: '₹31,500',
      originalPrice: '₹33,200',
      image: '/src/assets/images/earrings_1790764132223.jpg',
    },
  ];

  const [products, setProducts] = useState<NewArrivalProduct[]>(initialProducts);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [useTransition, setUseTransition] = useState<boolean>(true);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setUseTransition(true);

    // Dynamic shift calculation: cards are 205px wide, gaps are 16px (gap-4)
    // 1 card width + gap is approx 221px
    const cardShift = 221;
    setTranslateX(-cardShift);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      // Rotate products array to the left
      setProducts((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
      // Snap track back instantly without user knowing
      setUseTransition(false);
      setTranslateX(0);

      // Brief frame delay to allow state flush, then enable interactions
      requestAnimationFrame(() => {
        setUseTransition(true);
        setTranslateX(0);

        if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
        animationTimerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 750);
      });
    }, 750);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Rotate products to the right instantly behind a zero-transition mask
    setUseTransition(false);
    const cardShift = 221;
    setTranslateX(-cardShift);

    setProducts((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });

    // Animate track sliding right back to 0
    requestAnimationFrame(() => {
      setTimeout(() => {
        setUseTransition(true);
        setTranslateX(0);

        if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
        animationTimerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 750);
      });
    });
  };

  return (
    <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-[50px] bg-white select-none">
      {/* SECTION HEADER (Strictly 36px and 14px secondary) */}
      <div className="text-center space-y-1.5 pb-[20px]">
        <h2 className="font-serif font-bold text-[36px] text-[#2C1D20] tracking-wide">
          New Arrivals
        </h2>
        <p className="font-sans font-normal text-[14px] text-[#75686A]">
          Explore the latest range of products
        </p>
      </div>

      {/* MAIN SECTION BANNER & CAROUSEL CONTAINER (rounded-[14px]) */}
      <div className="relative w-full rounded-[14px] overflow-hidden bg-gradient-to-r from-[#143020] via-[#E7FFE6] to-[#E7FFE6] shadow-xs border border-[#E7FFE6]">
        <div className="relative flex flex-col lg:flex-row min-h-[350px] sm:min-h-[375px] lg:min-h-[385px] lg:h-[400px]">
          {/* ======================================================= */}
          {/* LEFT: HERO PROMOTIONAL IMAGE (No cropping) */}
          {/* ======================================================= */}
          <div className="relative z-20 w-full lg:w-[530px] xl:w-[570px] 2xl:w-[600px] shrink-0 bg-[#143020] overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-full shadow-[6px_0_20px_-3px_rgba(0,0,0,0.18)]">
            <img
              src="/src/assets/images/new_arrivals_promo_banner_user.png"
              alt="New Arrivals"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://i.ibb.co/4Rwds5mw/img-4.png';
              }}
              className="w-full h-full object-cover object-left sm:object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* ======================================================= */}
          {/* RIGHT: SOFT MINT AREA (Decreased width, perfectly fits 3 cards + controls) */}
          {/* ======================================================= */}
          <div className="relative z-10 flex-1 flex flex-col justify-between bg-[#E7FFE6] py-5 sm:py-6 pl-4 lg:pl-6 pr-4 sm:pr-6 overflow-hidden">
            {/* CAROUSEL TRACK VIEWPORT */}
            <div className="overflow-hidden w-full py-1">
              <div
                className="flex items-center gap-[20px] will-change-transform"
                style={{
                  transform: `translate3d(${translateX}px, 0, 0)`,
                  transition: useTransition
                    ? 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'none',
                }}
              >
                {products.map((product, idx) => (
                  <div
                    key={`${product.id}-${idx}`}
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="group w-[165px] sm:w-[185px] md:w-[195px] lg:w-[205px] shrink-0 bg-white rounded-xl border border-[#E7FFE6] p-1 flex flex-col justify-between hover:shadow-xs transition-all duration-300 cursor-pointer select-none"
                  >
                    <div className="relative w-full aspect-square bg-[#E7FFE6]/30 rounded-lg p-0 flex items-center justify-center border border-transparent transition-colors duration-300 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transform scale-[1.12] group-hover:scale-[1.18] transition-transform duration-500 rounded-md"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Product Details (Price & Title) */}
                    <div className="pt-2 pb-1.5 px-1.5 space-y-1 text-left">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-base text-[#214E34]">
                          {product.price}
                        </span>
                        <span className="text-sm text-[#9E8E92] line-through font-normal">
                          {product.originalPrice}
                        </span>
                      </div>
                      <h4 className="text-sm text-[#302326] font-medium truncate">
                        {product.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTROLS INSIDE PINK AREA DIRECTLY BENEATH CARDS: */}
            <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-[#E7FFE6]/60 mt-2">
              {/* Corner 1: Circular White Arrow Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#214E34] border border-[#E7FFE6] shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-95 cursor-pointer disabled:opacity-50"
                  aria-label="Previous products"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#214E34] border border-[#E7FFE6] shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-95 cursor-pointer disabled:opacity-50"
                  aria-label="Next products"
                >
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </div>

              {/* Corner 2: View All Button (rounded-full = Pill Shaped) */}
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#214E34] hover:bg-[#1C3E2A] text-white text-sm font-semibold tracking-wider uppercase shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer whitespace-nowrap"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
