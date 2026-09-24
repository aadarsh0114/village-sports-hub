import React from 'react';
import { Bookmark, Plus } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  shortlistCount: number;
  onOpenShortlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  shortlistCount,
  onOpenShortlist,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single element Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-black tracking-tight text-emerald-950 hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
        >
          Village Sports Hub
        </button>

        {/* Zone 2: 4-5 Nav Links, single line with subtle underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('discover')}
            className={`transition-colors hover:text-emerald-950 cursor-pointer whitespace-nowrap py-1 border-b-2 ${
              currentView === 'discover'
                ? 'border-emerald-800 text-emerald-950 font-semibold'
                : 'border-transparent'
            }`}
          >
            Discover Talent
          </button>
          <button
            onClick={() => onNavigate('opportunities')}
            className={`transition-colors hover:text-emerald-950 cursor-pointer whitespace-nowrap py-1 border-b-2 ${
              currentView === 'opportunities'
                ? 'border-emerald-800 text-emerald-950 font-semibold'
                : 'border-transparent'
            }`}
          >
            Trials & Grants
          </button>
          <button
            onClick={() => onNavigate('districts')}
            className={`transition-colors hover:text-emerald-950 cursor-pointer whitespace-nowrap py-1 border-b-2 ${
              currentView === 'districts'
                ? 'border-emerald-800 text-emerald-950 font-semibold'
                : 'border-transparent'
            }`}
          >
            District Map
          </button>
          <button
            onClick={() => onNavigate('support-pool')}
            className={`transition-colors hover:text-emerald-950 cursor-pointer whitespace-nowrap py-1 border-b-2 ${
              currentView === 'support-pool'
                ? 'border-emerald-800 text-emerald-950 font-semibold'
                : 'border-transparent'
            }`}
          >
            Backers Pool
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenShortlist}
            className="relative px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-lg hover:border-stone-300 hover:bg-stone-100 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-700"
            title="View Shortlisted Athletes"
          >
            <Bookmark size={15} className="text-emerald-800" />
            <span className="hidden sm:inline">Shortlist</span>
            {shortlistCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-900 text-white text-[11px] font-bold rounded-full tabular-nums">
                {shortlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('register')}
            className="px-4 py-2 text-xs font-bold text-emerald-950 bg-lime-400 hover:bg-lime-300 active:scale-98 rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <Plus size={15} className="stroke-[2.5]" />
            <span>Register Athlete</span>
          </button>
        </div>
      </div>
    </header>
  );
};
