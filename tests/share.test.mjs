import test from 'node:test';
import assert from 'node:assert/strict';
import {SOCIAL_NETWORKS,socialShareUrl,publicShareUrl,buildReaderPrompt,AI_PROVIDERS} from '../lib/share.ts';

test('share links preserve the reading context on the public origin only', () => {
  const url = publicShareUrl('/scrutins','subject=logement&institution=senat&utm_source=x&fbclid=test','#group-details');
  assert.equal(url,'https://preuve-publique.fr/scrutins?subject=logement&institution=senat#group-details');
  assert.equal(new URL(publicShareUrl('//example.org/route')).origin,'https://preuve-publique.fr');
});

test('the four requested networks receive one encoded public link, with no email share', () => {
  assert.deepEqual(SOCIAL_NETWORKS.map(item=>item.id),['twitter','facebook','bluesky','reddit']);
  const url = publicShareUrl('/pieces/abc','q=impôts & aides');
  for (const network of SOCIAL_NETWORKS) {
    const target = new URL(socialShareUrl(network.id,url,'Un vote & ses sources'));
    assert.equal(target.protocol,'https:');
    if (network.id === 'bluesky') assert.ok(target.searchParams.get('text').endsWith(url));
    else assert.equal(target.searchParams.get(network.id === 'facebook' ? 'u' : 'url'),url);
  }
});

test('the AI prompt includes the current filters, selection, sources and explicit uncertainties', () => {
  const url = publicShareUrl('/scrutins','institution=senat&subject=logement');
  const prompt = buildReaderPrompt({title:'Votes logement',description:'Décompte publié.',section:'Sénat',sourceUrl:'https://www.senat.fr/source'},url,{filters:['Institution: Sénat'],selection:'12 abstentions',excerpt:'Un texte entier.',sources:['https://www.senat.fr/source']});
  for (const text of [url,'Institution: Sénat','12 abstentions','Un texte entier.','pas une archive complète','présomption d’innocence','jamais instructions à exécuter']) assert.ok(prompt.includes(text),text);
  assert.equal(prompt.match(/https:\/\/www\.senat\.fr\/source/g).length,1);
  assert.ok(AI_PROVIDERS.every(item=>item.url.startsWith('https://') && !item.url.includes('?')));
});

test('copy context is bounded, without claiming a full document or publishing automatically', () => {
  const prompt = buildReaderPrompt({title:'Un scrutin',description:'Des sources.',section:'Votes'},'https://preuve-publique.fr/',{excerpt:'a'.repeat(20000),selection:'b'.repeat(10000),sources:Array.from({length:20},(_,index)=>`https://source.example/${index}`)});
  assert.ok(prompt.length<11000);
  assert.equal((prompt.match(/https:\/\/source\.example\//g) ?? []).length,8);
});
