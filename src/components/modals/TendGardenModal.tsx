import React from 'react';
import { useGarden } from '../../context/GardenContext';

export const TendGardenModal: React.FC = () => {
  const { isTendModalOpen, setIsTendModalOpen, specimen, harvestReadyCount, setIsTerrariumModalOpen } =
    useGarden();

  if (!isTendModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#eae8e3] text-center space-y-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#d4e4ce]/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#adcebe]/40 rounded-full blur-2xl pointer-events-none" />

        {/* Terrarium Image Miniature in celebratory ring */}
        <div className="relative mx-auto w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#2d4a3e] via-[#adcebe] to-[#d4e4ce] shadow-md animate-float">
          <img
            src={specimen.imageUrl}
            alt={specimen.species}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#163328] text-white flex items-center justify-center text-sm shadow-md">
            💧
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#536251] uppercase tracking-wider">
            Sanctuary Harvest Complete
          </span>
          <h3 className="text-[20px] font-bold text-[#163328] font-serif-botanical">
            Garden Tended &amp; Nourished
          </h3>
          <p className="text-xs text-[#424844] max-w-xs mx-auto leading-relaxed">
            Your {harvestReadyCount} completed rituals provided fresh morning dew for your{' '}
            <strong className="text-[#163328] font-semibold">{specimen.species}</strong>.
          </p>
        </div>

        {/* Harvest Summary Cards */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-left">
          <div className="bg-[#f5f3ee] rounded-xl p-3 border border-[#eae8e3]">
            <span className="text-[10px] text-[#727974] block font-medium">Vitality Level</span>
            <span className="text-[17px] font-bold text-[#163328] font-serif-botanical tabular-nums">
              {specimen.vitality}%
            </span>
            <span className="text-[10px] text-[#536251] block">+5% boost</span>
          </div>

          <div className="bg-[#f5f3ee] rounded-xl p-3 border border-[#eae8e3]">
            <span className="text-[10px] text-[#727974] block font-medium">Total Dew Drops</span>
            <span className="text-[17px] font-bold text-[#163328] font-serif-botanical tabular-nums">
              {specimen.totalWaterDrops} 💧
            </span>
            <span className="text-[10px] text-[#536251] block">Lvl {specimen.level} Gardener</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              setIsTendModalOpen(false);
              setIsTerrariumModalOpen(true);
            }}
            className="w-full h-11 bg-[#2d4a3e] hover:bg-[#163328] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">potted_plant</span>
            <span>Admire Terrarium Growth</span>
          </button>

          <button
            onClick={() => setIsTendModalOpen(false)}
            className="w-full py-2 text-xs font-semibold text-[#536251] hover:text-[#163328] transition-colors cursor-pointer"
          >
            Return to Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
};
