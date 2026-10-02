import { readFileSync } from 'node:fs';
import { connect } from '../lib/db.mjs';
import { loadProjectEnv,requireDbUrl } from '../lib/env.mjs';

/** All authored entries start as drafts; an import cannot publish them. */
export async function importMeasures(db,document,{dryRun=true}={}) {
  if(!Array.isArray(document.measures) || document.measures.length>100 || !Array.isArray(document.connections??[]) || (document.connections??[]).length>100) throw new Error('Lot éditorial invalide.');
  await db.query('begin');
  const stats={measures:0,links:0,connections:0,dryRun};
  try {
    await db.query("select pg_advisory_xact_lock(hashtext('candidate-measure-import'))");
    for(const measure of document.measures) {
      if(!/^[a-z0-9][a-z0-9-]*$/.test(measure.slug) || typeof measure.question!=='string' || typeof measure.description!=='string') throw new Error('Mesure invalide.');
      const {rows:existing}=await db.query('select id,status from public.policy_measures where slug=$1 for update',[measure.slug]);
      if(existing[0]?.status && existing[0].status!=='draft') throw new Error('Une mesure relue ne peut pas être remplacée par un import.');
      const {rows:[row]}=await db.query(`insert into public.policy_measures(slug,subject,question,description) values($1,$2,$3,$4)
        on conflict(slug) do update set subject=excluded.subject,question=excluded.question,description=excluded.description where public.policy_measures.status='draft' returning id`,
      [measure.slug,measure.subject,measure.question,measure.description]);
      if(!row) throw new Error('Mesure devenue protégée pendant l’import.');
      stats.measures++;
      if(!Array.isArray(measure.links??[]) || (measure.links??[]).length>100) throw new Error('Liens invalides.');
      for(const link of measure.links??[]) {
        let evidenceId=link.evidence_id;
        if(!evidenceId && link.evidence_external_id) {
          const {rows:pieces}=await db.query('select id from public.evidence where external_id=$1',[link.evidence_external_id]);
          if(pieces.length!==1) throw new Error('Référence documentaire absente ou ambiguë.');
          evidenceId=pieces[0].id;
        }
        const {rows:prior}=await db.query('select status from public.policy_measure_evidence where measure_id=$1 and evidence_id=$2 and role=$3 for update',[row.id,evidenceId,link.role]);
        if(prior[0]?.status && prior[0].status!=='draft') throw new Error('Un rapprochement relu ne peut pas être remplacé.');
        const saved=await db.query(`insert into public.policy_measure_evidence(measure_id,evidence_id,actor_id,role,rationale,confidence,program_edition,program_election,program_published_at)
          values($1,$2,$3,$4,$5,$6,$7,$8,$9) on conflict(measure_id,evidence_id,role) do update set
          actor_id=excluded.actor_id,rationale=excluded.rationale,confidence=excluded.confidence,program_edition=excluded.program_edition,program_election=excluded.program_election,program_published_at=excluded.program_published_at where public.policy_measure_evidence.status='draft' returning id`,
        [row.id,evidenceId,link.actor_id??null,link.role,link.rationale,link.confidence??null,link.program_edition??null,link.program_election??null,link.program_published_at??null]);
        if(!saved.rowCount) throw new Error('Rapprochement devenu protégé pendant l’import.');
        stats.links++;
      }
    }
    for(const connection of document.connections??[]) {
      if(!['party_member','electoral_support','coalition'].includes(connection.relation) || !/^https:\/\//.test(connection.source_url??'') || typeof connection.source_locator!=='string' || !connection.source_locator.trim() || !connection.retrieved_at) throw new Error('Rattachement éditorial invalide.');
      const {rows:actor}=await db.query("select name from public.actors where id=$1 and kind='party'",[connection.actor_id]);
      if(actor.length!==1) throw new Error('Parti non documenté.');
      const {rows:previous}=await db.query('select status from public.candidate_connections where candidate_slug=$1 and actor_id=$2 and relation=$3 and started_at=$4 for update',
        [connection.candidate_slug,connection.actor_id,connection.relation,connection.started_at]);
      if(previous[0]?.status && previous[0].status!=='draft') throw new Error('Un rattachement relu ne peut pas être remplacé.');
      const saved=await db.query(`insert into public.candidate_connections(candidate_slug,actor_id,actor_name,relation,started_at,ended_at,source_url,source_locator,retrieved_at,source_sha256)
        values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) on conflict(candidate_slug,actor_id,relation,started_at) do update set
        ended_at=excluded.ended_at,source_url=excluded.source_url,source_locator=excluded.source_locator,retrieved_at=excluded.retrieved_at,source_sha256=excluded.source_sha256
        where public.candidate_connections.status='draft' returning id`,
      [connection.candidate_slug,connection.actor_id,actor[0].name,connection.relation,connection.started_at,connection.ended_at??null,connection.source_url,
        connection.source_locator,connection.retrieved_at,connection.source_sha256??null]);
      if(!saved.rowCount) throw new Error('Rattachement devenu protégé pendant l’import.');
      stats.connections++;
    }
    await db.query(dryRun?'rollback':'commit');return stats;
  }catch(error){await db.query('rollback');throw error;}
}

if(process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll('\\','/'))) {
  loadProjectEnv(); let db;
  try {
    const args=process.argv.slice(2);
    const file=args.find((arg)=>arg.startsWith('--file='))?.slice(7);
    if(!file || args.some((arg)=>arg!=='--yes' && !arg.startsWith('--file='))) throw new Error('Usage : --file=chemin.json [--yes]');
    const document=JSON.parse(readFileSync(file,'utf8'));
    db=await connect(requireDbUrl(),{applicationName:'preuve-publique-measures'});
    console.log(JSON.stringify(await importMeasures(db,document,{dryRun:!args.includes('--yes')}),null,2));
  }catch {console.error('Import éditorial refusé : vérifier le fichier, les pièces, leur auteur et les statuts.');process.exitCode=1;}
  finally{if(db)await db.end();}
}
