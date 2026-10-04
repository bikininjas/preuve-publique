import snapshot from '@/data/parliament-composition.json';
import type { SeatBucket } from './hemicycle';

export type Chamber = 'assemblee' | 'senat' | 'parlement_europeen';
export type CompositionMode = 'groups' | 'parties';
export type CompositionSource = { url: string; publisher: string; locator: string; retrievedAt: string; sha256: string };
export type ChamberComposition = {
  institution: Chamber;
  scope: 'all' | 'france';
  mode: CompositionMode;
  total: number;
  listed: number;
  asOf: string;
  period: string;
  basis: string;
  notes: string[];
  buckets: SeatBucket[];
  sources: CompositionSource[];
};

export const CHAMBERS: { id: Chamber; name: string }[] = [
  { id: 'assemblee', name: 'Assemblée nationale' },
  { id: 'senat', name: 'Sénat' },
  { id: 'parlement_europeen', name: 'Parlement européen' },
];

export function getComposition(institution: Chamber, mode: CompositionMode, scope: 'all' | 'france'): ChamberComposition | null {
  return (snapshot.compositions as ChamberComposition[]).find(c => c.institution === institution && c.mode === mode && c.scope === scope) ?? null;
}
