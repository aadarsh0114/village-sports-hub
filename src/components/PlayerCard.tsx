import React from 'react';
import { Athlete } from '../types/sports';
import { AthleteImage } from './AthleteImage';
import { MapPin, ShieldCheck, Bookmark, ArrowUpRight, Scale } from 'lucide-react';

interface PlayerCardProps {
  athlete: Athlete;
  onSelect: (athlete: Athlete) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string | number, e: React.MouseEvent) => void;
  isComparing?: boolean;
  onToggleCompare?: (athlete: Athlete, e: React.MouseEvent) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  athlete,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  isComparing = false,
  onToggleCompare,
}) => {
  const percentFunded = Math.min(
    100,
    Math.round((athlete.needs.current / athlete.needs.goal) * 100)
  );

  return (
    <div
      onClick={() => onSelect(athlete)}
      className="group bg-white rounded-xl border border-stone-200 hover:border-emerald-700/50 hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Visual Header */}
      <div className="relative h-56 w-full overflow-hidden bg-stone-900">
        <AthleteImage
          src={athlete.photo}
          name={athlete.name}
          sport={athlete.sport}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          badgeContent={
            athlete.verified ? (
              <div className="bg-stone-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>Verified</span>
              </div>
            ) : null
          }
        />

        {/* Quick action buttons on card image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onToggleCompare && (
            <button
              onClick={(e) => onToggleCompare(athlete, e)}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                isComparing
                  ? 'bg-lime-400 text-emerald-950 font-bold'
                  : 'bg-stone-900/70 text-white hover:bg-stone-900/90'
              }`}
              title={isComparing ? "Remove from comparison" : "Add to comparison"}
            >
              <Scale size={14} />
            </button>
          )}

          <button
            onClick={(e) => onToggleBookmark(athlete.id, e)}
            className={`p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-900/70 text-white hover:bg-stone-900/90'
            }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark athlete"}
          >
            <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Quiet baseline gradient with sport indicator */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/85 to-transparent flex items-end p-3">
          <div className="text-xs font-semibold text-stone-200 flex items-center gap-2">
            <span className="text-lime-400 font-bold">{athlete.sport}</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="text-stone-300">{athlete.category}</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Athlete Name & Age */}
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-stone-900 text-lg group-hover:text-emerald-900 transition-colors">
              {athlete.name}
            </h3>
            <span className="text-xs text-stone-500 font-medium tabular-nums">
              {athlete.ageGroup}
            </span>
          </div>

          {/* Location unboxed metadata */}
          <div className="flex items-center text-xs text-stone-500 mb-4">
            <MapPin size={13} className="mr-1 text-stone-400 shrink-0" />
            <span className="truncate">{athlete.village}, {athlete.district}</span>
          </div>

          {/* Key verified stats preview */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(athlete.stats).slice(0, 2).map(([key, value]) => (
              <div key={key} className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <p className="text-[11px] text-stone-500 font-medium truncate mb-0.5">{key}</p>
                <p className="font-bold text-stone-800 text-sm tabular-nums truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship / Needs progress */}
        <div className="pt-3 border-t border-stone-100 mt-2">
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-stone-600">
              Needs ₹{athlete.needs.goal.toLocaleString()}
            </span>
            <span className="text-emerald-800 font-semibold tabular-nums">
              {percentFunded}% raised
            </span>
          </div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-emerald-700 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentFunded}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">
              {athlete.needs.backersCount} {athlete.needs.backersCount === 1 ? 'backer' : 'backers'}
            </span>
            <span className="font-bold text-emerald-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              View Profile <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
