"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type MotionRef={current:{x:number;y:number}};
type Vec3=[number,number,number];
type ArtifactState="hero"|"kairos"|"kalintang"|"sambut"|"colors"|"aether"|"nara";
type ArtifactTarget={from:ArtifactState;to:ArtifactState;t:number;opacity:number};
type ArtifactRef={current:ArtifactTarget};
type Part={position:Vec3;rotation:Vec3;scale:Vec3};
type Shape={rigRotation:Vec3;rigScale:number;spin:number;idle:number;interaction:number;boxes:Part[];cylinders:Part[];spheres:Part[];tori:Part[]};

const clamp=(value:number)=>Math.max(-1,Math.min(1,value));
const clamp01=(value:number)=>Math.max(0,Math.min(1,value));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const H:Part={position:[0,0,0],rotation:[0,0,0],scale:[.001,.001,.001]};
const P=(position:Vec3,rotation:Vec3,scale:Vec3):Part=>({position,rotation,scale});

const shapes:Record<ArtifactState,Shape>={
  hero:{
    rigRotation:[-.08,.12,0],rigScale:1,spin:1,idle:1,interaction:1,
    boxes:[
      P([-.82,.42,.18],[-.16,.34,-.52],[.86,.28,.12]),
      P([.08,-.86,.06],[.44,-.24,.7],[.98,.3,.12]),
      P([.88,.34,-.16],[-.2,.56,.36],[.84,.26,.11]),
    ],
    cylinders:[P([-.18,.08,-.28],[.4,.12,-.34],[.07,.82,.07]),P([.48,-.18,.34],[-.28,.46,.58],[.06,.68,.06])],
    spheres:[P([-1.35,-.42,.18],[0,0,0],[.1,.1,.1]),P([.08,.82,-.16],[0,0,0],[.12,.12,.12]),P([1.28,.36,.12],[0,0,0],[.09,.09,.09])],
    tori:[P([0,0,.02],[1.05,.26,.1],[1.15,.78,1.15]),P([.04,-.02,.26],[.62,-.48,-.28],[.82,1.02,.82]),P([-.06,.06,-.28],[1.38,.56,.7],[1.38,.86,1.38])],
  },
  kairos:{
    rigRotation:[.12,-.34,.06],rigScale:.93,spin:.08,idle:.28,interaction:.24,
    boxes:[P([0,0,0],[0,0,0],[1.12,.78,.64]),P([0,0,.67],[0,0,0],[.18,.79,.055]),P([0,0,.68],[0,0,0],[1.13,.16,.055])],
    cylinders:[H,H],
    spheres:[P([-.86,-.57,.52],[0,0,0],[.07,.07,.07]),P([.86,-.57,.52],[0,0,0],[.07,.07,.07]),P([.86,.57,.52],[0,0,0],[.07,.07,.07])],
    tori:[H,H,H],
  },
  kalintang:{
    rigRotation:[.04,-.24,-.12],rigScale:.95,spin:.04,idle:.34,interaction:.22,
    boxes:[H,H,H],
    cylinders:[P([-.5,-.52,.02],[0,0,.62],[.17,.82,.17]),P([-.3,-.26,.02],[0,0,.62],[.28,.34,.25])],
    spheres:[P([.24,.33,0],[0,0,0],[.72,.94,.64]),P([-.12,.56,.08],[0,0,0],[.56,.72,.58]),P([-.82,-.9,.02],[0,0,0],[.22,.18,.22])],
    tori:[H,H,H],
  },
  sambut:{
    rigRotation:[.03,-.22,.02],rigScale:.92,spin:.04,idle:.3,interaction:.2,
    boxes:[P([0,0,0],[0,0,0],[1.15,.78,.08]),P([-.42,.14,.12],[0,0,0],[.12,.38,.085]),P([-.42,.14,.13],[0,0,0],[.38,.12,.085])],
    cylinders:[P([.5,-.18,.12],[0,0,0],[.08,.28,.08]),H],
    spheres:[P([.42,.2,.14],[0,0,0],[.18,.18,.1]),P([.42,-.17,.14],[0,0,0],[.07,.07,.05]),P([.66,-.17,.14],[0,0,0],[.07,.07,.05])],
    tori:[H,H,H],
  },
  colors:{
    rigRotation:[.03,-.18,-.02],rigScale:.9,spin:.05,idle:.32,interaction:.2,
    boxes:[P([0,0,0],[0,0,0],[1.05,.68,.42]),P([-.28,.47,.02],[0,0,0],[.4,.18,.22]),P([.44,.43,.03],[0,0,0],[.18,.1,.12])],
    cylinders:[P([.18,-.03,.45],[Math.PI/2,0,0],[.43,.33,.43]),H],
    spheres:[P([-.62,.12,.46],[0,0,0],[.07,.07,.07]),H,H],
    tori:[P([.18,-.03,.77],[0,0,0],[.45,.45,.45]),H,H],
  },
  aether:{
    rigRotation:[.22,-.38,.08],rigScale:.93,spin:.42,idle:.4,interaction:.28,
    boxes:[P([0,0,0],[.12,.18,.08],[.88,.88,.88]),P([.72,.62,.18],[-.14,.28,.24],[.27,.27,.27]),H],
    cylinders:[H,H],
    spheres:[P([-.76,-.7,.52],[0,0,0],[.08,.08,.08]),P([.78,-.68,.48],[0,0,0],[.08,.08,.08]),P([.7,.72,-.42],[0,0,0],[.08,.08,.08])],
    tori:[P([0,0,0],[1.08,.18,.22],[1.22,.82,1.22]),P([0,0,0],[.42,.88,-.62],[1.02,.72,1.02]),H],
  },
  nara:{
    rigRotation:[.2,-.12,-.02],rigScale:.9,spin:.04,idle:.28,interaction:.18,
    boxes:[P([-.8,-.08,.1],[0,0,.04],[.08,.72,.07]),P([-.8,.58,.1],[0,0,.04],[.28,.16,.07]),H],
    cylinders:[P([.08,0,0],[Math.PI/2,0,0],[.84,.11,.84]),P([.08,0,.13],[Math.PI/2,0,0],[.52,.07,.52])],
    spheres:[P([-.12,.04,.28],[0,0,0],[.11,.11,.08]),P([.18,.18,.28],[0,0,0],[.09,.09,.07]),P([.36,-.12,.28],[0,0,0],[.08,.08,.06])],
    tori:[P([.08,0,.22],[0,0,0],[.86,.68,.86]),H,H],
  },
};

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

