"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { apertureRigState } from "./states";

type MotionRef={current:{x:number;y:number}};
type Vec3=[number,number,number];
type ArtifactState="hero"|"kairos"|"kalintang";
type ArtifactTarget={from:ArtifactState;to:ArtifactState;t:number;opacity:number};
type ArtifactRef={current:ArtifactTarget};
type Part={position:Vec3;rotation:Vec3;scale:Vec3};
type NodePart={position:Vec3;scale:number};
type Shape={rigRotation:Vec3;rigScale:number;spin:number;idle:number;rings:Part[];blades:Part[];nodes:NodePart[]};

const clamp=(value:number)=>Math.max(-1,Math.min(1,value));
const clamp01=(value:number)=>Math.max(0,Math.min(1,value));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const mixVec=(a:Vec3,b:Vec3,t:number):Vec3=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
const mixPart=(a:Part,b:Part,t:number):Part=>({position:mixVec(a.position,b.position,t),rotation:mixVec(a.rotation,b.rotation,t),scale:mixVec(a.scale,b.scale,t)});

const heroShape:Shape={
  rigRotation:[-.08,.12,0],rigScale:1,spin:1,idle:1,
  rings:apertureRigState.rings.map<Part>(ring=>({position:ring.position,rotation:ring.rotation,scale:[1,1,1]})),
  blades:apertureRigState.blades.map<Part>(blade=>({position:blade.position,rotation:blade.rotation,scale:blade.scale})),
  nodes:apertureRigState.nodes.map<NodePart>(position=>({position,scale:1})),
};

const kairosShape:Shape={
  rigRotation:[-.04,.28,.04],rigScale:.92,spin:.34,idle:.36,
  rings:[
    {position:[0,.02,.08],rotation:[Math.PI/2,.08,.06],scale:[1.04,.66,1]},
    {position:[.02,0,.05],rotation:[.08,Math.PI/2,.04],scale:[.76,1.02,1]},
    {position:[0,.02,-.28],rotation:[1.16,.5,.7],scale:[.9,.58,.92]},
  ],
  blades:[
    {position:[0,.02,.16],rotation:[.04,.08,.02],scale:[1.14,1.04,.88]},
    {position:[.58,.04,-.16],rotation:[.02,.54,-.04],scale:[.78,.96,.72]},
    {position:[-.58,.04,-.16],rotation:[-.02,-.54,.05],scale:[.78,.96,.72]},
  ],
  nodes:[
    {position:[-.92,-.68,.5],scale:.82},{position:[.92,-.68,.5],scale:.82},{position:[-.92,.7,.32],scale:.82},{position:[.92,.7,.32],scale:.82},{position:[0,.88,-.2],scale:.7},
  ],
};

const kalintangShape:Shape={
  rigRotation:[.08,-.24,-.18],rigScale:.94,spin:.26,idle:.44,
  rings:[
    {position:[.26,.38,-.08],rotation:[1.06,.2,-.52],scale:[.92,.62,.92]},
    {position:[-.78,-.72,.08],rotation:[1.45,.12,.72],scale:[.38,.24,.38]},
    {position:[.22,.28,-.32],rotation:[1.28,.46,.22],scale:[.92,.72,.92]},
  ],
  blades:[
    {position:[.28,.42,.16],rotation:[.12,.38,-.72],scale:[1.02,.82,1.02]},
    {position:[-.02,.56,-.04],rotation:[-.08,-.32,.56],scale:[.86,.7,.9]},
    {position:[-.58,-.54,.02],rotation:[.02,.06,.78],scale:[.32,1.42,.32]},
  ],
  nodes:[
    {position:[.58,.68,.5],scale:.9},{position:[.1,.86,.18],scale:.76},{position:[.5,.12,-.2],scale:.7},{position:[-.78,-.92,.18],scale:.72},{position:[-.2,.34,.62],scale:.66},
  ],
};

const shapes:Record<ArtifactState,Shape>={hero:heroShape,kairos:kairosShape,kalintang:kalintangShape};

function KineticInput({target}:{target:MotionRef}){
  const {invalidate}=useThree();
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const move=(event:MouseEvent)=>{
      if(reduced.matches)return;
      target.current.x=clamp(event.clientX/Math.max(innerWidth,1)*2-1);
      target.current.y=clamp(event.clientY/Math.max(innerHeight,1)*2-1);
      document.documentElement.dataset.signalTarget=`${target.current.x.toFixed(3)},${target.current.y.toFixed(3)}`;
      invalidate();
    };
    const reset=()=>{target.current.x=0;target.current.y=0;document.documentElement.dataset.signalTarget="0.000,0.000";invalidate();};
    window.addEventListener("mousemove",move,{passive:true});window.addEventListener("blur",reset);document.documentElement.addEventListener("mouseleave",reset);
    return()=>{window.removeEventListener("mousemove",move);window.removeEventListener("blur",reset);document.documentElement.removeEventListener("mouseleave",reset);};
  },[invalidate,target]);
  return null;
}

