export type RoutineSection = 'morning' | 'focus' | 'evening';

export interface Habit {
  id: string;
  title: string;
  section: RoutineSection;
  frequency: string;
  drops: number;
  streak: number;
  icon: string;
  completedDates: string[]; // ['2026-05-24', ...]
  notes?: string;
  archived?: boolean;
}

export type PlantStage = 'Sprout' | 'Sapling' | 'Lush Foliage' | 'Flowering Bloom' | 'Ancient Canopy';

export interface Specimen {
  id: string;
  name: string;
  species: string;
  stage: PlantStage;
  day: number;
  description: string;
  cultivatedPercent: number;
  nextThreshold: string;
  streak: number;
  vitality: number;
  totalWaterDrops: number;
  imageUrl: string;
  level: number;
}

export interface DayInfo {
  dateStr: string; // '2026-05-24'
  dayLetter: string; // 'M', 'T', 'W', etc.
  dayNum: number; // 19, 20, 24, etc.
  isToday: boolean;
  hasActivity: boolean;
}

export interface CommunityGardener {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  plantName: string;
  species: string;
  streak: number;
  vitality: number;
  dewReceivedToday: number;
  sentDewToday: boolean;
  plantImg: string;
}

export type NavigationTab = 'garden' | 'habits' | 'analytics' | 'community';
