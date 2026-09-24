import React from 'react';
import { Athlete, Opportunity } from '../types/sports';
import { PlayerCard } from '../components/PlayerCard';
import { ArrowRight, ShieldCheck, Trophy, Target, Sparkles, Heart, Users, MapPin, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  athletes: Athlete[];
  opportunities: Opportunity[];
  onSelectAthlete: (athlete: Athlete) => void;
  onNavigate: (view: string) => void;
  bookmarkedIds: (string | number)[];
  onToggleBookmark: (id: string | number, e: React.MouseEvent) => void;
  comparingAthletes: Athlete[];
  onToggleCompare: (athlete: Athlete, e: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  athletes,
  opportunities,
  onSelectAthlete,
  onNavigate,
  bookmarkedIds,
  onToggleBookmark,
  comparingAthletes,
  onToggleCompare,
}) => {
  const featuredAthletes = athletes.slice(0, 3);
  const urgentAthletes = athletes.filter(a => (a.needs.current / a.needs.goal) < 0.75).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-emerald-950 text-white pt-16 pb-20 px-6 overflow-hidden">
        {/* Subtle geometric background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-700/15 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            {/* Unboxed natural editorial proposition kicker */}
            <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span>Talent Has No Address · Grassroots Sports Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-balance">
              Your village should never limit your{' '}
              <span className="text-lime-400">sporting dream.</span>
            </h1>

            <p className="text-base sm:text-xl text-stone-300 mb-10 leading-relaxed max-w-2xl font-normal">
              Connecting high-potential rural athletes to certified coaches, state trial selectors, and direct community sponsors across India.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-emerald-950 rounded-xl font-bold text-base transition-all hover:shadow-lg active:scale-98 text-center cursor-pointer"
              >
                Register as Athlete
              </button>
              <button
                onClick={() => onNavigate('discover')}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl font-bold text-base transition-all text-center cursor-pointer"
              >
                Discover Talent
              </button>
              <button
                onClick={() => onNavigate('opportunities')}
                className="px-6 py-4 text-stone-300 hover:text-white font-semibold text-sm transition-colors text-center cursor-pointer"
              >
                Explore Open Trials →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Grassroots Quantitative Metrics */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { label: "Verified Rural Athletes", val: "12,400+", hint: "Across 7 sporting disciplines" },
            { label: "Certified Grassroots Coaches", val: "850+", hint: "District & school physical trainers" },
            { label: "Talukas & Villages", val: "2,100+", hint: "Non-metro sports clusters" },
            { label: "Direct Support Disbursed", val: "₹45.8L+", hint: "Travel, spikes, mats & nutrition" }
          ].map((item, i) => (
            <div key={i} className="border-l-2 border-emerald-800 pl-4">
              <p className="text-2xl sm:text-3xl font-black text-stone-900 tabular-nums">
                {item.val}
              </p>
              <p className="text-xs font-bold text-emerald-900 mt-1 uppercase tracking-tight">
                {item.label}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {item.hint}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Athletes Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              Top Scout Prospects
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              Featured Grassroots Athletes
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Standout rural performers with electronic timings, verified federation records, and video breakdown.
            </p>
          </div>

          <button
            onClick={() => onNavigate('discover')}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Athletes ({athletes.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAthletes.map((athlete) => (
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
      </section>

      {/* How It Works: Human Editorial Numbering */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              The Pathway
            </span>
            <h2 className="text-3xl font-black text-stone-900 mt-1">
              How Rural Athletes Reach the Professional Stage
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Replacing middlemen with direct verification, transparent community crowdfunding, and certified scout access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800">
                  01. Direct Village Registration
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">
                  Showcase Real Data, Not Rumors
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Athletes and school physical directors upload unedited match footage, GPS sprint times, bowling radar speeds, and federation certificates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>Verified by District Sports Authority</span>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800">
                  02. Target-Locked Crowdfunding
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">
                  No Talent Sits Out Due to Bus Fare
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Backers fund itemized equipment, spike shoes, hostel fees, and inter-state trial travel via instant UPI. Disbursals are audited and receipted.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>100% direct beneficiary allocation</span>
              </div>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800">
                  03. Direct Scout Invitations
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-2 mb-2">
                  Trials Come Directly to You
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pro franchise scouts and state academy selectors review biomechanics and issue official trial invitations directly to the athlete and coach.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>Anti-fraud registered call-sheet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Funding Spotlight Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-emerald-950 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">
              Time-Sensitive Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 mb-4">
              Help These Athletes Make Upcoming State Trials
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed mb-8">
              Several young athletes have qualified for state selections this month but need support for spike shoes, travel, and camp lodging. Every ₹500 directly bridges the gap.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('support-pool')}
                className="px-6 py-3 bg-lime-400 hover:bg-lime-300 text-emerald-950 font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Contribute to Travel Grant Pool
              </button>
              <button
                onClick={() => onNavigate('discover')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                Browse All Athletes Seeking Funds
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Trials & Scholarships Preview */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Upcoming Selections
            </span>
            <h2 className="text-2xl font-black text-stone-900 mt-1">
              Grassroots Opportunities
            </h2>
          </div>
          <button
            onClick={() => onNavigate('opportunities')}
            className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({opportunities.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.slice(0, 2).map((opt) => (
            <div
              key={opt.id}
              onClick={() => onNavigate('opportunities')}
              className="bg-white p-6 rounded-xl border border-stone-200 hover:border-emerald-700/50 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="font-bold text-emerald-900">{opt.type}</span>
                  <span aria-hidden="true">·</span>
                  <span>{opt.sport}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-red-600">Deadline: {opt.deadline}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  {opt.title}
                </h3>
                <p className="text-xs text-stone-500 mb-4 flex items-center gap-1">
                  <Users size={13} /> {opt.org} · <MapPin size={13} /> {opt.location}
                </p>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {opt.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {opt.quotaSlots} slots available
                </span>
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  Apply Now <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
