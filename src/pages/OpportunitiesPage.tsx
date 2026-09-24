import React, { useState } from 'react';
import { Opportunity, Athlete } from '../types/sports';
import { 
  Trophy, Award, Users, MapPin, Calendar, CheckCircle2, 
  ArrowRight, ShieldCheck, Filter, X, Building 
} from 'lucide-react';
import { markOpportunityApplied } from '../utils/storage';
import confetti from 'canvas-confetti';

interface OpportunitiesPageProps {
  opportunities: Opportunity[];
  athletes: Athlete[];
  appliedIds: (string | number)[];
  onMarkApplied: (id: string | number) => void;
  onNavigateToPlayer: (athlete: Athlete) => void;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
  opportunities,
  athletes,
  appliedIds,
  onMarkApplied,
  onNavigateToPlayer,
}) => {
  const [filterType, setFilterType] = useState('All');
  const [filterSport, setFilterSport] = useState('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantAthleteId, setApplicantAthleteId] = useState<string>('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const filteredOpportunities = opportunities.filter((opt) => {
    const matchesType = filterType === 'All' || opt.type === filterType;
    const matchesSport = filterSport === 'All' || opt.sport === filterSport;
    return matchesType && matchesSport;
  });

  const handleOpenApply = (opt: Opportunity) => {
    setSelectedOpportunity(opt);
    setApplicationSuccess(false);
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOpportunity) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationSuccess(true);
      markOpportunityApplied(selectedOpportunity.id);
      onMarkApplied(selectedOpportunity.id);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
          Accredited Selection Calls
        </span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">
          Grassroots Trials & Scholarships
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Verified selection camps, SAI quotas, and elite sports academy fellowships for rural youth.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-stone-400 uppercase mr-2">Type:</span>
          {['All', 'Trial', 'Scholarship', 'Coaching', 'Quota'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterType === t
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t === 'All' ? 'All Types' : t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-stone-400 uppercase mr-2">Sport:</span>
          {['All', 'Cricket', 'Athletics', 'Kabaddi', 'Football'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterSport(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterSport === s
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opt) => {
          const isApplied = appliedIds.includes(opt.id);

          return (
            <div
              key={opt.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-700/50 transition-all flex flex-col lg:flex-row justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                    {opt.type}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-stone-800">{opt.sport}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500">Eligibility: {opt.ageEligibility}</span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-1.5">
                  {opt.title}
                </h3>

                <p className="text-xs text-stone-600 flex flex-wrap items-center gap-2 mb-4">
                  <span className="font-semibold text-stone-800 flex items-center gap-1">
                    <Users size={13} /> {opt.org}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {opt.location}
                  </span>
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 max-w-3xl">
                  {opt.description}
                </p>

                {/* Key selection benefits */}
                <div className="space-y-1.5 mb-2">
                  <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Selection Benefits:
                  </p>
                  {opt.selectionBenefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                      <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Action Block */}
              <div className="lg:w-64 flex flex-row lg:flex-col justify-between items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-bold uppercase text-stone-400 tracking-wider">
                    Application Deadline
                  </p>
                  <p className="text-sm font-bold text-red-600 tabular-nums">
                    {opt.deadline}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {opt.quotaSlots} Selection Slots
                  </p>
                </div>

                {isApplied ? (
                  <div className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>Application Submitted</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenApply(opt)}
                    className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Apply for Selection
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {isApplyModalOpen && selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X size={20} />
            </button>

            {!applicationSuccess ? (
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Accredited Trial Application
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-1">
                  {selectedOpportunity.title}
                </h3>
                <p className="text-xs text-stone-500 mb-5">
                  Organized by {selectedOpportunity.org} · {selectedOpportunity.location}
                </p>

                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  {/* Option to pick from existing registered athletes */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Select Registered Athlete (Optional)
                    </label>
                    <select
                      value={applicantAthleteId}
                      onChange={(e) => {
                        const id = e.target.value;
                        setApplicantAthleteId(id);
                        const athlete = athletes.find((a) => String(a.id) === id);
                        if (athlete) {
                          setApplicantName(athlete.name);
                        }
                      }}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none cursor-pointer"
                    >
                      <option value="">— Or apply manually below —</option>
                      {athletes.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.sport} · {a.ageGroup} · {a.district})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Athlete Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name as registered on Aadhar / School ID"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Aadhar ID (Last 4 Digits)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        required
                        placeholder="e.g. 5892"
                        value={aadharNumber}
                        onChange={(e) => setAadharNumber(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                    <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                    <span>Your application code and trial call card will be sent directly via SMS and registered with the selection committee.</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                    >
                      {isSubmitting ? 'Validating Application...' : 'Confirm & Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-2">Application Received!</h3>
                <p className="text-sm text-stone-600 mb-4 max-w-sm mx-auto">
                  {applicantName}'s application has been registered for {selectedOpportunity.title}.
                </p>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-1 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Applicant:</span>
                    <span className="font-semibold text-stone-800">{applicantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Trial Venue:</span>
                    <span className="font-semibold text-stone-800">{selectedOpportunity.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Call Card Reference:</span>
                    <span className="font-mono text-stone-800">SEL-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="w-full py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
