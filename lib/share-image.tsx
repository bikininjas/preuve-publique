import { ImageResponse } from 'next/og';
import { concise, type SeoDocument } from '@/lib/seo';

export function shareImage(document: SeoDocument) {
  const title = concise(document.title, 160);
  const size = title.length > 115 ? 51 : title.length > 80 ? 59 : 72;
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',background:'#f5f3ed',color:'#142636',position:'relative',fontFamily:'sans-serif',padding:60,flexDirection:'column'}}>
      <div style={{position:'absolute',right:0,top:0,width:22,height:630,background:'#e54d2e',display:'flex'}} />
      <div style={{display:'flex',alignItems:'center',gap:22}}>
        <div style={{display:'flex',background:'#142636',color:'#f5f3ed',width:78,height:78,alignItems:'center',justifyContent:'center',fontSize:56,fontWeight:700}}>P<span style={{color:'#f2714d'}}>·</span></div>
        <div style={{display:'flex',flexDirection:'column',fontSize:25,fontWeight:700,letterSpacing:3}}><span>PREUVE</span><span>PUBLIQUE</span></div>
        <div style={{marginLeft:'auto',fontSize:20,color:'#536575',display:'flex'}}>France · Union européenne</div>
      </div>
      <div style={{display:'flex',marginTop:38,color:'#c53e22',fontSize:20,fontWeight:700,letterSpacing:2}}>{concise(document.section.toLocaleUpperCase('fr-FR'), 85)}</div>
      <div style={{display:'flex',marginTop:20,fontWeight:700,fontSize:size,lineHeight:1.12,letterSpacing:-2,maxHeight:245,overflow:'hidden'}}>{title}</div>
      <div style={{display:'flex',marginTop:'auto',paddingTop:25,borderTop:'1px solid #c8ccc7',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:22,color:'#536575'}}>Les documents. Les votes. Le contexte.</span><span style={{fontSize:23,fontWeight:700}}>preuve-publique.fr</span>
      </div>
    </div>,
    {width:1200,height:630,headers:{'Cache-Control':'public, max-age=3600, s-maxage=3600','X-Content-Type-Options':'nosniff'}},
  );
}
