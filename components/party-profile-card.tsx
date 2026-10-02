import Link from 'next/link';
import { PartyBar } from '@/components/party-vote-chart';
import type { PartyVoteDashboard, PartyVoteRow } from '@/lib/data';
import { formatDate } from '@/lib/labels';
import { ballotTotal, formatBallotShare } from '@/lib/vote-profile';
import { findVoteSubject, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const PROFILE_SUBJECTS = ['entreprises', 'solidarite', 'immigration', 'police'];

export function PartyProfileCard({ party, themes, scope }: {
  party: PartyVoteRow;
  themes: Map<string, PartyVoteDashboard | null>;
  scope: PartyVoteDashboard['scope'];
}) {
  return <article className="party-profile-card">
    <header><span className="party-profile-mark" aria-hidden="true">{party.party_name.split(/\s+/).map((word) => word.replace(/[^\p{L}\p{N}]/gu, '')).filter(Boolean).map((word) => word[0]).join('').slice(0, 4).toLocaleUpperCase('fr-FR')}</span><div><span className="eyebrow">Bulletins individuels · Assemblée</span><h3><Link href={`/partis/${party.party_id}`}>{party.party_name}</Link></h3></div></header>
    <div className="party-profile-themes">{VOTE_SUBJECT_GROUPS.map((category) => {
      const dashboard = themes.get(category.id);
      const row = dashboard?.parties.find((entry) => entry.party_id === party.party_id);
      return <div className="party-profile-theme" key={category.id}>
        <div><Link href={`/scrutins?institution=assemblee&category=${category.id}&party=${party.party_id}#party-details`}>{category.label} ↗</Link><strong>{row && ballotTotal(row) ? formatBallotShare(row) : '—'}</strong></div>
        {row && ballotTotal(row) ? <><PartyBar row={row} /><small>{row.scrutins.toLocaleString('fr-FR')} scrutins · {ballotTotal(row).toLocaleString('fr-FR')} positions</small></> : <small>{dashboard ? 'Aucun bulletin attribuable' : 'Données indisponibles'}</small>}
      </div>;
    })}</div>
    <div className="party-profile-subjects"><span className="eyebrow">Zoom sur les sous-thèmes</span>{PROFILE_SUBJECTS.map((id) => {
      const subject = findVoteSubject(id)!;
      const dashboard = themes.get(id);
      const row = dashboard?.parties.find((entry) => entry.party_id === party.party_id);
      return <Link key={id} href={`/scrutins?institution=assemblee&subject=${id}&party=${party.party_id}#party-details`}><span>{subject.label}{row && ballotTotal(row) ? <small>{row.scrutins} scrutins · {ballotTotal(row).toLocaleString('fr-FR')} positions</small> : null}</span><strong>{row && ballotTotal(row) ? formatBallotShare(row) : dashboard ? 'Sans données' : 'Indisponible'} ↗</strong></Link>;
    })}</div>
    <footer><small>Corpus {scope.first_date ? formatDate(scope.first_date) : 'date inconnue'} – {scope.last_date ? formatDate(scope.last_date) : 'date inconnue'}. Part des « pour » parmi les positions attribuables, non-votants inclus.</small><Link className="text-link" href={`/partis/${party.party_id}`}>Tous les thèmes et votes →</Link></footer>
  </article>;
}
