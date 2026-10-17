import React from 'react';
import { Habit } from '../types/garden';
import { useGarden } from '../context/GardenContext';

interface HabitRowProps {
  habit: Habit;
  isSelectedDateCompleted: boolean;
}

export const HabitRow: React.FC<HabitRowProps> = ({ habit, isSelectedDateCompleted }) => {
  const { toggleHabit, setSelectedHabitForDetail } = useGarden();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleHabit(habit.id);
  };

  return (
    <div
      onClick={() => setSelectedHabitForDetail(habit)}
      className={`bg-white rounded-xl p-3.5 botanical-card-shadow flex items-center justify-between gap-3 border transition-all cursor-pointer ${
        isSelectedDateCompleted
          ? 'border-[#eae8e3]/80 bg-white/90'
          : 'border-[#eae8e3] hover:border-[#adcebe] hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Category / Habit Icon */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isSelectedDateCompleted
              ? 'bg-[#d4e4ce]/50 text-[#536251]'
              : 'bg-[#f0eee9] text-[#163328]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">{habit.icon}</span>
        </div>

        {/* Text Stack */}
        <div className="truncate flex-1">
          <h4
            className={`text-[15px] font-medium truncate transition-all ${
              isSelectedDateCompleted
                ? 'line-through text-[#727974]'
                : 'text-[#163328]'
            }`}
          >
            {habit.title}
          </h4>

          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#727974]">
            <span>{habit.frequency}</span>
            <span className="text-[#c1c8c3]">•</span>
            <span
              className={`font-semibold ${
                isSelectedDateCompleted ? 'text-[#536251]' : 'text-[#163328]'
              }`}
            >
              +{habit.drops} drops
            </span>
            {habit.streak > 0 && (
              <>
                <span className="text-[#c1c8c3]">•</span>
                <span className="text-[#536251] font-medium">Streak {habit.streak}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Botanical Check Button */}
      <button
        onClick={handleToggle}
        aria-label={isSelectedDateCompleted ? 'Mark habit as incomplete' : 'Complete habit'}
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 active:scale-90 cursor-pointer ${
          isSelectedDateCompleted
            ? 'bg-[#2d4a3e] text-white shadow-xs'
            : 'border-2 border-[#2d4a3e]/30 hover:border-[#2d4a3e] bg-[#fbf9f4] hover:bg-[#d4e4ce]/30 text-transparent hover:text-[#163328]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-base font-bold ${
            isSelectedDateCompleted ? 'text-white' : 'hover:text-[#163328]'
          }`}
        >
          check
        </span>
      </button>
    </div>
  );
};
