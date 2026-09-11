"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import type { Project } from "@/lib/projects";

type PointerSample={element:HTMLElement;clientX:number;clientY:number};

export function ProjectMedia({project,priority=false}:{project:Project;priority?:boolean}){
  const frame=useRef<number|null>(null);
  const latest=useRef<PointerSample|null>(null);

  useEffect(()=>()=>{if(frame.current!==null)cancelAnimationFrame(frame.current);},[]);

  function applyDepth({element,clientX,clientY}:PointerSample){
    const bounds=element.getBoundingClientRect();
    const x=((clientX-bounds.left)/bounds.width-.5)*2;
    const y=((clientY-bounds.top)/bounds.height-.5)*2;
    element.style.setProperty("--media-rotate-x",`${(-y*2.65).toFixed(2)}deg`);
    element.style.setProperty("--media-rotate-y",`${(x*2.85).toFixed(2)}deg`);
    element.style.setProperty("--media-shift-x",`${(x*7).toFixed(2)}px`);
    element.style.setProperty("--media-shift-y",`${(y*6).toFixed(2)}px`);
    element.style.setProperty("--media-primary-shift-x",`${(x*1.55).toFixed(2)}px`);
    element.style.setProperty("--media-primary-shift-y",`${(y*1.32).toFixed(2)}px`);
    element.style.setProperty("--media-light-x",`${(x*18).toFixed(2)}px`);
    element.style.setProperty("--media-light-y",`${(y*14).toFixed(2)}px`);
    element.style.setProperty("--media-halo-x",`${(x*10).toFixed(2)}px`);
    element.style.setProperty("--media-halo-y",`${(y*8).toFixed(2)}px`);
  }

  function updateDepth(event:PointerEvent<HTMLElement>){
    if(event.pointerType!=="mouse")return;
    latest.current={element:event.currentTarget,clientX:event.clientX,clientY:event.clientY};
    if(frame.current!==null)return;
    frame.current=requestAnimationFrame(()=>{
      frame.current=null;
      if(latest.current)applyDepth(latest.current);
    });
  }

  function resetDepth(event:PointerEvent<HTMLElement>){
    latest.current=null;
    if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null;}
    const element=event.currentTarget;
    for(const [property,value] of [["--media-rotate-x","0deg"],["--media-rotate-y","0deg"],["--media-shift-x","0px"],["--media-shift-y","0px"],["--media-primary-shift-x","0px"],["--media-primary-shift-y","0px"],["--media-light-x","0px"],["--media-light-y","0px"],["--media-halo-x","0px"],["--media-halo-y","0px"]])element.style.setProperty(property,value);
  }

  return <figure className={`project-media media-${project.id}`} onPointerMove={updateDepth} onPointerLeave={resetDepth}><div className="media-primary"><Image src={project.media.src} alt={project.media.alt} fill sizes="(max-width: 699px) calc(100vw - 32px), (max-width: 1100px) 52vw, 710px" priority={priority} style={{pointerEvents:"none"}}/></div>{project.media.secondary&&<div className="media-secondary"><Image src={project.media.secondary.src} alt={project.media.secondary.alt} fill sizes="(max-width: 699px) 42vw, 260px" style={{pointerEvents:"none"}}/></div>}<figcaption>{project.media.caption}</figcaption></figure>;
}
