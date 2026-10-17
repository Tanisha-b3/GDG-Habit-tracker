import React, { useState } from 'react';
import { useGarden } from '../../context/GardenContext';

export const CommunityScreen: React.FC = () => {
  const { communityGardeners, sendDewToGardener } = useGarden();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSendDew = (id: string, name: string) => {
    sendDewToGardener(id);
    setToastMessage(`Sent +5 Dew Drops to ${name}'s terrarium! 💧 (+2 karma drops earned)`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const totalGroveDew = 84210 + communityGardeners.reduce((s, g) => s + g.dewReceivedToday, 0);

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-[22px] font-bold text-[#163328] font-serif-botanical">
          The Community Greenhouse
        </h2>
        <p className="text-[12px] text-[#424844]">
          Cultivate side-by-side with fellow mindful gardeners. Share dew drops and peace.
        </p>
      </div>

      {/* Global Grove Vitality */}
      <div className="bg-[#163328] text-white rounded-2xl p-4 botanical-card-shadow relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#adcebe]/20 blur-xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#adcebe] uppercase tracking-wider">
              Grove Collective Vitality
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#2d4a3e] text-[#adcebe]">
              Global Sanctuary
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-serif-botanical font-bold text-white tabular-nums">
              {totalGroveDew.toLocaleString()}
            </span>
            <span className="text-xs text-[#adcebe]">dew drops nurtured today</span>
          </div>
          <p className="text-xs text-[#adcebe]/90 italic">
            “When one leaf prospers, the entire forest breathes easier.”
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-[#d4e4ce] text-[#163328] border border-[#adcebe] rounded-xl px-3 py-2 text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-[#163328] font-bold">
            ×
          </button>
        </div>
      )}

      {/* Gardeners List */}
      <div className="space-y-2.5">
        <h3 className="text-[15px] font-semibold text-[#163328] font-serif-botanical px-1">
          Fellow Gardeners in Bloom
        </h3>

        {communityGardeners.map((gardener) => (
          <div
            key={gardener.id}
            className="bg-white rounded-xl p-3.5 border border-[#eae8e3] botanical-card-shadow flex items-center justify-between gap-3 hover:border-[#adcebe] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* User Avatar with Level Ring */}
              <div className="relative shrink-0">
                <img
                  src={gardener.avatarUrl}
                  alt={gardener.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#d4e4ce]"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#163328] text-white text-[9px] font-bold px-1 rounded-full border border-white">
                  L{gardener.level}
                </span>
              </div>

              <div className="truncate flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-semibold text-[#163328] truncate">
                    {gardener.name}
                  </h4>
                  <span className="text-[10px] text-[#536251] font-medium bg-[#f5f3ee] px-1.5 py-0.5 rounded-md shrink-0">
                    🔥 {gardener.streak}d
                  </span>
                </div>

                <div className="text-[11px] text-[#727974] flex items-center gap-1.5 mt-0.5 truncate">
                  <span className="text-[#163328] font-medium">{gardener.plantName}</span>
                  <span>({gardener.species})</span>
                </div>

                <div className="text-[10px] text-[#536251] mt-1 flex items-center gap-1">
                  <span>💧 Received {gardener.dewReceivedToday} dew drops today</span>
                </div>
              </div>
            </div>

            {/* Dew Gift Button */}
            <button
              onClick={() => handleSendDew(gardener.id, gardener.name)}
              disabled={gardener.sentDewToday}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                gardener.sentDewToday
                  ? 'bg-[#f0eee9] text-[#727974] cursor-default'
                  : 'bg-[#d4e4ce] hover:bg-[#adcebe] text-[#163328] active:scale-95 shadow-2xs'
              }`}
            >
              <span className="text-xs">💧</span>
              <span>{gardener.sentDewToday ? 'Blessed' : 'Send Dew'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
