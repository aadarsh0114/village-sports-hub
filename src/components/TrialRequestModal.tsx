import React, { useState } from 'react';
import { Athlete, TrialRequest } from '../types/sports';
import { X, Calendar, MapPin, Building, Mail, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import { addTrialRequest } from '../utils/storage';

interface TrialRequestModalProps {
  athlete: Athlete;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: (trial: TrialRequest) => void;
}

export const TrialRequestModal: React.FC<TrialRequestModalProps> = ({
  athlete,
  isOpen,
  onClose,
  onRequestSubmitted,
}) => {
  const [scoutName, setScoutName] = useState('');
  const [organization, setOrganization] = useState('');
  const [trialDate, setTrialDate] = useState('');
  const [trialLocation, setTrialLocation] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrial: TrialRequest = {
      id: `trial-${Date.now()}`,
      athleteId: athlete.id,
      athleteName: athlete.name,
      scoutName,
      organization,
      trialDate,
      trialLocation,
      contactEmail,
      contactPhone,
      message,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    addTrialRequest(newTrial);
    onRequestSubmitted(newTrial);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Building size={16} className="text-emerald-700" />
              <span>Official Trial Call</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 mb-1">
              Request Trial: {athlete.name}
            </h2>
            <p className="text-sm text-stone-600 mb-5">
              Send an official trial invitation directly to {athlete.name} and their verified coach ({athlete.coach.name}).
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Scout / Selector Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={scoutName}
                    onChange={(e) => setScoutName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Club / Academy / Association
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad FC Academy"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Proposed Trial Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={trialDate}
                      onChange={(e) => setTrialDate(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Trial Venue / Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gachibowli Stadium, Hyd"
                    value={trialLocation}
                    onChange={(e) => setTrialLocation(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="scout@club.org"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 12345"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Specific Instructions / Provisions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Travel allowance and lodging will be provided. Please bring white kit and district certificate."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none resize-none"
                />
              </div>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <span>Invitations are logged with the District Sports Officer to protect minor athletes from fraudulent trials.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Send Official Trial Invitation
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-stone-900 mb-2">Invitation Dispatched!</h3>
            <p className="text-sm text-stone-600 mb-5 max-w-sm mx-auto">
              Your official trial request has been dispatched to {athlete.name} and Coach {athlete.coach.name}. An SMS confirmation has been triggered.
            </p>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-1 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-500">Scheduled Date:</span>
                <span className="font-semibold text-stone-800">{trialDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Venue:</span>
                <span className="font-semibold text-stone-800">{trialLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Organization:</span>
                <span className="font-semibold text-stone-800">{organization}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
