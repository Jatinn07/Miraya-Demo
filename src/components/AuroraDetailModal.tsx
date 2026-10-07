import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface AuroraDetailModalProps {
  data: { title: string; detail: string } | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const AuroraDetailModal: React.FC<AuroraDetailModalProps> = ({
  data,
  onClose,
  onBookConsultation,
}) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white max-w-lg w-full rounded-[20px] shadow-2xl border border-[#E7FFE6] p-6 sm:p-8 z-10 space-y-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#E7FFE6] text-[#75686A] hover:text-[#302326] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 text-sm tracking-[0.2em] font-semibold text-[#214E34] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE AURORA STANDARD</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#302326]">
            {data.title}
          </h3>

          <p className="text-sm sm:text-sm text-[#75686A] leading-relaxed">
            {data.detail}
          </p>

          <div className="p-4 bg-[#E7FFE6] rounded-[12px] border border-[#E7FFE6] text-sm text-[#302326] space-y-2">
            <div className="font-semibold text-[#214E34] uppercase tracking-wider text-sm">
              Atelier Hallmark
            </div>
            <div>
              Our master jewelers examine every curve with 40x stereoscopic magnification to ensure 
              unwavering prong symmetry, seamless comfort fit, and lasting structural integrity.
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="flex-1 py-3 bg-[#214E34] hover:bg-[#193D29] text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-colors text-center cursor-pointer"
            >
              Consult with Atelier Karigar
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-[#E7FFE6] hover:bg-[#E7FFE6] rounded-full text-sm font-semibold uppercase text-[#302326] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
