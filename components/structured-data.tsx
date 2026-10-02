import { SEO_PAGES, serializeJsonLd, shareImagePath, type SeoDocument } from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function SiteStructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd({
    '@context':'https://schema.org', '@type':'WebSite', '@id':`${SITE_URL}/#website`,
    url:`${SITE_URL}/`, name:SITE_NAME, inLanguage:'fr-FR', description:SEO_PAGES['/'].description,
  })}} />;
}

export function PageStructuredData({path, document}:{path:string;document:SeoDocument}) {
  const url = `${SITE_URL}${path}`;
  const trail = path === '/' ? [{name:SITE_NAME,path:'/'}] : [{name:'Accueil',path:'/'}, ...(document.parent ? [document.parent] : []),{name:document.title,path}];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd({
    '@context':'https://schema.org','@graph':[
      {'@type':'WebPage','@id':`${url}#webpage`,url,name:document.title,description:document.description,inLanguage:'fr-FR',isPartOf:{'@id':`${SITE_URL}/#website`},primaryImageOfPage:{'@type':'ImageObject',contentUrl:`${SITE_URL}${shareImagePath(path)}`,width:1200,height:630}, ...(document.sourceUrl ? {citation:document.sourceUrl} : {}), breadcrumb:{'@id':`${url}#breadcrumb`}},
      {'@type':'BreadcrumbList','@id':`${url}#breadcrumb`,itemListElement:trail.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:`${SITE_URL}${item.path}`}))},
    ],
  })}} />;
}
