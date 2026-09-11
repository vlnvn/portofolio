"use client";

import { useEffect, useRef, useState } from "react";
import { StaticSignalPoster } from "./StaticSignalPoster";
import type SignalSceneType from "./SignalScene";

type SceneComponent=typeof SignalSceneType;
type Tilt={x:number;y:number};

export function SignalCanvas(){
  const [Scene,setScene]=useState<SceneComponent|null>(null);
  const [eligible,setEligible]=useState(false);
  const [failed,setFailed]=useState(false);
  const [dark,setDark]=useState(false);
  const [tilt,setTilt]=useState<Tilt>({x:0,y:0});
  const lastHero=useRef({x:Number.NaN,y:Number.NaN});

  useEffect(()=>{
    queueMicrotask(()=>setDark(document.documentElement.dataset.theme==="dark"));
    const observer=new MutationObserver(()=>setDark(document.documentElement.dataset.theme==="dark"));
    observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
    return()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    const desktop=matchMedia("(min-width: 700px)");
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const probe=document.createElement("canvas");
    const capable=Boolean(probe.getContext("webgl2")||probe.getContext("webgl"));
    const update=()=>{
      const next=desktop.matches&&!reduced.matches&&capable;
      setEligible(next);
      if(!next){setScene(null);setTilt({x:0,y:0});}
    };
    update();
    desktop.addEventListener("change",update);
    reduced.addEventListener("change",update);
    return()=>{desktop.removeEventListener("change",update);reduced.removeEventListener("change",update);};
  },[]);

  useEffect(()=>{
    if(!eligible||failed)return;
    let cancelled=false;
    let idleHandle:number|undefined;
    let timeoutHandle:ReturnType<typeof setTimeout>|undefined;
    const load=()=>import("./SignalScene").then(module=>{if(!cancelled)setScene(()=>module.default)}).catch(()=>setFailed(true));
    if("requestIdleCallback" in window)idleHandle=(window as Window&{requestIdleCallback:(callback:()=>void,options?:{timeout:number})=>number}).requestIdleCallback(load,{timeout:700});
    else timeoutHandle=globalThis.setTimeout(load,100);
    return()=>{
      cancelled=true;
      if(idleHandle!==undefined&&"cancelIdleCallback" in window)(window as Window&{cancelIdleCallback:(handle:number)=>void}).cancelIdleCallback(idleHandle);
      if(timeoutHandle!==undefined)clearTimeout(timeoutHandle);
    };
  },[eligible,failed]);

  useEffect(()=>{
    const finePointer=matchMedia("(hover: hover) and (pointer: fine)");
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMotion=matchMedia("(min-width: 700px)");
    const sections=Array.from(document.querySelectorAll<HTMLElement>(".hero,.project-chapter,.contact"));
    const pointer={x:0,y:0,clientX:innerWidth/2,clientY:innerHeight/2,active:false};
    let frame=0;

    const setValue=(element:HTMLElement,name:string,value:number,unit="px")=>element.style.setProperty(name,`${value.toFixed(2)}${unit}`);
    const update=()=>{
      frame=0;
      document.documentElement.dataset.lightfieldFrames=String((Number(document.documentElement.dataset.lightfieldFrames)||0)+1);
      const motionAllowed=!reduced.matches&&desktopMotion.matches;
      const pointerAllowed=motionAllowed&&finePointer.matches&&pointer.active;
      const px=pointerAllowed?pointer.x:0;
      const py=pointerAllowed?pointer.y:0;

      sections.forEach(section=>{
        const rect=section.getBoundingClientRect();
        if(rect.bottom < -120 || rect.top > innerHeight + 120)return;
        const scrollProgress=motionAllowed?Math.max(-1,Math.min(1,(innerHeight*.5-(rect.top+rect.height*.5))/Math.max(rect.height,1))):0;
        let ax=0,ay=0,bx=0,by=0,scale=1,opacity=1;
        switch(section.id){
          case "top": ax=px*28;ay=py*20+scrollProgress*18;bx=px*13;by=py*9-scrollProgress*10;opacity=Math.max(.34,Math.min(1,rect.bottom/Math.max(rect.height*.72,1)));break;
          case "kairos": ax=scrollProgress*68+py*7;ay=scrollProgress*32-px*5;bx=scrollProgress*28;by=-scrollProgress*18;break;
          case "ayam-kalintang": ax=scrollProgress*42+px*8;ay=-scrollProgress*20;bx=-scrollProgress*34-px*5;by=scrollProgress*28+py*6;break;
          case "sambut": ax=scrollProgress*34+px*8;ay=py*7;bx=-scrollProgress*34-px*8;by=-py*7;break;
          case "colors": ax=scrollProgress*24+px*5;ay=scrollProgress*16+py*4;bx=-scrollProgress*14;by=scrollProgress*10;scale=1+Math.abs(scrollProgress)*.045;break;
          case "aether3d": ax=scrollProgress*54+px*11;ay=-scrollProgress*30+py*8;bx=-scrollProgress*44-px*7;by=scrollProgress*24-py*5;scale=1.02;break;
          case "nara": ax=scrollProgress*28+px*4;ay=py*3;bx=-scrollProgress*18;by=scrollProgress*7;break;
          default: ax=-scrollProgress*22;bx=scrollProgress*22;ay=scrollProgress*5;by=-scrollProgress*5;
        }
        setValue(section,"--lf-x-a",ax);setValue(section,"--lf-y-a",ay);setValue(section,"--lf-x-b",bx);setValue(section,"--lf-y-b",by);
        section.style.setProperty("--lf-scale",scale.toFixed(3));section.style.setProperty("--lf-opacity",opacity.toFixed(3));
      });

      const hero=document.querySelector<HTMLElement>(".hero");
      if(hero){
        const bounds=hero.getBoundingClientRect();
        const inside=pointerAllowed&&pointer.clientX>=bounds.left&&pointer.clientX<=bounds.right&&pointer.clientY>=bounds.top&&pointer.clientY<=bounds.bottom;
        const hx=inside?Math.max(-1,Math.min(1,(pointer.clientX-bounds.left)/bounds.width*2-1)):0;
        const hy=inside?Math.max(-1,Math.min(1,(pointer.clientY-bounds.top)/bounds.height*2-1)):0;
        const heroChanged=Math.abs(lastHero.current.x-hx)>.001||Math.abs(lastHero.current.y-hy)>.001;
        if(heroChanged){
          lastHero.current={x:hx,y:hy};
          setTilt(current=>Math.abs(current.x-hx)<.001&&Math.abs(current.y-hy)<.001?current:{x:hx,y:hy});
          const portrait=hero.querySelector<HTMLElement>(".portrait");
          if(portrait){
            setValue(portrait,"--portrait-x",hx*11);
            setValue(portrait,"--portrait-y",hy*8);
            setValue(portrait,"--portrait-rx",-hy*1,"deg");
            setValue(portrait,"--portrait-ry",hx*1.15,"deg");
            setValue(portrait,"--portrait-light-x",hx*24);
            setValue(portrait,"--portrait-light-y",hy*18);
          }
        }
      }
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const onPointer=(event:PointerEvent)=>{pointer.clientX=event.clientX;pointer.clientY=event.clientY;pointer.x=Math.max(-1,Math.min(1,event.clientX/innerWidth*2-1));pointer.y=Math.max(-1,Math.min(1,event.clientY/innerHeight*2-1));pointer.active=true;schedule();};
    const reset=()=>{pointer.active=false;pointer.x=0;pointer.y=0;schedule();};
    update();
    addEventListener("pointermove",onPointer,{passive:true});
    addEventListener("scroll",schedule,{passive:true});
    addEventListener("resize",schedule,{passive:true});
    addEventListener("blur",reset);
    document.documentElement.addEventListener("mouseleave",reset);
    reduced.addEventListener("change",schedule);
    finePointer.addEventListener("change",schedule);
    desktopMotion.addEventListener("change",schedule);
    return()=>{cancelAnimationFrame(frame);removeEventListener("pointermove",onPointer);removeEventListener("scroll",schedule);removeEventListener("resize",schedule);removeEventListener("blur",reset);document.documentElement.removeEventListener("mouseleave",reset);reduced.removeEventListener("change",schedule);finePointer.removeEventListener("change",schedule);desktopMotion.removeEventListener("change",schedule);};
  },[]);

  const webgl=eligible&&Scene&&!failed;
  return <div className="signal-layer" aria-hidden="true" data-mode={webgl?"webgl":"poster"}>{webgl?<Scene tilt={tilt} dark={dark} onLost={()=>{setFailed(true);setScene(null)}}/>:<StaticSignalPoster/>}</div>;
}