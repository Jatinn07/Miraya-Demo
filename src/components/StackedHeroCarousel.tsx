import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HeroCard {
  id: string;
  title: string;
  image: string;
  fallbackUrl: string;
}

interface StackedHeroCarouselProps {
  onExploreCollection: () => void;
}

export const StackedHeroCarousel: React.FC<StackedHeroCarouselProps> = ({
  onExploreCollection,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive offset to ensure cards are prominently exposed on all screen sizes
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine horizontal exposure distance based on viewport width
  // Desktop: 90px exposure (generously visible on both sides)
  // Tablet: 60px exposure
  // Mobile: 28px exposure
  const xOffset =
    windowWidth >= 1100
      ? 92
      : windowWidth >= 768
      ? 64
      : windowWidth >= 640
      ? 46
      : 26;

  // The 3 cards utilizing the exact provided images from the user
  const cards: HeroCard[] = [
    {
      id: 'card-1-special-occasions',
      title: 'Special Occasions',
      image: '/src/assets/images/hero_carousel_1.png',
      fallbackUrl: 'https://i.ibb.co/4RBk8r8S/image-153.png',
    },
    {
      id: 'card-2-discover-zen',
      title: 'Discover Zen',
      image: '/src/assets/images/hero_carousel_2.png',
      fallbackUrl: 'https://i.ibb.co/wGFQyRq/2.png',
    },
    {
      id: 'card-3-special-occasions-repeat',
      title: 'A Season of Sparkle',
      image: '/src/assets/images/hero_carousel_1.png',
      fallbackUrl: 'https://i.ibb.co/4RBk8r8S/image-153.png',
    },
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % cards.length);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 850);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 850);
  };

  // Physical 3D transforms - both left and right cards generously exposed
  const getCardStyle = (index: number) => {
    const slot = (index - activeIndex + cards.length) % cards.length;

    // Slot 0: Active / Front / Center / Straight
    if (slot === 0) {
      return {
        zIndex: 30,
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
        boxShadow:
          '0 28px 65px -15px rgba(48, 14, 22, 0.4), 0 12px 28px -6px rgba(0, 0, 0, 0.22)',
        pointerEvents: 'auto' as const,
        cursor: 'pointer',
      };
    }

    // Slot 1: Behind Right (Angled Clockwise & generously exposed)
    if (slot === 1) {
      return {
        zIndex: 20,
        transform: `translate3d(${xOffset}px, 12px, -25px) scale(0.93) rotate(5.4deg)`,
        boxShadow:
          '0 20px 48px -10px rgba(48, 14, 22, 0.28), 0 8px 20px -5px rgba(0, 0, 0, 0.16)',
        pointerEvents: 'none' as const,
        cursor: 'pointer',
      };
    }

    // Slot 2: Behind Left (Angled Counter-Clockwise & generously exposed)
    return {
      zIndex: 10,
      transform: `translate3d(-${xOffset}px, 15px, -50px) scale(0.87) rotate(-5.8deg)`,
      boxShadow:
        '0 18px 42px -10px rgba(48, 14, 22, 0.24), 0 6px 16px -4px rgba(0, 0, 0, 0.14)',
      pointerEvents: 'none' as const,
      cursor: 'pointer',
    };
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#E7FFE6]/30 py-6 sm:py-8 lg:py-10 select-none">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* CAROUSEL STAGE CONTAINER (Compact 90% size, with generous side margin for exposed cards) */}
        <div className="relative w-full max-w-[960px] mx-auto h-[260px] sm:h-[340px] md:h-[400px] lg:h-[455px] flex items-center justify-center">
          {/* THE 3 PHYSICAL EDITORIAL CARDS */}
          {cards.map((card, idx) => {
            const slot = (idx - activeIndex + cards.length) % cards.length;
            const isCenter = slot === 0;

            return (
              <div
                key={card.id}
                onClick={
                  isCenter
                    ? onExploreCollection
                    : slot === 1
                    ? handleNext
                    : handlePrev
                }
                className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-[850ms] will-change-transform border border-black/5"
                style={{
                  ...getCardStyle(idx),
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: 1, // STRICT REQUIREMENT: NO OPACITY FADE OR BLENDING
                }}
                title={isCenter ? 'Click to explore collection' : 'Click to bring forward'}
              >
                {/* Full-Bleed Artwork Image from user links */}
                <img
                  src={card.image}
                  alt={card.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = card.fallbackUrl;
                  }}
                  className="w-full h-full object-cover object-center select-none pointer-events-none drop-shadow-xs"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle border shine on center card */}
                {isCenter && (
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-white/30 rounded-2xl sm:rounded-3xl" />
                )}
              </div>
            );
          })}

          {/* LEFT ARROW BUTTON (Positioned over the left exposed card overlap) */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute left-2 sm:-left-5 md:-left-7 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#214E34] shadow-[0_8px_25px_rgba(0,0,0,0.22)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60"
            aria-label="Previous card"
          >
            <ArrowLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>

          {/* RIGHT ARROW BUTTON (Positioned over the right exposed card overlap) */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-2 sm:-right-5 md:-right-7 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#214E34] shadow-[0_8px_25px_rgba(0,0,0,0.22)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60"
            aria-label="Next card"
          >
            <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>
        </div>

        {/* Carousel indicators dots */}
        <div className="flex items-center justify-center gap-2 pt-5 sm:pt-7">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isAnimating && idx !== activeIndex) {
                  setIsAnimating(true);
                  setActiveIndex(idx);
                  setTimeout(() => setIsAnimating(false), 850);
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeIndex
                  ? 'w-7 bg-[#214E34]'
                  : 'w-2 bg-[#D8C7CA] hover:bg-[#214E34]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
