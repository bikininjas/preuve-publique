import { smallVoteSample } from '@/lib/vote-profile';

export function VoteSample({ scrutins }: { scrutins: number }) {
  return smallVoteSample(scrutins) ? <small className="vote-sample">{scrutins === 1 ? 'Un seul scrutin' : `${scrutins} scrutins seulement`} · trop peu pour généraliser au thème</small> : null;
}
