import React, { useState } from 'react';
import { useGarden } from '../../context/GardenContext';
import { RoutineSection } from '../../types/garden';

const BOTANICAL_ICONS = [
  'self_improvement',
  'water_full',
  'wb_sunny',
  'timer',
  'menu_book',
  'phonelink_off',
  'auto_stories',
  'spa',
  'local_florist',
  'nature',
  'eco',
  'forest',
  'nightlight',
  'bedtime',
  'fitness_center',
  'hiking',
  'favorite',
  'psychology',
  'yard',
  'local_cafe',
];

export const AddHabitModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addHabit } = useGarden();

  const [title, setTitle] = useState('');
  const [section, setSection] = useState<RoutineSection>('morning');
  const [frequency, setFrequency] = useState('Daily');
  const [drops, setDrops] = useState<number>(15);
  const [icon, setIcon] = useState('spa');
  const [notes, setNotes] = useState('');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addHabit({
      title: title.trim(),
      section,
      frequency,
      drops,
      icon,
      notes: notes.trim() || undefined,
    });

    // Reset and close
    setTitle('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#eae8e3] max-h-[90vh] overflow-y-auto no-scrollbar space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eae8e3] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d4e4ce] text-[#163328] flex items-center justify-center">
              <span className="material-symbols-outlined text-base">psychology</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#163328] font-serif-botanical">
                Plant a New Ritual
              </h3>
              <p className="text-[11px] text-[#727974]">
                Choose your intention and routine time.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-[#f5f3ee] flex items-center justify-center text-[#727974] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Habit Title */}
          <div>
            <label className="block text-xs font-semibold text-[#163328] mb-1">
              Ritual Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 15m Breathwork, Evening Tea, Gentle Yoga"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#fbf9f4] border border-[#eae8e3] rounded-xl px-3 py-2 text-sm text-[#163328] placeholder-[#727974] focus:outline-none focus:ring-2 focus:ring-[#2d4a3e]"
            />
          </div>

          {/* Routine Section */}
          <div>
            <label className="block text-xs font-semibold text-[#163328] mb-1">
              Sanctuary Period
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'morning', label: 'Morning Sanctuary', icon: 'light_mode' },
                { id: 'focus', label: 'Focus & Craft', icon: 'psychology' },
                { id: 'evening', label: 'Evening Wind-down', icon: 'bedtime' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSection(item.id as RoutineSection)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    section === item.id
                      ? 'bg-[#d4e4ce] border-[#536251] text-[#163328] font-semibold'
                      : 'bg-[#fbf9f4] border-[#eae8e3] text-[#424844] hover:bg-[#f5f3ee]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  <span className="text-[10px] leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#163328] mb-1">
              Botanical Symbol
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {BOTANICAL_ICONS.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                    icon === ic
                      ? 'bg-[#163328] text-white border-[#163328] scale-105 shadow-xs'
                      : 'bg-[#f5f3ee] text-[#536251] border-[#eae8e3] hover:bg-[#eae8e3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{ic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency & Drops Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#163328] mb-1">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-[#fbf9f4] border border-[#eae8e3] rounded-xl px-3 py-2 text-xs text-[#163328] focus:outline-none focus:ring-1 focus:ring-[#2d4a3e]"
              >
                <option value="Daily">Daily</option>
                <option value="5x/week">5x / week</option>
                <option value="Weekdays">Weekdays</option>
                <option value="3x/week">3x / week</option>
                <option value="Weekends">Weekends</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#163328] mb-1">
                Dew Drops Reward
              </label>
              <div className="flex gap-1">
                {[10, 15, 20, 25].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDrops(d)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      drops === d
                        ? 'bg-[#2d4a3e] text-white border-[#2d4a3e]'
                        : 'bg-[#fbf9f4] text-[#424844] border-[#eae8e3]'
                    }`}
                  >
                    +{d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mindful Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#163328] mb-1">
              Intention / Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Inhale 4 counts, exhale 6 counts slowly"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#fbf9f4] border border-[#eae8e3] rounded-xl px-3 py-2 text-xs text-[#163328] placeholder-[#727974] focus:outline-none focus:ring-1 focus:ring-[#2d4a3e]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#163328] hover:bg-[#2d4a3e] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">spa</span>
              <span>Cultivate Habit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
