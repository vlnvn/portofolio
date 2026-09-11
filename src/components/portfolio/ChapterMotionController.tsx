"use client";

import { useEffect } from "react";

const clamp=(value:number,min=-1,max=1)=>Math.max(min,Math.min(max,value));

type Motion={
  mediaX:number;mediaY:number;copyX:number;copyY:number;
  rx:number;ry:number;scale:number;secondaryX:number;secondaryY:number;
  z:number;light:number;copyOpacity:number;mediaOpacity:number;
};

function motionFor(id:string,signed:number,amplitude:number):Motion{
  const eased=Math.sign(signed)*Math.pow(Math.abs(signed),.78);
  const distance=Math.abs(eased);
  const focus=1-distance;
  const scale=(edgeLoss:number)=>1-distance*edgeLoss*amplitude;
  const opacity=(floor:number)=>1-(1-floor)*distance*amplitude;
  switch(id){
    case "kairos": return {mediaX:eased*72*amplitude,mediaY:eased*42*amplitude,copyX:-eased*34*amplitude,copyY:-eased*18*amplitude,rx:-eased*2.2*amplitude,ry:eased*7.2*amplitude,scale:scale(.065),secondaryX:eased*26*amplitude,secondaryY:-eased*16*amplitude,z:focus*42*amplitude,light:eased*64*amplitude,copyOpacity:opacity(.76),mediaOpacity:opacity(.72)};
    case "ayam-kalintang": return {mediaX:-eased*68*amplitude,mediaY:eased*50*amplitude,copyX:eased*30*amplitude,copyY:-eased*20*amplitude,rx:eased*2.8*amplitude,ry:-eased*5.8*amplitude,scale:scale(.06),secondaryX:-eased*48*amplitude,secondaryY:eased*24*amplitude,z:focus*38*amplitude,light:-eased*58*amplitude,copyOpacity:opacity(.77),mediaOpacity:opacity(.73)};
    case "sambut": return {mediaX:eased*58*amplitude,mediaY:eased*44*amplitude,copyX:-eased*30*amplitude,copyY:eased*16*amplitude,rx:-eased*2.1*amplitude,ry:eased*5.4*amplitude,scale:scale(.055),secondaryX:-eased*92*amplitude,secondaryY:-eased*32*amplitude,z:focus*48*amplitude,light:eased*56*amplitude,copyOpacity:opacity(.76),mediaOpacity:opacity(.72)};
    case "colors": return {mediaX:eased*22*amplitude,mediaY:eased*86*amplitude,copyX:-eased*24*amplitude,copyY:-eased*30*amplitude,rx:eased*3.2*amplitude,ry:-eased*3.4*amplitude,scale:scale(.07),secondaryX:0,secondaryY:0,z:focus*32*amplitude,light:eased*70*amplitude,copyOpacity:opacity(.78),mediaOpacity:opacity(.7)};
    case "aether3d": return {mediaX:eased*94*amplitude,mediaY:eased*58*amplitude,copyX:-eased*38*amplitude,copyY:eased*22*amplitude,rx:-eased*3.8*amplitude,ry:eased*9.2*amplitude,scale:scale(.095),secondaryX:eased*62*amplitude,secondaryY:-eased*34*amplitude,z:focus*58*amplitude,light:-eased*82*amplitude,copyOpacity:opacity(.74),mediaOpacity:opacity(.68)};
    case "nara": return {mediaX:-eased*46*amplitude,mediaY:eased*32*amplitude,copyX:eased*22*amplitude,copyY:-eased*14*amplitude,rx:eased*1.8*amplitude,ry:-eased*4.2*amplitude,scale:scale(.045),secondaryX:-eased*38*amplitude,secondaryY:eased*18*amplitude,z:focus*30*amplitude,light:eased*42*amplitude,copyOpacity:opacity(.82),mediaOpacity:opacity(.78)};
    default:return {mediaX:eased*48*amplitude,mediaY:eased*34*amplitude,copyX:-eased*24*amplitude,copyY:0,rx:0,ry:eased*4*amplitude,scale:scale(.05),secondaryX:0,secondaryY:0,z:focus*28*amplitude,light:0,copyOpacity:opacity(.8),mediaOpacity:opacity(.76)};
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
      const amplitude=reduced.matches?0:(mobile ? .22 : 1);
      chapters.forEach(chapter=>{
        const rect=chapter.getBoundingClientRect();
        const range=viewport*.58+rect.height*.42;
        const signed=clamp((rect.top+rect.height*.5-viewport*.5)/Math.max(range,1));
        const motion=motionFor(chapter.id,signed,amplitude);
        chapter.style.setProperty("--chapter-media-x",`${motion.mediaX.toFixed(2)}px`);
        chapter.style.setProperty("--chapter-media-y",`${motion.mediaY.toFixed(2)}px`);
        chapter.style.setProperty("--chapter-copy-x",`${motion.copyX.toFixed(2)}px`);
        chapter.style.setProperty("--chapter-copy-y",`${motion.copyY.toFixed(2)}px`);
        chapter.style.setProperty("--chapter-copy-opacity",motion.copyOpacity.toFixed(3));
        chapter.style.setProperty("--chapter-media-opacity",motion.mediaOpacity.toFixed(3));
        chapter.style.setProperty("--evidence-rx",`${motion.rx.toFixed(3)}deg`);
        chapter.style.setProperty("--evidence-ry",`${motion.ry.toFixed(3)}deg`);
        chapter.style.setProperty("--evidence-scale",motion.scale.toFixed(4));
        chapter.style.setProperty("--evidence-secondary-x",`${motion.secondaryX.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-secondary-y",`${motion.secondaryY.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-z",`${motion.z.toFixed(2)}px`);
        chapter.style.setProperty("--evidence-light-shift",`${motion.light.toFixed(2)}px`);
        chapter.dataset.evidenceProgress=signed.toFixed(3);
        chapter.dataset.evidencePhase=Math.abs(signed)<.18?"foreground":signed>0?"approaching":"receding";
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
