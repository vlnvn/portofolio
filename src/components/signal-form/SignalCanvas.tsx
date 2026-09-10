"use client";

import { useEffect, useState } from "react";
import { StaticSignalPoster } from "./StaticSignalPoster";
import type SignalSceneType from "./SignalScene";

type SceneComponent = typeof SignalSceneType;
type Tilt = { x: number; y: number };

export function SignalCanvas() {
  const [Scene,setScene]=useState<SceneComponent|null>(null);
  const [failed,setFailed]=useState(false);
  const [dark,setDark]=useState(false);
  const [tilt,setTilt]=useState<Tilt>({x:0,y:0});

  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const desktop=matchMedia("(min-width: 700px)");
    const finePointer=matchMedia("(hover: hover) and (pointer: fine)");
    queueMicrotask(()=>setDark(document.documentElement.dataset.theme==="dark"));
    const themeObserver=new MutationObserver(()=>setDark(document.documentElement.dataset.theme==="dark"));
    themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});

    let cancelled=false;
    const canvas=document.createElement("canvas");
    const capable=Boolean(canvas.getContext("webgl2")||canvas.getContext("webgl"));
    if(!reduced.matches&&desktop.matches&&capable){
      const load=()=>import("./SignalScene").then((module)=>{if(!cancelled)setScene(()=>module.default)}).catch(()=>setFailed(true));
      if("requestIdleCallback" in window)(window as Window & {requestIdleCallback:(callback:()=>void,options?:{timeout:number})=>number}).requestIdleCallback(load,{timeout:800});
      else globalThis.setTimeout(load,120);
    }

    let pointerFrame=0;
    const onPointerMove=(event: PointerEvent)=>{
      if(!finePointer.matches||reduced.matches)return;
      const hero=document.querySelector<HTMLElement>(".hero");
      if(!hero)return;
      const bounds=hero.getBoundingClientRect();
      const inside=event.clientY>=bounds.top&&event.clientY<=bounds.bottom;
      cancelAnimationFrame(pointerFrame);
      pointerFrame=requestAnimationFrame(()=>setTilt(inside?{
        x:Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1)),
        y:Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1)),
      }:{x:0,y:0}));
    };
    const resetTilt=()=>setTilt({x:0,y:0});
    addEventListener("pointermove",onPointerMove,{passive:true});
    addEventListener("blur",resetTilt);
    return()=>{
      cancelled=true;
      cancelAnimationFrame(pointerFrame);
      removeEventListener("pointermove",onPointerMove);
      removeEventListener("blur",resetTilt);
      themeObserver.disconnect();
    };
  },[]);

  return <div className="signal-layer" aria-hidden="true" data-mode={Scene&&!failed?"webgl":"poster"}>{Scene&&!failed?<Scene tilt={tilt} dark={dark} onLost={()=>setFailed(true)}/>:<StaticSignalPoster/>}</div>;
}