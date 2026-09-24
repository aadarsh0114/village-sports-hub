import React, { useState } from 'react';
import { Trophy, Activity, Target, Zap, Shield, Flame } from 'lucide-react';

interface AthleteImageProps {
  src: string;
  name: string;
  sport: string;
  className?: string;
  badgeContent?: React.ReactNode;
}

export const AthleteImage: React.FC<AthleteImageProps> = ({
  src,
  name,
  sport,
  className = "w-full h-full object-cover",
  badgeContent
}) => {
  const [hasError, setHasError] = useState(false);

  // Sport color theme & icon
  const getSportVisual = (sportName: string) => {
    switch (sportName.toLowerCase()) {
      case 'cricket':
        return {
          bg: 'from-emerald-900 via-emerald-800 to-stone-900',
          accent: 'text-lime-400',
          icon: Trophy,
          tag: 'Cricket'
        };
      case 'athletics':
        return {
          bg: 'from-teal-900 via-emerald-900 to-stone-900',
          accent: 'text-emerald-300',
          icon: Zap,
          tag: 'Track & Field'
        };
      case 'football':
        return {
          bg: 'from-sky-950 via-slate-900 to-emerald-950',
          accent: 'text-sky-300',
          icon: Activity,
          tag: 'Football'
        };
      case 'kabaddi':
        return {
          bg: 'from-amber-950 via-stone-900 to-emerald-950',
          accent: 'text-amber-400',
          icon: Shield,
          tag: 'Kabaddi'
        };
      case 'archery':
        return {
          bg: 'from-indigo-950 via-stone-900 to-teal-950',
          accent: 'text-cyan-300',
          icon: Target,
          tag: 'Archery'
        };
      case 'wrestling':
        return {
          bg: 'from-orange-950 via-red-950 to-stone-900',
          accent: 'text-orange-400',
          icon: Flame,
          tag: 'Wrestling'
        };
      default:
        return {
          bg: 'from-emerald-950 via-stone-900 to-stone-950',
          accent: 'text-lime-400',
          icon: Trophy,
          tag: sportName
        };
    }
  };

  const visual = getSportVisual(sport);
  const IconComponent = visual.icon;

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-900">
      {!hasError ? (
        <img
          src={src}
          alt={`Profile portrait of ${name}, ${sport} athlete`}
          referrerPolicy="no-referrer"
          className={className}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : null}

      {/* Styled CSS/SVG Fallback if image fails or before loading */}
      {hasError && (
        <div className={`w-full h-full bg-gradient-to-br ${visual.bg} flex flex-col items-center justify-center p-6 text-center select-none relative`}>
          {/* Subtle geometric lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="rural-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#rural-grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 shadow-inner">
              <IconComponent size={28} className={visual.accent} />
            </div>
            <span className="text-3xl font-black text-white tracking-wider mb-1">
              {initials}
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-300">
              {visual.tag} Athlete
            </span>
          </div>
        </div>
      )}

      {badgeContent && (
        <div className="absolute top-3 left-3 z-10">
          {badgeContent}
        </div>
      )}
    </div>
  );
};
