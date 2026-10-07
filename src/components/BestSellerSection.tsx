import React, { useState, useEffect, useRef } from 'react';

interface BestSellerCardData {
  id: string;
  label: string;
  image: string;
}

interface BestSellerSectionProps {
  onSelectCategory?: (category: string) => void;
}

export const BestSellerSection: React.FC<BestSellerSectionProps> = ({
  onSelectCategory,
}) => {
  const [isInView, setIsInView] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Unique 5 editorial cards matching user reference
  const baseCards: BestSellerCardData[] = [
    {
      id: 'bs-1',
      label: 'Necklace & Pendants',
      image: '/src/assets/images/bestseller_necklace_1790768906394.jpg',
    },
    {
      id: 'bs-2',
      label: 'Designer Rings',
      image: '/src/assets/images/bestseller_emerald_ring_1790768872820.jpg',
    },
    {
      id: 'bs-3',
      label: 'Necklace & Pendants',
      image: '/src/assets/images/bestseller_necklace_1790768906394.jpg',
    },
    {
      id: 'bs-4',
      label: 'Bangles & Bracelets',
      image: '/src/assets/images/bestseller_bangles_1790768927064.jpg',
    },
    {
      id: 'bs-5',
      label: 'Earrings',
      image: '/src/assets/images/bestseller_earrings_1790768947180.jpg',
    },
  ];

  // Quadruple cards (20 cards) for seamless continuous stream
  const allCards = [
    ...baseCards,
    ...baseCards,
    ...baseCards,
    ...baseCards,
  ];

  // Animation physics state (controlled via refs for silky smooth 60fps without React re-render lags)
  const offsetRef = useRef<number>(0);
  const targetSpeedRef = useRef<number>(54); // +25% speed (54 px/sec)
  const currentSpeedRef = useRef<number>(54);
  const hoveredIndexRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Responsive card dimension calculations
  const getCardMetrics = () => {
    if (typeof window === 'undefined') return { cardWidth: 280, gap: 24 };
    if (window.innerWidth < 640) return { cardWidth: 220, gap: 16 };
    if (window.innerWidth < 1024) return { cardWidth: 260, gap: 20 };
    return { cardWidth: 290, gap: 24 };
  };

  // IntersectionObserver to pause loop when scrolled off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Continuous animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isInView) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    const cycleCount = baseCards.length;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1); // in seconds
      lastTimeRef.current = timestamp;

      // Smooth deceleration / acceleration toward target speed
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * Math.min(dt * 8, 1);

      const { cardWidth, gap } = getCardMetrics();
      const singleCycleWidth = cycleCount * (cardWidth + gap);

      // Advance track offset (RIGHT to LEFT)
      offsetRef.current = (offsetRef.current + currentSpeedRef.current * dt) % singleCycleWidth;

      // Apply horizontal translation to track
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      // Dynamically calculate dynamic rotation & vertical curvature for every card based on its viewport position
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const centerX = containerRect.width / 2;

        cardElementsRef.current.forEach((el, i) => {
          if (!el) return;
          // Card's physical X position relative to the container
          const cardLeft = i * (cardWidth + gap) - offsetRef.current;
          const cardCenter = cardLeft + cardWidth / 2;

          // Normalized distance from viewport center: -1 (left) to 0 (center) to +1 (right)
          const normalized = (cardCenter - centerX) / (containerRect.width * 0.45);
          const clamped = Math.max(-1.4, Math.min(1.4, normalized));

          // Real-time organic flow:
          // Left side tilts counter-clockwise (-deg), right side tilts clockwise (+deg)
          // Center is straight (0deg) and elevated higher in a natural arch
          const isHovered = hoveredIndexRef.current === i;
          const rot = clamped * 4.8; // increased dynamic tilt
          const archY = Math.pow(clamped, 2) * 32; // stronger parabolic curve (32px arch)
          const scale = isHovered ? 1.04 : 1;

          el.style.transform = `translate3d(0, ${archY}px, 0) rotate(${rot}deg) scale(${scale})`;
          el.style.zIndex = isHovered ? '30' : '10';
        });
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      lastTimeRef.current = null;
    };
  }, [isInView, baseCards.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-[50px] select-none overflow-hidden"
    >
      {/* ======================================================= */}
      {/* 1. SECTION HEADING (Strictly 36px/14px) */}
      {/* ======================================================= */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-1.5 pb-[20px]">
        <h2 className="font-serif font-bold text-[36px] text-[#2C1D20] tracking-wide">
          Best Seller
        </h2>
        <p className="font-sans font-normal text-[14px] text-[#75686A]">
          Explore timeless pieces chosen by our jewellery lovers.
        </p>
      </div>

      {/* ======================================================= */}
      {/* 2. DYNAMIC REAL-TIME FLOWING CAROUSEL */}
      {/* Each card smoothly updates rotation & height relative to its predecessor */}
      {/* ======================================================= */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-10"
        onMouseEnter={() => {
          targetSpeedRef.current = 18; // smooth slowdown on hover
        }}
        onMouseLeave={() => {
          targetSpeedRef.current = 54; // resume +25% speed
          hoveredIndexRef.current = null;
        }}
      >
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-5 md:gap-6 will-change-transform"
        >
          {allCards.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              ref={(el) => {
                cardElementsRef.current[idx] = el;
              }}
              onMouseEnter={() => {
                hoveredIndexRef.current = idx;
              }}
              onMouseLeave={() => {
                if (hoveredIndexRef.current === idx) {
                  hoveredIndexRef.current = null;
                }
              }}
              onClick={() => onSelectCategory && onSelectCategory(card.label)}
              className="relative shrink-0 w-[220px] sm:w-[260px] md:w-[290px] aspect-[3/4] rounded-[14px] overflow-hidden cursor-pointer select-none shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.24)] will-change-transform transition-shadow duration-300 group"
            >
              {/* Full-bleed Luxury Photography */}
              <img
                src={card.image}
                alt={card.label}
                className="w-full h-full object-cover object-center pointer-events-none transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Bottom Vignette for Crisp Label Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Category Label with Thin White Line Above AND Below */}
              <div className="absolute inset-x-5 sm:inset-x-6 bottom-5 sm:bottom-7 z-10 text-center pointer-events-none">
                {/* Thin white line above */}
                <div className="w-full h-[1px] bg-white/70 mb-2.5 transition-colors duration-300 group-hover:bg-white" />

                {/* White Category Typography */}
                <span className="text-white text-sm sm:text-sm font-sans font-normal tracking-wide drop-shadow-md whitespace-nowrap block">
                  {card.label}
                </span>

                {/* Thin white line below */}
                <div className="w-full h-[1px] bg-white/70 mt-2.5 transition-colors duration-300 group-hover:bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
