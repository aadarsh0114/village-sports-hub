import React from 'react';
import { Athlete } from '../types/sports';
import { X, Bookmark, Trash2, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { AthleteImage } from './AthleteImage';

interface ScoutShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shortlistedAthletes: Athlete[];
  onRemove: (id: string | number) => void;
  onSelectAthlete: (athlete: Athlete) => void;
}

export const ScoutShortlistDrawer: React.FC<ScoutShortlistDrawerProps> = ({
  isOpen,
  onClose,
  shortlistedAthletes,
  onRemove,
  onSelectAthlete,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex justify-between items-center bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-900 rounded-lg">
              <Bookmark size={18} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                Scout Shortlist
              </h3>
              <p className="text-xs text-stone-500">
                {shortlistedAthletes.length} bookmarked athlete{shortlistedAthletes.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* List of athletes */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {shortlistedAthletes.length === 0 ? (
            <div className="text-center py-16 px-4 text-stone-400">
              <Bookmark size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-stone-700 text-sm mb-1">
                No Athletes Shortlisted Yet
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Bookmark rising players from the talent directory to track their progress, prepare trial call-sheets, or compare metrics.
              </p>
            </div>
          ) : (
            shortlistedAthletes.map((athlete) => (
              <div
                key={athlete.id}
                className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-emerald-700 transition-colors"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    onClose();
                    onSelectAthlete(athlete);
                  }}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-900 shrink-0">
                    <AthleteImage src={athlete.photo} name={athlete.name} sport={athlete.sport} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-stone-900 text-sm truncate">
                        {athlete.name}
                      </h4>
                      {athlete.verified && (
                        <ShieldCheck size={13} className="text-emerald-700 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-stone-500 truncate">
                      {athlete.sport} · {athlete.ageGroup} · {athlete.district}
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-800">
                      ₹{athlete.needs.goal.toLocaleString()} goal ({Math.round((athlete.needs.current / athlete.needs.goal) * 100)}% raised)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onRemove(athlete.id)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                    title="Remove from shortlist"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {shortlistedAthletes.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 bg-white border border-stone-200 hover:border-stone-400 text-stone-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Scouting Dossier</span>
            </button>
            <p className="text-[11px] text-stone-400 text-center">
              Shortlist is preserved in local session storage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
