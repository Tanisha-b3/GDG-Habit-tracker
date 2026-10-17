import React, { useState } from 'react';
import { useGarden } from '../../context/GardenContext';

export const TerrariumDetailModal: React.FC = () => {
  const { isTerrariumModalOpen, setIsTerrariumModalOpen, specimen } = useGarden();
  const [mistEffect, setMistEffect] = useState(false);

  if (!isTerrariumModalOpen) return null;

  const handleMist = () => {
    setMistEffect(true);
    setTimeout(() => setMistEffect(false), 1200);
  };

  const stages = [
    { name: 'Sprout', days: 'Day 1–14', achieved: true },
    { name: 'Sapling', days: 'Day 15–30', achieved: false },
    { name: 'Lush Foliage', days: 'Day 31–50', achieved: false },
    { name: 'Flowering Bloom', days: 'Day 50+', achieved: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#eae8e3] max-h-[92vh] overflow-y-auto no-scrollbar space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eae8e3] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#536251]">potted_plant</span>
            <div>
              <h3 className="text-[17px] font-bold text-[#163328] font-serif-botanical">
                Sanctuary Terrarium
              </h3>
              <p className="text-[11px] text-[#727974]">{specimen.species} • Cultivation Stage</p>
            </div>
          </div>
          <button
            onClick={() => setIsTerrariumModalOpen(false)}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-[#f5f3ee] flex items-center justify-center text-[#727974] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Specimen Showcase Visual with Mist Button */}
        <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#f5f3ee] border border-[#eae8e3] group">
          <img
            src={specimen.imageUrl}
            alt={specimen.species}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {mistEffect && (
            <div className="absolute inset-0 bg-[#d4e4ce]/40 backdrop-blur-xs flex items-center justify-center animate-in fade-in zoom-in duration-300">
              <span className="text-white text-3xl">💦</span>
            </div>
          )}

          <div className="absolute top-3 left-3 bg-[#163328]/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#adcebe] animate-ping" />
            <span>{specimen.stage} Stage</span>
          </div>

          <button
            onClick={handleMist}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#163328] backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#2d4a3e]">dew_point</span>
            <span>Mist Terrarium</span>
          </button>
        </div>

        {/* Specimen Description */}
        <div className="bg-[#f5f3ee] rounded-xl p-3.5 border border-[#eae8e3] space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-[#163328] font-serif-botanical">
              {specimen.name}
            </h4>
            <span className="text-xs text-[#536251] font-semibold">Day {specimen.day} Cultivated</span>
          </div>
          <p className="text-xs text-[#424844] leading-relaxed">
            {specimen.description} The glossy fenestrations are forming naturally with each morning
            meditation and evening rest cycle.
          </p>
        </div>

        {/* Micro-Climate Sensor Gauges */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-2.5 border border-[#eae8e3] text-center">
            <span className="text-[10px] text-[#727974] block">Soil Moisture</span>
            <span className="text-[14px] font-bold text-[#163328]">84%</span>
            <span className="text-[9px] text-[#536251] block font-medium">Optimal</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-[#eae8e3] text-center">
            <span className="text-[10px] text-[#727974] block">Sunlight</span>
            <span className="text-[14px] font-bold text-[#163328]">4.8 hrs</span>
            <span className="text-[9px] text-[#536251] block font-medium">Gentle Dawn</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-[#eae8e3] text-center">
            <span className="text-[10px] text-[#727974] block">Vitality</span>
            <span className="text-[14px] font-bold text-[#163328]">{specimen.vitality}%</span>
            <span className="text-[9px] text-[#536251] block font-medium">Thriving</span>
          </div>
        </div>

        {/* Growth Stages Timeline */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-semibold text-[#163328] uppercase tracking-wider">
            Botanical Life Cycle
          </h4>
          <div className="space-y-2">
            {stages.map((st, i) => (
              <div
                key={st.name}
                className={`flex items-center justify-between p-2 rounded-xl text-xs border ${
                  st.achieved
                    ? 'bg-[#d4e4ce]/50 border-[#adcebe] text-[#163328] font-semibold'
                    : 'bg-[#fbf9f4] border-[#eae8e3] text-[#727974]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      st.achieved ? 'bg-[#163328] text-white' : 'bg-[#eae8e3] text-[#727974]'
                    }`}
                  >
                    {st.achieved ? '✓' : i + 1}
                  </span>
                  <span>{st.name}</span>
                </div>
                <span className="text-[11px] font-normal">{st.days}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
