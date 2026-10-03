import { test } from 'node:test';
import assert from 'node:assert/strict';
import { peGetJson, pePaginate, activityDate } from '../lib/pe.mjs';

test('HTTP 204 ne produit pas une erreur JSON ni des votes inventés',async()=>{
 const result=await peGetJson('https://example.test',{request:async()=>({status:204,body:Buffer.alloc(0),text:''})});
 assert.deepEqual(result.json,{data:[]});
});
test('la pagination ne peut pas terminer silencieusement sur une page pleine au plafond',async()=>{
 const getJson=async()=>({json:{data:[{},{}]}});
 await assert.rejects(pePaginate('https://example.test',{limit:2,maxPages:2,getJson}),/incomplet/);
 let requests=0;
 const pages=await pePaginate('https://example.test',{limit:2,maxPages:2,getJson:async()=>({json:{data:++requests===1?[{},{}]:[]}})});
 assert.equal(pages.length,2);
});
test('la date JSON-LD des anciennes mandatures conserve le jour officiel',()=>{
 assert.equal(activityDate({'eli-dl:activity_date':{'@value':'2019-01-14T00:00:00Z'}}),'2019-01-14');
 assert.equal(activityDate({activity_date:'2026-10-03'}),'2026-10-03');
 assert.equal(activityDate({}),null);
});
