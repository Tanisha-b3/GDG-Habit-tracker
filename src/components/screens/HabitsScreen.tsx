import React, { useState } from 'react';
import { useGarden } from '../../context/GardenContext';
import { RoutineSection, Habit } from '../../types/garden';

export const HabitsScreen: React.FC = () => {
  const { habits, toggleHabit, selectedDate, setSelectedHabitForDetail, setIsAddModalOpen } =
    useGarden();
  const [filter, setFilter] = useState<'all' | RoutineSection>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHabits = habits.filter((h) => {
    if (h.archived) return false;
    if (filter !== 'all' && h.section !== filter) return false;
    if (searchQuery.trim() && !h.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const totalDailyDrops = habits.reduce((sum, h) => sum + h.drops, 0);

  return (
    <div className="space-y-4">
      {/* Top Title & Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#163328] font-serif-botanical">
            Rituals &amp; Habits
          </h2>
          <p className="text-[12px] text-[#424844]">
            Manage your daily intentions and cultivate consistent practice.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-[#2d4a3e] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-[#163328] transition-all cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Habit</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-xl p-3 border border-[#eae8e3] text-center botanical-card-shadow">
          <span className="text-[11px] text-[#727974] block">Active Habits</span>
          <span className="text-[18px] font-bold text-[#163328] font-serif-botanical tabular-nums">
            {habits.length}
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-[#eae8e3] text-center botanical-card-shadow">
          <span className="text-[11px] text-[#727974] block">Best Streak</span>
          <span className="text-[18px] font-bold text-[#163328] font-serif-botanical flex items-center justify-center gap-1 tabular-nums">
            {bestStreak} <span className="text-xs">🔥</span>
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-[#eae8e3] text-center botanical-card-shadow">
          <span className="text-[11px] text-[#727974] block">Daily Dew Cap</span>
          <span className="text-[18px] font-bold text-[#536251] font-serif-botanical tabular-nums">
            +{totalDailyDrops}
          </span>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="space-y-2">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#727974] text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search habits or intentions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#eae8e3] rounded-xl pl-9 pr-3 py-2 text-xs text-[#163328] placeholder-[#727974] focus:outline-none focus:ring-1 focus:ring-[#2d4a3e]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {(
            [
              { id: 'all', label: 'All Routines' },
              { id: 'morning', label: 'Morning' },
              { id: 'focus', label: 'Focus & Craft' },
              { id: 'evening', label: 'Evening' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filter === item.id
                  ? 'bg-[#163328] text-white shadow-xs'
                  : 'bg-[#f5f3ee] text-[#424844] hover:bg-[#eae8e3]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-2.5 pt-1">
        {filteredHabits.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-[#eae8e3] p-6 space-y-2">
            <span className="material-symbols-outlined text-3xl text-[#536251]">spa</span>
            <p className="text-sm font-medium text-[#163328]">No habits found in this sanctuary</p>
            <p className="text-xs text-[#727974]">Plant a new seed of intention to begin.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2d4a3e] text-white text-xs font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Add Habit</span>
            </button>
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const isCompletedToday = habit.completedDates.includes(selectedDate);

            return (
              <div
                key={habit.id}
                onClick={() => setSelectedHabitForDetail(habit)}
                className="bg-white rounded-xl p-3.5 border border-[#eae8e3] botanical-card-shadow hover:border-[#adcebe] transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#f0eee9] text-[#163328] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">{habit.icon}</span>
                  </div>

                  <div className="truncate flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-semibold text-[#163328] truncate">
                        {habit.title}
                      </h4>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#d4e4ce]/60 text-[#536251] capitalize shrink-0">
                        {habit.section}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#727974]">
                      <span>{habit.frequency}</span>
                      <span className="text-[#c1c8c3]">•</span>
                      <span className="text-[#163328] font-bold">+{habit.drops} drops</span>
                      <span className="text-[#c1c8c3]">•</span>
                      <span className="text-[#536251] font-medium flex items-center gap-0.5">
                        <span className="text-[10px]">🔥</span> Streak {habit.streak}
                      </span>
                    </div>

                    {habit.notes && (
                      <p className="text-[11px] text-[#727974] italic truncate mt-0.5">
                        {habit.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Toggle Check */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHabit(habit.id);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-90 ${
                    isCompletedToday
                      ? 'bg-[#2d4a3e] text-white shadow-xs'
                      : 'border-2 border-[#2d4a3e]/30 hover:border-[#2d4a3e] bg-[#fbf9f4] text-transparent hover:text-[#163328]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">check</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
