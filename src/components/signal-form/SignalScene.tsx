"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { apertureRigState } from "./states";

type Tilt={x:number;y:number};

function ResponsiveLights({tilt,dark}:{tilt:Tilt;dark:boolean}){
  const key=useRef<THREE.DirectionalLight>(null);
  const fill=useRef<THREE.DirectionalLight>(null);
  const target=useRef(tilt);
  const current=useRef({x:0,y:0});
  const {invalidate}=useThree();
  useEffect(()=>{target.current=tilt;invalidate();},[tilt,invalidate]);
  useFrame((_,delta)=>{
    const dx=target.current.x-current.current.x;
    const dy=target.current.y-current.current.y;
    const alpha=1-Math.exp(-12*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    if(key.current)key.current.position.set(-2.6+current.current.x*1.15,3.4-current.current.y*.8,4.6+current.current.x*.32);
    if(fill.current)fill.current.position.set(3.2-current.current.x*.75,-1.4+current.current.y*.55,2.4-current.current.y*.28);
    if(Math.abs(dx)>.001||Math.abs(dy)>.001)invalidate();
  });
  return <><ambientLight intensity={dark?.72:1.02}/><directionalLight ref={key} position={[-2.6,3.4,4.6]} intensity={dark?2.35:2.7}/><directionalLight ref={fill} position={[3.2,-1.4,2.4]} intensity={dark?.62:.78}/></>;
}

function ApertureRig({tilt,dark}:{tilt:Tilt;dark:boolean}){
  const rig=useRef<THREE.Group>(null);
  const ringRefs=useRef<(THREE.Mesh|null)[]>([]);
  const bladeRefs=useRef<(THREE.Mesh|null)[]>([]);
  const nodeRefs=useRef<(THREE.Mesh|null)[]>([]);
  const targetTilt=useRef(tilt);
  const currentTilt=useRef({x:0,y:0});
  const introStart=useRef<number|null>(null);
  const {invalidate,gl}=useThree();
  const bladeGeometry=useMemo(()=>new THREE.BoxGeometry(1,1,1),[]);
  const nodeGeometry=useMemo(()=>new THREE.SphereGeometry(.085,18,12),[]);

  useEffect(()=>{targetTilt.current=tilt;invalidate();},[tilt,invalidate]);

  useFrame(({clock},delta)=>{
    if(introStart.current===null)introStart.current=clock.elapsedTime;
    const raw=Math.min(1,(clock.elapsedTime-introStart.current)/.88);
    const settle=1-Math.pow(1-raw,3);
    const targetX=-targetTilt.current.y*.12;
    const targetY=targetTilt.current.x*.15;
    const dx=targetX-currentTilt.current.x;
    const dy=targetY-currentTilt.current.y;
    const tiltAlpha=1-Math.exp(-10*delta);
    currentTilt.current.x+=dx*tiltAlpha;currentTilt.current.y+=dy*tiltAlpha;

    ringRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const ring=apertureRigState.rings[index];
      const scale=.7+settle*.3;
      const depthRate=.28+index*.18;
      mesh.scale.setScalar(scale);
      mesh.position.set(ring.position[0]+currentTilt.current.y*depthRate,ring.position[1]+(1-settle)*(index%2?-.26:.26)+currentTilt.current.x*depthRate,ring.position[2]);
      mesh.rotation.set(ring.rotation[0]+(1-settle)*(.5-index*.16)+currentTilt.current.x*depthRate,ring.rotation[1]+(1-settle)*(.42-index*.12)+currentTilt.current.y*depthRate,ring.rotation[2]+(1-settle)*(index%2?-.46:.5));
    });
    bladeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const blade=apertureRigState.blades[index];
      const originScale=.32+.68*settle;
      const depthRate=.34+index*.12;
      mesh.position.set(blade.position[0]*originScale+currentTilt.current.y*depthRate,blade.position[1]*originScale-currentTilt.current.x*depthRate,blade.position[2]*settle+currentTilt.current.y*.12);
      mesh.rotation.set(blade.rotation[0]+(1-settle)*.7-currentTilt.current.x*.32,blade.rotation[1]-(1-settle)*.55+currentTilt.current.y*.36,blade.rotation[2]+(1-settle)*(index-1)*.7);
      mesh.scale.set(blade.scale[0]*settle,blade.scale[1]*settle,blade.scale[2]*settle);
    });
    nodeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const node=apertureRigState.nodes[index];
      const spread=.42+.58*settle;
      const depthRate=.08+index*.018;
      mesh.position.set(node[0]*spread+currentTilt.current.y*depthRate,node[1]*spread-currentTilt.current.x*depthRate,node[2]*settle+currentTilt.current.y*depthRate);
      mesh.scale.setScalar(.35+.65*settle);
    });
    if(rig.current){rig.current.rotation.x=-.1+currentTilt.current.x;rig.current.rotation.y=.14+currentTilt.current.y;}

    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    if(raw<1||Math.abs(dx)>.0005||Math.abs(dy)>.0005)invalidate();
  });

  const energy=dark?"#70A4FF":"#2F74E8";
  const ice=dark?"#243A5A":"#DCEAFF";
  return <group ref={rig} rotation={[-.1,.14,0]}>
    {apertureRigState.rings.map((ring,index)=><mesh key={`ring-${index}`} ref={element=>{ringRefs.current[index]=element}} position={ring.position} rotation={ring.rotation}><torusGeometry args={[ring.radius,ring.tube,12,72,ring.arc]}/><meshStandardMaterial color={index===1?ice:energy} roughness={.34} metalness={.05}/></mesh>)}
    {apertureRigState.blades.map((blade,index)=><mesh key={`blade-${index}`} ref={element=>{bladeRefs.current[index]=element}} geometry={bladeGeometry} position={blade.position} rotation={blade.rotation} scale={blade.scale}><meshStandardMaterial color={index===1?ice:energy} roughness={.38} metalness={.04}/></mesh>)}
    {apertureRigState.nodes.map((position,index)=><mesh key={`node-${index}`} ref={element=>{nodeRefs.current[index]=element}} geometry={nodeGeometry} position={position}><meshStandardMaterial color={index===2?ice:energy} roughness={.28} metalness={.06}/></mesh>)}
  </group>;
}

export default function SignalScene({tilt,dark,onLost}:{tilt:Tilt;dark:boolean;onLost:()=>void}){
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.1],fov:38}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><ResponsiveLights tilt={tilt} dark={dark}/><ApertureRig tilt={tilt} dark={dark}/></Canvas>;
}