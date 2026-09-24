import React, { useState, useMemo } from 'react';
import { Athlete } from '../types/sports';
import { PlayerCard } from '../components/PlayerCard';
import { DistrictMap } from '../components/DistrictMap';
import { Search, Filter, ShieldCheck, Scale, Map, LayoutGrid, X } from 'lucide-react';

interface DiscoverPageProps {
  athletes: Athlete[];
  onSelectAthlete: (athlete: Athlete) => void;
  bookmarkedIds: (string | number)[];
  onToggleBookmark: (id: string | number, e: React.MouseEvent) => void;
  comparingAthletes: Athlete[];
  onToggleCompare: (athlete: Athlete, e: React.MouseEvent) => void;
  onOpenCompareModal: () => void;
  selectedDistrictFilter?: string;
  onDistrictFilterChange?: (district: string) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  athletes,
  onSelectAthlete,
  bookmarkedIds,
  onToggleBookmark,
  comparingAthletes,
  onToggleCompare,
  onOpenCompareModal,
  selectedDistrictFilter = 'All',
  onDistrictFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'funding' | 'achievements'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const sportsList = ['All', 'Cricket', 'Athletics', 'Football', 'Kabaddi', 'Archery', 'Wrestling'];
  const ageGroups = ['All', 'U-14', 'U-16', 'U-18', 'U-21', 'Senior'];

  const filteredAthletes = useMemo(() => {
    return athletes
      .filter((a) => {
        const matchesQuery =
          searchQuery === '' ||
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.sport.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSport = selectedSport === 'All' || a.sport === selectedSport;
        const matchesAge = selectedAge === 'All' || a.ageGroup === selectedAge;
        const matchesGender = selectedGender === 'All' || a.gender === selectedGender;
        const matchesVerified = !verifiedOnly || a.verified;
        const matchesDistrict =
          selectedDistrictFilter === 'All' ||
          a.district.toLowerCase() === selectedDistrictFilter.toLowerCase();

        return (
          matchesQuery &&
          matchesSport &&
          matchesAge &&
          matchesGender &&
          matchesVerified &&
          matchesDistrict
        );
      })
      .sort((a, b) => {
        if (sortBy === 'funding') {
          const aRemaining = a.needs.goal - a.needs.current;
          const bRemaining = b.needs.goal - b.needs.current;
          return bRemaining - aRemaining;
        }
        if (sortBy === 'achievements') {
          return b.achievements.length - a.achievements.length;
        }
        return 0;
      });
  }, [
    athletes,
    searchQuery,
    selectedSport,
    selectedAge,
    selectedGender,
    verifiedOnly,
    selectedDistrictFilter,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedSport !== 'All' ||
    selectedAge !== 'All' ||
    selectedGender !== 'All' ||
    verifiedOnly ||
    selectedDistrictFilter !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSport('All');
    setSelectedAge('All');
    setSelectedGender('All');
    setVerifiedOnly(false);
    if (onDistrictFilterChange) onDistrictFilterChange('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Title & View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Grassroots Scouting Directory
          </span>
          <h1 className="text-3xl font-black text-stone-900 mt-1">
            Discover Rural Talent
          </h1>
          <p className="text-sm text-stone-500">
            Browse verified athletes with electronic timings, high-speed camera footage, and district federation approvals.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Athletes Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Map size={14} />
            <span>District Map</span>
          </button>
        </div>
      </div>

      {/* If Map View is selected */}
      {viewMode === 'map' && (
        <div className="mb-10">
          <DistrictMap
            selectedDistrict={selectedDistrictFilter}
            onSelectDistrict={(d) => {
              if (onDistrictFilterChange) onDistrictFilterChange(d);
            }}
          />
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-8 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-3 text-stone-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by athlete name, village, mandal, district or discipline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none text-stone-700 cursor-pointer"
            >
              <option value="default">Sort: Default Order</option>
              <option value="funding">Sort: Urgent Funding Needs</option>
              <option value="achievements">Sort: Most Honors & Medals</option>
            </select>

            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`py-2.5 px-3 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                verifiedOnly
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <ShieldCheck size={14} className={verifiedOnly ? 'text-lime-300' : 'text-emerald-700'} />
              <span>Verified Only</span>
            </button>
          </div>
        </div>

        {/* Segmented Filter Row 1: Sports buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-400 uppercase mr-2">Sport:</span>
          {sportsList.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedSport === sport
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        {/* Secondary filters: Age & Gender */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-500">Age:</span>
              <div className="flex gap-1">
                {ageGroups.map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedAge(grp)}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                      selectedAge === grp
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 pl-3 border-l border-stone-200">
              <span className="font-semibold text-stone-500">Gender:</span>
              <div className="flex gap-1">
                {['All', 'Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                      selectedGender === g
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {selectedDistrictFilter !== 'All' && (
              <div className="flex items-center gap-1.5 pl-3 border-l border-stone-200">
                <span className="font-semibold text-stone-500">District:</span>
                <span className="font-bold text-emerald-900">{selectedDistrictFilter}</span>
                <button
                  onClick={() => onDistrictFilterChange && onDistrictFilterChange('All')}
                  className="p-0.5 text-stone-400 hover:text-stone-700"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-emerald-900 font-semibold underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm font-bold text-stone-800">
          Showing <span className="tabular-nums font-black text-emerald-900">{filteredAthletes.length}</span> athlete{filteredAthletes.length === 1 ? '' : 's'}
        </p>

        {comparingAthletes.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">
              {comparingAthletes.length} selected for comparison
            </span>
            <button
              onClick={onOpenCompareModal}
              className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Scale size={13} />
              <span>Compare Head-to-Head</span>
            </button>
          </div>
        )}
      </div>

      {/* Athletes Grid */}
      {filteredAthletes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAthletes.map((athlete) => (
            <PlayerCard
              key={athlete.id}
              athlete={athlete}
              onSelect={onSelectAthlete}
              isBookmarked={bookmarkedIds.includes(athlete.id)}
              onToggleBookmark={onToggleBookmark}
              isComparing={comparingAthletes.some(a => String(a.id) === String(athlete.id))}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto">
          <Filter size={36} className="mx-auto text-stone-300 mb-3" />
          <h3 className="text-lg font-bold text-stone-800 mb-1">
            No Athletes Found
          </h3>
          <p className="text-xs text-stone-500 mb-4">
            We couldn't find any registered athletes matching your current search parameters. Try adjusting or clearing filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Sticky Bottom Comparison Floating Bar (if items selected) */}
      {comparingAthletes.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-stone-950 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 border border-stone-800 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-xs">
            <Scale size={16} className="text-lime-400" />
            <span>Comparing <strong>{comparingAthletes.length}</strong> athletes</span>
          </div>
          <button
            onClick={onOpenCompareModal}
            className="px-4 py-1.5 bg-lime-400 text-emerald-950 hover:bg-lime-300 text-xs font-bold rounded-full transition-all cursor-pointer"
          >
            View Comparison
          </button>
        </div>
      )}
    </div>
  );
};
