import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {validateJudicialSnapshot,judicialCases,filterJudicialCases,entityCounts,judicialMotifs} from '../lib/judicial.ts';
import {validateDocument,prepareDocument} from '../ingestion/observatory/import.mjs';
import {collectJudicialPages} from '../lib/judicial-data.ts';
import {judicialCorpus,judicialRecord} from './fixtures/judicial.mjs';
const evidence=()=>judicialCorpus().records.map((r,i)=>({...r,id:`piece-${i}`,status:'published'}));

test('une affaire, plusieurs membres et étapes : aucun double compte ; les brouillons restent privés',()=>{
 const items=evidence(); const row=items[0];
 const old={...structuredClone(row),id:'older',occurred_at:'2025-04-01'};
 row.detail.judicial.snapshot.participants.push({...structuredClone(row.detail.judicial.snapshot.participants[0]),id:'another',name:'Second membre fictif'});
 assert.equal(judicialCases([...items,old]).filter(c=>c.caseId==='fixture-alpha').length,1);
 assert.equal(entityCounts(judicialCases([...items,old]),'rn').implicated,1);
 assert.equal(judicialCases(items.map(r=>({...r,status:'draft'}))).length,0);
 assert.equal(judicialCases(items.map(r=>({...r,status:'draft'})),{review:true}).length,8);
});

test('le dernier document sans synthèse empêche de ressusciter une ancienne décision',()=>{
 const row=evidence()[0]; const latest={...structuredClone(row),id:'new',occurred_at:'2026-09-30'};
 delete latest.detail.judicial.snapshot;
 const [c]=judicialCases([row,latest]);assert.equal(c.snapshot,null);assert.equal(entityCounts([c],'rn').implicated,0);
});

test('définitivité explicite : preuve requise, culpabilité seule distinguée, plaignants et civil exclus',()=>{
 const items=evidence();const cases=judicialCases(items);
 assert.equal(entityCounts(cases,'ump').final,2);
 assert.equal(entityCounts(cases,'lr').guiltOnly,1);
 assert.equal(entityCounts(cases,'modem').complainant,1);
 assert.equal(entityCounts(cases,'renaissance').cases,0);
 assert.equal(entityCounts(cases,'renaissance',false).civil,1);
 assert.equal(entityCounts(cases,'renaissance',false).implicated,0);
 assert.equal(entityCounts(cases,'rn',false).final,0);
 const s=structuredClone(items[1].detail.judicial.snapshot);
 delete s.participants[0].finality_source;assert.equal(validateJudicialSnapshot(s),false);
 const civil=structuredClone(items[4].detail.judicial.snapshot);
 civil.participants[0].outcome='convicted';assert.equal(validateJudicialSnapshot(civil),false);
});

test('chaque rattachement et chaque source sont vérifiables ; aucun import publié',()=>{
 const doc=judicialCorpus();validateDocument(doc);
 for(const r of doc.records){assert.equal(validateJudicialSnapshot(r.detail.judicial.snapshot),true);assert.equal(r.excerpt,null);}
 const unsafe=structuredClone(doc);unsafe.records[0].status='published';assert.throws(()=>validateDocument(unsafe));
 const s=structuredClone(doc.records[0].detail.judicial.snapshot);s.participants[0].affiliations[0].source_url='https://example.org';assert.equal(validateJudicialSnapshot(s),false);
 const unknown=structuredClone(doc);unknown.records[0].detail.judicial.snapshot.participants[0].affiliations[0].entity_id='unknown';assert.throws(()=>validateDocument(unknown));
});

test('motifs : litiges civils exclus, classement et allégations distincts, un motif compte une fois',()=>{
 const items=evidence();items[0].detail.judicial.snapshot.offences.push(structuredClone(items[0].detail.judicial.snapshot.offences[0]));
 const rows=judicialMotifs(judicialCases(items));
 assert.ok(!rows.some(r=>r.id==='marque-slogan'));
 assert.equal(rows.find(r=>r.id==='diffamation').dismissed,1);
 assert.equal(rows.find(r=>r.id==='corruption').retained,1);
 assert.equal(rows.find(r=>r.id==='corruption').alleged,3);
});

