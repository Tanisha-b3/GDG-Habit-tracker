import React from 'react';
import { useGarden } from '../../context/GardenContext';

export const AnalyticsScreen: React.FC = () => {
  const { specimen, habits, weekDays } = useGarden();

  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);

  // Daily performance breakdown for the current week
  const weekPerformance = weekDays.map((d) => {
    const doneCount = habits.filter((h) => h.completedDates.includes(d.dateStr)).length;
    const rate = Math.round((doneCount / Math.max(1, habits.length)) * 100);
    return {
      day: d.dayLetter,
      num: d.dayNum,
      date: d.dateStr,
      rate,
      doneCount,
      isToday: d.isToday,
    };
  });

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-[22px] font-bold text-[#163328] font-serif-botanical">
          Cultivation Analytics
        </h2>
        <p className="text-[12px] text-[#424844]">
          Reflecting on your consistency, terrarium vitality, and mindful rhythm.
        </p>
      </div>

      {/* Vitality & Terrarium Stage Overview */}
      <div className="bg-white rounded-2xl p-4 border border-[#eae8e3] botanical-card-shadow space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#727974] font-medium block">Terrarium Health</span>
            <div className="text-[24px] font-bold text-[#163328] font-serif-botanical flex items-center gap-1.5">
              <span>{specimen.vitality}%</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#d4e4ce] text-[#163328] font-semibold">
                Lush &amp; Hydrated
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#d4e4ce]/60 text-[#163328] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl fill-1">spa</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#727974]">
            <span>Canopy Stage Progress</span>
            <span className="font-semibold text-[#163328]">{specimen.cultivatedPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#eae8e3] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#2d4a3e] transition-all duration-500"
              style={{ width: `${specimen.cultivatedPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Rhythm Heatmap / Bar Chart */}
      <div className="bg-white rounded-2xl p-4 border border-[#eae8e3] botanical-card-shadow space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-[#163328] font-serif-botanical">
            Weekly Cultivation Rhythm
          </h3>
          <span className="text-[11px] text-[#536251] font-semibold">
            Avg {Math.round(weekPerformance.reduce((acc, curr) => acc + curr.rate, 0) / weekPerformance.length)}%
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2 items-end h-32">
          {weekPerformance.map((item) => (
            <div key={item.date} className="flex flex-col items-center h-full justify-end gap-1.5">
              <span className="text-[10px] text-[#727974] font-medium">{item.doneCount}✓</span>
              <div className="w-full bg-[#f0eee9] rounded-md h-20 flex items-end overflow-hidden p-0.5">
                <div
                  className={`w-full rounded-sm transition-all duration-500 ${
                    item.isToday
                      ? 'bg-[#163328]'
                      : item.rate > 50
                      ? 'bg-[#536251]'
                      : item.rate > 0
                      ? 'bg-[#adcebe]'
                      : 'bg-transparent'
                  }`}
                  style={{ height: `${Math.max(8, item.rate)}%` }}
                />
              </div>
              <div className="text-center">
                <span className={`text-[10px] block ${item.isToday ? 'font-bold text-[#163328]' : 'text-[#727974]'}`}>
                  {item.day}
                </span>
                <span className="text-[9px] text-[#c1c8c3]">{item.num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Routine Balance Breakdown */}
      <div className="bg-white rounded-2xl p-4 border border-[#eae8e3] botanical-card-shadow space-y-3">
        <h3 className="text-[16px] font-semibold text-[#163328] font-serif-botanical">
          Sanctuary Harmony
        </h3>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#163328] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#536251]">light_mode</span>
                Morning Sanctuary
              </span>
              <span className="text-[#727974] font-medium">85% consistency</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#eae8e3] overflow-hidden">
              <div className="h-full rounded-full bg-[#adcebe]" style={{ width: '85%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#163328] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#536251]">psychology</span>
                Focus &amp; Craft
              </span>
              <span className="text-[#727974] font-medium">75% consistency</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#eae8e3] overflow-hidden">
              <div className="h-full rounded-full bg-[#536251]" style={{ width: '75%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#163328] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#536251]">bedtime</span>
                Evening Wind-down
              </span>
              <span className="text-[#727974] font-medium">70% consistency</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#eae8e3] overflow-hidden">
              <div className="h-full rounded-full bg-[#2d4a3e]" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Milestones and Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#f5f3ee] rounded-xl p-3 border border-[#eae8e3] text-center">
          <span className="text-[11px] text-[#727974] block">Total Harvests</span>
          <span className="text-[20px] font-bold text-[#163328] font-serif-botanical tabular-nums">
            {totalCompletions}
          </span>
          <span className="text-[10px] text-[#536251]">rituals completed</span>
        </div>
        <div className="bg-[#f5f3ee] rounded-xl p-3 border border-[#eae8e3] text-center">
          <span className="text-[11px] text-[#727974] block">Max Consecutive</span>
          <span className="text-[20px] font-bold text-[#163328] font-serif-botanical tabular-nums">
            {bestStreak} Days
          </span>
          <span className="text-[10px] text-[#536251]">unbroken streak</span>
        </div>
      </div>
    </div>
  );
};
