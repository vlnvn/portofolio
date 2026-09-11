"use client";

import { useEffect, useRef, useState } from "react";
import { StaticSignalPoster } from "./StaticSignalPoster";
import type SignalSceneType from "./SignalScene";

type SceneComponent=typeof SignalSceneType;
type Ambient={ax:number;ay:number;bx:number;by:number;scaleA:number;scaleB:number;opacityA:number;opacityB:number};
type ArtifactState="hero"|"kairos"|"kalintang";
type ArtifactDetail={from:ArtifactState;to:ArtifactState;t:number;opacity:number};

const clamp=(value:number,min=-1,max=1)=>Math.max(min,Math.min(max,value));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const smoothstep=(value:number)=>{const t=clamp(value,0,1);return t*t*(3-2*t);};

export function SignalCanvas({hostSelector=".hero",persistent=false}:{hostSelector?:string;persistent?:boolean}){
  const layerRef=useRef<HTMLDivElement>(null);
  const [Scene,setScene]=useState<SceneComponent|null>(null);
  const [eligible,setEligible]=useState(false);
  const [failed,setFailed]=useState(false);
  const [dark,setDark]=useState(false);

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
    const update=()=>{const next=desktop.matches&&!reduced.matches&&capable;setEligible(next);if(!next)setScene(null);};
    update();desktop.addEventListener("change",update);reduced.addEventListener("change",update);
    return()=>{desktop.removeEventListener("change",update);reduced.removeEventListener("change",update);};
  },[]);

  useEffect(()=>{
    if(!eligible||failed)return;
    let cancelled=false;
    let idleHandle:number|undefined;
    let timeoutHandle:ReturnType<typeof setTimeout>|undefined;
    const load=()=>import("./SignalScene").then(module=>{if(!cancelled)setScene(()=>module.default)}).catch(()=>setFailed(true));
    if("requestIdleCallback" in window)idleHandle=(window as Window&{requestIdleCallback:(callback:()=>void,options?:{timeout:number})=>number}).requestIdleCallback(load,{timeout:700});
    else timeoutHandle=globalThis.setTimeout(load,80);
    return()=>{cancelled=true;if(idleHandle!==undefined&&"cancelIdleCallback" in window)(window as Window&{cancelIdleCallback:(handle:number)=>void}).cancelIdleCallback(idleHandle);if(timeoutHandle!==undefined)clearTimeout(timeoutHandle);};
  },[eligible,failed]);

  useEffect(()=>{
    const root=document.documentElement;
    root.dataset.ambient="on";
    return()=>{delete root.dataset.ambient;delete root.dataset.lightSection;for(const property of ["--ambient-a-x","--ambient-a-y","--ambient-b-x","--ambient-b-y","--ambient-a-scale","--ambient-b-scale","--ambient-a-opacity","--ambient-b-opacity"])root.style.removeProperty(property);};
  },[]);

  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMotion=matchMedia("(min-width: 700px)");
    const sections=Array.from(document.querySelectorAll<HTMLElement>(".hero,.project-chapter,.contact,.not-found"));
    const pointer={x:0,y:0,clientX:innerWidth/2,clientY:innerHeight/2,active:false};
    let frame=0;
    const setValue=(element:HTMLElement,name:string,value:number,unit="px")=>element.style.setProperty(name,`${value.toFixed(2)}${unit}`);
    const setRoot=(name:string,value:number,unit="px")=>document.documentElement.style.setProperty(name,`${value.toFixed(2)}${unit}`);

    const preset=(section:HTMLElement,rect:DOMRect,px:number,py:number,motionAllowed:boolean):Ambient=>{
      const id=section.id||"not-found";
      const progress=motionAllowed?clamp((innerHeight*.5-(rect.top+rect.height*.5))/Math.max(rect.height,1)):0;
      const responsive=Math.min(innerWidth,1440)/1440;
      switch(id){
        case "top": return {ax:(-120+px*58+progress*28)*responsive,ay:(-48+py*34+progress*18)*responsive,bx:(235+px*26-progress*22)*responsive,by:(-125+py*18-progress*16)*responsive,scaleA:1.06,scaleB:1.12,opacityA:.76,opacityB:.68};
        case "kairos": return {ax:(230+progress*92+px*28)*responsive,ay:(-92+progress*42+py*18)*responsive,bx:(-260+progress*34-px*18)*responsive,by:(95-progress*28+py*12)*responsive,scaleA:1.02,scaleB:1.08,opacityA:.68,opacityB:.54};
        case "ayam-kalintang": return {ax:(-245+progress*58+px*22)*responsive,ay:(-34-progress*28+py*16)*responsive,bx:(225-progress*52-px*16)*responsive,by:(118+progress*38+py*18)*responsive,scaleA:1.05,scaleB:1.02,opacityA:.62,opacityB:.58};
        case "sambut": return {ax:(-250+progress*54+px*24)*responsive,ay:(-22+py*22)*responsive,bx:(250-progress*54-px*24)*responsive,by:(18-py*22)*responsive,scaleA:1.04,scaleB:1.04,opacityA:.66,opacityB:.62};
        case "colors": return {ax:(-28+progress*30+px*18)*responsive,ay:(40+progress*18+py*14)*responsive,bx:(118-progress*20-px*12)*responsive,by:(-64+progress*14+py*10)*responsive,scaleA:1.2,scaleB:1.24,opacityA:.58,opacityB:.52};
        case "aether3d": return {ax:(-210+progress*78+px*34)*responsive,ay:(28-progress*44+py*24)*responsive,bx:(245-progress*66-px*28)*responsive,by:(-128+progress*34-py*18)*responsive,scaleA:1.13,scaleB:1.18,opacityA:.82,opacityB:.72};
        case "nara": return {ax:(110+progress*38+px*14)*responsive,ay:(68+py*12)*responsive,bx:(-135-progress*26-px*10)*responsive,by:(-52+progress*12)*responsive,scaleA:1.08,scaleB:1.04,opacityA:.52,opacityB:.46};
        case "contact": return {ax:(-70+progress*20+px*10)*responsive,ay:(110+py*8)*responsive,bx:(92-progress*18-px*8)*responsive,by:(72-py*6)*responsive,scaleA:1.14,scaleB:1.1,opacityA:.48,opacityB:.42};
        default:return {ax:(90+px*34)*responsive,ay:(-40+py*24)*responsive,bx:(-105-px*20)*responsive,by:(88-py*18)*responsive,scaleA:1.1,scaleB:1.16,opacityA:.66,opacityB:.58};
      }
    };

    const applyPortrait=()=>{
      const host=document.querySelector<HTMLElement>(hostSelector);
      const portrait=host?.querySelector<HTMLElement>(".portrait");
      if(!portrait)return;
      const rect=portrait.getBoundingClientRect();
      const inside=!reduced.matches&&desktopMotion.matches&&pointer.active&&pointer.clientX>=rect.left&&pointer.clientX<=rect.right&&pointer.clientY>=rect.top&&pointer.clientY<=rect.bottom;
      const hx=inside?clamp((pointer.clientX-rect.left)/Math.max(rect.width,1)*2-1):0;
      const hy=inside?clamp((pointer.clientY-rect.top)/Math.max(rect.height,1)*2-1):0;
      setValue(portrait,"--portrait-x",hx*15);setValue(portrait,"--portrait-y",hy*11);setValue(portrait,"--portrait-rx",-hy*1.8,"deg");setValue(portrait,"--portrait-ry",hx*2.2,"deg");
      setValue(portrait,"--portrait-light-x",hx*54);setValue(portrait,"--portrait-light-y",hy*44);setValue(portrait,"--portrait-shadow-x",-hx*22);setValue(portrait,"--portrait-shadow-y",30-hy*16);
      portrait.dataset.spatialActive=inside?"true":"false";
    };

    const update=()=>{
      frame=0;
      const motionAllowed=!reduced.matches&&desktopMotion.matches;
      const pointerAllowed=motionAllowed&&pointer.active;
      const px=pointerAllowed?pointer.x:0,py=pointerAllowed?pointer.y:0;
      const candidates=sections.map(section=>{const rect=section.getBoundingClientRect();return {section,rect,distance:Math.abs(rect.top+rect.height*.5-innerHeight*.5)};}).filter(item=>item.rect.bottom>-innerHeight*.8&&item.rect.top<innerHeight*1.8).sort((a,b)=>a.distance-b.distance).slice(0,2);
      if(candidates.length){
        const weights=candidates.map(item=>1/(item.distance+120)),total=weights.reduce((sum,value)=>sum+value,0);
        const mixed:Ambient={ax:0,ay:0,bx:0,by:0,scaleA:0,scaleB:0,opacityA:0,opacityB:0};
        candidates.forEach((item,index)=>{const value=preset(item.section,item.rect,px,py,motionAllowed),weight=weights[index]/total;for(const key of Object.keys(mixed) as (keyof Ambient)[])mixed[key]+=value[key]*weight;});
        document.documentElement.dataset.lightSection=candidates[0].section.id||"not-found";
        setRoot("--ambient-a-x",mixed.ax);setRoot("--ambient-a-y",mixed.ay);setRoot("--ambient-b-x",mixed.bx);setRoot("--ambient-b-y",mixed.by);
        document.documentElement.style.setProperty("--ambient-a-scale",mixed.scaleA.toFixed(3));document.documentElement.style.setProperty("--ambient-b-scale",mixed.scaleB.toFixed(3));document.documentElement.style.setProperty("--ambient-a-opacity",mixed.opacityA.toFixed(3));document.documentElement.style.setProperty("--ambient-b-opacity",mixed.opacityB.toFixed(3));
      }
      applyPortrait();
      document.documentElement.dataset.lightfieldFrames=String((Number(document.documentElement.dataset.lightfieldFrames)||0)+1);
    };

    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const onMouse=(event:MouseEvent)=>{pointer.clientX=event.clientX;pointer.clientY=event.clientY;pointer.x=clamp(event.clientX/Math.max(innerWidth,1)*2-1);pointer.y=clamp(event.clientY/Math.max(innerHeight,1)*2-1);pointer.active=true;schedule();};
    const reset=()=>{pointer.active=false;pointer.x=0;pointer.y=0;schedule();};
    update();
    window.addEventListener("mousemove",onMouse,{passive:true});window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule,{passive:true});window.addEventListener("blur",reset);document.documentElement.addEventListener("mouseleave",reset);reduced.addEventListener("change",schedule);desktopMotion.addEventListener("change",schedule);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("mousemove",onMouse);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);window.removeEventListener("blur",reset);document.documentElement.removeEventListener("mouseleave",reset);reduced.removeEventListener("change",schedule);desktopMotion.removeEventListener("change",schedule);};
  },[hostSelector]);

  useEffect(()=>{
    if(!persistent)return;
    const root=document.documentElement;
    const layer=layerRef.current;
    let frame=0;

    const anchor=(element:HTMLElement,kind:ArtifactState)=>{
      const rect=element.getBoundingClientRect();
      if(kind==="hero")return {x:clamp(rect.left+rect.width*.82,170,innerWidth-170),y:clamp(rect.top+rect.height*.78,145,innerHeight-145),scale:1};
      if(kind==="kairos")return {x:clamp(rect.right-46,170,innerWidth-170),y:clamp(rect.bottom-72,145,innerHeight-145),scale:.9};
      return {x:clamp(rect.left+54,170,innerWidth-170),y:clamp(rect.bottom-78,145,innerHeight-145),scale:.92};
    };

    const apply=()=>{
      frame=0;
      if(!layer)return;
      const portrait=document.querySelector<HTMLElement>(".hero .portrait");
      const kairos=document.querySelector<HTMLElement>("#kairos .project-media");
      const kalintang=document.querySelector<HTMLElement>("#ayam-kalintang .project-media");
      const kairosSection=document.getElementById("kairos");
      const kalintangSection=document.getElementById("ayam-kalintang");
      const sambutSection=document.getElementById("sambut");
      if(!portrait||!kairos||!kalintang||!kairosSection||!kalintangSection||!sambutSection)return;

      const heroAnchor=anchor(portrait,"hero");
      const kairosAnchor=anchor(kairos,"kairos");
      const kalintangAnchor=anchor(kalintang,"kalintang");
      const kairosRect=kairosSection.getBoundingClientRect();
      const kalintangRect=kalintangSection.getBoundingClientRect();
      const sambutRect=sambutSection.getBoundingClientRect();
      const start=innerHeight*.78,end=innerHeight*.38;
      let from:ArtifactState="hero",to:ArtifactState="hero",t=0,opacity=1,a=heroAnchor,b=heroAnchor;

      if(kairosRect.top<=start&&kairosRect.top>end){
        from="hero";to="kairos";t=smoothstep((start-kairosRect.top)/(start-end));a=heroAnchor;b=kairosAnchor;
      }else if(kairosRect.top<=end&&kalintangRect.top>start){
        from="kairos";to="kairos";a=kairosAnchor;b=kairosAnchor;
      }else if(kalintangRect.top<=start&&kalintangRect.top>end){
        from="kairos";to="kalintang";t=smoothstep((start-kalintangRect.top)/(start-end));a=kairosAnchor;b=kalintangAnchor;
      }else if(kalintangRect.top<=end){
        from="kalintang";to="kalintang";a=kalintangAnchor;b=kalintangAnchor;
        if(sambutRect.top<=innerHeight*.72)opacity=1-smoothstep((innerHeight*.72-sambutRect.top)/(innerHeight*.30));
      }

      const x=lerp(a.x,b.x,t),y=lerp(a.y,b.y,t),scale=lerp(a.scale,b.scale,t);
      layer.style.setProperty("--artifact-x",`${x.toFixed(2)}px`);
      layer.style.setProperty("--artifact-y",`${y.toFixed(2)}px`);
      layer.style.setProperty("--artifact-scale",scale.toFixed(3));
      layer.style.setProperty("--artifact-opacity",clamp(opacity,0,1).toFixed(3));
      layer.dataset.artifactPhase=from===to?`${from}:settled`:`${from}:${to}`;
      root.dataset.artifactFrom=from;root.dataset.artifactTo=to;root.dataset.artifactMix=t.toFixed(3);root.dataset.artifactOpacity=clamp(opacity,0,1).toFixed(3);
      const detail:ArtifactDetail={from,to,t,opacity:clamp(opacity,0,1)};
      window.dispatchEvent(new CustomEvent<ArtifactDetail>("portfolio-artifact",{detail}));
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(apply);};
    apply();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule,{passive:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);delete root.dataset.artifactFrom;delete root.dataset.artifactTo;delete root.dataset.artifactMix;delete root.dataset.artifactOpacity;};
  },[persistent]);

  const webgl=eligible&&Scene&&!failed;

  useEffect(()=>{
    if(!persistent)return;
    const root=document.documentElement;
    root.dataset.signalFallback=webgl?"false":"true";
    return()=>{delete root.dataset.signalFallback;};
  },[persistent,webgl]);

  return <div ref={layerRef} className={`signal-layer${persistent?" persistent-artifact":""}`} aria-hidden="true" data-mode={webgl?"webgl":"poster"}>{webgl?<Scene dark={dark} persistent={persistent} onLost={()=>{setFailed(true);setScene(null)}}/>:<StaticSignalPoster/>}</div>;
}
