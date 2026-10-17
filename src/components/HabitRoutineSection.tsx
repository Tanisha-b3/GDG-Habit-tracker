import React, { useState } from 'react';
import { RoutineSection, Habit } from '../types/garden';
import { HabitRow } from './HabitRow';
import { useGarden } from '../context/GardenContext';

interface HabitRoutineSectionProps {
  sectionKey: RoutineSection;
  title: string;
  iconName: string;
  habits: Habit[];
}

export const HabitRoutineSection: React.FC<HabitRoutineSectionProps> = ({
  title,
  iconName,
  habits,
}) => {
  const { selectedDate } = useGarden();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const completedCount = habits.filter((h) => h.completedDates.includes(selectedDate)).length;
  const totalCount = habits.length;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;
  const hasSomeCompleted = completedCount > 0;

  if (totalCount === 0) return null;

  return (
    <section className="space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#536251] text-lg fill-1">
            {iconName}
          </span>
          <h3 className="text-[17px] font-semibold text-[#163328] font-serif-botanical tracking-tight group-hover:text-[#2d4a3e]">
            {title}
          </h3>
          <span className="material-symbols-outlined text-xs text-[#727974] transition-transform duration-200">
            {isCollapsed ? 'expand_more' : 'expand_less'}
          </span>
        </button>

        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors ${
            isAllCompleted
              ? 'bg-[#d4e4ce] text-[#163328] font-semibold'
              : hasSomeCompleted
              ? 'bg-[#d4e4ce]/60 text-[#536251]'
              : 'bg-[#f0eee9] text-[#727974]'
          }`}
        >
          {completedCount} of {totalCount} Completed
        </span>
      </div>

      {!isCollapsed && (
        <div className="space-y-2 transition-all">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              isSelectedDateCompleted={habit.completedDates.includes(selectedDate)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
