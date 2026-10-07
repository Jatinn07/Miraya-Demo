import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { ProductItem } from '../data/jewelleryData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ProductItem[];
  onRemoveWishlist: (id: string) => void;
  onMoveToCart: (product: ProductItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FFFAFA] shadow-2xl flex flex-col justify-between z-10 border-l border-[#E7FFE6]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E7FFE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#214E34] fill-[#214E34]" />
            <h3 className="font-serif text-xl font-medium text-[#302326]">
              Saved Treasures ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E7FFE6] text-[#75686A] hover:text-[#302326] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center border border-[#E7FFE6]">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-[#302326]">
                No Saved Pieces Yet
              </h4>
              <p className="text-sm text-[#75686A] max-w-xs">
                Tap the heart on any solitaire or collection piece to bookmark your favored inspirations.
              </p>
            </div>
          ) : (
            items.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3.5 bg-white border border-[#E7FFE6] rounded-[14px] shadow-2xs"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden bg-[#E7FFE6] shrink-0 border border-[#E7FFE6]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-[#214E34] font-semibold">
                      {product.category} · {product.carat}
                    </div>
                    <h5 className="font-serif text-sm font-medium text-[#302326] line-clamp-1">
                      {product.name}
                    </h5>
                    <div className="text-sm font-semibold text-[#302326] mt-0.5">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7FFE6]/60">
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wide uppercase transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-[#75686A] hover:text-[#214E34] p-1 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#E7FFE6]">
            <button
              onClick={() => {
                items.forEach((p) => onMoveToCart(p));
                onClose();
              }}
              className="w-full py-3 bg-[#302326] hover:bg-[#211416] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <span>Move All to Shopping Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
