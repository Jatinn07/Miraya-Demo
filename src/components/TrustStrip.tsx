import React from 'react';
import { Truck, RotateCcw, Award, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'Free Insured Shipping',
      desc: 'Directly delivered to your doorstep',
    },
    {
      icon: RotateCcw,
      title: 'Easy 7-Day Returns',
      desc: 'Hassle-free 100% moneyback policy',
    },
    {
      icon: Award,
      title: 'Certified Authenticity',
      desc: 'IGI & BIS 916 hallmarked diamonds',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: 'UPI, NetBanking, Credit Cards & EMI',
    },
  ];

  return (
    <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
      <div className="bg-white rounded-2xl border border-[#E7FFE6] shadow-xs py-7 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E7FFE6]">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0 first:pt-0"
              >
                <div className="w-12 h-12 rounded-full bg-[#E7FFE6] border border-[#214E34]/25 flex items-center justify-center text-[#214E34] mb-3">
                  <Icon className="w-5.5 h-5.5 stroke-[1.8]" />
                </div>
                <h4 className="text-base sm:text-[17px] font-semibold text-[#302326] tracking-wide">
                  {item.title}
                </h4>
                <p className="text-sm text-[#75686A] mt-1.5 max-w-[230px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
