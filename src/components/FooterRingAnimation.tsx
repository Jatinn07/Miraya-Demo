import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface FooterRingAnimationProps {
  onOpenConsultation?: () => void;
}

export const FooterRingAnimation: React.FC<FooterRingAnimationProps> = ({
  onOpenConsultation,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [ringVisible, setRingVisible] = useState<boolean>(false);
  const [replayCount, setReplayCount] = useState<number>(0);

  // Trigger animation when the footer enters the viewport for the first time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Start background zoom-out settling
          setHasStarted(true);

          // After a short cinematic pause (300ms), ring pops up from bottom center
          const ringTimer = setTimeout(() => {
            setRingVisible(true);
          }, 350);

          return () => clearTimeout(ringTimer);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    return () => observer.disconnect();
  }, [replayCount]);

  // Replay animation function
  const handleReplay = () => {
    setHasStarted(false);
    setRingVisible(false);
    setTimeout(() => {
      setReplayCount((prev) => prev + 1);
      setHasStarted(true);
      setTimeout(() => {
        setRingVisible(true);
      }, 350);
    }, 150);
  };

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] lg:h-[620px] overflow-hidden select-none bg-[#0D1C13]"
    >
      {/* ======================================================= */}
      {/* 1. BACKGROUND IMAGE (Starts Zoomed In -> Settles to Scale 100) */}
      {/* ======================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/src/assets/images/footer_new/ring_bg.png"
          alt="Miraya Diamonds Solitaire Studio Background"
          className={`w-full h-full object-cover object-center transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
            hasStarted ? 'scale-100 opacity-100' : 'scale-[1.20] opacity-85'
          }`}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Soft Vignette Overlay to blend seamlessly with dark footer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2317] via-transparent to-[#11261B]/80 pointer-events-none" />
      </div>

      {/* ======================================================= */}
      {/* 2. RING IMAGE (Pops up from bottom center, half visible) */}
      {/* ======================================================= */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[86vw] sm:w-[68vw] md:w-[54vw] lg:w-[44vw] max-w-[640px] flex items-end justify-center pointer-events-none z-10 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          ringVisible
            ? 'translate-y-0 opacity-100 scale-100 drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]'
            : 'translate-y-36 opacity-0 scale-95'
        }`}
      >
        <img
          src="/src/assets/images/footer_new/ring.png"
          alt="Miraya Diamonds Master Solitaire Ring"
          className="w-full h-auto object-contain object-bottom block"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* ======================================================= */}
      {/* 3. EDITORIAL LUXURY OVERLAY TEXT */}
      {/* ======================================================= */}
      <div className="absolute top-8 sm:top-12 inset-x-0 mx-auto max-w-xl text-center px-4 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7FFE6]/10 border border-[#E7FFE6]/20 text-[#E7FFE6] text-sm sm:text-sm tracking-[0.25em] uppercase font-sans mb-3 backdrop-blur-xs">
          <Sparkles className="w-3 h-3 text-[#E7FFE6]" />
          Eternal Masterpiece
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FFFAFA] font-light tracking-wide leading-tight drop-shadow-sm">
          Elevating Love with Diamonds
        </h3>
        <p className="text-sm sm:text-sm text-[#E7FFE6]/80 font-sans tracking-normal mt-2 max-w-md mx-auto drop-shadow-xs font-light">
          Precision-cut solitaires and certified heirlooms, crafted to illuminate every lifetime milestone.
        </p>
      </div>

      {/* ======================================================= */}
      {/* 4. INTERACTIVE REPLAY BUTTON (Top Right) */}
      {/* ======================================================= */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F2317]/70 hover:bg-[#0F2317] border border-[#E7FFE6]/20 hover:border-[#E7FFE6]/50 text-[#E7FFE6] text-sm font-medium backdrop-blur-md transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
          title="Replay Ring Reveal Animation"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#E7FFE6]" />
          <span className="hidden sm:inline">Replay Reveal</span>
        </button>
      </div>

      {/* Bottom subtle edge blend */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0F2317] to-transparent pointer-events-none z-10" />
    </div>
  );
};
