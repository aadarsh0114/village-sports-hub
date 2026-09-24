export interface PhysicalMetrics {
  height: string;
  weight: string;
  wingspan?: string;
  yoYoScore?: string;
  speed100m?: string;
  verticalJump?: string;
}

export interface NeedBreakdown {
  item: string;
  cost: number;
}

export interface AthleteNeed {
  goal: number;
  current: number;
  reason: string;
  breakdown: NeedBreakdown[];
  backersCount: number;
}

export interface HighlightChapter {
  time: string;
  label: string;
}

export interface AthleteVideo {
  title: string;
  duration: string;
  recordedAt: string;
  highlights: HighlightChapter[];
  notes?: string;
}

export interface AthleteCoach {
  name: string;
  club: string;
  phone?: string;
  verified: boolean;
}

export interface Athlete {
  id: string | number;
  name: string;
  sport: 'Cricket' | 'Athletics' | 'Football' | 'Kabaddi' | 'Wrestling' | 'Archery' | 'Volleyball' | string;
  location: string;
  village: string;
  mandal: string;
  district: string;
  state: string;
  age: string;
  ageGroup: 'U-14' | 'U-16' | 'U-18' | 'U-21' | 'Senior';
  gender: 'Male' | 'Female' | 'Other';
  category: string;
  verified: boolean;
  verificationDate?: string;
  verificationAuthority?: string;
  photo: string;
  avatarSeed: string; // for consistent aesthetic SVG fallback
  accentColor: string;
  bio: string;
  coach: AthleteCoach;
  stats: Record<string, string | number>;
  physicalMetrics: PhysicalMetrics;
  achievements: string[];
  videos: AthleteVideo[];
  needs: AthleteNeed;
  scoutNotesCount: number;
  trialsAttended: number;
  status: 'Ready for Trials' | 'In Academy Camp' | 'Seeking Sponsorship' | 'Signed by Academy';
  dateRegistered: string;
}

export interface Opportunity {
  id: string | number;
  title: string;
  org: string;
  sport: string;
  type: 'Trial' | 'Scholarship' | 'Coaching' | 'Quota';
  location: string;
  district: string;
  state: string;
  deadline: string;
  ageEligibility: string;
  selectionBenefits: string[];
  contactPerson: string;
  quotaSlots: number;
  description: string;
  isVerifiedOrg: boolean;
}

export interface BackerContribution {
  id: string;
  athleteId: string | number;
  athleteName: string;
  donorName: string;
  amount: number;
  timestamp: string;
  message?: string;
}

export interface TrialRequest {
  id: string;
  athleteId: string | number;
  athleteName: string;
  scoutName: string;
  organization: string;
  trialDate: string;
  trialLocation: string;
  message: string;
  contactEmail: string;
  contactPhone: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  createdAt: string;
}
