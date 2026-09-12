"use client";
import { useSyncExternalStore } from "react";
type Theme="light"|"dark";
function getTheme():Theme{return document.documentElement.dataset.theme==="dark"?"dark":"light"}
function subscribe(callback:()=>void){const observer=new MutationObserver(callback);observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});return()=>observer.disconnect()}
export function ThemeToggle(){const theme=useSyncExternalStore(subscribe,getTheme,()=>"light");function toggle(){const next:Theme=getTheme()==="light"?"dark":"light";document.documentElement.dataset.theme=next;document.documentElement.style.colorScheme=next;localStorage.setItem("portfolio-theme",next);}return <button className="theme-toggle" type="button" role="switch" aria-checked={theme==="dark"} aria-label="Dark theme" onClick={toggle}><span className="eclipse-orbit" aria-hidden="true"><span className="eclipse-core"/></span></button>}
