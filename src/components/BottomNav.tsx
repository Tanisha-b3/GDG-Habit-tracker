import React from 'react';
import { useGarden } from '../context/GardenContext';
import { NavigationTab } from '../types/garden';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsAddModalOpen } = useGarden();

  const navItems: { tab: NavigationTab; label: string; icon: string }[] = [
    { tab: 'garden', label: 'Garden', icon: 'potted_plant' },
    { tab: 'habits', label: 'Habits', icon: 'checklist' },
    { tab: 'analytics', label: 'Analytics', icon: 'analytics' },
    { tab: 'community', label: 'Community', icon: 'spa' },
  ];

  return (
    <>
      {/* Floating Action Button for Adding New Habit */}
      <div className="fixed bottom-20 right-4 z-40 max-w-lg mx-auto sm:right-1/2 sm:translate-x-[210px] pointer-events-auto">
        <button
          onClick={() => setIsAddModalOpen(true)}
          aria-label="Create new habit"
          className="w-13 h-13 p-3.5 rounded-full bg-[#163328] hover:bg-[#2d4a3e] text-white botanical-floating-shadow flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-lg"
        >
          <span className="material-symbols-outlined text-2xl font-bold">add</span>
        </button>
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 max-w-lg mx-auto right-0 bg-[#ffffff]/95 backdrop-blur-md border-t border-[#eae8e3] shadow-md">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;

          if (isActive) {
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className="flex flex-col items-center justify-center bg-[#d4e4ce] text-[#163328] rounded-full px-4 py-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-xl fill-1">
                  {item.icon}
                </span>
                <span className="text-[11px] font-bold mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className="flex flex-col items-center justify-center text-[#424844] hover:text-[#163328] px-4 py-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-[11px] mt-0.5 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