function useArtifactMaterials(dark:boolean){
  const materials=useMemo(()=>({
    energy:new THREE.MeshStandardMaterial({roughness:.23,metalness:.28}),
    ice:new THREE.MeshStandardMaterial({roughness:.3,metalness:.16}),
    deep:new THREE.MeshStandardMaterial({roughness:.2,metalness:.34}),
  }),[]);
  useEffect(()=>{
    materials.energy.color.set(dark?"#70A4FF":"#2F74E8");
    materials.ice.color.set(dark?"#1D3558":"#B9D0F2");
    materials.deep.color.set(dark?"#B9D4FF":"#173E78");
  },[dark,materials]);
  useEffect(()=>()=>{materials.energy.dispose();materials.ice.dispose();materials.deep.dispose();},[materials]);
  return materials;
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

function ArtifactRig({target,artifact,dark}:{target:MotionRef;artifact:ArtifactRef;dark:boolean}){
  const rig=useRef<THREE.Group>(null);
  const boxRefs=useRef<(THREE.Mesh|null)[]>([]),cylinderRefs=useRef<(THREE.Mesh|null)[]>([]),sphereRefs=useRef<(THREE.Mesh|null)[]>([]),torusRefs=useRef<(THREE.Mesh|null)[]>([]);
  const current=useRef({x:0,y:0});
  const {invalidate,gl}=useThree();
  const materials=useArtifactMaterials(dark);
  const geometries=useMemo(()=>({
    box:new THREE.BoxGeometry(1,1,1),
    cylinder:new THREE.CylinderGeometry(.5,.5,1,24,1,false),
    sphere:new THREE.SphereGeometry(1,28,18),
    torus0:new THREE.TorusGeometry(1,.045,14,80,Math.PI*2),
    torus1:new THREE.TorusGeometry(1,.05,14,80,Math.PI*2),
    torus2:new THREE.TorusGeometry(1,.035,14,80,Math.PI*1.68),
  }),[]);
  useEffect(()=>()=>{Object.values(geometries).forEach(geometry=>geometry.dispose());},[geometries]);
  useEffect(()=>{
    const timer=window.setInterval(()=>{if(!document.hidden&&artifact.current.opacity>.03)invalidate();},33);
    return()=>window.clearInterval(timer);
  },[artifact,invalidate]);

  useFrame(({clock},delta)=>{
    const mix=clamp01(artifact.current.t),from=shapes[artifact.current.from],to=shapes[artifact.current.to];
    const idle=lerp(from.idle,to.idle,mix),interaction=lerp(from.interaction,to.interaction,mix),spin=lerp(from.spin,to.spin,mix);
    const desiredX=(-target.current.y*.27*interaction)+(Math.sin(clock.elapsedTime*.62)*.045+Math.sin(clock.elapsedTime*.27+.8)*.02)*idle;
    const desiredY=(target.current.x*.36*interaction)+(Math.cos(clock.elapsedTime*.54)*.055+Math.sin(clock.elapsedTime*.31)*.018)*idle;
    const dx=desiredX-current.current.x,dy=desiredY-current.current.y,alpha=1-Math.exp(-10.5*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const tx=current.current.x,ty=current.current.y;

    const apply=(mesh:THREE.Mesh|null,a:Part,b:Part,index:number,orbit=0)=>{
      if(!mesh)return;
      const sx=lerp(a.scale[0],b.scale[0],mix),sy=lerp(a.scale[1],b.scale[1],mix),sz=lerp(a.scale[2],b.scale[2],mix);
      mesh.visible=Math.max(Math.abs(sx),Math.abs(sy),Math.abs(sz))>.012;
      mesh.position.set(lerp(a.position[0],b.position[0],mix)+ty*(.08+index*.018)*interaction,lerp(a.position[1],b.position[1],mix)-tx*(.07+index*.016)*interaction,lerp(a.position[2],b.position[2],mix)+ty*.05*interaction);
      mesh.rotation.set(lerp(a.rotation[0],b.rotation[0],mix)-tx*.14*interaction,lerp(a.rotation[1],b.rotation[1],mix)+ty*.18*interaction,lerp(a.rotation[2],b.rotation[2],mix)+orbit);
      mesh.scale.set(sx,sy,sz);
    };

    boxRefs.current.forEach((mesh,index)=>apply(mesh,from.boxes[index],to.boxes[index],index));
    cylinderRefs.current.forEach((mesh,index)=>apply(mesh,from.cylinders[index],to.cylinders[index],index));
    sphereRefs.current.forEach((mesh,index)=>apply(mesh,from.spheres[index],to.spheres[index],index));
    torusRefs.current.forEach((mesh,index)=>apply(mesh,from.tori[index],to.tori[index],index,clock.elapsedTime*([.30,-.23,.17][index]??.16)*spin));

    if(rig.current){
      rig.current.rotation.set(lerp(from.rigRotation[0],to.rigRotation[0],mix)+tx,lerp(from.rigRotation[1],to.rigRotation[1],mix)+ty,lerp(from.rigRotation[2],to.rigRotation[2],mix)+Math.sin(clock.elapsedTime*.32)*.018*idle);
      rig.current.scale.setScalar(lerp(from.rigScale,to.rigScale,mix));
    }

    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${tx.toFixed(3)},${ty.toFixed(3)}`;
    document.documentElement.dataset.signalState=artifact.current.from===artifact.current.to?artifact.current.from:`${artifact.current.from}-${artifact.current.to}`;
    if(Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });

  return <group ref={rig}>
    {[0,1,2].map(index=><mesh key={`box-${index}`} ref={element=>{boxRefs.current[index]=element}} geometry={geometries.box} material={index===0?materials.ice:materials.energy}/>)}
    {[0,1].map(index=><mesh key={`cylinder-${index}`} ref={element=>{cylinderRefs.current[index]=element}} geometry={geometries.cylinder} material={index===0?materials.deep:materials.energy}/>)}
    {[0,1,2].map(index=><mesh key={`sphere-${index}`} ref={element=>{sphereRefs.current[index]=element}} geometry={geometries.sphere} material={index===1?materials.ice:materials.energy}/>)}
    {[geometries.torus0,geometries.torus1,geometries.torus2].map((geometry,index)=><mesh key={`torus-${index}`} ref={element=>{torusRefs.current[index]=element}} geometry={geometry} material={index===1?materials.ice:materials.energy}/>)}
  </group>;
}

function Error404Rig({target,dark}:{target:MotionRef;dark:boolean}){
  const group=useRef<THREE.Group>(null),barRefs=useRef<(THREE.Mesh|null)[]>([]),ring=useRef<THREE.Mesh>(null);
  const current=useRef({x:0,y:0});
  const {invalidate,gl}=useThree();
  const materials=useArtifactMaterials(dark);
  const box=useMemo(()=>new THREE.BoxGeometry(1,1,1),[]);
  const torus=useMemo(()=>new THREE.TorusGeometry(1,.1,18,96),[]);
  useEffect(()=>()=>{box.dispose();torus.dispose();},[box,torus]);
  useEffect(()=>{const timer=window.setInterval(()=>{if(!document.hidden)invalidate();},40);return()=>window.clearInterval(timer);},[invalidate]);
  const bars=[
    {p:[-1.35,.15,0] as Vec3,r:[0,0,-.48] as Vec3,s:[.13,.92,.12] as Vec3},
    {p:[-.95,0,0] as Vec3,r:[0,0,0] as Vec3,s:[.13,1.22,.12] as Vec3},
    {p:[-1.2,-.05,.02] as Vec3,r:[0,0,Math.PI/2] as Vec3,s:[.13,.66,.12] as Vec3},
    {p:[.62,.15,0] as Vec3,r:[0,0,-.48] as Vec3,s:[.13,.92,.12] as Vec3},
    {p:[1.02,0,0] as Vec3,r:[0,0,0] as Vec3,s:[.13,1.22,.12] as Vec3},
    {p:[.77,-.05,.02] as Vec3,r:[0,0,Math.PI/2] as Vec3,s:[.13,.66,.12] as Vec3},
  ];
  useFrame(({clock},delta)=>{
    const dx=target.current.x*.07-current.current.x,dy=-target.current.y*.06-current.current.y,alpha=1-Math.exp(-9*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    if(group.current)group.current.rotation.set(.04+current.current.y,-.08+current.current.x,Math.sin(clock.elapsedTime*.45)*.012);
    barRefs.current.forEach((mesh,index)=>{if(!mesh)return;const bar=bars[index];mesh.position.set(...bar.p);mesh.rotation.set(...bar.r);mesh.scale.set(...bar.s);});
    if(ring.current){ring.current.position.set(-.08,0,.02);ring.current.rotation.set(0,0,0);ring.current.scale.set(.43,.62,.43);}
    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${current.current.x.toFixed(3)},${current.current.y.toFixed(3)}`;
    document.documentElement.dataset.signalState="404";
    if(Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });
  return <group ref={group}>
    {bars.map((_,index)=><mesh key={index} ref={element=>{barRefs.current[index]=element}} geometry={box} material={index%3===0?materials.ice:materials.energy}/>)}
    <mesh ref={ring} geometry={torus} material={materials.deep}/>
  </group>;
}

function Scene({dark,persistent,variant}:{dark:boolean;persistent:boolean;variant:"artifact"|"404"}){
  const target=useRef({x:0,y:0}),artifact=useRef<ArtifactTarget>({from:"hero",to:"hero",t:0,opacity:1});
  const setArtifact=(detail:ArtifactTarget)=>{artifact.current=detail;};
  return <><KineticInput target={target}/><ResponsiveLights target={target} dark={dark}/>{variant==="404"?<Error404Rig target={target} dark={dark}/>:<><ArtifactInput onTarget={setArtifact} persistent={persistent}/><ArtifactRig target={target} artifact={artifact} dark={dark}/></>}</>;
}

export default function SignalScene({dark,persistent=false,variant="artifact",onLost}:{dark:boolean;persistent?:boolean;variant?:"artifact"|"404";onLost:()=>void}){
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.25],fov:36}} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><Scene dark={dark} persistent={persistent} variant={variant}/></Canvas>;
}
