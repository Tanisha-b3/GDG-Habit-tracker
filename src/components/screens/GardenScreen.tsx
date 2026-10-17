import React from 'react';
import { WeekStrip } from '../WeekStrip';
import { HeroSanctuaryCard } from '../HeroSanctuaryCard';
import { MindfulQuoteBanner } from '../MindfulQuoteBanner';
import { HabitRoutineSection } from '../HabitRoutineSection';
import { useGarden } from '../../context/GardenContext';

export const GardenScreen: React.FC = () => {
  const { habits } = useGarden();

  const morningHabits = habits.filter((h) => h.section === 'morning' && !h.archived);
  const focusHabits = habits.filter((h) => h.section === 'focus' && !h.archived);
  const eveningHabits = habits.filter((h) => h.section === 'evening' && !h.archived);

  return (
    <div className="space-y-5">
      {/* 1. Week Date Strip */}
      <WeekStrip />

      {/* 2. Hero Sanctuary Card */}
      <HeroSanctuaryCard />

      {/* 3. Mindful Note Banner */}
      <MindfulQuoteBanner />

      {/* 4. Daily Habit Routines */}
      <div className="space-y-4">
        <HabitRoutineSection
          sectionKey="morning"
          title="Morning Sanctuary"
          iconName="light_mode"
          habits={morningHabits}
        />

        <HabitRoutineSection
          sectionKey="focus"
          title="Focus & Craft"
          iconName="psychology"
          habits={focusHabits}
        />

        <HabitRoutineSection
          sectionKey="evening"
          title="Evening Wind-down"
          iconName="bedtime"
          habits={eveningHabits}
        />
      </div>
    </div>
  );
};
