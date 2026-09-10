"use client";
import { useEffect, useState } from "react";
import { StaticSignalPoster } from "./StaticSignalPoster";
import type SignalSceneType from "./SignalScene";

type SceneComponent = typeof SignalSceneType;
export function SignalCanvas() {
  const [Scene,setScene]=useState<SceneComponent|null>(null); const [progress,setProgress]=useState(0); const [failed,setFailed]=useState(false); const [dark,setDark]=useState(false);
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)"); const desktop=matchMedia("(min-width: 700px)");
    queueMicrotask(()=>setDark(document.documentElement.dataset.theme==="dark")); const themeObserver=new MutationObserver(()=>setDark(document.documentElement.dataset.theme==="dark")); themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    let cancelled=false; const canvas=document.createElement("canvas"); const capable=Boolean(canvas.getContext("webgl2")||canvas.getContext("webgl"));
    if(!reduced.matches&&desktop.matches&&capable){const load=()=>import("./SignalScene").then((m)=>{if(!cancelled)setScene(()=>m.default)}).catch(()=>setFailed(true)); if("requestIdleCallback" in window)(window as Window & {requestIdleCallback:(cb:()=>void,options?:{timeout:number})=>number}).requestIdleCallback(load,{timeout:800});else globalThis.setTimeout(load,120);}
    let raf=0; const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const ids=["top","kairos","ayam-kalintang","sambut","colors","aether3d","nara"];const y=scrollY+innerHeight*.48;let value=0;for(let i=0;i<ids.length-1;i++){const a=document.getElementById(ids[i]),b=document.getElementById(ids[i+1]);if(!a||!b)continue;const ay=a.offsetTop+a.offsetHeight*.5,by=b.offsetTop+b.offsetHeight*.5;if(y>=ay)value=i+Math.min(1,Math.max(0,(y-ay)/(by-ay)));}setProgress(Math.min(6,value));});};
    update();addEventListener("scroll",update,{passive:true});addEventListener("resize",update,{passive:true});return()=>{cancelled=true;cancelAnimationFrame(raf);removeEventListener("scroll",update);removeEventListener("resize",update);themeObserver.disconnect();};
  },[]);
  return <div className="signal-layer" aria-hidden="true" data-mode={Scene&&!failed?"webgl":"poster"}>{Scene&&!failed?<Scene progress={progress} dark={dark} onLost={()=>setFailed(true)}/>:<StaticSignalPoster state={Math.round(progress)}/>}</div>;
}
