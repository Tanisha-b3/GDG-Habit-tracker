import React from 'react';
import { GardenProvider, useGarden } from './context/GardenContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { GardenScreen } from './components/screens/GardenScreen';
import { HabitsScreen } from './components/screens/HabitsScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { AddHabitModal } from './components/modals/AddHabitModal';
import { TendGardenModal } from './components/modals/TendGardenModal';
import { TerrariumDetailModal } from './components/modals/TerrariumDetailModal';
import { HabitDetailModal } from './components/modals/HabitDetailModal';

const MainContent: React.FC = () => {
  const { activeTab } = useGarden();

  return (
    <main className="flex-1 w-full max-w-lg mx-auto px-4 pb-28 pt-2 transition-opacity duration-200">
      {activeTab === 'garden' && <GardenScreen />}
      {activeTab === 'habits' && <HabitsScreen />}
      {activeTab === 'analytics' && <AnalyticsScreen />}
      {activeTab === 'community' && <CommunityScreen />}
    </main>
  );
};

export default function App() {
  return (
    <GardenProvider>
      <div className="min-h-screen flex flex-col justify-between bg-[#fbf9f4] text-[#1b1c19] selection:bg-[#d4e4ce] selection:text-[#163328]">
        {/* Top App Bar */}
        <Header />

        {/* Dynamic Main Screen Canvas */}
        <MainContent />

        {/* Bottom Navigation & Floating Action Button */}
        <BottomNav />

        {/* Interactive Modals & Sheets */}
        <AddHabitModal />
        <TendGardenModal />
        <TerrariumDetailModal />
        <HabitDetailModal />
      </div>
    </GardenProvider>
  );
}