test('une référence inaccessible reste signalée et ne reçoit pas une fausse empreinte',async()=>{
 const d={edition:'source-test',records:[judicialRecord()]};
 const main=d.records[0].source_url;const bytes=Buffer.from('%PDF-document-test');
 const r=await prepareDocument(d,{fetchDocument:async(url)=>{if(url!==main)throw Error('indisponible');return {body:bytes,bytes:bytes.length,finalUrl:url,sha256:'a'.repeat(64),fetchedAt:'2026-10-04T10:00:00Z'};}});
 assert.equal(r.records[0].detail.judicial.snapshot.sources[0].sha256,'a'.repeat(64));
 assert.ok(r.records[0].detail.judicial.snapshot.sources[1].retrieval_note);
 assert.equal(r.records[0].detail.judicial.snapshot.sources[1].sha256,undefined);
 assert.equal(d.records[0].detail.judicial.snapshot.sources[0].sha256,undefined);
});

test('les graphiques chargent toutes les pages ; une page partielle ou changeante devient indisponible',async()=>{
 const items=Array.from({length:230},(_,i)=>({id:String(i)}));const seen=[];
 const result=await collectJudicialPages(async offset=>{seen.push(offset);return {items:items.slice(offset,offset+100),total:230,offset,limit:100,hasMore:offset+100<230};});
 assert.deepEqual(seen,[0,100,200]);assert.equal(result.items.length,230);
 await assert.rejects(collectJudicialPages(async offset=>({items:items.slice(offset,offset+100),total:offset?229:230,offset,limit:100,hasMore:true})));
 await assert.rejects(collectJudicialPages(async offset=>({items:items.slice(0,100),total:230,offset,limit:100,hasMore:true})));
});

test('les filtres portent sur la même personne : une plaignante ne reçoit pas la condamnation du prévenu',()=>{
 const cases=judicialCases(evidence());
 assert.equal(filterJudicialCases(cases,{entity:'modem',outcome:'convicted',membersOnly:true}).length,0);
 const plaintiffs=filterJudicialCases(cases,{entity:'modem',role:'complainant',membersOnly:true});
 assert.equal(plaintiffs.length,1);assert.equal(entityCounts(plaintiffs,'modem',true,{role:'complainant'}).implicated,0);
 assert.equal(filterJudicialCases(cases,{entityIds:['senat-lirt','senat-lr','senat-rdse'],membersOnly:true}).length,3);
});

test('capture du navigateur : empreinte du texte distincte de l’original, incohérences refusées',async()=>{
 const record=judicialRecord({id:'capture',outcome:'convicted',finality:'final',scope:'guilt_and_sentence'});
 record.source_url=record.source_url.replace('.pdf','.html');
 record.detail.judicial.snapshot.sources[0].url=record.source_url;
 record.detail.judicial.snapshot.participants[0].finality_source.url=record.source_url;
 record.detail.judicial.snapshot.sources=[record.detail.judicial.snapshot.sources[0]];
 record.detail.judicial.snapshot.participants[0].affiliations=[];
 record.detail.source_verification={markers:['entièrement fictif','pendant un test']};
 const doc={edition:'capture-test',records:[record]};
 const body=Buffer.from('Texte entièrement fictif consulté pendant un test.');
 const fetched={body,bytes:body.length,finalUrl:record.source_url,sha256:null,captureSha256:createHash('sha256').update(body).digest('hex'),representation:'rendered_dom',fetchedAt:'2026-10-04T12:00:00Z'};
 const prepared=await prepareDocument(doc,{fetchDocument:async()=>fetched});
 assert.equal(prepared.records[0].source.sha256,null);
 assert.equal(prepared.records[0].detail.source_capture.sha256,fetched.captureSha256);
 assert.equal(prepared.records[0].detail.judicial.snapshot.sources[0].capture_method,'rendered_dom');
 await assert.rejects(prepareDocument(doc,{fetchDocument:async()=>({...fetched,sha256:fetched.captureSha256})}));
 await assert.rejects(prepareDocument(doc,{fetchDocument:async()=>({...fetched,captureSha256:'0'.repeat(64)})}));
});
