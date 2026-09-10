"use client";

import Link from "next/link";

export default function GlobalError({reset}:{error:Error&{digest?:string};reset:()=>void}){
  return <html lang="en">
    <body style={{margin:0,minHeight:"100vh",display:"grid",placeItems:"center",background:"#070C16",color:"#E8EDF5",fontFamily:"system-ui,sans-serif"}}>
      <main style={{width:"min(680px,calc(100% - 32px))",padding:"48px 0"}}>
        <p style={{margin:"0 0 14px",fontSize:13,color:"#94ADD1"}}>Runtime recovery</p>
        <h1 style={{margin:"0 0 20px",fontSize:"clamp(42px,8vw,72px)",fontWeight:400,lineHeight:1}}>Something went wrong.</h1>
        <p style={{maxWidth:520,lineHeight:1.6,color:"#9EABC0"}}>The page could not finish rendering. You can retry without losing the public project index.</p>
        <div style={{display:"flex",gap:18,marginTop:32,flexWrap:"wrap"}}>
          <button onClick={reset} style={{font:"inherit",padding:"10px 14px",border:"1px solid #333F54",borderRadius:10,background:"#0E1522",color:"#E8EDF5",cursor:"pointer"}}>Try again</button>
          <Link href="/" style={{padding:"10px 0",color:"#8CB6FF"}}>Return home</Link>
        </div>
      </main>
    </body>
  </html>;
}
