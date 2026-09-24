import React, { useState } from 'react';
import { Athlete, AthleteVideo, AthleteNeed } from '../types/sports';
import { 
  Trophy, CheckCircle, ArrowRight, ArrowLeft, Upload, 
  MapPin, ShieldCheck, Heart, User, Video, Activity, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationPageProps {
  onAthleteCreated: (newAthlete: Athlete) => void;
  onCancel: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  onAthleteCreated,
  onCancel,
}) => {
  const [step, setStep] = useState(1);

  // Step 1: Personal & Geographic
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<'U-14' | 'U-16' | 'U-18' | 'U-21' | 'Senior'>('U-18');
  const [ageNumber, setAgeNumber] = useState('17');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [village, setVillage] = useState('');
  const [mandal, setMandal] = useState('');
  const [district, setDistrict] = useState('Nalgonda');
  const [state, setState] = useState('Telangana');
  const [phone, setPhone] = useState('');

  // Step 2: Sport & Discipline
  const [sport, setSport] = useState('Cricket');
  const [category, setCategory] = useState('');
  const [coachName, setCoachName] = useState('');
  const [coachClub, setCoachClub] = useState('');
  const [coachPhone, setCoachPhone] = useState('');
  const [bio, setBio] = useState('');

  // Step 3: Verified Performance Stats & Physical Metrics
  const [stat1Name, setStat1Name] = useState('Primary Metric');
  const [stat1Val, setStat1Val] = useState('');
  const [stat2Name, setStat2Name] = useState('Secondary Metric');
  const [stat2Val, setStat2Val] = useState('');
  const [height, setHeight] = useState('175 cm');
  const [weight, setWeight] = useState('65 kg');
  const [yoYoScore, setYoYoScore] = useState('19.2');
  const [speed100m, setSpeed100m] = useState('');
  const [achievement1, setAchievement1] = useState('');
  const [achievement2, setAchievement2] = useState('');

  // Step 4: Video Proof & Documentation
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState('02:45');
  const [videoDate, setVideoDate] = useState('August 2026');
  const [chapter1, setChapter1] = useState('');
  const [chapter2, setChapter2] = useState('');
  const [verificationAuthority, setVerificationAuthority] = useState('District Sports Authority');
  const [hasAadharProof, setHasAadharProof] = useState(true);

  // Step 5: Crowdfunding & Needs
  const [goalAmount, setGoalAmount] = useState<number>(15000);
  const [needReason, setNeedReason] = useState('');
  const [item1, setItem1] = useState('Professional Sports Equipment / Spikes');
  const [cost1, setCost1] = useState<number>(6500);
  const [item2, setItem2] = useState('State Trial Travel & Lodging');
  const [cost2, setCost2] = useState<number>(5500);
  const [item3, setItem3] = useState('Sports Nutrition & Supplement Support');
  const [cost3, setCost3] = useState<number>(3000);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle auto-suggesting sport metrics
  const handleSportChange = (s: string) => {
    setSport(s);
    if (s === 'Cricket') {
      setStat1Name('Bowling Speed');
      setStat1Val('130 km/h');
      setStat2Name('Wickets / Avg');
      setStat2Val('24 wickets');
      setCategory('Fast Bowler & All-rounder');
    } else if (s === 'Athletics') {
      setStat1Name('100m Personal Best');
      setStat1Val('11.8s');
      setStat2Name('200m Time');
      setStat2Val('24.2s');
      setCategory('100m / 200m Sprinter');
    } else if (s === 'Football') {
      setStat1Name('Goals Scored');
      setStat1Val('14 in 10 matches');
      setStat2Name('Top Sprint Speed');
      setStat2Val('31.5 km/h');
      setCategory('Forward / Striker');
    } else if (s === 'Kabaddi') {
      setStat1Name('Tackle Success Rate');
      setStat1Val('78%');
      setStat2Name('Super Tackles');
      setStat2Val('8');
      setCategory('Corner Defender');
    } else if (s === 'Archery') {
      setStat1Name('60m Cadet Score');
      setStat1Val('640 / 720');
      setStat2Name('Release Consistency');
      setStat2Val('95%');
      setCategory('Recurve Cadet');
    } else if (s === 'Wrestling') {
      setStat1Name('Weight Category');
      setStat1Val('57 kg Freestyle');
      setStat2Name('Bout Record');
      setStat2Val('18 Wins - 2 Losses');
      setCategory('57 kg Freestyle');
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const statsObj: Record<string, string | number> = {};
      if (stat1Val) statsObj[stat1Name || 'Key Metric 1'] = stat1Val;
      if (stat2Val) statsObj[stat2Name || 'Key Metric 2'] = stat2Val;

      const achievementsList: string[] = [];
      if (achievement1) achievementsList.push(achievement1);
      if (achievement2) achievementsList.push(achievement2);
      if (achievementsList.length === 0) {
        achievementsList.push(`District ${sport} Selection Finalist (2026)`);
      }

      const videosList: AthleteVideo[] = [
        {
          title: videoTitle || `Official Match Performance Tape - ${sport}`,
          duration: videoDuration || '02:30',
          recordedAt: videoDate || 'August 2026',
          highlights: [
            { time: '00:15', label: chapter1 || 'Action Execution & Technical Stance' },
            { time: '01:10', label: chapter2 || 'Competitive Match Highlights' }
          ]
        }
      ];

      const breakdown = [
        { item: item1, cost: Number(cost1) || 0 },
        { item: item2, cost: Number(cost2) || 0 },
        { item: item3, cost: Number(cost3) || 0 }
      ].filter(item => item.cost > 0);

      const totalBreakdown = breakdown.reduce((acc, curr) => acc + curr.cost, 0);

      const newAthlete: Athlete = {
        id: `vsh-${Date.now()}`,
        name: name.trim() || 'Rural Athlete',
        sport,
        location: `${village || 'Village'}, ${district}, ${state}`,
        village: village || 'Village',
        mandal: mandal || district,
        district,
        state,
        age: `${ageNumber} (${ageGroup})`,
        ageGroup,
        gender,
        category: category || `${sport} Specialist`,
        verified: true,
        verificationDate: 'Sep 2026',
        verificationAuthority: verificationAuthority || 'District Sports Council',
        photo: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=600',
        avatarSeed: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        accentColor: '#166534',
        bio: bio || `Dedicated ${sport} talent from ${village}, ${district}. Competing with district distinction and preparing for state academy selection.`,
        coach: {
          name: coachName || 'District Physical Director',
          club: coachClub || `${district} Rural Sports Center`,
          phone: coachPhone || '+91 98000 00000',
          verified: true
        },
        stats: Object.keys(statsObj).length > 0 ? statsObj : { 'Discipline Rating': 'District Top 5' },
        physicalMetrics: {
          height: height || '175 cm',
          weight: weight || '65 kg',
          yoYoScore: yoYoScore || undefined,
          speed100m: speed100m || undefined
        },
        achievements: achievementsList,
        videos: videosList,
        needs: {
          goal: Number(goalAmount) || totalBreakdown || 15000,
          current: 0,
          reason: needReason || 'Equipment, shoes & travel fare for state selection trials.',
          breakdown: breakdown.length > 0 ? breakdown : [{ item: 'State Trial Travel & Equipment', cost: 15000 }],
          backersCount: 0
        },
        scoutNotesCount: 0,
        trialsAttended: 1,
        status: 'Ready for Trials',
        dateRegistered: new Date().toISOString().split('T')[0]
      };

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
      onAthleteCreated(newAthlete);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Stepper Header */}
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => s < step && setStep(s)}
              className={`h-2 transition-all rounded-full ${
                s === step
                  ? 'w-12 bg-emerald-900'
                  : s < step
                  ? 'w-8 bg-emerald-700 cursor-pointer'
                  : 'w-8 bg-stone-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
          Step {step} of 5 · Official Athlete Registry
        </span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">
          {step === 1 && "Personal & Village Details"}
          {step === 2 && "Sport, Discipline & Coach"}
          {step === 3 && "Verified Performance & Fitness"}
          {step === 4 && "Video Proof & Credentials"}
          {step === 5 && "Crowdfunding Needs & Budget"}
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Open to rural athletes across all districts. Direct scout visibility without agency middlemen.
        </p>
      </div>

      {/* Wizard Card Form */}
      <div className="bg-white p-6 sm:p-9 rounded-3xl border border-stone-200 shadow-xl">
        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Full Name (as per Aadhar / School ID)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Arjun Reddy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Age Category
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as any)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value="U-14">U-14 (Under 14)</option>
                  <option value="U-16">U-16 (Under 16)</option>
                  <option value="U-18">U-18 (Under 18)</option>
                  <option value="U-21">U-21 (Under 21)</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Exact Age
                </label>
                <input
                  type="number"
                  min="10"
                  max="35"
                  value={ageNumber}
                  onChange={(e) => setAgeNumber(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Village / Gram Panchayat
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Choutuppal"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Mandal / Taluka
                </label>
                <input
                  type="text"
                  placeholder="e.g. Choutuppal Mandal"
                  value={mandal}
                  onChange={(e) => setMandal(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                >
                  <option value="Nalgonda">Nalgonda</option>
                  <option value="Warangal">Warangal</option>
                  <option value="Mahbubnagar">Mahbubnagar</option>
                  <option value="Siddipet">Siddipet</option>
                  <option value="Bhadradri Kothagudem">Bhadradri Kothagudem</option>
                  <option value="Nizamabad">Nizamabad</option>
                  <option value="Sangareddy">Sangareddy</option>
                  <option value="Karimnagar">Karimnagar</option>
                  <option value="Khammam">Khammam</option>
                  <option value="Other Rural District">Other Rural District</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  WhatsApp / Contact Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98480 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Sport & Discipline */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Select Primary Sport
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Cricket', 'Athletics', 'Football', 'Kabaddi', 'Archery', 'Wrestling'].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSportChange(s)}
                    className={`py-3 px-3 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      sport === s
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Role / Event Specialty
              </label>
              <input
                type="text"
                placeholder="e.g. Right-arm Fast Bowler, 100m Sprinter, Right Corner Defender"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Coach / Physical Trainer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master K. Satyanarayana"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  School / Club / Akhada
                </label>
                <input
                  type="text"
                  placeholder="e.g. Govt High School Ground Club"
                  value={coachClub}
                  onChange={(e) => setCoachClub(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Brief Athlete Bio / Sporting Background
              </label>
              <textarea
                rows={3}
                placeholder="Tell scouts about your training routine, grassroots tournaments won, and your sporting dream..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Performance & Physical Stats */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
              Provide verifiable metrics. Scouts verify radar speeds, timing gates, and match scorecards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  {stat1Name}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 132 km/h or 12.1s"
                  value={stat1Val}
                  onChange={(e) => setStat1Val(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  {stat2Name}
                </label>
                <input
                  type="text"
                  placeholder="e.g. 32 wickets or 18 goals"
                  value={stat2Val}
                  onChange={(e) => setStat2Val(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  placeholder="e.g. 180 cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="e.g. 70 kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Yo-Yo Score
                </label>
                <input
                  type="text"
                  placeholder="e.g. 19.5"
                  value={yoYoScore}
                  onChange={(e) => setYoYoScore(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  100m Sprint Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11.9s"
                  value={speed100m}
                  onChange={(e) => setSpeed100m(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Top Achievements / Medals Won
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="e.g. Gold Medal - South Zone Inter-District 2026"
                  value={achievement1}
                  onChange={(e) => setAchievement1(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
                <input
                  type="text"
                  placeholder="e.g. Player of the Tournament - District Rural League"
                  value={achievement2}
                  onChange={(e) => setAchievement2(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Video Proof & Federation Credentials */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Performance Reel Title
              </label>
              <input
                type="text"
                placeholder="e.g. Selection Match Spell vs Karimnagar Rural"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Highlight Chapter 1 (e.g. 00:20 Run-up / Start)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clean Biomechanical Bowling Action"
                  value={chapter1}
                  onChange={(e) => setChapter1(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Highlight Chapter 2 (e.g. 01:15 Wicket / Finish)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wicket Delivery & Celebrations"
                  value={chapter2}
                  onChange={(e) => setChapter2(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Federation / Authority Verification Name
              </label>
              <input
                type="text"
                placeholder="e.g. Telangana District Sports Authority (TDSA)"
                value={verificationAuthority}
                onChange={(e) => setVerificationAuthority(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-700" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Aadhar & Date of Birth Certificate</h4>
                  <p className="text-[11px] text-stone-500">Document submitted for anti-age-fraud verification</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Validated
              </span>
            </div>
          </div>
        )}

        {/* STEP 5: Crowdfunding Needs & Budget */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Total Crowdfunding Target (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-bold text-stone-400">₹</span>
                <input
                  type="number"
                  min="1000"
                  max="100000"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 text-base font-black bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none font-mono tabular-nums text-emerald-950"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Primary Reason / Purpose for Support
              </label>
              <input
                type="text"
                placeholder="e.g. Leather cricket kit, fast bowling spikes & travel for State Academy Selection in Hyderabad."
                value={needReason}
                onChange={(e) => setNeedReason(e.target.value)}
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Itemized Budget Breakdown
              </label>
              <div className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={item1}
                    onChange={(e) => setItem1(e.target.value)}
                    className="col-span-2 p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none"
                    placeholder="Item 1"
                  />
                  <input
                    type="number"
                    value={cost1}
                    onChange={(e) => setCost1(Number(e.target.value))}
                    className="p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none font-mono"
                    placeholder="₹ Cost"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={item2}
                    onChange={(e) => setItem2(e.target.value)}
                    className="col-span-2 p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none"
                    placeholder="Item 2"
                  />
                  <input
                    type="number"
                    value={cost2}
                    onChange={(e) => setCost2(Number(e.target.value))}
                    className="p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none font-mono"
                    placeholder="₹ Cost"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={item3}
                    onChange={(e) => setItem3(e.target.value)}
                    className="col-span-2 p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none"
                    placeholder="Item 3"
                  />
                  <input
                    type="number"
                    value={cost3}
                    onChange={(e) => setCost3(Number(e.target.value))}
                    className="p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg outline-none font-mono"
                    placeholder="₹ Cost"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-lime-50 border border-lime-200 rounded-xl text-xs text-emerald-950 flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-800 shrink-0" />
              <span>
                Once submitted, your profile will immediately go live in the national talent directory with instant direct UPI crowdfund capability.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 font-bold text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 font-bold text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="ml-auto px-7 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="ml-auto px-8 py-3 bg-lime-400 hover:bg-lime-300 active:scale-98 text-emerald-950 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Publishing Profile...</span>
              ) : (
                <>
                  <span>Publish Athlete Profile</span>
                  <ArrowRight size={15} className="stroke-[2.5]" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
