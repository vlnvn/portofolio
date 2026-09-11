"use client";

import { useEffect, useRef, useState } from "react";
import { StaticSignalPoster } from "./StaticSignalPoster";
import type SignalSceneType from "./SignalScene";

type SceneComponent=typeof SignalSceneType;
type Tilt={x:number;y:number};
type Ambient={ax:number;ay:number;bx:number;by:number;scaleA:number;scaleB:number;opacityA:number;opacityB:number};

const clamp=(value:number,min=-1,max=1)=>Math.max(min,Math.min(max,value));

export function SignalCanvas({hostSelector=".hero"}:{hostSelector?:string}){
  const [Scene,setScene]=useState<SceneComponent|null>(null);
  const [eligible,setEligible]=useState(false);
  const [failed,setFailed]=useState(false);
  const [dark,setDark]=useState(false);
  const [tilt,setTilt]=useState<Tilt>({x:0,y:0});
  const lastHost=useRef({x:Number.NaN,y:Number.NaN});

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
    else timeoutHandle=globalThis.setTimeout(load,80);
    return()=>{
      cancelled=true;
      if(idleHandle!==undefined&&"cancelIdleCallback" in window)(window as Window&{cancelIdleCallback:(handle:number)=>void}).cancelIdleCallback(idleHandle);
      if(timeoutHandle!==undefined)clearTimeout(timeoutHandle);
    };
  },[eligible,failed]);

  useEffect(()=>{
    const root=document.documentElement;
    root.dataset.ambient="on";
    return()=>{
      delete root.dataset.ambient;
      delete root.dataset.lightSection;
      for(const property of ["--ambient-a-x","--ambient-a-y","--ambient-b-x","--ambient-b-y","--ambient-a-scale","--ambient-b-scale","--ambient-a-opacity","--ambient-b-opacity"])root.style.removeProperty(property);
    };
  },[]);

  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMotion=matchMedia("(min-width: 700px)");
    const sections=Array.from(document.querySelectorAll<HTMLElement>(".hero,.project-chapter,.contact,.not-found"));
    const host=document.querySelector<HTMLElement>(hostSelector);
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
        default: return {ax:(90+px*34)*responsive,ay:(-40+py*24)*responsive,bx:(-105-px*20)*responsive,by:(88-py*18)*responsive,scaleA:1.1,scaleB:1.16,opacityA:.66,opacityB:.58};
      }
    };

    const update=()=>{
      frame=0;
      const motionAllowed=!reduced.matches&&desktopMotion.matches;
      const pointerAllowed=motionAllowed&&pointer.active;
      const px=pointerAllowed?pointer.x:0;
      const py=pointerAllowed?pointer.y:0;
      const candidates=sections.map(section=>{
        const rect=section.getBoundingClientRect();
        const distance=Math.abs(rect.top+rect.height*.5-innerHeight*.5);
        return {section,rect,distance};
      }).filter(item=>item.rect.bottom>-innerHeight*.8&&item.rect.top<innerHeight*1.8).sort((a,b)=>a.distance-b.distance).slice(0,2);

      if(candidates.length){
        const weights=candidates.map(item=>1/(item.distance+120));
        const total=weights.reduce((sum,value)=>sum+value,0);
        const mixed:Ambient={ax:0,ay:0,bx:0,by:0,scaleA:0,scaleB:0,opacityA:0,opacityB:0};
        candidates.forEach((item,index)=>{
          const value=preset(item.section,item.rect,px,py,motionAllowed);
          const weight=weights[index]/total;
          for(const key of Object.keys(mixed) as (keyof Ambient)[])mixed[key]+=value[key]*weight;
        });
        document.documentElement.dataset.lightSection=candidates[0].section.id||"not-found";
        setRoot("--ambient-a-x",mixed.ax);setRoot("--ambient-a-y",mixed.ay);setRoot("--ambient-b-x",mixed.bx);setRoot("--ambient-b-y",mixed.by);
        document.documentElement.style.setProperty("--ambient-a-scale",mixed.scaleA.toFixed(3));
        document.documentElement.style.setProperty("--ambient-b-scale",mixed.scaleB.toFixed(3));
        document.documentElement.style.setProperty("--ambient-a-opacity",mixed.opacityA.toFixed(3));
        document.documentElement.style.setProperty("--ambient-b-opacity",mixed.opacityB.toFixed(3));
      }
      document.documentElement.dataset.lightfieldFrames=String((Number(document.documentElement.dataset.lightfieldFrames)||0)+1);

      if(host){
        const bounds=host.getBoundingClientRect();
        const visible=bounds.bottom>0&&bounds.top<innerHeight;
        const responsive=pointerAllowed&&visible;
        const hx=responsive?clamp((pointer.clientX-bounds.left)/Math.max(bounds.width,1)*2-1):0;
        const hy=responsive?clamp((pointer.clientY-bounds.top)/Math.max(bounds.height,1)*2-1):0;
        document.documentElement.dataset.kineticHost=visible?"visible":"hidden";
        const changed=Math.abs(lastHost.current.x-hx)>.0005||Math.abs(lastHost.current.y-hy)>.0005;
        if(changed){
          lastHost.current={x:hx,y:hy};
          setTilt(current=>Math.abs(current.x-hx)<.0005&&Math.abs(current.y-hy)<.0005?current:{x:hx,y:hy});
          const portrait=host.querySelector<HTMLElement>(".portrait");
          if(portrait){
            setValue(portrait,"--portrait-x",hx*18);
            setValue(portrait,"--portrait-y",hy*13);
            setValue(portrait,"--portrait-rx",-hy*2.4,"deg");
            setValue(portrait,"--portrait-ry",hx*3.0,"deg");
            setValue(portrait,"--portrait-light-x",hx*52);
            setValue(portrait,"--portrait-light-y",hy*42);
            setValue(portrait,"--portrait-shadow-x",-hx*20);
            setValue(portrait,"--portrait-shadow-y",30-hy*14);
          }
        }
      }
    };

    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const onMouse=(event:MouseEvent)=>{
      pointer.clientX=event.clientX;pointer.clientY=event.clientY;
      pointer.x=clamp(event.clientX/innerWidth*2-1);pointer.y=clamp(event.clientY/innerHeight*2-1);
      pointer.active=true;
      document.documentElement.dataset.kineticInput="mouse";
      schedule();
    };
    const reset=()=>{pointer.active=false;pointer.x=0;pointer.y=0;schedule();};

    update();
    window.addEventListener("mousemove",onMouse,{passive:true});
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule,{passive:true});
    window.addEventListener("blur",reset);
    document.documentElement.addEventListener("mouseleave",reset);
    reduced.addEventListener("change",schedule);
    desktopMotion.addEventListener("change",schedule);
    return()=>{
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove",onMouse);
      window.removeEventListener("scroll",schedule);
      window.removeEventListener("resize",schedule);
      window.removeEventListener("blur",reset);
      document.documentElement.removeEventListener("mouseleave",reset);
      reduced.removeEventListener("change",schedule);
      desktopMotion.removeEventListener("change",schedule);
    };
  },[hostSelector]);

  const webgl=eligible&&Scene&&!failed;
  return <div className="signal-layer" aria-hidden="true" data-mode={webgl?"webgl":"poster"}>{webgl?<Scene tilt={tilt} dark={dark} onLost={()=>{setFailed(true);setScene(null)}}/>:<StaticSignalPoster/>}</div>;
}
