import test from 'node:test';
import assert from 'node:assert/strict';
import {pageMetadata, seoQuery, serializeJsonLd} from '../lib/seo.ts';

test('tracking parameters preserve one canonical, pages keep their own URL', () => {
  assert.equal(pageMetadata('/pieces',undefined,{utm_source:'facebook',fbclid:'abc'}).alternates.canonical,'https://preuve-publique.fr/pieces');
  const page = pageMetadata('/pieces',undefined,{page:'2'});
  assert.equal(page.alternates.canonical,'https://preuve-publique.fr/pieces?page=2');
  assert.equal(page.robots.index,true);
});

test('curated facets are finite; searches and combined facets do not become indexable', () => {
  const subject = pageMetadata('/scrutins',undefined,{subject:'logement',institution:'senat'});
  assert.equal(subject.robots.index,true);
  assert.match(subject.title.absolute,/Logement/);
  assert.equal(subject.alternates.canonical,'https://preuve-publique.fr/scrutins?institution=senat&subject=logement');
  assert.equal(seoQuery('/scrutins',{institution:'assemblee'}).path,'/scrutins?institution=assemblee');
  assert.equal(seoQuery('/categories',{institution:'assemblee'}).path,'/categories');
  for (const query of [{q:'logement'},{subject:'invented'},{party:'anything'},{subject:['logement','retraites']},{subject:'logement',category:'vie-quotidienne'}]) {
    assert.equal(seoQuery('/scrutins',query).indexable,false);
  }
});

test('every page describes its own preview and stays on the public HTTPS domain', () => {
  const metadata = pageMetadata('/pieces/01234567-89ab-cdef-0123-456789abcdef',{title:'Un scrutin précis',description:'Une pièce publiée.',section:'Sénat'});
  assert.equal(metadata.openGraph.url,metadata.alternates.canonical);
  assert.equal(metadata.openGraph.images[0].url,'https://preuve-publique.fr/partage/pieces/01234567-89ab-cdef-0123-456789abcdef');
  assert.equal(metadata.twitter.images[0].url,metadata.openGraph.images[0].url);
  assert.equal(metadata.twitter.card,'summary_large_image');
});

test('source titles cannot terminate a structured data script', () => {
  const source = {name:'</script><script>alert(1)</script> & test\u2028'};
  const serialized = serializeJsonLd(source);
  assert.ok(!serialized.includes('<'));
  assert.ok(!serialized.includes('\u2028'));
  assert.deepEqual(JSON.parse(serialized),source);
});
