import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CollectionBreadcrumbProps {
  onNavigateHome: () => void;
  activeCategoryName?: string;
}

export const CollectionBreadcrumb: React.FC<CollectionBreadcrumbProps> = ({
  onNavigateHome,
  activeCategoryName,
}) => {
  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-5 pb-2">
      <nav className="flex items-center space-x-1.5 text-sm text-[#8E7E82] font-sans">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#214E34] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
        <span className="text-[#214E34] font-medium">
          {activeCategoryName && activeCategoryName !== 'all'
            ? `Collection · ${activeCategoryName.charAt(0).toUpperCase() + activeCategoryName.slice(1)}`
            : 'Collection'}
        </span>
      </nav>
    </div>
  );
};
