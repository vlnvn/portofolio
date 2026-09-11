"use client";

import { useEffect } from "react";

const clamp=(value:number,min=-1,max=1)=>Math.max(min,Math.min(max,value));

type Motion={y:number;rx:number;ry:number;scale:number;secondaryX:number;secondaryY:number;z:number;light:number};

function motionFor(id:string,signed:number,amplitude:number):Motion{
  const distance=Math.abs(signed);
  const scale=(base:number)=>1-distance*base*amplitude;
  switch(id){
    case "kairos": return {y:signed*26*amplitude,rx:-signed*.7*amplitude,ry:signed*2.7*amplitude,scale:scale(.028),secondaryX:signed*12*amplitude,secondaryY:-signed*6*amplitude,z:(1-distance)*18*amplitude,light:signed*34*amplitude};
    case "ayam-kalintang": return {y:signed*20*amplitude,rx:signed*.8*amplitude,ry:-signed*2.1*amplitude,scale:scale(.024),secondaryX:-signed*18*amplitude,secondaryY:signed*8*amplitude,z:(1-distance)*16*amplitude,light:-signed*30*amplitude};
    case "sambut": return {y:signed*22*amplitude,rx:-signed*.6*amplitude,ry:signed*1.8*amplitude,scale:scale(.022),secondaryX:-signed*34*amplitude,secondaryY:-signed*11*amplitude,z:(1-distance)*22*amplitude,light:signed*28*amplitude};
    case "colors": return {y:signed*30*amplitude,rx:signed*.9*amplitude,ry:-signed*1.1*amplitude,scale:scale(.018),secondaryX:0,secondaryY:0,z:(1-distance)*12*amplitude,light:signed*38*amplitude};
    case "aether3d": return {y:signed*34*amplitude,rx:-signed*1.1*amplitude,ry:signed*3.4*amplitude,scale:scale(.032),secondaryX:signed*22*amplitude,secondaryY:-signed*12*amplitude,z:(1-distance)*28*amplitude,light:-signed*44*amplitude};
    case "nara": return {y:signed*17*amplitude,rx:signed*.45*amplitude,ry:-signed*1.35*amplitude,scale:scale(.016),secondaryX:-signed*18*amplitude,secondaryY:signed*7*amplitude,z:(1-distance)*14*amplitude,light:signed*22*amplitude};
    default:return {y:signed*20*amplitude,rx:0,ry:signed*1.5*amplitude,scale:scale(.02),secondaryX:0,secondaryY:0,z:0,light:0};
  }
}

export function ChapterMotionController(){
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const chapters=Array.from(document.querySelectorAll<HTMLElement>(".project-chapter"));
    let frame=0;

    const apply=()=>{
      frame=0;
      const viewport=Math.max(innerHeight,1);
      const mobile=innerWidth<700;
      const amplitude=reduced.matches?0:(mobile ? .34 : 1);
      chapters.forEach(chapter=>{
        const rect=chapter.getBoundingClientRect();
        const range=viewport*.5+rect.height*.5;
        const signed=clamp((rect.top+rect.height*.5-viewport*.5)/Math.max(range,1));
        const motion=motionFor(chapter.id,signed,amplitude);
        chapter.style.setProperty("--evidence-y",`${motion.y.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-rx",`${motion.rx.toFixed(3)}deg`);
        chapter.style.setProperty("--evidence-ry",`${motion.ry.toFixed(3)}deg`);
        chapter.style.setProperty("--evidence-scale",motion.scale.toFixed(4));
        chapter.style.setProperty("--evidence-secondary-x",`${motion.secondaryX.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-secondary-y",`${motion.secondaryY.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-z",`${motion.z.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-light-shift",`${motion.light.toFixed(2)}px`);
        chapter.dataset.evidenceProgress=signed.toFixed(3);
      });
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(apply);};
    apply();
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule,{passive:true});
    reduced.addEventListener("change",schedule);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);reduced.removeEventListener("change",schedule);};
  },[]);
  return null;
}
