import React, { useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

export interface FilterState {
  category: string[];
  priceRange: string;
  materials: string[];
  stones: string[];
  occasions: string[];
  collections: string[];
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalFilteredCount,
}) => {
  // Local filter draft state while drawer is open
  const [draftFilters, setDraftFilters] = useState<FilterState>(filters);

  // Collapsible accordion states
  const [openSections, setOpenSections] = useState({
    category: true,
    priceRange: true,
    material: true,
    stone: true,
    occasion: true,
    collection: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (cat: string) => {
    setDraftFilters((prev) => {
      if (cat === 'all') {
        return { ...prev, category: ['all'] };
      }
      let nextCats = prev.category.filter((c) => c !== 'all');
      if (nextCats.includes(cat)) {
        nextCats = nextCats.filter((c) => c !== cat);
        if (nextCats.length === 0) nextCats = ['all'];
      } else {
        nextCats = [...nextCats, cat];
      }
      return { ...prev, category: nextCats };
    });
  };

  const handleToggleMulti = (
    key: 'materials' | 'stones' | 'occasions' | 'collections',
    val: string
  ) => {
    setDraftFilters((prev) => {
      const current = prev[key];
      const next = current.includes(val)
        ? current.filter((x) => x !== val)
        : [...current, val];
      return { ...prev, [key]: next };
    });
  };

  const handleApply = () => {
    onApplyFilters(draftFilters);
    onClose();
  };

  const handleReset = () => {
    const emptyFilters: FilterState = {
      category: ['all'],
      priceRange: '',
      materials: [],
      stones: [],
      occasions: [],
      collections: [],
    };
    setDraftFilters(emptyFilters);
    onResetFilters();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background Translucent Overlay (rgba(0,0,0,0.45)) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Sliding Left-Side Drawer */}
      <div
        className="fixed inset-y-0 left-0 w-full sm:w-[320px] md:w-[340px] bg-white shadow-2xl flex flex-col z-50 animate-slide-right"
        style={{
          transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* HEADER: Filter (Cormorant Garamond) + Close X */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-[#E7FFE6]">
          <h2 className="font-serif text-2xl text-[#302326] font-normal tracking-wide">
            Filter
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-[#302326] hover:text-[#214E34] transition-colors rounded-full hover:bg-[#E7FFE6] cursor-pointer"
            aria-label="Close filter drawer"
          >
            <X className="w-5 h-5 stroke-[1.6]" />
          </button>
        </div>

        {/* SCROLLABLE FILTER CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 text-sm text-[#302326] font-sans">
          {/* 1. CATEGORY */}
          <div className="border-b border-[#E7FFE6] pb-5">
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-[#302326] mb-3 cursor-pointer"
            >
              <span>Category</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8E7E82] transition-transform duration-200 ${
                  openSections.category ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.category && (
              <div className="space-y-2.5 pt-1">
                {[
                  { id: 'all', label: 'All Jewellery (128)' },
                  { id: 'rings', label: 'Rings (42)' },
                  { id: 'earrings', label: 'Earrings (56)' },
                  { id: 'necklaces', label: 'Necklaces (48)' },
                  { id: 'bracelets', label: 'Bracelets (28)' },
                  { id: 'pendants', label: 'Pendants (24)' },
                ].map((item) => {
                  const isChecked = draftFilters.category.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      onClick={() => handleCategoryToggle(item.id)}
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#214E34] border-[#214E34] text-white'
                            : 'border-[#B2D8B1] group-hover:border-[#214E34]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[#4E4043] group-hover:text-[#214E34] transition-colors">
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. PRICE RANGE */}
          <div className="border-b border-[#E7FFE6] pb-5">
            <button
              onClick={() => toggleSection('priceRange')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-[#302326] mb-3 cursor-pointer"
            >
              <span>Price Range</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8E7E82] transition-transform duration-200 ${
                  openSections.priceRange ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.priceRange && (
              <div className="space-y-2.5 pt-1">
                {[
                  { id: 'under-5000', label: 'Under ₹5,000' },
                  { id: '5000-10000', label: '₹5,000 - ₹10,000' },
                  { id: '10000-25000', label: '₹10,000 - ₹25,000' },
                  { id: '25000-plus', label: '₹25,000+' },
                ].map((item) => {
                  const isSelected = draftFilters.priceRange === item.id;
                  return (
                    <label
                      key={item.id}
                      onClick={() =>
                        setDraftFilters((prev) => ({
                          ...prev,
                          priceRange: isSelected ? '' : item.id,
                        }))
                      }
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-[#214E34]'
                            : 'border-[#B2D8B1] group-hover:border-[#214E34]'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#214E34]" />
                        )}
                      </div>
                      <span className="text-[#4E4043] group-hover:text-[#214E34] transition-colors">
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. MATERIAL */}
          <div className="border-b border-[#E7FFE6] pb-5">
            <button
              onClick={() => toggleSection('material')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-[#302326] mb-3 cursor-pointer"
            >
              <span>Material</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8E7E82] transition-transform duration-200 ${
                  openSections.material ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.material && (
              <div className="space-y-2.5 pt-1">
                {['Gold', 'Rose Gold', 'White Gold', 'Sterling Silver'].map(
                  (mat) => {
                    const isChecked = draftFilters.materials.includes(mat);
                    return (
                      <label
                        key={mat}
                        onClick={() => handleToggleMulti('materials', mat)}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                      >
                        <div
                          className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#214E34] border-[#214E34] text-white'
                              : 'border-[#B2D8B1] group-hover:border-[#214E34]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-[#4E4043] group-hover:text-[#214E34] transition-colors">
                          {mat}
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
            )}
          </div>

          {/* 4. STONE */}
          <div className="border-b border-[#E7FFE6] pb-5">
            <button
              onClick={() => toggleSection('stone')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-[#302326] mb-3 cursor-pointer"
            >
              <span>Stone</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8E7E82] transition-transform duration-200 ${
                  openSections.stone ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.stone && (
              <div className="space-y-2.5 pt-1">
                {['Diamond', 'Emerald', 'Pearl', 'Ruby', 'Cubic Zirconia'].map(
                  (stn) => {
                    const isChecked = draftFilters.stones.includes(stn);
                    return (
                      <label
                        key={stn}
                        onClick={() => handleToggleMulti('stones', stn)}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                      >
                        <div
                          className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#214E34] border-[#214E34] text-white'
                              : 'border-[#B2D8B1] group-hover:border-[#214E34]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-[#4E4043] group-hover:text-[#214E34] transition-colors">
                          {stn}
                        </span>
                      </label>
                    );
                  }
                )}
              </div>
            )}
          </div>

          {/* 5. OCCASION */}
          <div className="border-b border-[#E7FFE6] pb-5">
            <button
              onClick={() => toggleSection('occasion')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-[#302326] mb-3 cursor-pointer"
            >
              <span>Occasion</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8E7E82] transition-transform duration-200 ${
                  openSections.occasion ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.occasion && (
              <div className="space-y-2.5 pt-1">
                {['Everyday', 'Wedding', 'Party', 'Gifting'].map((occ) => {
                  const isChecked = draftFilters.occasions.includes(occ);
                  return (
                    <label
                      key={occ}
                      onClick={() => handleToggleMulti('occasions', occ)}
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#214E34] border-[#214E34] text-white'
                            : 'border-[#B2D8B1] group-hover:border-[#214E34]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[#4E4043] group-hover:text-[#214E34] transition-colors">
                        {occ}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* 6. COLLECTION */}
          <div className="pb-3">
            <button
              onClick={() => toggleSection('collection')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-[#302326] mb-3 cursor-pointer"
            >
              <span>Collection</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8E7E82] transition-transform duration-200 ${
                  openSections.collection ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.collection && (
              <div className="space-y-2.5 pt-1">
                {['New Arrivals', 'Best Sellers', 'Trending'].map((col) => {
                  const isChecked = draftFilters.collections.includes(col);
                  return (
                    <label
                      key={col}
                      onClick={() => handleToggleMulti('collections', col)}
                      className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#214E34] border-[#214E34] text-white'
                            : 'border-[#B2D8B1] group-hover:border-[#214E34]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-[#4E4043] group-hover:text-[#214E34] transition-colors">
                        {col}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* STICKY FOOTER: Apply Filters (128) + Reset Buttons */}
        <div className="p-5 border-t border-[#E7FFE6] bg-white space-y-2.5">
          <button
            onClick={handleApply}
            className="w-full py-2.5 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-medium tracking-wide shadow-xs transition-colors cursor-pointer"
          >
            Apply Filters ({totalFilteredCount})
          </button>

          <button
            onClick={handleReset}
            className="w-full py-2.5 bg-white hover:bg-[#E7FFE6] text-[#214E34] border border-[#214E34] rounded-full text-sm font-medium tracking-wide transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
