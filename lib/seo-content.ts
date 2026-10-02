import 'server-only';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { getEvidenceItem, getActor, getTopicCounts } from '@/lib/data';
import { pollOptions } from '@/lib/polls/data';
import { getAllPartyVotes } from '@/lib/vote-theme-data';
import { findTopicBySlug, formatEvidenceDate, institutionLabel, kindLabel } from '@/lib/labels';
import { isUuid, type SearchParamsRecord } from '@/lib/params';
import { readerTitle, scrutinNumber, voteScope } from '@/lib/reader';
import { pageMetadata, SEO_PAGES, type SeoDocument } from '@/lib/seo';

// Shared by metadata and the page: no duplicate request within an SSR render.
export const publicEvidence = cache(getEvidenceItem);
export const publicActor = cache(getActor);
export const publicTopics = cache(getTopicCounts);
export const publicPollOptions = cache(pollOptions);
const publicPartyDashboard = cache(getAllPartyVotes);

export const publicSeoDocument = cache(async (path: string): Promise<SeoDocument | null> => {
  if (SEO_PAGES[path]) return SEO_PAGES[path];
  const segments = path.split('/').filter(Boolean);
  const id = segments[1];
  if (segments.length === 2 && segments[0] === 'pieces' && isUuid(id)) {
    const item = await publicEvidence(id);
    if (!item) return null;
    const { evidence, source } = item;
    const institution = institutionLabel(evidence.institution);
    const number = scrutinNumber(evidence);
    const scope = voteScope(evidence);
    return {
      title: `${number ? `Scrutin n° ${number} : ` : ''}${readerTitle(evidence)}`,
      description: `${kindLabel(evidence.kind)} · ${institution} · ${formatEvidenceDate(evidence)}${scope ? ` · ${scope}` : ''}. Consultez le document original, les faits publiés et leur provenance.`,
      section: `${institution} · ${kindLabel(evidence.kind)}`,
      parent: {name:'Documents publiés',path:'/pieces'}, sourceUrl: source?.url ?? evidence.source_url,
    };
  }
  if (segments.length === 2 && segments[0] === 'groupes' && isUuid(id)) {
    const actor = await publicActor(id);
    if (!actor || actor.kind !== 'group') return null;
    return {title:`${actor.name} : votes et scrutins documentés`,description:`Retrouvez les positions majoritaires publiées du groupe ${actor.name}, ses identifiants officiels et les sources de ses votes à l’Assemblée nationale.`,section:'Groupe parlementaire · Assemblée nationale',parent:{name:'Groupes parlementaires',path:'/groupes'}};
  }
  if (segments.length === 2 && segments[0] === 'partis' && isUuid(id)) {
    const party = (await publicPartyDashboard()).parties.find(row => row.party_id === id);
    if (!party) return null;
    return {title:`${party.party_name} : votes par thème et sous-thème`,description:`Consultez les votes rattachables à ${party.party_name} : pour, contre, abstention et non-vote. Affiliations datées, scrutins exacts et limites de la méthode.`,section:'Parti politique · Bulletins documentés',parent:{name:'Partis politiques',path:'/partis'}};
  }
  if (segments.length === 2 && segments[0] === 'categories') {
    const topic = findTopicBySlug((await publicTopics()).map(row => row.topic), id);
    if (!topic) return null;
    return {title:`${topic} : documents et scrutins publiés`,description:`Explorez les scrutins et textes publiés dans la rubrique « ${topic} », avec leur date, leur institution et leurs sources originales.`,section:'Rubrique documentaire',parent:{name:'Thèmes',path:'/categories'}};
  }
  if (segments.length === 3 && segments[0] === 'presidentielle-2027' && segments[1] === 'candidats' && /^[a-z0-9][a-z0-9-]{0,79}$/.test(segments[2])) {
    const nominee = (await publicPollOptions()).candidates.find(candidate => candidate.id === segments[2]);
    if (!nominee) return null;
    return {title:`${nominee.name} : sondages et votes documentés pour 2027`,description:`Retrouvez ${nominee.name} dans les sondages de 2027 et ses votes personnels disponibles, avec les sources. Une personne testée n’est pas nécessairement candidate déclarée.`,section:'Personne testée · Présidentielle 2027',parent:{name:'Personnes testées',path:'/presidentielle-2027/candidats'}};
  }
  return null;
});

export async function documentMetadata(path: string, query: SearchParamsRecord = {}) {
  let document: SeoDocument | null;
  try { document = await publicSeoDocument(path); }
  catch { return { title:'Document temporairement indisponible',robots:{index:false,follow:true} }; }
  if (!document) notFound();
  return pageMetadata(path, document, query);
}
