"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { apertureRigState } from "./states";

type MotionRef={current:{x:number;y:number}};

const clamp=(value:number)=>Math.max(-1,Math.min(1,value));

function KineticInput({target}:{target:MotionRef}){
  const {gl,invalidate}=useThree();
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
    window.addEventListener("mousemove",move,{passive:true});
    window.addEventListener("blur",reset);
    document.documentElement.addEventListener("mouseleave",reset);
    return()=>{window.removeEventListener("mousemove",move);window.removeEventListener("blur",reset);document.documentElement.removeEventListener("mouseleave",reset);};
  },[gl,invalidate,target]);
  return null;
}

function ResponsiveLights({target,dark}:{target:MotionRef;dark:boolean}){
  const key=useRef<THREE.DirectionalLight>(null);
  const fill=useRef<THREE.DirectionalLight>(null);
  const rim=useRef<THREE.DirectionalLight>(null);
  const point=useRef<THREE.PointLight>(null);
  const current=useRef({x:0,y:0});
  const {invalidate}=useThree();

  useFrame((_,delta)=>{
    const dx=target.current.x-current.current.x;
    const dy=target.current.y-current.current.y;
    const alpha=1-Math.exp(-10.5*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const x=current.current.x,y=current.current.y;
    if(key.current)key.current.position.set(-2.8+x*3.6,3.6-y*2.4,4.9+x*.72);
    if(fill.current)fill.current.position.set(3.4-x*2.5,-1.6+y*1.9,2.55-y*.6);
    if(rim.current)rim.current.position.set(-3.6-x*1.35,-2.3-y*.9,1.9);
    if(point.current){point.current.position.set(x*3.15,-y*2.4,2.75+Math.abs(x)*.6);point.current.intensity=(dark?4.8:4.0)+(Math.abs(x)+Math.abs(y))*.9;}
    if(Math.abs(dx)>.00045||Math.abs(dy)>.00045)invalidate();
  });

  return <>
    <ambientLight intensity={dark?.5:.68}/>
    <directionalLight ref={key} position={[-2.8,3.6,4.9]} intensity={dark?2.8:3.05}/>
    <directionalLight ref={fill} position={[3.4,-1.6,2.55]} intensity={dark?.8:1.0}/>
    <directionalLight ref={rim} position={[-3.6,-2.3,1.9]} intensity={dark?.95:.7}/>
    <pointLight ref={point} color={dark?"#8CB6FF":"#1757AF"} position={[0,0,2.75]} intensity={dark?4.8:4.0} distance={8} decay={2}/>
  </>;
}

function ApertureRig({target,dark}:{target:MotionRef;dark:boolean}){
  const rig=useRef<THREE.Group>(null);
  const ringRefs=useRef<(THREE.Mesh|null)[]>([]);
  const bladeRefs=useRef<(THREE.Mesh|null)[]>([]);
  const nodeRefs=useRef<(THREE.Mesh|null)[]>([]);
  const current=useRef({x:0,y:0});
  const introStart=useRef<number|null>(null);
  const {invalidate,gl}=useThree();
  const bladeGeometry=useMemo(()=>new THREE.BoxGeometry(1,1,1),[]);
  const nodeGeometry=useMemo(()=>new THREE.SphereGeometry(.085,18,12),[]);

  useFrame(({clock},delta)=>{
    if(introStart.current===null)introStart.current=clock.elapsedTime;
    const raw=Math.min(1,(clock.elapsedTime-introStart.current)/.82);
    const settle=1-Math.pow(1-raw,3);
    const desiredX=-target.current.y*.34;
    const desiredY=target.current.x*.46;
    const dx=desiredX-current.current.x;
    const dy=desiredY-current.current.y;
    const alpha=1-Math.exp(-9.8*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const tx=current.current.x,ty=current.current.y;

    ringRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const ring=apertureRigState.rings[index];
      const scale=.68+settle*.32;
      const depth=.5+index*.24;
      mesh.scale.setScalar(scale);
      mesh.position.set(ring.position[0]+ty*depth,ring.position[1]+(1-settle)*(index%2?-.28:.28)+tx*depth,ring.position[2]+ty*(index-1)*.2);
      mesh.rotation.set(ring.rotation[0]+(1-settle)*(.52-index*.16)+tx*depth,ring.rotation[1]+(1-settle)*(.44-index*.12)+ty*depth,ring.rotation[2]+(1-settle)*(index%2?-.48:.52)+ty*.22);
    });

    bladeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const blade=apertureRigState.blades[index];
      const originScale=.3+.7*settle;
      const depth=.68+index*.18;
      mesh.position.set(blade.position[0]*originScale+ty*depth,blade.position[1]*originScale-tx*depth,blade.position[2]*settle+ty*.3);
      mesh.rotation.set(blade.rotation[0]+(1-settle)*.74-tx*.58,blade.rotation[1]-(1-settle)*.58+ty*.68,blade.rotation[2]+(1-settle)*(index-1)*.74+tx*.24);
      mesh.scale.set(blade.scale[0]*settle,blade.scale[1]*settle,blade.scale[2]*settle);
    });

    nodeRefs.current.forEach((mesh,index)=>{
      if(!mesh)return;
      const node=apertureRigState.nodes[index];
      const spread=.4+.6*settle;
      const depth=.2+index*.05;
      mesh.position.set(node[0]*spread+ty*depth,node[1]*spread-tx*depth,node[2]*settle+ty*depth);
      mesh.scale.setScalar(.32+.68*settle);
    });

    if(rig.current){
      rig.current.rotation.x=-.08+tx;
      rig.current.rotation.y=.12+ty;
      rig.current.rotation.z=ty*.1;
      rig.current.position.set(ty*.34,-tx*.22,(Math.abs(tx)+Math.abs(ty))*.12);
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
    {apertureRigState.rings.map((ring,index)=><mesh key={`ring-${index}`} ref={element=>{ringRefs.current[index]=element}} position={ring.position} rotation={ring.rotation}><torusGeometry args={[ring.radius,ring.tube,14,80,ring.arc]}/><meshStandardMaterial color={index===1?ice:energy} roughness={.2} metalness={.3}/></mesh>)}
    {apertureRigState.blades.map((blade,index)=><mesh key={`blade-${index}`} ref={element=>{bladeRefs.current[index]=element}} geometry={bladeGeometry} position={blade.position} rotation={blade.rotation} scale={blade.scale}><meshStandardMaterial color={index===1?ice:energy} roughness={.25} metalness={.24}/></mesh>)}
    {apertureRigState.nodes.map((position,index)=><mesh key={`node-${index}`} ref={element=>{nodeRefs.current[index]=element}} geometry={nodeGeometry} position={position}><meshStandardMaterial color={index===2?ice:energy} roughness={.16} metalness={.36}/></mesh>)}
  </group>;
}

function Scene({dark}:{dark:boolean}){
  const target=useRef({x:0,y:0});
  return <><KineticInput target={target}/><ResponsiveLights target={target} dark={dark}/><ApertureRig target={target} dark={dark}/></>;
}

export default function SignalScene({dark,onLost}:{dark:boolean;onLost:()=>void}){
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.1],fov:38}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><Scene dark={dark}/></Canvas>;
}
