export interface ProductItem {
  id: string;
  name: string;
  category: 'Rings' | 'Necklaces' | 'Bracelets' | 'Earrings' | 'Pendants';
  price: number;
  carat: string;
  metal: string;
  cut: string;
  clarity: string;
  color: string;
  description: string;
  image: string;
  badge?: string;
}

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'ring-01',
    name: 'The Solstice Round Solitaire Ring',
    category: 'Rings',
    price: 385000,
    carat: '1.75 ct',
    metal: '18K Rose Gold & Platinum',
    cut: 'Round Brilliant Ideal Cut',
    clarity: 'VVS1',
    color: 'E (Colorless)',
    description: 'A peerless round brilliant solitaire resting on an artisan micro-pavé band, capturing the purest light from every angle.',
    image: '/src/assets/images/rings_category_solitaire_1790703087837.jpg',
    badge: 'Miraya Signature',
  },
  {
    id: 'necklace-01',
    name: 'The Celestia Emerald-Cut Choker',
    category: 'Necklaces',
    price: 640000,
    carat: '3.20 ct total',
    metal: '18K White Gold',
    cut: 'Step-Cut Emerald & Baguette',
    clarity: 'VVS2',
    color: 'D (Exceptional White)',
    description: 'An architectural tribute to timeless romance, featuring graduating emerald-cut diamonds hand-linked with fluid motion.',
    image: '/src/assets/images/hero_jewellery_model_1790703049237.jpg',
    badge: 'Atelier Edition',
  },
  {
    id: 'bracelet-01',
    name: 'The Eternal Tennis Cascade Bracelet',
    category: 'Bracelets',
    price: 495000,
    carat: '4.50 ct total',
    metal: '950 Platinum',
    cut: 'Hearts & Arrows Brilliant',
    clarity: 'IF / VVS1',
    color: 'E (Colorless)',
    description: 'Forty-eight precision-matched conflict-free solitaires set in a low-profile flexible platinum channel.',
    image: '/src/assets/images/model_difference_portrait_1790703061481.jpg',
    badge: 'Limited Creation',
  },
  {
    id: 'ring-02',
    name: 'The Empress Oval Halo Solitaire',
    category: 'Rings',
    price: 420000,
    carat: '2.10 ct',
    metal: '18K Yellow Gold & Platinum',
    cut: 'Elongated Oval Brilliant',
    clarity: 'VVS1',
    color: 'F (Colorless)',
    description: 'A commanding oval centerpiece enveloped by a whisper-thin diamond halo that accentuates finger elegance.',
    image: '/src/assets/images/artisan_craftsmanship_loupe_1790703075420.jpg',
    badge: 'Bespoke Favorite',
  }
];

export const PILLARS_DATA = [
  {
    number: '01',
    title: 'Exceptional Quality',
    description: 'Only the top 1% of the world’s conflict-free rough diamonds are hand-selected by our certified gemologists.',
    iconName: 'Gem'
  },
  {
    number: '02',
    title: 'Timeless Design',
    description: 'Harmonizing classic heritage proportions with modern sculptural silhouettes engineered to outlive fleeting trends.',
    iconName: 'Sparkles'
  },
  {
    number: '03',
    title: 'Meaningful Craft',
    description: 'Over 34 hours of meticulous hand-setting and benchwork by master karigars with generations of atelier lineage.',
    iconName: 'ShieldCheck'
  },
  {
    number: '04',
    title: 'Customer First',
    description: 'Personalized private salon consultations, bespoke CAD previews, and lifetime complimentary care for every heirloom.',
    iconName: 'HeartHandshake'
  }
];

export const AURORA_CARDS = [
  {
    number: '01',
    title: 'Authentic Craftsmanship',
    description: 'Every claw, bezel, and gallery is hand-carved and hand-burnished to microscopic zero-tolerance tolerances.',
    detail: 'Master karigars with over three decades of ancestral bench experience preside over every single setting.',
    image: '/src/assets/images/artisan_craftsmanship_loupe_1790703075420.jpg'
  },
  {
    number: '02',
    title: 'Thoughtful Design',
    description: 'Weight-balanced ergonomic silhouettes that drape naturally against the collarbone, finger, and wrist.',
    detail: 'Designed for daily tactile comfort as much as monumental red-carpet moments.',
    image: '/src/assets/images/model_difference_portrait_1790703061481.jpg'
  },
  {
    number: '03',
    title: 'Premium Experience',
    description: 'Private atelier viewings, bespoke champagne consultations, and discreet insured door-to-door delivery.',
    detail: 'Each piece arrives in hand-stitched blush leatherette accompanied by physical GIA dossiers.',
    image: '/src/assets/images/hero_jewellery_model_1790703049237.jpg'
  },
  {
    number: '04',
    title: 'Made for Milestones',
    description: 'Commemorating life’s most profound engagements, anniversaries, promotions, and self-celebrations.',
    detail: 'Heirlooms passed with reverence from mothers to daughters across generations.',
    image: '/src/assets/images/rings_category_solitaire_1790703087837.jpg'
  }
];

export const CONFIDENCE_CARDS = [
  {
    title: 'Diamond Certification',
    description: 'Every solitaire 0.50 ct and above is individually laser-inscribed and certified by GIA, IGI, or SGL.',
    icon: 'Award'
  },
  {
    title: 'Quality Assurance',
    description: 'Rigorous 40-point microscopic inspection verifying facet symmetry, prong tension, and metal purity.',
    icon: 'CheckCircle'
  },
  {
    title: 'Secure Packaging',
    description: 'Tamper-evident, double-sealed luxury unboxing with 100% insured transit courier protection to your door.',
    icon: 'PackageCheck'
  },
  {
    title: 'Trusted Service',
    description: 'Complimentary lifetime ultrasonic cleaning, prong retightening, re-polishing, and buyback assurance.',
    icon: 'LifeBuoy'
  }
];
