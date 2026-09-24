import React, { useState, useEffect } from 'react';
import { Athlete, Opportunity, AthleteVideo, TrialRequest } from './types/sports';
import { INITIAL_OPPORTUNITIES } from './data/mockAthletes';
import { 
  getStoredAthletes, 
  saveAthletes, 
  addAthlete, 
  updateAthleteNeeds,
  getStoredShortlist, 
  toggleShortlist,
  getAppliedOpportunities,
  addBackerContribution
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SupportModal } from './components/SupportModal';
import { TrialRequestModal } from './components/TrialRequestModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { CompareModal } from './components/CompareModal';
import { ScoutShortlistDrawer } from './components/ScoutShortlistDrawer';
import { DistrictMap } from './components/DistrictMap';

import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ProfilePage } from './pages/ProfilePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { SupportPoolPage } from './pages/SupportPoolPage';

import { Home, Search, Briefcase, PlusCircle, Map, Bookmark } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<string>('home');
  const [athletes, setAthletes] = useState<Athlete[]>(() => getStoredAthletes());
  const [opportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(() => {
    const list = getStoredAthletes();
    return list.length > 0 ? list[0] : null;
  });

  // Shortlist state
  const [bookmarkedIds, setBookmarkedIds] = useState<(string | number)[]>(() => getStoredShortlist());
  const [isShortlistDrawerOpen, setIsShortlistDrawerOpen] = useState(false);

  // Comparison state
  const [comparingAthletes, setComparingAthletes] = useState<Athlete[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Modals
  const [supportAthlete, setSupportAthlete] = useState<Athlete | null>(null);
  const [trialAthlete, setTrialAthlete] = useState<Athlete | null>(null);
  const [videoModalData, setVideoModalData] = useState<{ video: AthleteVideo; athlete: Athlete } | null>(null);

  // Applied opportunities tracking
  const [appliedOpportunityIds, setAppliedOpportunityIds] = useState<(string | number)[]>(() => getAppliedOpportunities());

  // District filter
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');

  // Scroll to top on navigation
  const handleNavigate = (newView: string, district?: string) => {
    setView(newView);
    if (district) setSelectedDistrict(district);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAthlete = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleShortlist(id);
    setBookmarkedIds(updated);
  };

  // Toggle compare handler
  const handleToggleCompare = (athlete: Athlete, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparingAthletes((prev) => {
      const exists = prev.some((a) => String(a.id) === String(athlete.id));
      if (exists) {
        return prev.filter((a) => String(a.id) !== String(athlete.id));
      }
      if (prev.length >= 3) {
        // limit to 3 for clean side-by-side comparison
        return [...prev.slice(1), athlete];
      }
      return [...prev, athlete];
    });
  };

  const handleRemoveFromCompare = (id: string | number) => {
    setComparingAthletes((prev) => prev.filter((a) => String(a.id) !== String(id)));
  };

  // Backing support success
  const handleSupportSuccess = (amount: number, donorName: string, message: string) => {
    if (!supportAthlete) return;
    const updated = updateAthleteNeeds(supportAthlete.id, amount);
    if (updated) {
      setAthletes((prev) =>
        prev.map((a) => (String(a.id) === String(updated.id) ? updated : a))
      );
      if (selectedAthlete && String(selectedAthlete.id) === String(updated.id)) {
        setSelectedAthlete(updated);
      }
      addBackerContribution({
        id: `bc-${Date.now()}`,
        athleteId: updated.id,
        athleteName: updated.name,
        donorName,
        amount,
        timestamp: 'Just now',
        message
      });
    }
  };

  // New athlete created from 5-step wizard
  const handleAthleteCreated = (newAthlete: Athlete) => {
    const updatedList = addAthlete(newAthlete);
    setAthletes(updatedList);
    setSelectedAthlete(newAthlete);
    setView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shortlistedAthletesList = athletes.filter((a) =>
    bookmarkedIds.includes(a.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-lime-300 selection:text-emerald-950 pb-16 md:pb-0">
      {/* Strict Top Bar Contract Header */}
      <Navbar
        currentView={view}
        onNavigate={handleNavigate}
        shortlistCount={bookmarkedIds.length}
        onOpenShortlist={() => setIsShortlistDrawerOpen(true)}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {view === 'home' && (
          <HomePage
            athletes={athletes}
            opportunities={opportunities}
            onSelectAthlete={handleSelectAthlete}
            onNavigate={handleNavigate}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            comparingAthletes={comparingAthletes}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {view === 'discover' && (
          <DiscoverPage
            athletes={athletes}
            onSelectAthlete={handleSelectAthlete}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            comparingAthletes={comparingAthletes}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setIsCompareModalOpen(true)}
            selectedDistrictFilter={selectedDistrict}
            onDistrictFilterChange={(d) => setSelectedDistrict(d)}
          />
        )}

        {view === 'profile' && selectedAthlete && (
          <ProfilePage
            athlete={selectedAthlete}
            onBack={() => handleNavigate('discover')}
            onOpenSupportModal={(ath) => setSupportAthlete(ath)}
            onOpenTrialModal={(ath) => setTrialAthlete(ath)}
            onOpenVideoModal={(video, ath) => setVideoModalData({ video, athlete: ath })}
            isBookmarked={bookmarkedIds.includes(selectedAthlete.id)}
            onToggleBookmark={handleToggleBookmark}
            isComparing={comparingAthletes.some((a) => String(a.id) === String(selectedAthlete.id))}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {view === 'opportunities' && (
          <OpportunitiesPage
            opportunities={opportunities}
            athletes={athletes}
            appliedIds={appliedOpportunityIds}
            onMarkApplied={(id) => setAppliedOpportunityIds((prev) => [...prev, id])}
            onNavigateToPlayer={handleSelectAthlete}
          />
        )}

        {view === 'districts' && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <DistrictMap
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(d) => {
                setSelectedDistrict(d);
                handleNavigate('discover', d);
              }}
            />
          </div>
        )}

        {view === 'register' && (
          <RegistrationPage
            onAthleteCreated={handleAthleteCreated}
            onCancel={() => handleNavigate('home')}
          />
        )}

        {view === 'support-pool' && (
          <SupportPoolPage
            athletes={athletes}
            onSelectAthlete={handleSelectAthlete}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Interactive Modals & Drawers */}
      {supportAthlete && (
        <SupportModal
          athlete={supportAthlete}
          isOpen={!!supportAthlete}
          onClose={() => setSupportAthlete(null)}
          onSupportSuccess={handleSupportSuccess}
        />
      )}

      {trialAthlete && (
        <TrialRequestModal
          athlete={trialAthlete}
          isOpen={!!trialAthlete}
          onClose={() => setTrialAthlete(null)}
          onRequestSubmitted={() => {}}
        />
      )}

      {videoModalData && (
        <VideoPlayerModal
          video={videoModalData.video}
          athleteName={videoModalData.athlete.name}
          sport={videoModalData.athlete.sport}
          isOpen={!!videoModalData}
          onClose={() => setVideoModalData(null)}
        />
      )}

      <CompareModal
        athletes={comparingAthletes}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveAthlete={handleRemoveFromCompare}
        onSelectAthlete={handleSelectAthlete}
      />

      <ScoutShortlistDrawer
        isOpen={isShortlistDrawerOpen}
        onClose={() => setIsShortlistDrawerOpen(false)}
        shortlistedAthletes={shortlistedAthletesList}
        onRemove={(id) => setBookmarkedIds(toggleShortlist(id))}
        onSelectAthlete={handleSelectAthlete}
      />

      {/* Mobile Touch Bar Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex justify-around items-center z-40">
        <button
          onClick={() => handleNavigate('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors ${
            view === 'home' ? 'text-emerald-900' : 'text-stone-400'
          }`}
        >
          <Home size={18} />
          <span>Home</span>
        </button>
        <button
          onClick={() => handleNavigate('discover')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors ${
            view === 'discover' ? 'text-emerald-900' : 'text-stone-400'
          }`}
        >
          <Search size={18} />
          <span>Talent</span>
        </button>
        <button
          onClick={() => handleNavigate('districts')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors ${
            view === 'districts' ? 'text-emerald-900' : 'text-stone-400'
          }`}
        >
          <Map size={18} />
          <span>Map</span>
        </button>
        <button
          onClick={() => handleNavigate('opportunities')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors ${
            view === 'opportunities' ? 'text-emerald-900' : 'text-stone-400'
          }`}
        >
          <Briefcase size={18} />
          <span>Trials</span>
        </button>
        <button
          onClick={() => handleNavigate('register')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors ${
            view === 'register' ? 'text-emerald-900' : 'text-stone-400'
          }`}
        >
          <PlusCircle size={18} />
          <span>Register</span>
        </button>
      </nav>
    </div>
  );
}
