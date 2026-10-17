import React from 'react';
import { useGarden } from '../context/GardenContext';

export const MindfulQuoteBanner: React.FC = () => {
  const { currentQuote, nextQuote } = useGarden();

  return (
    <div
      onClick={nextQuote}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          nextQuote();
        }
      }}
      title="Tap for mindful wisdom"
      className="bg-[#f5f3ee]/90 hover:bg-[#f0eee9] rounded-xl p-3.5 flex items-center gap-3 border border-[#eae8e3]/90 transition-all cursor-pointer active:scale-[0.99] group shadow-2xs"
    >
      <div className="w-8 h-8 rounded-full bg-[#d4e4ce]/70 text-[#163328] group-hover:bg-[#d4e4ce] flex items-center justify-center shrink-0 transition-colors">
        <span className="material-symbols-outlined text-base">format_quote</span>
      </div>
      <p className="text-[13px] text-[#1b1c19] italic leading-snug flex-1 select-none font-medium">
        {currentQuote}
      </p>
      <span className="material-symbols-outlined text-[#727974] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        cached
      </span>
    </div>
  );
};
