import React, { useState } from 'react';
import { Athlete, AthleteVideo } from '../types/sports';
import { AthleteImage } from '../components/AthleteImage';
import { 
  ArrowLeft, MapPin, ShieldCheck, Trophy, Video, Play, 
  Heart, Calendar, Phone, Share2, CheckCircle, Scale, 
  Building, Check, Activity
} from 'lucide-react';

interface ProfilePageProps {
  athlete: Athlete;
  onBack: () => void;
  onOpenSupportModal: (athlete: Athlete) => void;
  onOpenTrialModal: (athlete: Athlete) => void;
  onOpenVideoModal: (video: AthleteVideo, athlete: Athlete) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string | number, e: React.MouseEvent) => void;
  isComparing: boolean;
  onToggleCompare: (athlete: Athlete, e: React.MouseEvent) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  athlete,
  onBack,
  onOpenSupportModal,
  onOpenTrialModal,
  onOpenVideoModal,
  isBookmarked,
  onToggleBookmark,
  isComparing,
  onToggleCompare,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const percentFunded = Math.min(
    100,
    Math.round((athlete.needs.current / athlete.needs.goal) * 100)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Talent Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleCompare(athlete, e)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isComparing
                ? 'bg-lime-400 border-lime-400 text-emerald-950 font-bold'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Scale size={14} />
            <span>{isComparing ? 'Comparing' : 'Compare Athlete'}</span>
          </button>

          <button
            onClick={(e) => onToggleBookmark(athlete.id, e)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-emerald-800 border-emerald-800 text-white'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            title="Copy athlete profile URL"
          >
            {copiedLink ? <Check size={16} className="text-emerald-700" /> : <Share2 size={16} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (4 cols): Media, Crowdfund Box, Coach info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Photo Frame */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-900 aspect-[4/5] relative">
            <AthleteImage
              src={athlete.photo}
              name={athlete.name}
              sport={athlete.sport}
              className="w-full h-full object-cover"
              badgeContent={
                athlete.verified ? (
                  <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-emerald-300 flex items-center gap-1.5 border border-emerald-500/30 shadow-md">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Verified Athlete</span>
                  </div>
                ) : null
              }
            />
          </div>

          {/* Crowdfunding Support Card */}
          <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-900 shadow-md">
            <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Heart size={16} fill="currentColor" />
              <span>Direct Athlete Crowdfund</span>
            </div>
            <h3 className="text-xl font-black mb-1">
              Support {athlete.name}'s Next Step
            </h3>
            <p className="text-xs text-stone-300 mb-4 leading-relaxed italic">
              "{athlete.needs.reason}"
            </p>

            <div className="mb-2 flex justify-between text-xs font-semibold tabular-nums">
              <span className="text-stone-300">
                Raised: <strong className="text-white">₹{athlete.needs.current.toLocaleString()}</strong>
              </span>
              <span className="text-lime-300">
                Goal: ₹{athlete.needs.goal.toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-lime-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentFunded}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-stone-400 mb-5">
              <span>{percentFunded}% funded</span>
              <span>{athlete.needs.backersCount} verified community backers</span>
            </div>

            {/* Target Breakdown preview */}
            <div className="bg-white/5 rounded-xl p-3 mb-5 border border-white/10 space-y-1.5">
              <p className="text-[11px] font-bold uppercase text-stone-400 tracking-wider">
                Audited Expense Breakdown:
              </p>
              {athlete.needs.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-stone-300">
                  <span className="truncate mr-2">• {item.item}</span>
                  <span className="font-mono text-lime-300 tabular-nums">₹{item.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenSupportModal(athlete)}
              className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 active:scale-98 text-emerald-950 font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer text-center"
            >
              Back this Athlete (UPI / Card)
            </button>
          </div>

          {/* Coach & Academy Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
              Coach & Grassroots Club
            </span>
            <h4 className="font-bold text-stone-900 text-base mb-0.5">
              {athlete.coach.name}
            </h4>
            <p className="text-xs text-stone-600 mb-3">
              {athlete.coach.club}
            </p>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
                <CheckCircle size={13} />
                Verified Mentor
              </span>
              {athlete.coach.phone && (
                <span className="text-stone-500 font-mono">
                  {athlete.coach.phone}
                </span>
              )}
            </div>
          </div>

          {/* Scout Action Card */}
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-1.5">
              <Building size={16} className="text-emerald-800" />
              For Scouts & Selectors
            </h4>
            <p className="text-xs text-stone-600 mb-4">
              Registered with official trials? Send an accredited trial invitation with logistics details.
            </p>
            <button
              onClick={() => onOpenTrialModal(athlete)}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Issue Official Trial Invitation
            </button>
          </div>
        </div>

        {/* Right Column (8 cols): Bio, Stats, Physicals, Video Player, Honors */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Dossier */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-500 mb-2">
              <span className="text-emerald-800 font-bold">{athlete.sport}</span>
              <span aria-hidden="true">·</span>
              <span>{athlete.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{athlete.ageGroup}</span>
              <span aria-hidden="true">·</span>
              <span>{athlete.gender}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 mb-2 tracking-tight">
              {athlete.name}
            </h1>

            <p className="text-sm text-stone-600 flex items-center gap-1 mb-4">
              <MapPin size={16} className="text-emerald-800 shrink-0" />
              <span>{athlete.village}, {athlete.mandal} Mandal, {athlete.district}, {athlete.state}</span>
            </p>

            {athlete.verificationAuthority && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                <span>
                  <strong>Official Verification:</strong> {athlete.verificationAuthority} ({athlete.verificationDate})
                </span>
              </div>
            )}
          </div>

          {/* Grassroots Narrative / Bio */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              Athlete Journey & Scout Background
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed bg-white p-5 rounded-2xl border border-stone-200">
              {athlete.bio}
            </p>
          </div>

          {/* Discipline Stats Grid */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Key Verified Performance Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(athlete.stats).map(([label, val]) => (
                <div key={label} className="bg-white p-4 rounded-xl border border-stone-200">
                  <p className="text-xs text-stone-500 font-medium truncate mb-1">{label}</p>
                  <p className="text-xl font-black text-emerald-950 tabular-nums">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Physical & Fitness Benchmarks */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Physical & Athletic Benchmarks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <p className="text-[11px] text-stone-500 font-medium">Height</p>
                <p className="text-base font-bold text-stone-900 font-mono tabular-nums">{athlete.physicalMetrics.height || "—"}</p>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <p className="text-[11px] text-stone-500 font-medium">Weight</p>
                <p className="text-base font-bold text-stone-900 font-mono tabular-nums">{athlete.physicalMetrics.weight || "—"}</p>
              </div>
              {athlete.physicalMetrics.yoYoScore && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <p className="text-[11px] text-stone-500 font-medium">Yo-Yo Endurance</p>
                  <p className="text-base font-bold text-stone-900 font-mono tabular-nums">{athlete.physicalMetrics.yoYoScore}</p>
                </div>
              )}
              {athlete.physicalMetrics.speed100m && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <p className="text-[11px] text-stone-500 font-medium">100m Dash Time</p>
                  <p className="text-base font-bold text-stone-900 font-mono tabular-nums">{athlete.physicalMetrics.speed100m}</p>
                </div>
              )}
              {athlete.physicalMetrics.verticalJump && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <p className="text-[11px] text-stone-500 font-medium">Vertical Jump</p>
                  <p className="text-base font-bold text-stone-900 font-mono tabular-nums">{athlete.physicalMetrics.verticalJump}</p>
                </div>
              )}
              {athlete.physicalMetrics.wingspan && (
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <p className="text-[11px] text-stone-500 font-medium">Wingspan</p>
                  <p className="text-base font-bold text-stone-900 font-mono tabular-nums">{athlete.physicalMetrics.wingspan}</p>
                </div>
              )}
            </div>
          </div>

          {/* Verified Video Highlight Reel */}
          {athlete.videos && athlete.videos.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Verified Performance Tape
                </h3>
                <span className="text-xs text-stone-500">
                  {athlete.videos.length} highlight {athlete.videos.length === 1 ? 'reel' : 'reels'}
                </span>
              </div>

              <div className="space-y-4">
                {athlete.videos.map((vid, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenVideoModal(vid, athlete)}
                    className="group bg-stone-900 text-white rounded-2xl overflow-hidden border border-stone-800 hover:border-lime-400/50 transition-all cursor-pointer relative"
                  >
                    <div className="aspect-video sm:aspect-[21/9] bg-stone-950 relative flex items-center justify-center overflow-hidden">
                      <AthleteImage
                        src={athlete.photo}
                        name={athlete.name}
                        sport={athlete.sport}
                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                      <div className="w-16 h-16 rounded-full bg-lime-400/90 text-emerald-950 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform shadow-xl">
                        <Play size={28} className="ml-1 fill-emerald-950" />
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                        <div>
                          <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider block">
                            Recorded: {vid.recordedAt}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {vid.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono bg-stone-900/80 px-2.5 py-1 rounded-md text-stone-300">
                          {vid.duration}
                        </span>
                      </div>
                    </div>

                    {/* Chapter pill previews */}
                    <div className="p-4 bg-stone-900 flex flex-wrap items-center gap-2 text-xs border-t border-stone-800">
                      <span className="text-stone-400 font-semibold mr-1">Key Chapters:</span>
                      {vid.highlights.map((ch, chIdx) => (
                        <span
                          key={chIdx}
                          className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded text-[11px] font-medium"
                        >
                          {ch.label} ({ch.time})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Honors & Achievements */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" />
              Federation & Tournament Achievements
            </h3>
            <div className="space-y-2.5">
              {athlete.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-stone-200 flex items-center gap-3 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-sm font-semibold text-stone-800">
                    {ach}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
