import { PageStructuredData } from '@/components/structured-data';
import { Suspense } from 'react';
import { ShareTools } from '@/components/share-tools';
import { publicSeoDocument } from '@/lib/seo-content';

export async function SeoPage({path}:{path:string}) {
  let document;
  try {
    document = await publicSeoDocument(path);
  } catch { return null; }
  return document ? <><PageStructuredData path={path} document={document} /><Suspense fallback={null}><ShareTools path={path} document={document} /></Suspense></> : null;
}
