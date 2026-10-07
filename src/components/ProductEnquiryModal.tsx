import React, { useState } from 'react';
import { X, Send, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { CollectionProduct } from '../data/collectionProducts';

interface ProductEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CollectionProduct | null;
}

export const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!mobile.trim() || mobile.trim().length < 8) {
      setError('Please enter a valid mobile number.');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setName('');
    setMobile('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E7FFE6] overflow-hidden z-10 animate-fadeIn my-auto">
        {/* Top Header Bar */}
        <div className="bg-[#214E34] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E7FFE6]" />
            <h3 className="font-serif text-lg sm:text-xl font-normal tracking-wide">
              Product Enquiry
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-5">
          {/* Selected Product Snapshot Card */}
          <div className="flex items-center gap-4 p-3.5 bg-[#E7FFE6]/30 border border-[#E7FFE6] rounded-2xl">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E7FFE6]">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm uppercase font-semibold text-[#214E34] tracking-wider block">
                {product.collection || 'Miraya Atelier'}
              </span>
              <h4 className="font-serif text-base sm:text-[17px] font-semibold text-[#302326] truncate">
                {product.name}
              </h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base sm:text-lg font-bold text-[#302326]">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-[#9A8B8E] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#E7FFE6] text-[#214E34] flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl sm:text-2xl text-[#214E34] font-normal">
                  Enquiry Received
                </h4>
                <p className="text-sm sm:text-base text-[#4E4043] max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-[#302326]">{name}</span>! Our atelier concierge will contact you on <span className="font-semibold text-[#302326]">{mobile}</span> shortly with complete details and customisation options.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-[#75686A] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#214E34]" />
                <span>100% Certified Diamonds & Lifetime Buyback</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-2.5 bg-[#214E34] hover:bg-[#1C3E2A] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ENQUIRY FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#302326] uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#FAF9F6] border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2.5 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#302326] uppercase tracking-wider">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FAF9F6] border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2.5 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#302326] uppercase tracking-wider">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#FAF9F6] border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2.5 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#302326] uppercase tracking-wider">
                  Customisation or Questions (Optional)
                </label>
                <textarea
                  rows={2.5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify ring size, preferred gold purity (14K/18K), or diamond specifications..."
                  className="w-full bg-[#FAF9F6] border border-[#E7FFE6] focus:border-[#214E34] rounded-xl px-3.5 py-2.5 text-sm text-[#302326] focus:outline-none focus:ring-1 focus:ring-[#214E34]/20 transition-all placeholder-[#75686A]/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#214E34] hover:bg-[#1C3E2A] text-white rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
