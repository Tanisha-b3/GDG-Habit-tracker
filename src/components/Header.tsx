import React, { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { USER_AVATAR } from '../data/initialData';

export const Header: React.FC = () => {
  const { specimen, resetToDefaults, setIsTerrariumModalOpen } = useGarden();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#eae8e3]/70 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-4 py-3 max-w-lg mx-auto">
        {/* Left: Brand Logo & Icon Anchor */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#d4e4ce] text-[#163328] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-lg fill-1">eco</span>
          </div>
          <div>
            <span className="text-[18px] font-bold text-[#163328] tracking-tight block font-serif-botanical leading-tight">
              HabitGarden
            </span>
            <span className="text-[11px] text-[#424844] flex items-center gap-1 font-medium">
              <span>Today, May 24</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#c1c8c3]"></span>
              <span className="text-[#536251] font-semibold">Morning Glory</span>
            </span>
          </div>
        </div>

        {/* Right: Drops Status Pill & Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            aria-label="Profile and garden status"
            className="flex items-center gap-1.5 bg-[#f5f3ee] hover:bg-[#eae8e3] px-2.5 py-1.5 rounded-full border border-[#eae8e3] transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-1 text-[#163328] text-[12px] font-bold pr-1.5 border-r border-[#c1c8c3]/60">
              <span className="text-xs">💧</span>
              <span className="tabular-nums">{specimen.totalWaterDrops}</span>
            </div>
            <div className="flex items-center gap-1.5 pl-0.5">
              <span className="text-[11px] text-[#536251] font-semibold hidden xs:inline">
                Lvl {specimen.level}
              </span>
              <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#2d4a3e]/30">
                <img
                  src={USER_AVATAR}
                  alt="Mindful user portrait"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </button>

          {/* Quick Dropdown Menu */}
          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#eae8e3] p-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#eae8e3] mb-1">
                  <div className="font-semibold text-[#163328] text-xs uppercase tracking-wider">
                    Gardener Profile
                  </div>
                  <div className="text-xs text-[#536251] mt-0.5">
                    Level {specimen.level} • {specimen.totalWaterDrops} drops
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setIsTerrariumModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#f5f3ee] text-[#163328] flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-[#536251]">potted_plant</span>
                  <span>View Sanctuary Terrarium</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    resetToDefaults();
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-2 cursor-pointer mt-0.5"
                >
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  <span>Reset Demo Habits</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
