import { ImageResponse } from "next/og";

export const alt="Valensius Alven — software, AI systems and student-led project work";
export const size={width:1200,height:630};
export const contentType="image/png";

export default function Image(){
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"#E9EFF6",color:"#131B2A",padding:"76px",fontFamily:"sans-serif"}}>
      <div style={{position:"absolute",width:520,height:520,borderRadius:999,right:-80,top:-120,background:"#DCEAFF",opacity:.82}}/>
      <div style={{position:"absolute",width:360,height:360,borderRadius:999,right:120,bottom:-190,background:"#2F74E8",opacity:.10}}/>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",zIndex:2}}>
        <div style={{fontSize:24,color:"#283F62"}}>Informatics Engineering · Universitas Padjadjaran</div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",flexDirection:"column",fontSize:92,letterSpacing:"-3px",lineHeight:.95}}>VALENSIUS<br/>ALVEN</div>
          <div style={{fontSize:28,marginTop:36}}>Software, AI systems and student-led project work.</div>
        </div>
      </div>
      <svg width="390" height="300" viewBox="0 0 390 300" style={{position:"absolute",right:36,top:180,zIndex:3}}>
        <ellipse cx="198" cy="150" rx="126" ry="70" transform="rotate(-18 198 150)" fill="none" stroke="#2F74E8" strokeWidth="10"/>
        <ellipse cx="198" cy="150" rx="78" ry="116" transform="rotate(34 198 150)" fill="none" stroke="#1757AF" strokeWidth="7" opacity=".78"/>
        <path d="M78 208a150 94 0 0 1 248-94" fill="none" stroke="#2F74E8" strokeWidth="5" strokeLinecap="round" opacity=".72"/>
        <circle cx="198" cy="150" r="41" fill="#E9EFF6" stroke="#2F74E8" strokeWidth="10"/>
        <circle cx="105" cy="102" r="10" fill="#1757AF"/>
        <circle cx="289" cy="203" r="10" fill="#2F74E8"/>
        <circle cx="316" cy="91" r="8" fill="#1757AF"/>
      </svg>
    </div>,
    size
  );
}
