import React, { useState } from 'react';
import { DISTRICT_MAP_DATA } from '../data/mockAthletes';
import { MapPin, Users, Trophy, ArrowRight } from 'lucide-react';

interface DistrictMapProps {
  onSelectDistrict: (district: string) => void;
  selectedDistrict?: string;
}

export const DistrictMap: React.FC<DistrictMapProps> = ({
  onSelectDistrict,
  selectedDistrict,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const activeDistrictData = DISTRICT_MAP_DATA.find(
    (d) => d.district === (hoveredDistrict || selectedDistrict || DISTRICT_MAP_DATA[0].district)
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
            Regional Grassroots Belts
          </span>
          <h3 className="text-2xl font-black text-stone-900 mt-1">
            Telangana Rural Sports Districts
          </h3>
          <p className="text-sm text-stone-500">
            Select a district to view registered talent pipelines, local academies, and grassroots records.
          </p>
        </div>

        {selectedDistrict && (
          <button
            onClick={() => onSelectDistrict('All')}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer"
          >
            Clear District Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* District grid tiles */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DISTRICT_MAP_DATA.map((item) => {
            const isSelected = selectedDistrict === item.district;
            const isHovered = hoveredDistrict === item.district;

            return (
              <div
                key={item.district}
                onMouseEnter={() => setHoveredDistrict(item.district)}
                onMouseLeave={() => setHoveredDistrict(null)}
                onClick={() => onSelectDistrict(item.district)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-md'
                    : isHovered
                    ? 'bg-emerald-50/70 border-emerald-300 text-stone-900'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${isSelected ? 'text-lime-300' : 'text-emerald-800'}`}>
                    {item.athletesCount} Athletes
                  </span>
                  <MapPin size={14} className={isSelected ? 'text-lime-300' : 'text-stone-400'} />
                </div>
                <h4 className="font-bold text-sm mb-1">{item.district}</h4>
                <p className={`text-[11px] truncate ${isSelected ? 'text-stone-200' : 'text-stone-500'}`}>
                  {item.sports.join(' · ')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected District Spotlight Dossier */}
        <div className="lg:col-span-1 bg-stone-950 text-white p-6 rounded-xl border border-stone-800 flex flex-col justify-between h-full">
          {activeDistrictData ? (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-lime-400 font-bold uppercase tracking-wider mb-2">
                <MapPin size={14} />
                <span>{activeDistrictData.state}</span>
              </div>
              <h4 className="text-2xl font-black text-white mb-2">
                {activeDistrictData.district}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed mb-6">
                Active grassroots cluster with {activeDistrictData.athletesCount} verified athletes participating in state youth competitions.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs py-2 border-b border-stone-800">
                  <span className="text-stone-400">Total Talent Scouted:</span>
                  <span className="font-bold text-white tabular-nums">
                    {activeDistrictData.athletesCount} players
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-stone-800">
                  <span className="text-stone-400">Key Sports Disciplines:</span>
                  <span className="font-bold text-lime-300">
                    {activeDistrictData.sports.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-stone-800">
                  <span className="text-stone-400">District Sports Officer:</span>
                  <span className="text-white font-medium">Verified Channel</span>
                </div>
              </div>

              <button
                onClick={() => onSelectDistrict(activeDistrictData.district)}
                className="w-full py-2.5 px-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Filter Players from {activeDistrictData.district}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
