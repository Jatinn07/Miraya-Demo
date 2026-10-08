import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, RotateCcw, ArrowRight } from 'lucide-react';
import footerBgImg from '../assets/images/footer_new/ring_bg.png';
import footerRingImg from '../assets/images/footer_new/ring.png';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenConsultation?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
}) => {
  const footerRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [ringVisible, setRingVisible] = useState<boolean>(false);
  const [replayCount, setReplayCount] = useState<number>(0);

  // Trigger animation when the footer enters the viewport for the first time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // 1. Background starts zoomed in and smoothly settles to scale-100 (graceful slow zoom)
          setHasStarted(true);

          // 2. Ring pops up from bottom center after a tiny 100ms lag to create a 95% matched parallax effect
          const timer = setTimeout(() => {
            setRingVisible(true);
          }, 100);

          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [replayCount]);

  const handleReplay = () => {
    setHasStarted(false);
    setRingVisible(false);
    setTimeout(() => {
      setReplayCount((prev) => prev + 1);
      setHasStarted(true);
      setTimeout(() => {
        setRingVisible(true);
      }, 100);
    }, 200);
  };

  const shopLinks = [
    { label: 'Rings', id: 'rings' },
    { label: 'Earrings', id: 'earrings' },
    { label: 'Bracelets', id: 'bracelets' },
    { label: 'Necklaces', id: 'necklaces' },
    { label: 'Bangels', id: 'bracelets' },
    { label: 'Collections', id: 'collections' },
  ];

  const aboutLinks = [
    { label: 'Our Story', href: '#origin-heritage-section' },
    { label: 'Testimonials', href: '#difference-section' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Warranty', href: '#' },
  ];

  const policyLinks = [
    { label: 'FAQs', href: '#' },
    { label: 'Shipping & Delivery', href: '#' },
    { label: 'Returns & Exchange', href: '#' },
    { label: 'Track Order', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  const bgSrc = (footerBgImg as any)?.src || footerBgImg;
  const ringSrc = (footerRingImg as any)?.src || footerRingImg;

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#070E0A] text-white overflow-hidden select-none border-t border-[#1C3E2A]/50"
    >
      {/* ======================================================= */}
      {/* 1. CINEMATIC BACKGROUND IMAGE (From https://ibb.co/kshjzc0P) */}
      {/* Starts Zoomed-In -> Smoothly Settles to Scale 100 on Scroll */}
      {/* ======================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={bgSrc}
          alt="Miraya Diamonds Footer Background"
          className={`w-full h-full object-cover object-center transition-transform duration-[3800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
            hasStarted ? 'scale-100' : 'scale-[1.18]'
          }`}
          loading="lazy"
        />
        {/* Subtle top shade ensuring text contrast while letting full background shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060C08]/75 via-[#060C08]/25 to-transparent pointer-events-none" />
      </div>

      {/* ======================================================= */}
      {/* 2. TOP CONTENT ROW (Exact Layout & Gold Headings as Reference Image) */}
      {/* ======================================================= */}
      <div className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-3 xl:gap-6">
          {/* COL 1: Monogram Logo, Brand Title, Description, Social Icons */}
          <div className="w-full lg:w-[28%] xl:w-[27%] shrink-0 space-y-4 lg:pr-2">
            <div className="mb-2">
              <img
                src="/miraya-logo.svg"
                alt="Miraya Diamonds"
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Description Text */}
            <p className="text-white/85 text-sm leading-relaxed max-w-sm font-normal">
              Lorem ipsum dolor sit amet, consectetur ffdv adipiscing elit. Sed do eiusmod temporvvxv 
              incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Social Icons (Instagram, Facebook, X in Reference Circular Style) */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/40 hover:border-[#E2C479] hover:text-[#E2C479] flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/40 hover:border-[#E2C479] hover:text-[#E2C479] flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/40 hover:border-[#E2C479] hover:text-[#E2C479] flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Golden Vertical Divider 1 */}
          <div className="hidden lg:block w-px h-44 bg-gradient-to-b from-transparent via-[#C9AA66]/50 to-transparent shrink-0 self-center" />

          {/* COL 2: SHOP */}
          <div className="space-y-3.5 shrink-0 min-w-[95px]">
            <h4 className="font-sans text-sm sm:text-base font-semibold tracking-[0.16em] text-[#E2C479] uppercase">
              SHOP
            </h4>
            <ul className="space-y-2 text-sm text-white/95 font-normal">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onSelectCategory(link.id)}
                    className="hover:text-[#E2C479] hover:translate-x-0.5 transition-all duration-200 cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: ABOUT */}
          <div className="space-y-3.5 shrink-0 min-w-[105px]">
            <h4 className="font-sans text-sm sm:text-base font-semibold tracking-[0.16em] text-[#E2C479] uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2 text-sm text-white/95 font-normal">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#E2C479] hover:translate-x-0.5 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4: POLICIES */}
          <div className="space-y-3.5 shrink-0 min-w-[115px]">
            <h4 className="font-sans text-sm sm:text-base font-semibold tracking-[0.16em] text-[#E2C479] uppercase">
              POLICIES
            </h4>
            <ul className="space-y-2 text-sm text-white/95 font-normal">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#E2C479] hover:translate-x-0.5 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Golden Vertical Divider 2 */}
          <div className="hidden lg:block w-px h-44 bg-gradient-to-b from-transparent via-[#C9AA66]/50 to-transparent shrink-0 self-center" />

          {/* COL 5: CONTACT US */}
          <div className="w-full lg:w-[26%] xl:w-[25%] shrink-0 space-y-3.5">
            <h4 className="font-sans text-sm sm:text-base font-semibold tracking-[0.16em] text-[#E2C479] uppercase">
              CONTACT US
            </h4>
            <p className="text-sm text-white/85 leading-relaxed font-normal">
              We’re here to make your shopping experience easier.
            </p>
            <div className="space-y-2.5 text-sm text-white/95 pt-1">
              {/* Mail with Gold Icon */}
              <a
                href="mailto:miraya.diamond23@gmail.com"
                className="flex items-center gap-3 hover:text-[#E2C479] transition-colors group"
              >
                <Mail className="w-4.5 h-4.5 text-[#E2C479] shrink-0" />
                <span className="break-all font-sans">miraya.diamond23@gmail.com</span>
              </a>

              {/* Phone with Gold Icon */}
              <a
                href="tel:+919869698984"
                className="flex items-center gap-3 hover:text-[#E2C479] transition-colors group"
              >
                <Phone className="w-4.5 h-4.5 text-[#E2C479] shrink-0" />
                <span className="font-sans">+91 9869698984</span>
              </a>

              {/* Location with Gold Icon */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#E2C479] shrink-0 mt-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 3. RING ANIMATION AT THE BOTTOM (From https://ibb.co/MkNcwm2y) */}
      {/* Increased by 25% + Bottom-Center Popup Reveal */}
      {/* ======================================================= */}
      <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] lg:h-[720px] flex items-end justify-center overflow-hidden pointer-events-none z-10">
        {/* Ring Image (+25% size increase: max-w-[1080px], bottom-center aligned) */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[99vw] sm:w-[94vw] md:w-[86vw] lg:w-[76vw] max-w-[1080px] lg:max-w-[1100px] flex items-end justify-center transition-all duration-[3600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
            ringVisible
              ? 'translate-y-0 opacity-100 scale-100 drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]'
              : 'translate-y-44 opacity-0 scale-95'
          }`}
        >
          <img
            src={ringSrc}
            alt="Miraya Diamonds Solitaire Master Ring"
            className="w-full h-auto object-contain object-bottom block"
            loading="lazy"
          />
        </div>

        {/* Replay Button in Corner */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-auto z-30">
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#070E0A]/70 hover:bg-[#070E0A] border border-[#E2C479]/30 hover:border-[#E2C479] text-[#E2C479] text-sm font-medium backdrop-blur-md transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
            title="Replay Ring Reveal"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E2C479]" />
            <span className="hidden sm:inline">Replay Ring Reveal</span>
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 4. SUBTLE BOTTOM COPYRIGHT BAR */}
      {/* ======================================================= */}
      <div className="relative z-20 border-t border-white/10 bg-[#060C08]/80 py-4 px-4 sm:px-8 text-center text-sm text-white/60">
        <p>© 2026 Miraya Diamonds. All rights reserved. Crafted with eternal precision.</p>
      </div>
    </footer>
  );
};
