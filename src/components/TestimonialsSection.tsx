import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

interface CircularAsset {
  id: string;
  image: string;
  left: string; // percentage
  top: string;  // percentage
  sizeClass: string;
  initialRotate: number; // clockwise (+) or anti-clockwise (-)
  initialY: number;      // distance from below
  delayMs: number;
  zIndex: number;
}

interface TestimonialCardData {
  id: string;
  name: string;
  location: string;
  initial: string;
  rating: number;
  date: string;
  review: string;
}

export const TestimonialsSection: React.FC = () => {
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 11 User-Provided Circular Image Assets arranged in the EXACT collage from the screenshot
  const circularAssets: CircularAsset[] = [
    // 1. TOP-CENTER: Large Primary Focal Bride Circle
    {
      id: 'c-3',
      image: '/src/assets/images/testimonials/circle_3.png',
      left: '50%',
      top: '0%',
      sizeClass: 'w-44 h-44 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-76 lg:h-76 -translate-x-1/2',
      initialRotate: -110, // Anti-clockwise
      initialY: 340,
      delayMs: 60,
      zIndex: 18,
    },
    // 2. INNER LEFT: Woman's neck with solitaire pendant
    {
      id: 'c-1',
      image: '/src/assets/images/testimonials/circle_1.png',
      left: '35%',
      top: '5%',
      sizeClass: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-54 lg:h-54 -translate-x-1/2',
      initialRotate: 120, // Clockwise
      initialY: 360,
      delayMs: 120,
      zIndex: 14,
    },
    // 3. MID LEFT HIGH: Woman holding hand with flower ring to forehead
    {
      id: 'c-2',
      image: '/src/assets/images/testimonials/circle_2.png',
      left: '20%',
      top: '7%',
      sizeClass: 'w-34 h-34 sm:w-42 sm:h-42 md:w-50 md:h-50 lg:w-56 lg:h-56 -translate-x-1/2',
      initialRotate: -95, // Anti-clockwise
      initialY: 330,
      delayMs: 180,
      zIndex: 15,
    },
    // 4. FAR LEFT LOWER: Ear wearing chandelier drop earring
    {
      id: 'c-4',
      image: '/src/assets/images/testimonials/circle_4.png',
      left: '13%',
      top: '25%',
      sizeClass: 'w-30 h-30 sm:w-38 sm:h-38 md:w-44 md:h-44 lg:w-50 lg:h-50 -translate-x-1/2',
      initialRotate: 135, // Clockwise
      initialY: 380,
      delayMs: 240,
      zIndex: 13,
    },
    // 5. INNER LEFT LOWER: Neck with flower pendant
    {
      id: 'c-5',
      image: '/src/assets/images/testimonials/circle_5.png',
      left: '28%',
      top: '20%',
      sizeClass: 'w-28 h-28 sm:w-34 sm:h-34 md:w-42 md:h-42 lg:w-46 lg:h-46 -translate-x-1/2',
      initialRotate: -115, // Anti-clockwise
      initialY: 370,
      delayMs: 300,
      zIndex: 14,
    },
    // 6. BOTTOM LEFT: Woman looking down (DIRECTLY OVERLAPPED BY CARDS 1 & 2)
    {
      id: 'c-6',
      image: '/src/assets/images/testimonials/circle_6.png',
      left: '22%',
      top: '38%',
      sizeClass: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-54 lg:h-54 -translate-x-1/2',
      initialRotate: 90, // Clockwise
      initialY: 420,
      delayMs: 360,
      zIndex: 12,
    },
    // 7. INNER RIGHT HIGH: Smiling woman showing green emerald ring
    {
      id: 'c-7',
      image: '/src/assets/images/testimonials/circle_7.png',
      left: '65%',
      top: '3%',
      sizeClass: 'w-34 h-34 sm:w-42 sm:h-42 md:w-50 md:h-50 lg:w-56 lg:h-56 -translate-x-1/2',
      initialRotate: -125, // Anti-clockwise
      initialY: 350,
      delayMs: 420,
      zIndex: 15,
    },
    // 8. FAR RIGHT HIGH: Wrist with diamond leaf bracelet
    {
      id: 'c-8',
      image: '/src/assets/images/testimonials/circle_8.png',
      left: '80%',
      top: '7%',
      sizeClass: 'w-32 h-32 sm:w-40 sm:h-40 md:w-46 md:h-46 lg:w-52 lg:h-52 -translate-x-1/2',
      initialRotate: 110, // Clockwise
      initialY: 370,
      delayMs: 480,
      zIndex: 14,
    },
    // 9. MID RIGHT LOWER: Ear with green emerald drop earring
    {
      id: 'c-9',
      image: '/src/assets/images/testimonials/circle_9.png',
      left: '71%',
      top: '22%',
      sizeClass: 'w-28 h-28 sm:w-34 sm:h-34 md:w-40 md:h-40 lg:w-46 lg:h-46 -translate-x-1/2',
      initialRotate: -85, // Anti-clockwise
      initialY: 390,
      delayMs: 540,
      zIndex: 13,
    },
    // 10. BOTTOM RIGHT: Neck with diamond necklace (DIRECTLY OVERLAPPED BY CARDS 3 & 4)
    {
      id: 'c-10',
      image: '/src/assets/images/testimonials/circle_10.png',
      left: '76%',
      top: '40%',
      sizeClass: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-54 lg:h-54 -translate-x-1/2',
      initialRotate: 105, // Clockwise
      initialY: 430,
      delayMs: 600,
      zIndex: 12,
    },
    // 11. FAR RIGHT LOWER: Woman smiling touching brow with diamond rings
    {
      id: 'c-11',
      image: '/src/assets/images/testimonials/circle_11.png',
      left: '87%',
      top: '26%',
      sizeClass: 'w-30 h-30 sm:w-36 sm:h-36 md:w-42 md:h-42 lg:w-48 lg:h-48 -translate-x-1/2',
      initialRotate: -130, // Anti-clockwise
      initialY: 410,
      delayMs: 660,
      zIndex: 13,
    },
  ];

  // Testimonials Cards Data (matching the user's reference screenshot layout)
  const testimonials: TestimonialCardData[] = [
    {
      id: 't-1',
      name: 'Babita Iyer',
      location: 'Lotus Paradise Elite, Banglore',
      initial: 'B',
      rating: 5,
      date: 'June 28, 2026',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 't-2',
      name: 'Babita Iyer',
      location: 'Lotus Paradise Elite, Banglore',
      initial: 'B',
      rating: 5,
      date: 'June 28, 2026',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 't-3',
      name: 'Babita Iyer',
      location: 'Lotus Paradise Elite, Banglore',
      initial: 'B',
      rating: 5,
      date: 'June 28, 2026',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 't-4',
      name: 'Babita Iyer',
      location: 'Lotus Paradise Elite, Banglore',
      initial: 'B',
      rating: 5,
      date: 'June 28, 2026',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 't-5',
      name: 'Aarohi Singhania',
      location: 'Malabar Hill, Mumbai',
      initial: 'A',
      rating: 5,
      date: 'July 04, 2026',
      review:
        'The Bhivita 22KT diamond necklace exceeded all my expectations. The diamond fire and hallmark authentication are peerless.',
    },
    {
      id: 't-6',
      name: 'Dr. Shalini Kapoor',
      location: 'Golf Links, New Delhi',
      initial: 'S',
      rating: 5,
      date: 'July 11, 2026',
      review:
        'The emerald sunflower cocktail ring has a glowing depth that pictures cannot do justice to. Pure royal perfection.',
    },
  ];

  // Carousel State
  const [items, setItems] = useState<TestimonialCardData[]>(testimonials);
  const [translateX, setTranslateX] = useState<number>(0);
  const [useTransition, setUseTransition] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger rising animation once when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Step calculation (1 card on mobile, 2 on tablet, 4 on desktop)
  const getStep = () => {
    if (!carouselContainerRef.current) return 300;
    const width = carouselContainerRef.current.clientWidth;
    if (window.innerWidth >= 1024) {
      return (width - 48) / 4 + 16;
    }
    if (window.innerWidth >= 640) {
      return (width - 24) / 2 + 16;
    }
    return width - 16;
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = getStep();

    setUseTransition(true);
    setTranslateX(-step);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setItems((prev) => [...prev.slice(1), prev[0]]);
      setUseTransition(false);
      setTranslateX(0);

      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, 750);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = getStep();

    setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    setUseTransition(false);
    setTranslateX(-step);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setUseTransition(true);
        setTranslateX(0);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 750);
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 select-none overflow-hidden bg-gradient-to-b from-[#FFFDFC] via-[#FDF3F5] to-[#FAF0F2] border-t border-[#F5E6E9]"
    >
      {/* Soft Background Warmth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#FDE6EB]/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* 1. CIRCULAR IMAGE COLLAGE WITH RISING ENTRANCE PHYSICS */}
        {/* Lower circles extend down to be physically overlapped by the cards below */}
        {/* ======================================================= */}
        <div className="relative w-full h-[440px] sm:h-[520px] md:h-[600px] lg:h-[660px] mx-auto overflow-visible pointer-events-auto">
          {circularAssets.map((asset) => {
            const transformStyle = hasEnteredView
              ? 'translate3d(0, 0, 0) rotate(0deg) scale(1)'
              : `translate3d(0, ${asset.initialY}px, 0) rotate(${asset.initialRotate}deg) scale(0.65)`;

            return (
              <div
                key={asset.id}
                style={{
                  left: asset.left,
                  top: asset.top,
                  zIndex: asset.zIndex,
                  transform: transformStyle,
                  opacity: hasEnteredView ? 1 : 0,
                  transition: `transform 1600ms cubic-bezier(0.16, 1, 0.3, 1) ${asset.delayMs}ms, opacity 1000ms ease ${asset.delayMs}ms`,
                }}
                className={`absolute rounded-full border-3 sm:border-4 border-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden cursor-pointer select-none group will-change-transform ${asset.sizeClass}`}
              >
                <img
                  src={asset.image}
                  alt="Miraya Diamonds"
                  className="w-full h-full object-cover object-center transform transition-transform duration-300 ease-out group-hover:scale-105 pointer-events-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            );
          })}

          {/* ======================================================= */}
          {/* 2. SECTION HEADING (Strictly 36px/14px) */}
          {/* ======================================================= */}
          <div className="absolute inset-x-0 bottom-44 sm:bottom-52 md:bottom-60 lg:bottom-68 text-center space-y-1.5 z-20 pointer-events-none">
            <h2 className="font-serif font-bold text-[36px] text-[#302326] tracking-wide">
              Testimonials
            </h2>
            <p className="font-sans font-normal text-[14px] text-[#75686A]">
              Explore the latest range of products
            </p>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 3. TESTIMONIAL CARDS CAROUSEL (PHYSICALLY OVERLAPPING CIRCLES) */}
        {/* Negative top margin pulls cards upward to overlap lower circles! */}
        {/* ======================================================= */}
        <div className="relative -mt-28 sm:-mt-36 md:-mt-44 lg:-mt-52 z-30 flex items-center justify-between gap-[20px]">
          {/* Previous Arrow Button (52px Circular White, Pill Styled) */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#214E34] shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-[1.04] active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Previous testimonials"
          >
            <ArrowLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>

          {/* Carousel Viewport Container */}
          <div
            ref={carouselContainerRef}
            className="flex-1 overflow-hidden py-4"
          >
            {/* Horizontal Track (Gap strictly 20px) */}
            <div
              className="flex items-stretch gap-[20px] will-change-transform"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                transition: useTransition
                  ? 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
            >
              {items.map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)] shrink-0 flex flex-col justify-between bg-white rounded-[14px] border border-[#E7FFE6] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(33,78,52,0.14)] transition-all duration-300 overflow-hidden group select-none"
                >
                  {/* Top White Card Area: Stars, Date, Review Text */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      {/* 5 Solid Gold Stars */}
                      <div className="flex items-center gap-1 text-[#F5A623]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#F5A623] text-[#F5A623]"
                          />
                        ))}
                      </div>

                      {/* Date */}
                      {t.date && (
                        <span className="text-sm text-[#8A7C80] font-normal">
                          {t.date}
                        </span>
                      )}
                    </div>

                    {/* Review Body Text */}
                    <p className="text-sm sm:text-sm text-[#423538] leading-relaxed font-normal pt-1">
                      {t.review}
                    </p>
                  </div>

                  {/* Solid Miraya Pink Bottom Accent Bar (Exact from Screenshot) */}
                  <div className="bg-[#214E34] px-5 py-4 flex items-center gap-3.5">
                    {/* Pink Avatar Initial Circle */}
                    <div className="w-11 h-11 rounded-full bg-[#E7FFE6] text-[#214E34] font-serif font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                      {t.initial}
                    </div>

                    {/* Customer Details */}
                    <div className="text-left space-y-0.5 min-w-0">
                      <h5 className="text-white text-sm sm:text-sm font-medium truncate">
                        {t.name}
                      </h5>
                      <p className="text-white/80 text-sm sm:text-sm truncate">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow Button (52px Circular White, Pill Styled) */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#214E34] shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-[1.04] active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Next testimonials"
          >
            <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>
        </div>
      </div>
    </section>
  );
};
