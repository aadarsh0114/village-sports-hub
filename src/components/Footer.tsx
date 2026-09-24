import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2500);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-20 md:pb-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Wordmark & Proposition */}
        <div className="md:col-span-1 space-y-4">
          <span className="text-lg font-black tracking-tight text-white block">
            Village Sports Hub
          </span>
          <p className="text-xs text-stone-400 leading-relaxed">
            Empowering the next generation of sporting heroes from rural and tribal talukas. Built on the belief that talent has no address.
          </p>
          <p className="text-[11px] text-stone-500">
            Registered Grassroots Sports Trust · Telangana & All-India Network
          </p>
        </div>

        {/* Col 2: Platform Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
            Talent & Trials
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('discover')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Browse Athlete Profiles
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('opportunities')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Upcoming Selection Trials
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('districts')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Regional District Clusters
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('register')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Athlete Registration Form
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Community & Scouts */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
            Scouts & Backers
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('support-pool')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Travel Grant Pool
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('discover')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Scout Call-Sheet Guidelines
              </button>
            </li>
            <li>
              <span className="text-stone-500">
                Federation Verification Policy
              </span>
            </li>
            <li>
              <span className="text-stone-500">
                Child Protection & Anti-Fraud
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter & Trial Alerts */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400">
            Trial Alerts
          </h4>
          <p className="text-xs text-stone-400">
            Receive WhatsApp & email notifications when state selection dates are scheduled in your district.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-1.5">
              <input
                type="email"
                required
                placeholder="Enter email or phone..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-lime-400"
              />
              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-300 text-emerald-950 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                {subscribed ? <Check size={14} /> : <ArrowRight size={14} />}
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-lime-400">
                Subscribed to district trial updates!
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <p>© 2026 Village Sports Hub. Dedicated to rural athletes across India.</p>
        <div className="flex items-center gap-6">
          <span>Non-Commercial Grassroots Initiative</span>
          <span>·</span>
          <span>Verified Scout Privacy Code</span>
        </div>
      </div>
    </footer>
  );
};
