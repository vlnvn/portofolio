"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { apertureRigState } from "./states";

type Tilt={x:number;y:number};

function ResponsiveLights({tilt,dark}:{tilt:Tilt;dark:boolean}){
  const key=useRef<THREE.DirectionalLight>(null);
  const fill=useRef<THREE.DirectionalLight>(null);
  const rim=useRef<THREE.DirectionalLight>(null);
  const point=useRef<THREE.PointLight>(null);
  const target=useRef(tilt);
  const current=useRef({x:0,y:0});
  const {invalidate}=useThree();

  useEffect(()=>{target.current=tilt;invalidate();},[tilt,invalidate]);

  useFrame((_,delta)=>{
    const dx=target.current.x-current.current.x;
    const dy=target.current.y-current.current.y;
    const alpha=1-Math.exp(-11*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const x=current.current.x,y=current.current.y;
    if(key.current)key.current.position.set(-2.7+x*3.2,3.5-y*2.1,4.8+x*.65);
    if(fill.current)fill.current.position.set(3.3-x*2.2,-1.5+y*1.7,2.5-y*.55);
    if(rim.current)rim.current.position.set(-3.6-x*1.2,-2.4-y*.8,1.8);
    if(point.current){
      point.current.position.set(x*2.8,-y*2.15,2.7+Math.abs(x)*.55);
      point.current.intensity=(dark?4.6:3.8)+(Math.abs(x)+Math.abs(y))*.8;
    }
    if(Math.abs(dx)>.0005||Math.abs(dy)>.0005)invalidate();
  });

  return <>
    <ambientLight intensity={dark?.52:.72}/>
    <directionalLight ref={key} position={[-2.7,3.5,4.8]} intensity={dark?2.65:2.95}/>
    <directionalLight ref={fill} position={[3.3,-1.5,2.5]} intensity={dark?.72:.92}/>
    <directionalLight ref={rim} position={[-3.6,-2.4,1.8]} intensity={dark?.9:.62}/>
    <pointLight ref={point} color={dark?"#8CB6FF":"#1757AF"} position={[0,0,2.7]} intensity={dark?4.6:3.8} distance={8} decay={2}/>
  </>;
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
    const raw=Math.min(1,(clock.elapsedTime-introStart.current)/.82);
    const settle=1-Math.pow(1-raw,3);
    const targetX=-targetTilt.current.y*.28;
    const targetY=targetTilt.current.x*.36;
    const dx=targetX-currentTilt.current.x;
    const dy=targetY-currentTilt.current.y;
    const alpha=1-Math.exp(-9.5*delta);
    currentTilt.current.x+=dx*alpha;currentTilt.current.y+=dy*alpha;
    const tx=currentTilt.current.x,ty=currentTilt.current.y;

    ringRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const ring=apertureRigState.rings[index];
      const scale=.68+settle*.32;
      const depth=.44+index*.2;
      mesh.scale.setScalar(scale);
      mesh.position.set(ring.position[0]+ty*depth,ring.position[1]+(1-settle)*(index%2?-.28:.28)+tx*depth,ring.position[2]+ty*(index-1)*.16);
      mesh.rotation.set(ring.rotation[0]+(1-settle)*(.52-index*.16)+tx*depth,ring.rotation[1]+(1-settle)*(.44-index*.12)+ty*depth,ring.rotation[2]+(1-settle)*(index%2?-.48:.52)+ty*.18);
    });

    bladeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const blade=apertureRigState.blades[index];
      const originScale=.3+.7*settle;
      const depth=.58+index*.16;
      mesh.position.set(blade.position[0]*originScale+ty*depth,blade.position[1]*originScale-tx*depth,blade.position[2]*settle+ty*.24);
      mesh.rotation.set(blade.rotation[0]+(1-settle)*.74-tx*.5,blade.rotation[1]-(1-settle)*.58+ty*.58,blade.rotation[2]+(1-settle)*(index-1)*.74+tx*.2);
      mesh.scale.set(blade.scale[0]*settle,blade.scale[1]*settle,blade.scale[2]*settle);
    });

    nodeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const node=apertureRigState.nodes[index];
      const spread=.4+.6*settle;
      const depth=.16+index*.04;
      mesh.position.set(node[0]*spread+ty*depth,node[1]*spread-tx*depth,node[2]*settle+ty*depth);
      mesh.scale.setScalar(.32+.68*settle);
    });

    if(rig.current){
      rig.current.rotation.x=-.08+tx;
      rig.current.rotation.y=.12+ty;
      rig.current.rotation.z=ty*.08;
      rig.current.position.set(ty*.26,-tx*.16,(Math.abs(tx)+Math.abs(ty))*.08);
    }

    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${tx.toFixed(3)},${ty.toFixed(3)}`;
    if(raw<1||Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });

  const energy=dark?"#70A4FF":"#2F74E8";
  const ice=dark?"#243A5A":"#DCEAFF";
  return <group ref={rig} rotation={[-.08,.12,0]}>
    {apertureRigState.rings.map((ring,index)=><mesh key={`ring-${index}`} ref={element=>{ringRefs.current[index]=element}} position={ring.position} rotation={ring.rotation}><torusGeometry args={[ring.radius,ring.tube,14,80,ring.arc]}/><meshStandardMaterial color={index===1?ice:energy} roughness={.22} metalness={.28} emissive={energy} emissiveIntensity={.025}/></mesh>)}
    {apertureRigState.blades.map((blade,index)=><mesh key={`blade-${index}`} ref={element=>{bladeRefs.current[index]=element}} geometry={bladeGeometry} position={blade.position} rotation={blade.rotation} scale={blade.scale}><meshStandardMaterial color={index===1?ice:energy} roughness={.28} metalness={.22} emissive={energy} emissiveIntensity={.018}/></mesh>)}
    {apertureRigState.nodes.map((position,index)=><mesh key={`node-${index}`} ref={element=>{nodeRefs.current[index]=element}} geometry={nodeGeometry} position={position}><meshStandardMaterial color={index===2?ice:energy} roughness={.18} metalness={.34} emissive={energy} emissiveIntensity={.035}/></mesh>)}
  </group>;
}

export default function SignalScene({tilt,dark,onLost}:{tilt:Tilt;dark:boolean;onLost:()=>void}){
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.1],fov:38}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><ResponsiveLights tilt={tilt} dark={dark}/><ApertureRig tilt={tilt} dark={dark}/></Canvas>;
}
