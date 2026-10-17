import React from 'react';
import { useGarden } from '../context/GardenContext';

export const WeekStrip: React.FC = () => {
  const { weekDays, selectedDate, setSelectedDate, habits } = useGarden();

  return (
    <section aria-label="Weekly Timeline" className="w-full">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1.5 py-1">
        {weekDays.map((day) => {
          const isSelected = selectedDate === day.dateStr;
          const isToday = day.isToday;

          // Check if user has habits completed on this day
          const completedCount = habits.filter((h) => h.completedDates.includes(day.dateStr)).length;
          const hasDoneHabits = completedCount > 0;

          if (isSelected) {
            return (
              <button
                key={day.dateStr}
                onClick={() => setSelectedDate(day.dateStr)}
                className="flex flex-col items-center justify-center min-w-[46px] py-2.5 rounded-xl bg-[#163328] text-white ring-2 ring-[#2d4a3e] ring-offset-2 ring-offset-[#fbf9f4] transition-all duration-150 scale-105 shadow-sm cursor-pointer"
              >
                <span className="text-[11px] font-bold text-[#adcebe]">{day.dayLetter}</span>
                <span className="text-[13px] font-bold mt-0.5 text-white tabular-nums">{day.dayNum}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#adcebe] mt-1"></span>
              </button>
            );
          }

          return (
            <button
              key={day.dateStr}
              onClick={() => setSelectedDate(day.dateStr)}
              className={`flex flex-col items-center justify-center min-w-[42px] py-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isToday
                  ? 'bg-[#d4e4ce]/60 text-[#163328] font-semibold border border-[#536251]/20'
                  : 'bg-[#f5f3ee] text-[#424844] hover:bg-[#eae8e3]'
              }`}
            >
              <span className="text-[11px] text-[#727974]">{day.dayLetter}</span>
              <span className="text-[12px] mt-0.5 font-medium tabular-nums">{day.dayNum}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 transition-colors ${
                  hasDoneHabits ? 'bg-[#536251]' : 'bg-[#eae8e3]'
                }`}
              ></span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
