"use client";

export default function GlobalError({reset}:{reset:()=>void}){
  const shell={minHeight:"100vh",display:"grid",placeItems:"center",margin:0,padding:"24px",background:"#070C16",color:"#E8EDF5",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"} as const;
  const panel={width:"min(680px, 100%)",padding:"clamp(28px, 6vw, 56px)",border:"1px solid #333F54",borderRadius:"28px",background:"#0E1522",boxShadow:"0 36px 90px -44px rgba(0,0,0,.8)"} as const;
  const actions={display:"flex",gap:"18px",flexWrap:"wrap" as const,marginTop:"32px",alignItems:"center"} as const;
  const button={minHeight:"44px",padding:"0 18px",border:"1px solid #8CB6FF",borderRadius:"999px",background:"transparent",color:"#E8EDF5",font:"inherit",cursor:"pointer"} as const;
  const link={color:"#8CB6FF",textUnderlineOffset:"4px"} as const;
  return <html lang="en"><body style={shell}><main style={panel}><p style={{margin:"0 0 16px",color:"#94ADD1",fontSize:"13px"}}>Runtime error</p><h1 style={{margin:0,fontSize:"clamp(40px, 8vw, 68px)",fontWeight:400,lineHeight:1}}>Something went wrong.</h1><p style={{maxWidth:"52ch",margin:"24px 0 0",color:"#9EABC0",lineHeight:1.6}}>The portfolio could not finish loading this view. You can retry without losing the route, or return to the project index.</p><div style={actions}><button type="button" style={button} onClick={reset}>Try again</button><a href="/" style={link}>Return home</a></div></main></body></html>;
}
