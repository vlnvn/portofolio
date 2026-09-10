"use client";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { ThemeToggle } from "./ThemeToggle";
export function AdaptiveNav() {
  const [active,setActive]=useState("top");
  useEffect(()=>{const nodes=[document.getElementById("top"),...projects.map(p=>document.getElementById(p.id))].filter(Boolean) as HTMLElement[];const observer=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(hit)setActive(hit.target.id);},{rootMargin:"-28% 0px -52%",threshold:[0,.15,.35,.6]});nodes.forEach(n=>observer.observe(n));return()=>observer.disconnect();},[]);
  const current=projects.find(p=>p.id===active); return <header className="adaptive-nav"><a className="nav-mark" href="#top" aria-label="Valensius Alven, introduction">VA</a><nav className="chapter-links" aria-label="Project chapters">{projects.map(p=><a key={p.id} href={`#${p.id}`} onClick={()=>setActive(p.id)} aria-current={active===p.id?"location":undefined}>{p.index} {p.navName}</a>)}</nav><div className="mobile-current" aria-live="polite"><span>{current?`${current.index} / 06`:"00 / 06"}</span><strong>{current?.navName??"INTRO"}</strong></div><div className="nav-actions"><a href="#contact">Contact</a><ThemeToggle/></div></header>;
}
