import React from 'react';
import { useGarden } from '../context/GardenContext';

export const HeroSanctuaryCard: React.FC = () => {
  const {
    specimen,
    habits,
    selectedDate,
    tendGarden,
    setIsTerrariumModalOpen,
    setIsTendModalOpen,
  } = useGarden();

  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completedDates.includes(selectedDate)).length;
  const harvestReadyCount = completedHabits;

  const handleHarvestClick = () => {
    tendGarden();
    setIsTendModalOpen(true);
  };

  return (
    <section className="bg-white rounded-2xl p-4 botanical-card-shadow relative overflow-hidden transition-all duration-300 border border-[#eae8e3]/80">
      {/* Ambient Morning Glow Accent */}
      <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#d4e4ce]/40 blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-[#ffdbcd]/30 blur-xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header & Specimen Stage Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4e4ce]/70 text-[#163328] text-[11px] font-semibold mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#536251] animate-pulse"></span>
              <span>
                {specimen.stage} • Day {specimen.day}
              </span>
            </div>
            <h2 className="text-[22px] font-serif-botanical text-[#163328] font-bold tracking-tight leading-tight">
              {specimen.name}
            </h2>
            <p className="text-[12px] text-[#424844] mt-0.5 leading-snug">
              {specimen.description}
            </p>
          </div>

          {/* Quick Garden Specimen Miniature Avatar */}
          <button
            onClick={() => setIsTerrariumModalOpen(true)}
            aria-label="View Terrarium Details"
            className="w-14 h-14 rounded-xl bg-[#f0eee9] flex items-center justify-center shrink-0 border border-[#eae8e3] overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-[#2d4a3e]/40 transition-all shadow-xs active:scale-95"
          >
            <img
              src={specimen.imageUrl}
              alt={specimen.species}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
            </div>
          </button>
        </div>

        {/* Growth Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[#424844] font-medium">Next Blossom Threshold</span>
            <span className="text-[#163328] font-bold tabular-nums">
              {specimen.cultivatedPercent}% Cultivated
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#eae8e3] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-[#2d4a3e] transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, Math.max(5, specimen.cultivatedPercent))}%` }}
            />
          </div>
        </div>

        {/* Sanctuary Stats Bento Strip */}
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <div className="bg-[#f5f3ee] rounded-xl p-2.5 text-center">
            <span className="text-[11px] text-[#727974] block font-medium">Streak</span>
            <span className="text-[18px] font-serif-botanical text-[#163328] font-bold flex items-center justify-center gap-1 mt-0.5 tabular-nums">
              {specimen.streak} <span className="text-xs">🔥</span>
            </span>
          </div>
          <div className="bg-[#f5f3ee] rounded-xl p-2.5 text-center">
            <span className="text-[11px] text-[#727974] block font-medium">Habits Done</span>
            <span className="text-[18px] font-serif-botanical text-[#163328] font-bold flex items-center justify-center gap-1 mt-0.5 tabular-nums">
              {completedHabits}/{totalHabits} <span className="text-xs">🌱</span>
            </span>
          </div>
          <div className="bg-[#f5f3ee] rounded-xl p-2.5 text-center">
            <span className="text-[11px] text-[#727974] block font-medium">Vitality</span>
            <span className="text-[18px] font-serif-botanical text-[#163328] font-bold mt-0.5 block tabular-nums">
              {specimen.vitality}%
            </span>
          </div>
        </div>

        {/* Primary Action Trigger */}
        <div className="pt-0.5">
          <button
            onClick={handleHarvestClick}
            aria-label="Tend Garden and Harvest"
            className="w-full h-12 bg-[#2d4a3e] hover:bg-[#163328] text-white rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg fill-1">water_drop</span>
            <span>Tend Garden &amp; Harvest ({harvestReadyCount})</span>
          </button>
        </div>
      </div>
    </section>
  );
};
