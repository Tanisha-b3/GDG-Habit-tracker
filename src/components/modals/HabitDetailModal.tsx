import React, { useState } from 'react';
import { useGarden } from '../../context/GardenContext';
import { Habit } from '../../types/garden';

export const HabitDetailModal: React.FC = () => {
  const {
    selectedHabitForDetail,
    setSelectedHabitForDetail,
    selectedDate,
    toggleHabit,
    updateHabit,
    deleteHabit,
  } = useGarden();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDrops, setEditedDrops] = useState<number>(15);
  const [editedNotes, setEditedNotes] = useState('');

  if (!selectedHabitForDetail) return null;
  const habit = selectedHabitForDetail;
  const isCompletedToday = habit.completedDates.includes(selectedDate);

  const startEdit = () => {
    setEditedTitle(habit.title);
    setEditedDrops(habit.drops);
    setEditedNotes(habit.notes || '');
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!editedTitle.trim()) return;
    const updated: Habit = {
      ...habit,
      title: editedTitle.trim(),
      drops: editedDrops,
      notes: editedNotes.trim() || undefined,
    };
    updateHabit(updated);
    setSelectedHabitForDetail(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    setSelectedHabitForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#eae8e3] max-h-[90vh] overflow-y-auto no-scrollbar space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eae8e3] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#d4e4ce]/60 text-[#163328] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">{habit.icon}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#536251] uppercase tracking-wider block">
                {habit.section} sanctuary
              </span>
              <h3 className="text-[16px] font-bold text-[#163328] font-serif-botanical leading-tight">
                {habit.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedHabitForDetail(null)}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-[#f5f3ee] flex items-center justify-center text-[#727974] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {isEditing ? (
          /* Edit Mode */
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#163328] mb-1">Ritual Name</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full bg-[#fbf9f4] border border-[#eae8e3] rounded-xl px-3 py-2 text-xs text-[#163328] focus:outline-none focus:ring-1 focus:ring-[#2d4a3e]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#163328] mb-1">Dew Drops</label>
              <div className="flex gap-1.5">
                {[10, 15, 20, 25, 30].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setEditedDrops(d)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                      editedDrops === d
                        ? 'bg-[#2d4a3e] text-white border-[#2d4a3e]'
                        : 'bg-[#fbf9f4] text-[#424844] border-[#eae8e3]'
                    }`}
                  >
                    +{d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#163328] mb-1">
                Intention Notes
              </label>
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                rows={2}
                className="w-full bg-[#fbf9f4] border border-[#eae8e3] rounded-xl px-3 py-2 text-xs text-[#163328] focus:outline-none focus:ring-1 focus:ring-[#2d4a3e]"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={saveEdit}
                className="flex-1 py-2 bg-[#2d4a3e] text-white rounded-xl text-xs font-semibold hover:bg-[#163328] cursor-pointer"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-[#f5f3ee] text-[#424844] rounded-xl text-xs font-semibold hover:bg-[#eae8e3] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="space-y-4">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#f5f3ee] rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-[#727974] block">Current Streak</span>
                <span className="text-[16px] font-bold text-[#163328] tabular-nums">
                  {habit.streak} 🔥
                </span>
              </div>
              <div className="bg-[#f5f3ee] rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-[#727974] block">Dew Reward</span>
                <span className="text-[16px] font-bold text-[#536251] tabular-nums">
                  +{habit.drops} 💧
                </span>
              </div>
              <div className="bg-[#f5f3ee] rounded-xl p-2.5 text-center">
                <span className="text-[10px] text-[#727974] block">Total Harvests</span>
                <span className="text-[16px] font-bold text-[#163328] tabular-nums">
                  {habit.completedDates.length}
                </span>
              </div>
            </div>

            {/* Habit Notes */}
            {habit.notes && (
              <div className="bg-[#fbf9f4] rounded-xl p-3 border border-[#eae8e3]">
                <span className="text-[10px] font-semibold text-[#727974] uppercase tracking-wider block mb-1">
                  Mindful Intention
                </span>
                <p className="text-xs text-[#163328] italic">“{habit.notes}”</p>
              </div>
            )}

            {/* Toggle Completion for Current Date */}
            <div className="pt-1">
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-full h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isCompletedToday
                    ? 'bg-[#d4e4ce] text-[#163328] hover:bg-[#adcebe]'
                    : 'bg-[#2d4a3e] hover:bg-[#163328] text-white shadow-xs'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {isCompletedToday ? 'task_alt' : 'check_circle'}
                </span>
                <span>
                  {isCompletedToday ? 'Completed Today (Tap to undo)' : 'Mark as Completed Today'}
                </span>
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#eae8e3]">
              <button
                onClick={startEdit}
                className="text-xs font-semibold text-[#536251] hover:text-[#163328] flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Ritual</span>
              </button>

              <button
                onClick={handleDelete}
                className="text-xs font-semibold text-[#ba1a1a] hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
