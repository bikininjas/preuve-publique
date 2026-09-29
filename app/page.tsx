import { getEvidence } from '@/lib/data';

// Render after deployment, when Cloud Run has its runtime environment variables.
export const dynamic = 'force-dynamic';
export default async function Home() {
  let evidence: Awaited<ReturnType<typeof getEvidence>> = [];
  let unavailable = false;
  try { evidence = await getEvidence(); } catch { unavailable = true; }
  return <main><div className="eyebrow">La traçabilité politique, source par source</div><h1>Des paroles aux actes, remontez aux preuves.</h1><p className="lead">Programmes, déclarations, amendements, votes et textes adoptés : explorez leur chronologie en France et dans l’Union européenne.</p><section className="panel"><h2>Comment lire une trajectoire ?</h2><div className="steps"><p><b>01 · La proposition</b><br/>Le texte original, son auteur et sa date.</p><p><b>02 · Le travail parlementaire</b><br/>Les amendements et scrutins publics reliés au sujet.</p><p><b>03 · Le résultat</b><br/>Le sort du texte et la source institutionnelle.</p></div></section><section><h2>Éléments publiés</h2>{unavailable ? <p className="empty">Les éléments ne sont pas disponibles pour le moment.</p> : evidence.length ? <div className="cards">{evidence.map(item => <article className="card" key={item.id}><span className="count">{item.kind} · {item.institution ?? 'France / UE'}</span><h3>{item.title}</h3><p>{item.excerpt}</p><p className="source">{new Date(item.occurred_at).toLocaleDateString('fr-FR',{timeZone:'UTC'})} · <a href={item.source_url} target="_blank" rel="noopener noreferrer">Consulter la source ↗</a></p></article>)}</div> : <p className="empty">Aucun élément publié pour l’instant. Les premières sources seront ajoutées après vérification documentaire.</p>}</section></main>;
}
