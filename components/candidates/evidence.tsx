import Link from 'next/link';
import { formatDate } from '@/lib/labels';
import { readerTitle,voteScope } from '@/lib/reader';
import { positionLabel } from '@/lib/candidates/method';
import type { CandidateIdentity,CandidateVote,PolicyMeasure,MeasureEvidence } from '@/lib/candidates/types';

export function CandidateVoteTable({profiles,votes}:{profiles:CandidateIdentity[];votes:CandidateVote[]}) {
  if(!votes.length) return <p className="empty">Aucun bulletin nominatif documenté pour cette sélection. Cela ne permet pas de conclure à une absence au scrutin.</p>;
  return <div className="candidate-table-scroll"><table className="candidate-vote-table"><caption>Mêmes scrutins, positions individuelles distinctes · Assemblée nationale</caption>
    <thead><tr><th scope="col">Scrutin et dispositif</th>{profiles.map((profile)=><th scope="col" key={profile.slug}>{profile.name}</th>)}</tr></thead>
    <tbody>{votes.map((vote)=><tr key={vote.id}><th scope="row"><span className="eyebrow">{formatDate(vote.occurred_at)} · {voteScope({kind:'vote',title:vote.title}) ?? 'Périmètre à consulter dans la source'}</span>
      <Link href={`/pieces/${vote.id}`}>{readerTitle({kind:'vote',title:vote.title})}</Link><details><summary>Intitulé officiel et trace</summary><p>{vote.title}</p><p>{vote.source_locator}</p>
      {vote.positions.filter((p)=>p.archive_sha256).slice(0,1).map((p)=><p className="hint" key={p.candidate}>SHA-256 de l’archive : <code>{p.archive_sha256}</code></p>)}</details><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Scrutin officiel ↗</a></th>
      {profiles.map((profile)=>{const position=vote.positions.find((p)=>p.candidate===profile.slug)?.position ?? null;
        return <td key={profile.slug}><span className={`candidate-position ${position ?? 'unknown'}`}>{positionLabel(position)}</span></td>;})}</tr>)}</tbody>
  </table></div>;
}

export function MeasureCards({profiles,measures,links}:{profiles:CandidateIdentity[];measures:PolicyMeasure[];links:MeasureEvidence[]}) {
  if(!measures.length) return <p className="empty">Aucune fiche de mesure validée pour ce sous-thème. Les scrutins ci-dessous restent exploratoires : leurs titres ne suffisent pas à établir une orientation politique.</p>;
  return <div className="candidate-measures">{measures.map((measure)=><article className="panel" key={measure.id}><span className="eyebrow">Question commune · Fiche relue</span><h3>{measure.question}</h3><p>{measure.description}</p><p className="hint">Revue le {formatDate(measure.reviewed_at)}.</p>
    <div className="candidate-comparison-grid">{profiles.map((profile)=>{
      const personal=links.filter((link)=>profile.actor_id && link.measure_id===measure.id && link.actor_id===profile.actor_id && ['program','statement'].includes(link.role));
      return <section key={profile.slug}><h4>{profile.name}</h4>{personal.length?personal.map((link)=><div className="candidate-piece" key={link.id}><span className="eyebrow">{link.role==='program'?'Programme':'Déclaration'} · {formatDate(link.evidence.occurred_at)}</span>
        <h5>{link.evidence.title}</h5>{link.evidence.excerpt?<p>Extrait documentaire : {link.evidence.excerpt}</p>:null}
        {link.role==='program'?<p>Édition : {link.program_edition} · Élection : {link.program_election} · Publication : {formatDate(link.program_published_at)}.</p>:null}
        <p>{link.rationale}</p><p className="hint">Rapprochement humain relu · Confiance documentaire : {link.confidence===null?'non renseignée':Number(link.confidence).toLocaleString('fr-FR')} / 1.</p><p>{link.evidence.source_locator}</p><a href={link.evidence.source_url} target="_blank" rel="noopener noreferrer">Lire la pièce originale ↗</a>
      </div>):<p>Aucun programme ou déclaration relié et validé pour cette personne sur cette mesure.</p>}</section>;
    })}</div>
    <div className="candidate-measure-context"><h4>Textes et scrutins reliés</h4>{links.filter((link)=>link.measure_id===measure.id && ['vote','context'].includes(link.role)).map((link)=><p key={link.id}>
      <Link href={`/pieces/${link.evidence_id}`}>{link.evidence.title}</Link> · {formatDate(link.evidence.occurred_at)}<br/>{link.rationale} · Confiance documentaire : {Number(link.confidence).toLocaleString('fr-FR')} / 1 · Revue humaine. <a href={link.evidence.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></p>)}
      <p className="hint">Ces liens établissent un rapprochement documentaire. Ils ne déclarent ni soutien ni contradiction. Une position postérieure à un vote reste une position ultérieure ; un programme ancien ne vaut pas programme 2027.</p></div>
  </article>)}</div>;
}
