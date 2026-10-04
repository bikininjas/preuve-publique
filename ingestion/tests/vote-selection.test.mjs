import {test} from 'node:test';
import assert from 'node:assert/strict';
import {voteSelection,selectEssentialVotes} from '../lib/vote-selection.mjs';
import {finalAdoption,attachFinalAdoptions} from '../lib/final-adoption.mjs';
const an=(title,extra={})=>({kind:'vote',institution:'assemblee',title,occurred_at:'2026-01-02',external_id:'VTANR5L17V2',detail:{sort:{code:'adopté'},refs:[{type:'an:dossier',value:'DLR5L17N1'}]},...extra});
const source={url:'https://data.assemblee-nationale.fr/static/openData/repository/17/loi/dossiers_legislatifs/Dossiers_Legislatifs.json.zip',sha256:'a'.repeat(64),retrieved_at:'2026-01-03T12:00:00Z'};
const act=(code,day,fam='TSORTF01',ref=null)=>({uid:code+day,codeActe:code,dateActe:day+'T00:00:00Z',statutConclusion:{fam_code:fam},voteRefs:{voteRef:ref}});
const dossier=acts=>({uid:'DLR5L17N1',titreDossier:{titre:'Protection des mineurs',senatChemin:'https://www.senat.fr/dossier-legislatif/ppl25-1.html'},actesLegislatifs:acts});
test('first readings, rejection, amendments, motions and resolutions are excluded',()=>{
 for(const title of ["Scrutin n° 2 — l'ensemble du projet de loi test (première lecture).","Scrutin n° 2 — l'amendement n° 1 au projet de loi test (lecture définitive)","Scrutin n° 2 — la motion de rejet au projet de loi test (lecture définitive)","Scrutin n° 2 — l'ensemble de la proposition de résolution test"]){assert.equal(voteSelection(an(title)),null);}
 const final=an("Scrutin n° 2 — l'ensemble du projet de loi test (lecture définitive).");
 assert.equal(voteSelection(final).definitive,true);
 assert.equal(voteSelection({...final,detail:{sort:{code:'rejeté'}}}),null);
 assert.equal(voteSelection({...final,detail:{}}),null);
 assert.equal(voteSelection(an(final.title.replace('loi test','loi constitutionnelle test'))),null);
});
test('a CMP vote is final only once both chambers adopted; later rejection cancels proof',()=>{
 const sn=act('CMP-DEBATS-SN-DEC','2026-01-01','TSORTF18');const aa=act('CMP-DEBATS-AN-DEC','2026-01-02','TSORTF18','VTANR5L17V2');
 assert.equal(finalAdoption(dossier([aa]),source),null);
 assert.equal(finalAdoption(dossier([sn,{...aa,statutConclusion:{fam_code:'TSORTF07'}}]),source),null);
 const p=finalAdoption(dossier([sn,aa]),source);assert.equal(p.method,'accord_cmp_deux_chambres');
 assert.equal(finalAdoption(dossier([{...sn,dateActe:aa.dateActe},aa]),source),null);
 const record=an("Scrutin n° 2 — l'ensemble du projet de loi test (texte de la commission mixte paritaire).");
 assert.equal(voteSelection(record),null);assert.ok(voteSelection(attachFinalAdoptions([record],[p])[0]));
 assert.equal(voteSelection(attachFinalAdoptions([{...record,occurred_at:'2026-01-03'}],[p])[0]),null);
 assert.equal(voteSelection(attachFinalAdoptions([{...record,external_id:'other'}],[p])[0]),null);
});
test('adoption conforme needs a successful opposite-chamber decision',()=>{
 const sn=act('SN1-DEBATS-DEC','2026-01-02','TSORTF03');assert.equal(finalAdoption(dossier([sn]),source),null);
 const p=finalAdoption(dossier([act('AN1-DEBATS-DEC','2026-01-01'),sn]),source);assert.equal(p.institution,'senat');assert.equal(p.method,'adoption_conforme');
 const record={...an("Scrutin n° 2 — l'ensemble du projet de loi test"),institution:'senat',detail:{resultat:'Adoption',refs:[{type:'senat:dossier',value:'ppl25-1'}]}};
 assert.ok(voteSelection(attachFinalAdoptions([record],[p])[0]));
 assert.equal(finalAdoption(dossier([act('AN1-DEBATS-DEC','2026-01-01','TSORTF07'),sn]),source),null);
});
test('LD does not require a promulgation; constitutional bills are excluded',()=>{
 const d=dossier([act('ANLD-DEBATS-DEC','2026-01-02','TSORTF01','VTANR5L17V2')]);assert.equal(finalAdoption(d,source).method,'lecture_definitive');
 assert.equal(finalAdoption({...d,titreDossier:{titre:'Loi constitutionnelle'}},source),null);
 assert.equal(finalAdoption(d,{...source,sha256:null}),null);
});
test('one final whole vote per dossier, numeric order on the same date',()=>{
 const first=an("Scrutin n° 9 — l'ensemble du projet de loi test (lecture définitive).",{external_id:'VTANR5L17V9'});const last={...first,external_id:'VTANR5L17V100'};assert.deepEqual(selectEssentialVotes([first,last]),[last]);
});
test('European resolutions and decisions do not constitute final adoption of a French law',()=>{
 for(const title of ['A10-0001/2026 - Vote unique','RC-B10-0001/2026 - Proposition de résolution (ensemble du texte)','A10-0001/2026 - Proposition de décision (ensemble du texte)'])assert.equal(voteSelection({...an(title),institution:'parlement_europeen'}),null);
});
