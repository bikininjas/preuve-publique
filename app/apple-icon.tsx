import { ImageResponse } from 'next/og';
export const size = {width:180,height:180};
export const contentType = 'image/png';
export default function Icon() {
  return new ImageResponse(<div style={{display:'flex',background:'#142636',color:'#f5f3ed',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',fontSize:125,fontWeight:700}}>P<span style={{color:'#e54d2e'}}>·</span></div>,size);
}
