import React from 'react';
import { Send } from 'lucide-react';
import { CollectionProduct } from '../data/collectionProducts';

interface CollectionProductCardProps {
  product: CollectionProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: CollectionProduct) => void;
  onAddToCart: (product: CollectionProduct) => void;
  onSelectProduct?: (product: CollectionProduct) => void;
  onEnquire?: (product: CollectionProduct) => void;
}

export const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  product,
  onSelectProduct,
  onEnquire,
}) => {
  const handleClickCard = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E7FFE6] p-1 flex flex-col justify-between hover:shadow-[0_8px_25px_rgba(33,78,52,0.12)] hover:border-[#214E34]/30 transition-all duration-300 group">
      {/* Product Image Stage with Smooth Hover Crossfade & Scale */}
      <div
        onClick={handleClickCard}
        className="w-full bg-[#E7FFE6]/30 rounded-xl p-0 h-[215px] sm:h-[240px] md:h-[260px] flex items-center justify-center overflow-hidden cursor-pointer relative select-none"
      >
        {/* Primary Product Image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center absolute inset-0 opacity-100 group-hover:opacity-0 scale-[1.12] group-hover:scale-[1.05] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none drop-shadow-xs rounded-lg"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Secondary Product Image */}
        {product.secondaryImage ? (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate perspective`}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 scale-[1.05] group-hover:scale-[1.12] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none drop-shadow-xs rounded-lg"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : null}
      </div>

      {/* Product Meta & Pricing */}
      <div
        onClick={handleClickCard}
        className="pt-2 pb-1.5 px-1.5 space-y-0.5 cursor-pointer"
      >
        {/* Price Row */}
        <div className="flex items-baseline">
          <span className="font-bold text-base sm:text-lg text-[#302326]">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-[#9A8B8E] line-through ml-2 font-normal">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Product Name */}
        <div className="text-sm sm:text-[15px] text-[#55484A] font-medium truncate tracking-tight group-hover:text-[#214E34] transition-colors">
          {product.name}
        </div>
      </div>

      {/* Action Row: Enquire Now Button (rounded-full = Pill Shaped) */}
      <div className="p-1 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onEnquire) {
              onEnquire(product);
            } else if (onSelectProduct) {
              onSelectProduct(product);
            }
          }}
          className="w-full py-2 px-3 rounded-full border border-[#214E34] text-[#214E34] hover:bg-[#214E34] hover:text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4 stroke-[1.8]" />
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
};
