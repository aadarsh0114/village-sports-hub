import React, { useState, useEffect } from 'react';
import { Athlete } from '../types/sports';
import { X, CheckCircle, Heart, CreditCard, Smartphone, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SupportModalProps {
  athlete: Athlete;
  isOpen: boolean;
  onClose: () => void;
  onSupportSuccess: (amount: number, donorName: string, message: string) => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  athlete,
  isOpen,
  onClose,
  onSupportSuccess,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Trigger high-impact celebratory confetti cannons
  const triggerConfettiEffect = () => {
    try {
      // Main central burst
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { x: 0.5, y: 0.55 },
        zIndex: 10000,
        colors: ['#10b981', '#84cc16', '#eab308', '#059669', '#3b82f6', '#f59e0b', '#ffffff'],
        startVelocity: 45,
        scalar: 1.15,
      });

      // Left-side burst
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.65 },
          zIndex: 10000,
          colors: ['#10b981', '#84cc16', '#fbbf24', '#ffffff'],
          startVelocity: 42,
        });
      }, 160);

      // Right-side burst
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.65 },
          zIndex: 10000,
          colors: ['#10b981', '#84cc16', '#fbbf24', '#ffffff'],
          startVelocity: 42,
        });
      }, 320);
    } catch (err) {
      console.error('Confetti trigger error:', err);
    }
  };

  // Reset modal state when closed or opened fresh
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPledgeAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  const remainingNeeded = Math.max(0, athlete.needs.goal - athlete.needs.current);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPledgeAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Fire confetti celebration effect
      triggerConfettiEffect();

      onSupportSuccess(
        currentPledgeAmount,
        donorName.trim() || 'Anonymous Backer',
        message.trim()
      );
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Heart size={16} className="text-emerald-700" />
              <span>Direct Athlete Crowdfund</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 mb-1">
              Back {athlete.name}
            </h2>
            <p className="text-sm text-stone-600 mb-5">
              100% of contributions go directly toward verified travel, sports equipment, and trial fees.
            </p>

            {/* Target Breakdown Box */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-semibold text-stone-600">Current Progress</span>
                <span className="text-xs font-bold text-stone-900 tabular-nums">
                  ₹{athlete.needs.current.toLocaleString()} of ₹{athlete.needs.goal.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-emerald-700 h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (athlete.needs.current / athlete.needs.goal) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-stone-600 italic">
                "{athlete.needs.reason}"
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Contribution Amount
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[500, 1000, 2500, 5000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        !customAmount && selectedAmount === amt
                          ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-bold">₹</span>
                  <input
                    type="number"
                    placeholder="Or enter custom amount..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="100"
                    max="100000"
                    className="w-full pl-7 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              {/* Donor info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name (or leave for Anon)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Suresh Kumar"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp (for receipt)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    required
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              {/* Note for athlete */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Words of Encouragement
                </label>
                <input
                  type="text"
                  placeholder="e.g. Play hard in the state trials, whole district is proud!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              {/* Payment selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Payment Method (Simulated Sandbox)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Smartphone size={16} /> UPI (GPay / PhonePe / Paytm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-900'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard size={16} /> Debit / Credit Card
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter UPI VPA (e.g. user@okhdfcbank)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck size={14} className="text-emerald-700 shrink-0" />
                <span>Escrow managed by Village Sports Hub District Trust. Verifiable disbursal.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing || currentPledgeAmount <= 0}
                  className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Confirming Transaction...</span>
                  ) : (
                    <span>Contribute ₹{currentPledgeAmount.toLocaleString()} Now</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
              <CheckCircle size={36} className="text-emerald-700" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-100 text-emerald-900 rounded-full text-xs font-bold mb-2">
              <Sparkles size={14} className="text-emerald-700" />
              <span>Pledge Confirmed & Disbursed</span>
            </div>
            <h3 className="text-2xl font-black text-stone-900 mb-2">Thank You!</h3>
            <p className="text-sm text-stone-600 mb-5 max-w-sm mx-auto">
              Your contribution of <strong className="text-stone-900">₹{currentPledgeAmount.toLocaleString()}</strong> has been credited to {athlete.name}'s equipment and trial travel fund.
            </p>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-1.5 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-500">Athlete:</span>
                <span className="font-semibold text-stone-800">{athlete.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">District:</span>
                <span className="font-semibold text-stone-800">{athlete.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Receipt Ref:</span>
                <span className="font-mono text-stone-800">VSH-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Beneficiary Purpose:</span>
                <span className="font-medium text-emerald-800 truncate max-w-[200px]">{athlete.needs.reason}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={triggerConfettiEffect}
                className="py-2.5 px-4 bg-lime-100 hover:bg-lime-200 text-emerald-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Celebrate Again 🎉</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Back to Athlete Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
