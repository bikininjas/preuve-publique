import {test} from 'node:test';
import assert from 'node:assert/strict';
import {voteSelection,selectEssentialVotes} from '../lib/vote-selection.mjs';
const an=(title,extras={})=>({kind:'vote',institution:'assemblee',title,external_id:'VTANR5L17V20',occurred_at:'2026-01-02',detail:{refs:[{type:'an:dossier',value:'DLR5L17N1'}]},...extras});
test('whole laws exclude amendments, parts, motions and non-legislative resolutions',()=>{
 for(const title of ["Scrutin n° 2 — l'amendement n° 12 à l'ensemble du projet de loi test", "Scrutin n° 2 — la première partie du projet de loi test", "Scrutin n° 2 — la motion de rejet du projet de loi test", "Scrutin n° 2 — l'ensemble de la proposition de résolution test"]){assert.equal(voteSelection(an(title)),null);}
 assert.equal(voteSelection(an("Scrutin n° 2 — l'ensemble du projet de loi test (lecture définitive)." )).definitive,true);
 assert.equal(voteSelection(an("Scrutin n° 2 — l'ensemble du projet de loi test (première lecture)." )).definitive,false);
 assert.ok(voteSelection({...an("Scrutin n° 2 — sur l'article 4 constituant l'ensemble de la proposition de loi test"),institution:'senat'}));
});
test('last whole vote keeps a rejection and uses numeric order on the same date',()=>{
 const title="Scrutin n° 2 — l'ensemble du projet de loi test";
 const first=an(title,{external_id:'VTANR5L17V9'}),last=an(title,{external_id:'VTANR5L17V100',detail:{refs:first.detail.refs,sort:{code:'rejeté'}}});
 assert.deepEqual(selectEssentialVotes([last,first]),[last]);
 assert.equal(voteSelection(last).definitive,false);
});
test('without a dossier only identical wording in the same legislature is grouped',()=>{
 const first=an("Scrutin n° 2 — l'ensemble du projet de loi de finances pour 2025 (première lecture).",{detail:{legislature:17}});
 const second={...first,title:first.title.replace('première lecture','lecture définitive'),occurred_at:'2026-01-04'};
 const other={...first,title:first.title.replace('2025','2026')};
 assert.deepEqual(selectEssentialVotes([first,other,second]),[second,other]);
});
test('one European report can contain distinct whole decisions and resolutions',()=>{
 const base={kind:'vote',institution:'parlement_europeen',occurred_at:'2023-05-10'};
 const resolution={...base,external_id:'MTG-PL-2023-05-10-DEC-155028',title:'Vote du 2023-05-10 — A9-0142/2023 - Proposition de résolution (ensemble du texte)'};
 const firstDecision={...base,external_id:'MTG-PL-2023-05-10-DEC-155223',title:'Vote du 2023-05-10 — A9-0142/2023 - Proposition de décision (ensemble du texte)'};
 const decision={...firstDecision,external_id:'MTG-PL-2023-05-10-DEC-155224',title:firstDecision.title.replace('Proposition de décision','Propositions de décision')};
 assert.deepEqual(selectEssentialVotes([resolution,firstDecision,decision]),[resolution,decision]);
});

test('European votes require final source wording and a document identifier',()=>{
 const pe=title=>({kind:'vote',institution:'parlement_europeen',title});
 assert.ok(voteSelection(pe('Vote du 2026-01-02 — A10-0001/2026 - Vote unique')));
 assert.ok(voteSelection(pe('Vote du 2026-01-02 — RC-B10-0001/2026 - Proposition de résolution (ensemble du texte)')));
 for(const title of ['Vote du 2026-01-02 — A10-0001/2026 - Am 1','Vote du 2026-01-02 — § 5','Vote du 2026-01-02 — Accord sur l’ensemble des contingents - A10-0001/2026 - Procédure d’approbation'])assert.equal(voteSelection(pe(title)),null);
});
