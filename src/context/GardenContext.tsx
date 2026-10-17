import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Habit, Specimen, DayInfo, NavigationTab, CommunityGardener } from '../types/garden';
import {
  INITIAL_HABITS,
  INITIAL_SPECIMEN,
  INITIAL_WEEK_DAYS,
  COMMUNITY_GARDENERS,
  MINDFUL_QUOTES,
} from '../data/initialData';

interface GardenContextType {
  habits: Habit[];
  specimen: Specimen;
  weekDays: DayInfo[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  toggleHabit: (habitId: string, dateStr?: string) => void;
  addHabit: (newHabit: Omit<Habit, 'id' | 'completedDates' | 'streak'>) => void;
  updateHabit: (updated: Habit) => void;
  deleteHabit: (habitId: string) => void;
  tendGarden: () => { dropsGained: number; newlyHarvestedCount: number };
  quoteIndex: number;
  nextQuote: () => void;
  currentQuote: string;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  isTendModalOpen: boolean;
  setIsTendModalOpen: (open: boolean) => void;
  isTerrariumModalOpen: boolean;
  setIsTerrariumModalOpen: (open: boolean) => void;
  selectedHabitForDetail: Habit | null;
  setSelectedHabitForDetail: (habit: Habit | null) => void;
  communityGardeners: CommunityGardener[];
  sendDewToGardener: (gardenerId: string) => void;
  resetToDefaults: () => void;
  harvestReadyCount: number;
}

const GardenContext = createContext<GardenContextType | undefined>(undefined);

const HABITS_STORAGE_KEY = 'habitgarden_habits_v1';
const SPECIMEN_STORAGE_KEY = 'habitgarden_specimen_v1';
const COMMUNITY_STORAGE_KEY = 'habitgarden_community_v1';

export const GardenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem(HABITS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_HABITS;
  });

  const [specimen, setSpecimen] = useState<Specimen>(() => {
    try {
      const saved = localStorage.getItem(SPECIMEN_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SPECIMEN;
  });

  const [communityGardeners, setCommunityGardeners] = useState<CommunityGardener[]>(() => {
    try {
      const saved = localStorage.getItem(COMMUNITY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return COMMUNITY_GARDENERS;
  });

  const [selectedDate, setSelectedDate] = useState<string>('2026-05-24');
  const [activeTab, setActiveTab] = useState<NavigationTab>('garden');
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isTendModalOpen, setIsTendModalOpen] = useState<boolean>(false);
  const [isTerrariumModalOpen, setIsTerrariumModalOpen] = useState<boolean>(false);
  const [selectedHabitForDetail, setSelectedHabitForDetail] = useState<Habit | null>(null);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
    } catch {
      // ignore
    }
  }, [habits]);

  useEffect(() => {
    try {
      localStorage.setItem(SPECIMEN_STORAGE_KEY, JSON.stringify(specimen));
    } catch {
      // ignore
    }
  }, [specimen]);

  useEffect(() => {
    try {
      localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(communityGardeners));
    } catch {
      // ignore
    }
  }, [communityGardeners]);

  const weekDays = INITIAL_WEEK_DAYS.map((d) => ({
    ...d,
    isToday: d.dateStr === '2026-05-24',
  }));

  const currentQuote = MINDFUL_QUOTES[quoteIndex % MINDFUL_QUOTES.length];
  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MINDFUL_QUOTES.length);
  };

  // Toggle habit completion on a given date (defaults to selectedDate)
  const toggleHabit = (habitId: string, dateStr: string = selectedDate) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const isCompleted = habit.completedDates.includes(dateStr);
        let newCompletedDates: string[];
        let newStreak = habit.streak;

        if (isCompleted) {
          newCompletedDates = habit.completedDates.filter((d) => d !== dateStr);
          if (dateStr === '2026-05-24') {
            newStreak = Math.max(0, habit.streak - 1);
          }
        } else {
          newCompletedDates = [...habit.completedDates, dateStr];
          if (dateStr === '2026-05-24') {
            newStreak = habit.streak + 1;
          }
        }

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak: newStreak,
        };
      })
    );
  };

  // Count habits completed today
  const completedTodayCount = habits.filter((h) => h.completedDates.includes(selectedDate)).length;
  const harvestReadyCount = completedTodayCount;

  // Tend Garden & Harvest
  const tendGarden = () => {
    const completed = habits.filter((h) => h.completedDates.includes(selectedDate));
    const dropsGained = completed.reduce((sum, h) => sum + h.drops, 0);

    const newTotalDrops = specimen.totalWaterDrops + dropsGained;
    const newCultivatedPercent = Math.min(100, Math.round(specimen.cultivatedPercent + (completed.length >= 4 ? 5 : 2)));
    const newVitality = Math.min(100, Math.round(85 + (completed.length / Math.max(1, habits.length)) * 15));
    const newLevel = Math.floor(newTotalDrops / 100) + 1;

    setSpecimen((prev) => ({
      ...prev,
      totalWaterDrops: newTotalDrops,
      cultivatedPercent: newCultivatedPercent,
      vitality: newVitality,
      level: newLevel,
      nextThreshold: `${newCultivatedPercent}% Cultivated`,
    }));

    // Trigger serene botanical confetti
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2d4a3e', '#adcebe', '#d4e4ce', '#742f0c', '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    return { dropsGained, newlyHarvestedCount: completed.length };
  };

  const addHabit = (newHabitData: Omit<Habit, 'id' | 'completedDates' | 'streak'>) => {
    const newHabit: Habit = {
      ...newHabitData,
      id: `habit-${Date.now()}`,
      completedDates: [],
      streak: 0,
    };
    setHabits((prev) => [newHabit, ...prev]);
  };

  const updateHabit = (updated: Habit) => {
    setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  };

  const deleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  const sendDewToGardener = (gardenerId: string) => {
    setCommunityGardeners((prev) =>
      prev.map((g) => {
        if (g.id !== gardenerId) return g;
        if (g.sentDewToday) return g;
        return {
          ...g,
          dewReceivedToday: g.dewReceivedToday + 5,
          sentDewToday: true,
        };
      })
    );

    // Also earn 2 bonus drops for being generous!
    setSpecimen((prev) => ({
      ...prev,
      totalWaterDrops: prev.totalWaterDrops + 2,
    }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(HABITS_STORAGE_KEY);
    localStorage.removeItem(SPECIMEN_STORAGE_KEY);
    localStorage.removeItem(COMMUNITY_STORAGE_KEY);
    setHabits(INITIAL_HABITS);
    setSpecimen(INITIAL_SPECIMEN);
    setCommunityGardeners(COMMUNITY_GARDENERS);
    setSelectedDate('2026-05-24');
  };

  return (
    <GardenContext.Provider
      value={{
        habits,
        specimen,
        weekDays,
        selectedDate,
        setSelectedDate,
        activeTab,
        setActiveTab,
        toggleHabit,
        addHabit,
        updateHabit,
        deleteHabit,
        tendGarden,
        quoteIndex,
        nextQuote,
        currentQuote,
        isAddModalOpen,
        setIsAddModalOpen,
        isTendModalOpen,
        setIsTendModalOpen,
        isTerrariumModalOpen,
        setIsTerrariumModalOpen,
        selectedHabitForDetail,
        setSelectedHabitForDetail,
        communityGardeners,
        sendDewToGardener,
        resetToDefaults,
        harvestReadyCount,
      }}
    >
      {children}
    </GardenContext.Provider>
  );
};

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error('useGarden must be used within a GardenProvider');
  }
  return context;
};
