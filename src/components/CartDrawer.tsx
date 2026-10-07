import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { ProductItem } from '../data/jewelleryData';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FFFAFA] shadow-2xl flex flex-col justify-between z-10 border-l border-[#E7FFE6]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E7FFE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#214E34]" />
            <h3 className="font-serif text-xl font-medium text-[#302326]">
              Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
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
          {checkoutComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center border border-[#E7FFE6] animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-[#302326]">
                Order Confirmed
              </h4>
              <p className="text-sm sm:text-sm text-[#75686A] max-w-xs leading-relaxed">
                Thank you for choosing Miraya Diamonds. Your personal concierge is 
                preparing your certified dossier and insured atelier parcel.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center border border-[#E7FFE6]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-medium text-[#302326]">
                Your Bag is Empty
              </h4>
              <p className="text-sm text-[#75686A] max-w-xs">
                Explore our fine collections and discover jewellery designed for your chapters.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#214E34] text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#193D29] transition-colors"
              >
                Browse Solitaires
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3.5 bg-white border border-[#E7FFE6] rounded-[14px] shadow-2xs"
              >
                <div className="w-20 h-20 rounded-[10px] overflow-hidden bg-[#E7FFE6] shrink-0 border border-[#E7FFE6]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-[#214E34] font-semibold">
                      {item.product.category} · {item.product.carat}
                    </div>
                    <h5 className="font-serif text-sm font-medium text-[#302326] line-clamp-1">
                      {item.product.name}
                    </h5>
                    <div className="text-sm font-semibold text-[#302326] mt-0.5">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7FFE6]/60">
                    <div className="flex items-center border border-[#E7FFE6] rounded-full px-2 py-0.5 bg-[#FFFAFA]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="text-sm text-[#75686A] hover:text-[#302326] px-1.5"
                      >
                        -
                      </button>
                      <span className="text-sm font-mono font-medium px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="text-sm text-[#75686A] hover:text-[#302326] px-1.5"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#75686A] hover:text-[#214E34] p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && !checkoutComplete && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#E7FFE6] space-y-4">
            <div className="space-y-1.5 text-sm text-[#75686A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#302326]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Door-to-Door Courier</span>
                <span className="text-[#214E34] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>GIA / IGI Laser Inscription Dossier</span>
                <span className="text-[#214E34] font-medium">Included</span>
              </div>
              <div className="pt-2 border-t border-[#E7FFE6] flex justify-between text-sm sm:text-base font-semibold text-[#302326]">
                <span>Total Amount</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#75686A] bg-[#E7FFE6] p-2.5 rounded-lg border border-[#E7FFE6]">
              <ShieldCheck className="w-4 h-4 text-[#214E34] shrink-0" />
              <span>100% Insured Transit · Lifetime Warranty Included</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
