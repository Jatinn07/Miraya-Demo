import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slideTopImg from '../assets/images/most_loved/slide_top.png';
import slide2Img from '../assets/images/most_loved/slide_2.png';
import slide3Img from '../assets/images/most_loved/slide_3.png';

interface MostLovedSlide {
  id: string;
  category: string;
  title: string;
  image: string;
  fallbackUrl: string;
}

interface MostLovedProductsSectionProps {
  onSelectCategory?: (category: string) => void;
}

export const MostLovedProductsSection: React.FC<MostLovedProductsSectionProps> = ({
  onSelectCategory,
}) => {
  // 3 Provided Slides with exact 2:1 aspect ratio:
  // slide_top: https://ibb.co/yn2TwNNf -> Rings in green velvet box (Top / Center initial)
  // slide_3: https://ibb.co/5gmL3SvW -> Necklaces (Right initial)
  // slide_2: https://ibb.co/zhKYqvKX -> Bracelets (Left initial)
  const topSrc = (slideTopImg as any)?.src || slideTopImg;
  const slide2Src = (slide2Img as any)?.src || slide2Img;
  const slide3Src = (slide3Img as any)?.src || slide3Img;

  const slides: MostLovedSlide[] = [
    {
      id: 'slide-rings',
      category: 'rings',
      title: 'Rings · Timeless Beauty For Every You',
      image: topSrc,
      fallbackUrl: 'https://i.ibb.co/qM6GtDDy/img-5.png',
    },
    {
      id: 'slide-necklaces',
      category: 'necklaces',
      title: 'Necklaces · Certified 22KT Gold Atelier',
      image: slide3Src,
      fallbackUrl: 'https://i.ibb.co/ksjXTw0g/img-7.png',
    },
    {
      id: 'slide-bracelets',
      category: 'bracelets',
      title: 'Bracelets · Solitaire Brilliance',
      image: slide2Src,
      fallbackUrl: 'https://i.ibb.co/fYm5jwmk/img-6.png',
    },
  ];

  const totalSlides = slides.length;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, totalSlides]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, totalSlides]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 650);
  };

  // Autoplay every 5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isHovered, handleNext]);

  return (
    <section
      className="relative w-full bg-white py-12 sm:py-16 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* 1. SECTION HEADER (Centered Serif Title + Clean Subtitle) */}
        {/* ======================================================= */}
        <div className="text-center space-y-1.5 pb-6 sm:pb-9">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1D20] font-normal tracking-wide leading-tight">
            Our Most Loved Products
          </h2>
          <p className="text-sm sm:text-sm text-[#75686A] font-sans tracking-normal font-light max-w-lg mx-auto">
            Discover brilliance designed to become part of your story.
          </p>
        </div>

        {/* ======================================================= */}
        {/* 2. 3D STACKED CARDS STAGE */}
        {/* Perfectly tuned aspect ratio (2:1) so images NEVER get cut */}
        {/* Contained padding prevents horizontal boundary overflow */}
        {/* ======================================================= */}
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[330px] lg:h-[370px] flex items-center justify-center overflow-hidden">
          {slides.map((slide, idx) => {
            // Calculate relative position (-1: Left, 0: Center, 1: Right)
            let diff = (idx - activeIndex + totalSlides) % totalSlides;
            if (diff === 2) diff = -1; // wrap around for 3 items: 2 is -1 (left)

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            let translateX = '0%';
            let scale = 1;
            let zIndex = 20;
            let opacity = 1;

            if (isCenter) {
              translateX = '0%';
              scale = 1;
              zIndex = 25;
              opacity = 1;
            } else if (isLeft) {
              translateX = '-48%';
              scale = 0.85;
              zIndex = 10;
              opacity = 0.92;
            } else if (isRight) {
              translateX = '48%';
              scale = 0.85;
              zIndex = 10;
              opacity = 0.92;
            }

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (isCenter) {
                    if (onSelectCategory) onSelectCategory(slide.category);
                  } else if (isLeft) {
                    handlePrev();
                  } else if (isRight) {
                    handleNext();
                  }
                }}
                style={{
                  transform: `translate3d(${translateX}, 0, 0) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition:
                    'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease',
                }}
                className={`absolute w-[90vw] sm:w-[72vw] md:w-[62vw] lg:w-[54vw] max-w-[680px] aspect-[2/1] flex items-center justify-center will-change-transform cursor-pointer ${
                  !isCenter ? 'hidden sm:flex' : 'flex'
                }`}
              >
                {/* CARD CONTAINER WITH MATCHING 2:1 PROPORTIONS */}
                <div
                  className={`w-full h-full rounded-[18px] sm:rounded-[24px] overflow-hidden bg-white shadow-[0_10px_28px_rgba(0,0,0,0.10)] relative transition-all duration-300 ${
                    isCenter ? 'hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]' : 'hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = slide.fallbackUrl;
                    }}
                    className="w-full h-full object-cover object-center block pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* 3. CONTROLS (Chevrons + Forest Green Indicators) */}
        {/* Matches exact layout: < [Active Pill] [Dot] [Dot] > */}
        {/* ======================================================= */}
        <div className="flex items-center justify-center gap-3 pt-5 sm:pt-7">
          {/* Previous Button (<) */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="p-1 text-[#214E34] hover:scale-115 active:scale-90 transition-transform cursor-pointer disabled:opacity-40"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleDotClick(idx)}
                  className={`transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-8 h-1.5 bg-[#214E34]'
                      : 'w-1.5 h-1.5 bg-[#214E34]/70 hover:bg-[#214E34]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Next Button (>) */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="p-1 text-[#214E34] hover:scale-115 active:scale-90 transition-transform cursor-pointer disabled:opacity-40"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </section>
  );
};
