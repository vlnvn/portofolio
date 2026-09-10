"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { heroSignalState } from "./states";

type Tilt = { x: number; y: number };

function Sculpture({ tilt, dark }: { tilt:Tilt; dark:boolean }) {
  const group=useRef<THREE.Group>(null);
  const currentTilt=useRef({x:0,y:0});
  const targetTilt=useRef(tilt);
  const {invalidate,gl}=useThree();
  const ribbonGeometry=useMemo(()=>{
    const geometry=new THREE.BufferGeometry();
    const positions=new Float32Array(66*2*3);
    const indices:number[]=[];
    const curve=new THREE.CatmullRomCurve3(heroSignalState.ribbon.map(point=>new THREE.Vector3().fromArray(point)));
    for(let i=0;i<65;i++){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
    const attribute=new THREE.BufferAttribute(positions,3);
    for(let i=0;i<66;i++){
      const u=i/65;
      const center=curve.getPoint(u);
      const tangent=curve.getTangent(u).normalize();
      const side=new THREE.Vector3(-tangent.y,tangent.x,.16).normalize();
      const width=.065+Math.sin(Math.PI*u)*.12;
      for(let edge=0;edge<2;edge++){
        const vertex=center.clone().addScaledVector(side,edge?width:-width);
        attribute.setXYZ(i*2+edge,vertex.x,vertex.y,vertex.z);
      }
    }
    geometry.setAttribute("position",attribute);
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  },[]);
  const slabGeometry=useMemo(()=>new THREE.BoxGeometry(1,1,1),[]);
  const nodeGeometry=useMemo(()=>new THREE.SphereGeometry(.085,18,12),[]);

  useEffect(()=>{targetTilt.current=tilt;invalidate();},[tilt,invalidate]);

  useFrame(()=>{
    const object=group.current;
    if(!object)return;
    const targetX=-targetTilt.current.y*.055;
    const targetY=targetTilt.current.x*.08;
    const dx=targetX-currentTilt.current.x;
    const dy=targetY-currentTilt.current.y;
    if(Math.abs(dx)>.0004||Math.abs(dy)>.0004){
      currentTilt.current.x+=dx*.16;
      currentTilt.current.y+=dy*.16;
      object.rotation.x=-.06+currentTilt.current.x;
      object.rotation.y=.08+currentTilt.current.y;
      invalidate();
    }else{
      currentTilt.current.x=targetX;
      currentTilt.current.y=targetY;
      object.rotation.x=-.06+targetX;
      object.rotation.y=.08+targetY;
    }
    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
  });

  const blue=dark?"#70A4FF":"#2F74E8";
  const pale=dark?"#243A5A":"#DCEAFF";
  return <group ref={group} rotation={[-.06,.08,0]}>
    <mesh geometry={ribbonGeometry}><meshStandardMaterial color={blue} roughness={.38} metalness={.06} side={THREE.DoubleSide}/></mesh>
    {heroSignalState.slabs.map((slab,index)=><mesh key={index} geometry={slabGeometry} position={slab.position} rotation={slab.rotation} scale={slab.scale}><meshStandardMaterial color={index===1?pale:blue} roughness={.42} metalness={.04} transparent opacity={index===1?.78:.92}/></mesh>)}
    {heroSignalState.nodes.map((position,index)=><mesh key={index} geometry={nodeGeometry} position={position}><meshStandardMaterial color={index===2?pale:blue} roughness={.3} metalness={.08}/></mesh>)}
  </group>;
}

export default function SignalScene({ tilt, dark, onLost }: { tilt:Tilt; dark:boolean; onLost:()=>void }) {
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.6],fov:40}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><ambientLight intensity={dark?.82:1.08}/><directionalLight position={[-2.4,3.2,4.8]} intensity={dark?2.2:2.7}/><directionalLight position={[3,-1.5,2]} intensity={dark?.65:.82}/><Sculpture tilt={tilt} dark={dark}/></Canvas>;
}