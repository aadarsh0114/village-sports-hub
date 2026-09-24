import React, { useState } from 'react';
import { Athlete, BackerContribution } from '../types/sports';
import { Heart, ShieldCheck, CheckCircle, Users, Trophy, Sparkles } from 'lucide-react';
import { getStoredBackers, addBackerContribution } from '../utils/storage';
import confetti from 'canvas-confetti';

interface SupportPoolPageProps {
  athletes: Athlete[];
  onSelectAthlete: (athlete: Athlete) => void;
}

export const SupportPoolPage: React.FC<SupportPoolPageProps> = ({
  athletes,
  onSelectAthlete,
}) => {
  const [pledgeAmount, setPledgeAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [targetSport, setTargetSport] = useState('All Sports');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [recentBackers, setRecentBackers] = useState<BackerContribution[]>(() => getStoredBackers());

  const currentAmount = customAmount ? Number(customAmount) || 0 : pledgeAmount;

  const totalRaisedAcrossAthletes = athletes.reduce((acc, a) => acc + a.needs.current, 0);
  const totalGoalAcrossAthletes = athletes.reduce((acc, a) => acc + a.needs.goal, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const contribution: BackerContribution = {
        id: `bc-${Date.now()}`,
        athleteId: 'pool',
        athleteName: targetSport === 'All Sports' ? 'Rural Travel Pool' : `${targetSport} Grant Pool`,
        donorName: donorName.trim() || 'Anonymous Patron',
        amount: currentAmount,
        timestamp: 'Just now',
        message: 'Supporting grassroots rural talent travel & shoes.'
      };

      addBackerContribution(contribution);
      setRecentBackers(getStoredBackers());
      setIsProcessing(false);
      setIsDone(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-900 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Heart size={16} fill="currentColor" />
            <span>Community Crowdfund Reserve</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            The Rural Sports Travel Grant Pool
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Every year, hundreds of village athletes qualify for state and national trials but miss the bus due to train tickets, lodging costs, and spike footwear. This community fund fills the exact gap.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Instant Pledge Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          {!isDone ? (
            <div>
              <h2 className="text-2xl font-black text-stone-900 mb-1">
                Contribute to the Travel Pool
              </h2>
              <p className="text-xs text-stone-500 mb-6">
                Funds are disbursed to registered athletes with official trial call letters within 48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Preset Amounts */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Select Contribution (₹)
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[1000, 2000, 5000, 10000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setPledgeAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          !customAmount && pledgeAmount === amt
                            ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Or enter custom amount in ₹..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Allocate to Specific Discipline
                  </label>
                  <select
                    value={targetSport}
                    onChange={(e) => setTargetSport(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none cursor-pointer"
                  >
                    <option value="All Sports">General Pool (Allocated by urgency of trial date)</option>
                    <option value="Athletics">Athletics (Sprint Spikes & National Meet Travel)</option>
                    <option value="Cricket">Cricket (Leather Kits & Zonal Selection Travel)</option>
                    <option value="Kabaddi">Kabaddi (Mat Shoes & Pro Franchise Trials)</option>
                    <option value="Archery">Archery (Carbon Target Arrows & Limbs)</option>
                    <option value="Football">Football (Studs, Shin Guards & AIFF Quotas)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hyderabad Sports Patrons"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone / WhatsApp (For receipt)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 12345"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                  <span>Public audit ledger published quarterly with athlete train tickets and equipment serials.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || currentAmount <= 0}
                  className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {isProcessing ? 'Processing Transaction...' : `Pledge ₹${currentAmount.toLocaleString()} to Travel Pool`}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-black text-stone-900 mb-2">Contribution Recorded!</h3>
              <p className="text-xs text-stone-600 mb-6 max-w-sm mx-auto">
                Thank you, {donorName || 'Patron'}! Your pledge of ₹{currentAmount.toLocaleString()} has been added to the {targetSport} reserve.
              </p>
              <button
                onClick={() => {
                  setIsDone(false);
                  setDonorName('');
                  setDonorPhone('');
                }}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
              >
                Make Another Contribution
              </button>
            </div>
          )}
        </div>

        {/* Right: Pool Ledger & Backers */}
        <div className="lg:col-span-5 space-y-6">
          {/* Metrics summary */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
              Community Pool Transparency
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs py-2 border-b border-stone-200">
                <span className="text-stone-600">Total Needs Across Athletes:</span>
                <span className="font-bold text-stone-900 font-mono tabular-nums">
                  ₹{totalGoalAcrossAthletes.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-stone-200">
                <span className="text-stone-600">Total Funded to Date:</span>
                <span className="font-bold text-emerald-800 font-mono tabular-nums">
                  ₹{totalRaisedAcrossAthletes.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-stone-200">
                <span className="text-stone-600">Overall Funding Ratio:</span>
                <span className="font-bold text-emerald-900 font-mono tabular-nums">
                  {Math.round((totalRaisedAcrossAthletes / (totalGoalAcrossAthletes || 1)) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Athletes with urgent deadlines */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
              Athletes Nearest to Trial Dates
            </h3>
            <div className="space-y-3">
              {athletes.slice(0, 3).map((ath) => (
                <div
                  key={ath.id}
                  onClick={() => onSelectAthlete(ath)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer border border-stone-100"
                >
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">{ath.name}</h4>
                    <p className="text-[11px] text-stone-500">{ath.sport} · {ath.district}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800">
                    ₹{(ath.needs.goal - ath.needs.current).toLocaleString()} needed
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
