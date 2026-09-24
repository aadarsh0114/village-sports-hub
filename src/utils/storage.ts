import { Athlete, Opportunity, BackerContribution, TrialRequest } from '../types/sports';
import { INITIAL_ATHLETES, INITIAL_OPPORTUNITIES } from '../data/mockAthletes';

const ATHLETES_KEY = 'vsh_athletes_v1';
const OPPORTUNITIES_KEY = 'vsh_opportunities_v1';
const BACKERS_KEY = 'vsh_backers_v1';
const SHORTLIST_KEY = 'vsh_shortlist_v1';
const TRIALS_KEY = 'vsh_trials_v1';
const APPLIED_OPPORTUNITIES_KEY = 'vsh_applied_opportunities_v1';

export function getStoredAthletes(): Athlete[] {
  try {
    const raw = localStorage.getItem(ATHLETES_KEY);
    if (!raw) {
      localStorage.setItem(ATHLETES_KEY, JSON.stringify(INITIAL_ATHLETES));
      return INITIAL_ATHLETES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored athletes', e);
    return INITIAL_ATHLETES;
  }
}

export function saveAthletes(athletes: Athlete[]): void {
  try {
    localStorage.setItem(ATHLETES_KEY, JSON.stringify(athletes));
  } catch (e) {
    console.error('Failed to save athletes', e);
  }
}

export function addAthlete(athlete: Athlete): Athlete[] {
  const current = getStoredAthletes();
  const updated = [athlete, ...current];
  saveAthletes(updated);
  return updated;
}

export function updateAthleteNeeds(athleteId: string | number, amountAdded: number): Athlete | null {
  const current = getStoredAthletes();
  const athleteIndex = current.findIndex(a => String(a.id) === String(athleteId));
  if (athleteIndex === -1) return null;

  const athlete = current[athleteIndex];
  const updatedAthlete: Athlete = {
    ...athlete,
    needs: {
      ...athlete.needs,
      current: Math.min(athlete.needs.goal, athlete.needs.current + amountAdded),
      backersCount: athlete.needs.backersCount + 1
    }
  };

  current[athleteIndex] = updatedAthlete;
  saveAthletes(current);
  return updatedAthlete;
}

export function getStoredShortlist(): (string | number)[] {
  try {
    const raw = localStorage.getItem(SHORTLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleShortlist(id: string | number): (string | number)[] {
  const list = getStoredShortlist();
  const exists = list.some(item => String(item) === String(id));
  const updated = exists ? list.filter(item => String(item) !== String(id)) : [...list, id];
  try {
    localStorage.setItem(SHORTLIST_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function getStoredBackers(): BackerContribution[] {
  try {
    const raw = localStorage.getItem(BACKERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addBackerContribution(contribution: BackerContribution): void {
  const list = getStoredBackers();
  const updated = [contribution, ...list];
  try {
    localStorage.setItem(BACKERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredTrials(): TrialRequest[] {
  try {
    const raw = localStorage.getItem(TRIALS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addTrialRequest(trial: TrialRequest): void {
  const list = getStoredTrials();
  const updated = [trial, ...list];
  try {
    localStorage.setItem(TRIALS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function getAppliedOpportunities(): (string | number)[] {
  try {
    const raw = localStorage.getItem(APPLIED_OPPORTUNITIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markOpportunityApplied(opportunityId: string | number): (string | number)[] {
  const list = getAppliedOpportunities();
  if (!list.includes(opportunityId)) {
    const updated = [...list, opportunityId];
    try {
      localStorage.setItem(APPLIED_OPPORTUNITIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  }
  return list;
}
