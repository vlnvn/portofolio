"use client";
/* eslint-disable react-hooks/immutability -- Three.js BufferGeometry is intentionally mutated inside the render loop. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { signalStates } from "./states";

function Actor({ progress, dark }: { progress: number; dark: boolean }) {
  const group = useRef<THREE.Group>(null); const ribbon = useRef<THREE.Mesh>(null);
  const planeRefs = useRef<(THREE.Mesh|null)[]>([]); const nodeRefs = useRef<(THREE.Mesh|null)[]>([]);
  const current = useRef(progress); const { invalidate, gl } = useThree();
  const geometry = useMemo(() => { const g=new THREE.BufferGeometry(); const positions=new Float32Array(66*2*3); const indices:number[]=[]; for(let i=0;i<65;i++){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);} g.setAttribute("position",new THREE.BufferAttribute(positions,3));g.setIndex(indices);return g; },[]);
  const planeGeometry=useMemo(()=>new THREE.PlaneGeometry(1.05,.38),[]); const nodeGeometry=useMemo(()=>new THREE.SphereGeometry(.075,12,8),[]);
  useFrame(() => {
    const delta=progress-current.current; if(Math.abs(delta)>.001){current.current+=delta*.13;invalidate();}else current.current=progress;
    const p=Math.max(0,Math.min(6,current.current)); const a=Math.floor(p),b=Math.min(6,a+1),t=p-a,s0=signalStates[a],s1=signalStates[b];
    const curvePoints=s0.ribbon.map((point,i)=>new THREE.Vector3().fromArray(point).lerp(new THREE.Vector3().fromArray(s1.ribbon[i]),t)); const curve=new THREE.CatmullRomCurve3(curvePoints);
    const pos=geometry.attributes.position as THREE.BufferAttribute;
    for(let i=0;i<66;i++){const u=i/65,center=curve.getPoint(u),tan=curve.getTangent(u).normalize(),normal=new THREE.Vector3(-tan.y,tan.x,0).normalize(),width=.07+Math.sin(Math.PI*u)*.11; for(let side=0;side<2;side++){const v=center.clone().addScaledVector(normal,side?width:-width);pos.setXYZ(i*2+side,v.x,v.y,v.z);}}
    pos.needsUpdate=true; geometry.computeVertexNormals();
    planeRefs.current.forEach((mesh,i)=>{if(!mesh)return; const p0=s0.planes[i],p1=s1.planes[i];mesh.position.set(THREE.MathUtils.lerp(p0[0],p1[0],t),THREE.MathUtils.lerp(p0[1],p1[1],t),THREE.MathUtils.lerp(p0[2],p1[2],t));mesh.rotation.z=THREE.MathUtils.lerp(p0[3],p1[3],t);});
    nodeRefs.current.forEach((mesh,i)=>{if(!mesh)return; const n0=s0.nodes[i],n1=s1.nodes[i];mesh.position.set(THREE.MathUtils.lerp(n0[0],n1[0],t),THREE.MathUtils.lerp(n0[1],n1[1],t),THREE.MathUtils.lerp(n0[2],n1[2],t));});
    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls); document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
  });
  const blue=dark?"#79a8ff":"#2f74e8",pale=dark?"#33527f":"#a8c7ff";
  return <group ref={group}><mesh ref={ribbon} geometry={geometry}><meshBasicMaterial color={blue} side={THREE.DoubleSide}/></mesh>{signalStates[0].planes.map((_,i)=><mesh key={`p${i}`} ref={(el)=>{planeRefs.current[i]=el}} geometry={planeGeometry}><meshBasicMaterial color={i===1?pale:blue} transparent opacity={i===1?.48:.78} side={THREE.DoubleSide}/></mesh>)}{signalStates[0].nodes.map((_,i)=><mesh key={`n${i}`} ref={(el)=>{nodeRefs.current[i]=el}} geometry={nodeGeometry}><meshBasicMaterial color={i===2?pale:blue}/></mesh>)}</group>;
}

export default function SignalScene({ progress, dark, onLost }: { progress:number; dark:boolean; onLost:()=>void }) {
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.4],fov:42}} gl={{antialias:true,alpha:true,powerPreference:"low-power"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event: Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><Actor progress={progress} dark={dark}/></Canvas>;
}
