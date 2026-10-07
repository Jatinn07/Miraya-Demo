'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#214E34]">
      <div className="animate-pulse font-serif text-xl tracking-widest uppercase">
        Miraya Diamonds Atelier...
      </div>
    </div>
  ),
});

export default function Page() {
  return <App />;
}
