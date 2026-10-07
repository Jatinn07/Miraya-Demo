import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { FEATURED_PRODUCTS, ProductItem } from '../data/jewelleryData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const popularTags = [
    'Solitaire Rings',
    'Oval Brilliant',
    'Emerald Cut',
    'Tennis Bracelets',
    '18K Rose Gold',
    'Platinum 950',
    'Choker Necklaces',
  ];

  const filteredProducts = FEATURED_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.cut.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.metal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-20">
        <div className="relative bg-white max-w-2xl w-full rounded-[20px] shadow-2xl border border-[#E7FFE6] p-6 z-10">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7FFE6]">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#214E34]">
              <Sparkles className="w-4 h-4" />
              <span>Miraya Atelier Search</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E7FFE6] text-[#75686A] hover:text-[#302326] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="mt-4 relative">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by diamond cut, metal, category (e.g. Solitaire, Oval, Platinum)..."
              className="w-full bg-[#FFFAFA] border border-[#E7FFE6] focus:border-[#214E34] rounded-full py-3 pl-11 pr-4 text-sm sm:text-sm text-[#302326] placeholder-[#75686A]/70 focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75686A]" />
          </div>

          {/* Suggested Tags */}
          <div className="mt-4">
            <span className="text-sm font-semibold text-[#75686A] uppercase tracking-wider block mb-2">
              Popular Searches:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 rounded-full bg-[#E7FFE6] hover:bg-[#E7FFE6] text-[#302326] text-sm font-semibold transition-colors border border-[#E7FFE6] cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 pt-4 border-t border-[#E7FFE6] space-y-3 max-h-72 overflow-y-auto">
            <span className="text-sm font-semibold text-[#75686A] uppercase tracking-wider block">
              Curated Ateliers Results ({filteredProducts.length})
            </span>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-6 text-sm text-[#75686A]">
                No specific diamond match found. Try searching for "Solitaire", "Round", "Platinum" or "Choker".
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 p-2.5 hover:bg-[#E7FFE6] rounded-[12px] border border-transparent hover:border-[#E7FFE6] transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-[8px] overflow-hidden bg-white shrink-0 border border-[#E7FFE6]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#214E34] uppercase tracking-wider font-semibold">
                      {product.category} · {product.carat}
                    </div>
                    <div className="font-serif text-sm font-medium text-[#302326] group-hover:text-[#214E34] transition-colors">
                      {product.name}
                    </div>
                    <div className="text-sm text-[#75686A]">
                      {product.cut} · {product.metal}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#75686A] group-hover:text-[#214E34] group-hover:translate-x-1 transition-all" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
