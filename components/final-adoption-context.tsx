import type { Evidence } from '@/lib/types';
import { voteReading } from '@/lib/vote-reading';
const methods:Record<string,string>={lecture_definitive:'Adoption en lecture définitive',accord_cmp_deux_chambres:'Accord CMP adopté par les deux chambres',adoption_conforme:'Adoption sans modification après l’autre chambre'};
export function FinalAdoptionContext({evidence}:{evidence:Evidence}) {
  if(evidence.kind!=='vote')return null;
  const proof=evidence.detail?.final_adoption as {verified?:boolean;method?:string;source_url?:string;source_locator?:string;dossier_id?:string}|undefined;
  if(!voteReading(evidence)?.final)return null;
  return <section className="panel"><h2>Adoption définitive de la loi</h2><p>{proof?.method&&methods[proof.method] ? methods[proof.method] : 'Vote adopté en lecture définitive, indiqué dans l’intitulé officiel.'}. La promulgation et le contrôle constitutionnel éventuel interviennent dans une étape distincte.</p>{proof?.source_url&&/^https:\/\/data\.assemblee-nationale\.fr\//.test(proof.source_url) ? <p className="hint">{proof.source_locator} · <a href={proof.source_url} target="_blank" rel="noreferrer">Archive officielle de la procédure ↗</a></p> : null}</section>;
}