function ArtifactInput({onTarget,persistent}:{onTarget:(detail:ArtifactTarget)=>void;persistent:boolean}){
  const {invalidate}=useThree();
  useEffect(()=>{
    if(!persistent)return;
    const root=document.documentElement;
    const read=()=>{
      const from=(root.dataset.artifactFrom as ArtifactState|undefined)||"hero";
      const to=(root.dataset.artifactTo as ArtifactState|undefined)||from;
      onTarget({from,to,t:clamp01(Number(root.dataset.artifactMix)||0),opacity:clamp01(Number(root.dataset.artifactOpacity)||1)});
      invalidate();
    };
    const onArtifact=(event:Event)=>{onTarget((event as CustomEvent<ArtifactTarget>).detail);invalidate();};
    read();window.addEventListener("portfolio-artifact",onArtifact);
    return()=>window.removeEventListener("portfolio-artifact",onArtifact);
  },[invalidate,onTarget,persistent]);
  return null;
}

function ResponsiveLights({target,dark}:{target:MotionRef;dark:boolean}){
  const key=useRef<THREE.DirectionalLight>(null),fill=useRef<THREE.DirectionalLight>(null),rim=useRef<THREE.DirectionalLight>(null),point=useRef<THREE.PointLight>(null);
  const current=useRef({x:0,y:0});
  const {invalidate}=useThree();
  useFrame((_,delta)=>{
    const dx=target.current.x-current.current.x,dy=target.current.y-current.current.y,alpha=1-Math.exp(-10.5*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const x=current.current.x,y=current.current.y;
    if(key.current)key.current.position.set(-2.8+x*3.6,3.6-y*2.4,4.9+x*.72);
    if(fill.current)fill.current.position.set(3.4-x*2.5,-1.6+y*1.9,2.55-y*.6);
    if(rim.current)rim.current.position.set(-3.6-x*1.35,-2.3-y*.9,1.9);
    if(point.current){point.current.position.set(x*3.15,-y*2.4,2.75+Math.abs(x)*.6);point.current.intensity=(dark?4.8:4.0)+(Math.abs(x)+Math.abs(y))*.9;}
    if(Math.abs(dx)>.00045||Math.abs(dy)>.00045)invalidate();
  });
  return <><ambientLight intensity={dark?.5:.68}/><directionalLight ref={key} position={[-2.8,3.6,4.9]} intensity={dark?2.8:3.05}/><directionalLight ref={fill} position={[3.4,-1.6,2.55]} intensity={dark?.8:1.0}/><directionalLight ref={rim} position={[-3.6,-2.3,1.9]} intensity={dark?.95:.7}/><pointLight ref={point} color={dark?"#8CB6FF":"#1757AF"} position={[0,0,2.75]} intensity={dark?4.8:4.0} distance={8} decay={2}/></>;
}

function ArtifactRig({target,artifact,dark,persistent}:{target:MotionRef;artifact:ArtifactRef;dark:boolean;persistent:boolean}){
  const rig=useRef<THREE.Group>(null),ringRefs=useRef<(THREE.Mesh|null)[]>([]),bladeRefs=useRef<(THREE.Mesh|null)[]>([]),nodeRefs=useRef<(THREE.Mesh|null)[]>([]);
  const current=useRef({x:0,y:0}),introStart=useRef<number|null>(null);
  const {invalidate,gl}=useThree();
  const bladeGeometry=useMemo(()=>new THREE.CylinderGeometry(.16,.34,1.28,5,1,false),[]);
  const nodeGeometry=useMemo(()=>new THREE.SphereGeometry(.085,18,12),[]);
  const idleVisible=useRef(true);

  useEffect(()=>{
    const canvas=gl.domElement;
    const observer=new IntersectionObserver(entries=>{idleVisible.current=entries.some(entry=>entry.isIntersecting);},{rootMargin:"120px"});observer.observe(canvas);
    const timer=window.setInterval(()=>{if(idleVisible.current&&!document.hidden&&(!persistent||artifact.current.opacity>.05))invalidate();},42);
    return()=>{observer.disconnect();window.clearInterval(timer);};
  },[artifact,gl,invalidate,persistent]);

  useFrame(({clock},delta)=>{
    if(introStart.current===null)introStart.current=clock.elapsedTime;
    const raw=Math.min(1,(clock.elapsedTime-introStart.current)/.82),settle=1-Math.pow(1-raw,3);
    const morph=clamp01(artifact.current.t),from=shapes[artifact.current.from],to=shapes[artifact.current.to];
    const idle=lerp(from.idle,to.idle,morph),spinWeight=lerp(from.spin,to.spin,morph);
    const idleX=(Math.sin(clock.elapsedTime*.47)*.055+Math.sin(clock.elapsedTime*.19+.8)*.025)*idle;
    const idleY=(Math.cos(clock.elapsedTime*.39)*.07+Math.sin(clock.elapsedTime*.23)*.022)*idle;
    const desiredX=-target.current.y*.30+idleX,desiredY=target.current.x*.41+idleY;
    const dx=desiredX-current.current.x,dy=desiredY-current.current.y,alpha=1-Math.exp(-9.8*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const tx=current.current.x,ty=current.current.y;

    ringRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const part=mixPart(from.rings[index],to.rings[index],morph),depth=(.5+index*.18)*idle,orbit=clock.elapsedTime*([.30,-.23,.17][index]??.16)*spinWeight;
      mesh.position.set(part.position[0]+ty*depth,part.position[1]+tx*depth,part.position[2]+ty*(index-1)*.12*idle);
      mesh.rotation.set(part.rotation[0]+tx*depth+Math.sin(clock.elapsedTime*.31+index)*.022*idle,part.rotation[1]+ty*depth+Math.cos(clock.elapsedTime*.27+index)*.02*idle,part.rotation[2]+orbit);
      mesh.scale.set(part.scale[0]*settle,part.scale[1]*settle,part.scale[2]*settle);
    });

    bladeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const part=mixPart(from.blades[index],to.blades[index],morph),depth=(.56+index*.15)*idle;
      mesh.position.set(part.position[0]+ty*depth,part.position[1]-tx*depth,part.position[2]+ty*.2*idle);
      mesh.rotation.set(part.rotation[0]-tx*.38*idle+Math.sin(clock.elapsedTime*.36+index)*.03*idle,part.rotation[1]+ty*.44*idle+Math.cos(clock.elapsedTime*.33+index)*.026*idle,part.rotation[2]+tx*.16*idle+Math.sin(clock.elapsedTime*.29+index*1.7)*.04*idle);
      mesh.scale.set(part.scale[0]*settle,part.scale[1]*settle,part.scale[2]*settle);
    });

    nodeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const a=from.nodes[index],b=to.nodes[index],position=mixVec(a.position,b.position,morph),scale=lerp(a.scale,b.scale,morph);
      mesh.position.set(position[0]+ty*(.12+index*.03)*idle,position[1]-tx*(.12+index*.03)*idle,position[2]+ty*.08*idle);
      mesh.scale.setScalar(scale*settle);
    });

    if(rig.current){
      const rotation=mixVec(from.rigRotation,to.rigRotation,morph),rigScale=lerp(from.rigScale,to.rigScale,morph);
      rig.current.rotation.set(rotation[0]+tx,rotation[1]+ty,rotation[2]+ty*.08*idle+Math.sin(clock.elapsedTime*.22)*.022*idle);
      rig.current.position.set(ty*.24*idle+Math.sin(clock.elapsedTime*.28)*.03*idle,-tx*.18*idle+Math.cos(clock.elapsedTime*.24)*.034*idle,(Math.abs(tx)+Math.abs(ty))*.08*idle);
      rig.current.scale.setScalar(rigScale);
    }

    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${tx.toFixed(3)},${ty.toFixed(3)}`;
    document.documentElement.dataset.signalState=artifact.current.from===artifact.current.to?artifact.current.from:`${artifact.current.from}-${artifact.current.to}`;
    if(raw<1||Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });

  const energy=dark?"#70A4FF":"#2F74E8",ice=dark?"#243A5A":"#DCEAFF";
  return <group ref={rig}>
    {apertureRigState.rings.map((ring,index)=><mesh key={`ring-${index}`} ref={element=>{ringRefs.current[index]=element}}><torusGeometry args={[ring.radius,ring.tube,14,80,ring.arc]}/><meshStandardMaterial color={index===1?ice:energy} roughness={.2} metalness={.3}/></mesh>)}
    {apertureRigState.blades.map((_,index)=><mesh key={`blade-${index}`} ref={element=>{bladeRefs.current[index]=element}} geometry={bladeGeometry}><meshStandardMaterial color={index===1?ice:energy} roughness={.25} metalness={.24}/></mesh>)}
    {apertureRigState.nodes.map((_,index)=><mesh key={`node-${index}`} ref={element=>{nodeRefs.current[index]=element}} geometry={nodeGeometry}><meshStandardMaterial color={index===2?ice:energy} roughness={.16} metalness={.36}/></mesh>)}
  </group>;
}

function Scene({dark,persistent}:{dark:boolean;persistent:boolean}){
  const target=useRef({x:0,y:0}),artifact=useRef<ArtifactTarget>({from:"hero",to:"hero",t:0,opacity:1});
  const setArtifact=(detail:ArtifactTarget)=>{artifact.current=detail;};
  return <><KineticInput target={target}/><ArtifactInput onTarget={setArtifact} persistent={persistent}/><ResponsiveLights target={target} dark={dark}/><ArtifactRig target={target} artifact={artifact} dark={dark} persistent={persistent}/></>;
}

export default function SignalScene({dark,persistent=false,onLost}:{dark:boolean;persistent?:boolean;onLost:()=>void}){
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.1],fov:38}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><Scene dark={dark} persistent={persistent}/></Canvas>;
}
