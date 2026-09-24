import React from 'react';
import { Athlete } from '../types/sports';
import { X, ShieldCheck, MapPin, Scale } from 'lucide-react';
import { AthleteImage } from './AthleteImage';

interface CompareModalProps {
  athletes: Athlete[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveAthlete: (id: string | number) => void;
  onSelectAthlete: (athlete: Athlete) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  athletes,
  isOpen,
  onClose,
  onRemoveAthlete,
  onSelectAthlete,
}) => {
  if (!isOpen || athletes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg">
              <Scale size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">
                Head-to-Head Athlete Comparison
              </h2>
              <p className="text-xs text-stone-500">
                Evaluating {athletes.length} athlete{athletes.length > 1 ? 's' : ''} across physical metrics, verified stats, and funding requirements.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable table grid */}
        <div className="overflow-x-auto flex-1 pt-4">
          <div className="min-w-[600px] grid" style={{ gridTemplateColumns: `180px repeat(${athletes.length}, minmax(200px, 1fr))` }}>
            {/* Header Row: Athlete Profiles */}
            <div className="p-3 font-bold text-xs text-stone-400 uppercase tracking-wider self-end">
              Athlete Profile
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 bg-stone-50 rounded-t-xl border border-b-0 border-stone-200 relative">
                <button
                  onClick={() => onRemoveAthlete(a.id)}
                  className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-700 bg-white rounded-md shadow-xs"
                  title="Remove from comparison"
                >
                  <X size={14} />
                </button>
                <div className="w-16 h-16 rounded-lg overflow-hidden mb-2 bg-stone-900">
                  <AthleteImage src={a.photo} name={a.name} sport={a.sport} />
                </div>
                <h4
                  onClick={() => {
                    onClose();
                    onSelectAthlete(a);
                  }}
                  className="font-bold text-stone-900 text-sm hover:text-emerald-800 cursor-pointer underline-offset-2 hover:underline"
                >
                  {a.name}
                </h4>
                <p className="text-xs text-stone-500">
                  {a.sport} · {a.ageGroup}
                </p>
                <p className="text-[11px] text-stone-400 truncate">
                  {a.village}, {a.district}
                </p>
              </div>
            ))}

            {/* Row: Status & Verification */}
            <div className="p-3 font-semibold text-xs text-stone-500 border-t border-stone-200">
              Verification Status
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50/50 text-xs">
                {a.verified ? (
                  <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
                    <ShieldCheck size={14} className="text-emerald-700" />
                    Verified by District Body
                  </span>
                ) : (
                  <span className="text-stone-500">Self-submitted (Pending)</span>
                )}
              </div>
            ))}

            {/* Row: Physical Metrics */}
            <div className="p-3 font-semibold text-xs text-stone-500 border-t border-stone-200">
              Height & Weight
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50/50 text-xs font-mono tabular-nums text-stone-800">
                {a.physicalMetrics.height || "—"} / {a.physicalMetrics.weight || "—"}
              </div>
            ))}

            {/* Row: Yo-Yo / Speed */}
            <div className="p-3 font-semibold text-xs text-stone-500 border-t border-stone-200">
              Fitness Benchmarks
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50/50 text-xs space-y-1">
                {a.physicalMetrics.yoYoScore && (
                  <div>
                    <span className="text-[11px] text-stone-500">Yo-Yo Test: </span>
                    <strong className="font-mono tabular-nums text-stone-900">{a.physicalMetrics.yoYoScore}</strong>
                  </div>
                )}
                {a.physicalMetrics.speed100m && (
                  <div>
                    <span className="text-[11px] text-stone-500">100m Dash: </span>
                    <strong className="font-mono tabular-nums text-stone-900">{a.physicalMetrics.speed100m}</strong>
                  </div>
                )}
                {a.physicalMetrics.verticalJump && (
                  <div>
                    <span className="text-[11px] text-stone-500">Vertical: </span>
                    <strong className="font-mono tabular-nums text-stone-900">{a.physicalMetrics.verticalJump}</strong>
                  </div>
                )}
              </div>
            ))}

            {/* Row: Primary Stats */}
            <div className="p-3 font-semibold text-xs text-stone-500 border-t border-stone-200">
              Discipline Stats
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50/50 text-xs space-y-1">
                {Object.entries(a.stats).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-1 text-[11px]">
                    <span className="text-stone-500 truncate">{k}:</span>
                    <span className="font-bold text-stone-800 tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Row: Top Achievements */}
            <div className="p-3 font-semibold text-xs text-stone-500 border-t border-stone-200">
              Top Honors
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50/50 text-xs space-y-1">
                {a.achievements.slice(0, 2).map((ach, i) => (
                  <p key={i} className="text-stone-700 text-[11px] leading-tight">
                    • {ach}
                  </p>
                ))}
              </div>
            ))}

            {/* Row: Funding Goal */}
            <div className="p-3 font-semibold text-xs text-stone-500 border-t border-stone-200">
              Sponsorship Need
            </div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50/50 text-xs">
                <p className="font-bold text-stone-900">₹{a.needs.goal.toLocaleString()}</p>
                <p className="text-[11px] text-emerald-800">
                  ₹{a.needs.current.toLocaleString()} raised ({Math.round((a.needs.current / a.needs.goal) * 100)}%)
                </p>
              </div>
            ))}

            {/* Action Row */}
            <div className="p-3 border-t border-stone-200"></div>
            {athletes.map((a) => (
              <div key={a.id} className="p-3 border-t border-stone-200 bg-stone-50 rounded-b-xl">
                <button
                  onClick={() => {
                    onClose();
                    onSelectAthlete(a);
                  }}
                  className="w-full py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Full Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
