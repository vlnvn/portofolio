"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type MotionRef={current:{x:number;y:number;proximity:number}};
type ArtifactState="hero"|"kairos"|"kalintang"|"sambut"|"colors"|"aether"|"nara";
type ArtifactTarget={from:ArtifactState;to:ArtifactState;t:number;opacity:number};
type ArtifactRef={current:ArtifactTarget};

const clamp=(value:number,min=-1,max=1)=>Math.max(min,Math.min(max,value));
const clamp01=(value:number)=>clamp(value,0,1);
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const ease=(t:number)=>{const x=clamp01(t);return x*x*(3-2*x);};

function roundedRectShape(width:number,height:number,radius:number){
  const x=-width/2,y=-height/2,r=Math.min(radius,width/2,height/2);
  const shape=new THREE.Shape();
  shape.moveTo(x+r,y);
  shape.lineTo(x+width-r,y);shape.quadraticCurveTo(x+width,y,x+width,y+r);
  shape.lineTo(x+width,y+height-r);shape.quadraticCurveTo(x+width,y+height,x+width-r,y+height);
  shape.lineTo(x+r,y+height);shape.quadraticCurveTo(x,y+height,x,y+height-r);
  shape.lineTo(x,y+r);shape.quadraticCurveTo(x,y,x+r,y);
  return shape;
}

function extrude(shape:THREE.Shape,depth:number,bevel=.045){
  const geometry=new THREE.ExtrudeGeometry(shape,{depth,steps:1,curveSegments:18,bevelEnabled:true,bevelSegments:2,bevelSize:bevel,bevelThickness:bevel});
  geometry.center();
  return geometry;
}

function drumstickMeatGeometry(){
  const shape=new THREE.Shape();
  shape.moveTo(-.2,-.62);
  shape.bezierCurveTo(-.42,-.48,-.72,-.24,-.78,.18);
  shape.bezierCurveTo(-.87,.72,-.48,1.04,.03,1.08);
  shape.bezierCurveTo(.54,1.12,.83,.76,.77,.3);
  shape.bezierCurveTo(.72,-.08,.46,-.38,.2,-.56);
  shape.bezierCurveTo(.08,-.64,-.08,-.67,-.2,-.62);
  return extrude(shape,.34,.06);
}
function digitFourShape(){
  const shape=new THREE.Shape();
  shape.moveTo(-.16,1.04);
  shape.lineTo(.3,1.04);
  shape.lineTo(.3,.08);
  shape.lineTo(.64,.08);
  shape.lineTo(.64,-.3);
  shape.lineTo(.3,-.3);
  shape.lineTo(.3,-1.04);
  shape.lineTo(-.12,-1.04);
  shape.lineTo(-.12,-.3);
  shape.lineTo(-.82,-.3);
  shape.lineTo(-.82,.1);
  shape.lineTo(-.16,1.04);
  const hole=new THREE.Path();
  hole.moveTo(-.19,.58);
  hole.lineTo(-.53,.08);
  hole.lineTo(-.19,.08);
  hole.lineTo(-.19,.58);
  shape.holes.push(hole);
  return shape;
}

const baseRotation:Record<ArtifactState,[number,number,number]>={
  hero:[-.08,.12,0],
  kairos:[-.28,.5,.04],
  kalintang:[.04,-.2,-.56],
  sambut:[-.06,.14,-.015],
  colors:[-.05,.14,-.015],
  aether:[-.22,.36,.06],
  nara:[-.16,.12,-.035],
};

function KineticInput({target}:{target:MotionRef}){
  const {gl,invalidate}=useThree();
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    const move=(event:MouseEvent)=>{
      if(reduced.matches)return;
      const rect=gl.domElement.getBoundingClientRect();
      const cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
      const nx=(event.clientX-cx)/Math.max(rect.width*.5,1);
      const ny=(event.clientY-cy)/Math.max(rect.height*.5,1);
      const distance=Math.hypot(nx,ny);
      const proximity=clamp01((1.65-distance)/.95);
      target.current.x=clamp(nx)*proximity;
      target.current.y=clamp(ny)*proximity;
      target.current.proximity=proximity;
      document.documentElement.dataset.signalTarget=`${target.current.x.toFixed(3)},${target.current.y.toFixed(3)}`;
      document.documentElement.dataset.signalProximity=proximity.toFixed(3);
      invalidate();
    };
    const reset=()=>{target.current.x=0;target.current.y=0;target.current.proximity=0;document.documentElement.dataset.signalTarget="0.000,0.000";document.documentElement.dataset.signalProximity="0.000";invalidate();};
    window.addEventListener("mousemove",move,{passive:true});window.addEventListener("blur",reset);document.documentElement.addEventListener("mouseleave",reset);
    return()=>{window.removeEventListener("mousemove",move);window.removeEventListener("blur",reset);document.documentElement.removeEventListener("mouseleave",reset);};
  },[gl,invalidate,target]);
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

function useMaterials(dark:boolean){
  const materials=useMemo(()=>({
    energy:new THREE.MeshStandardMaterial({color:"#4C8DE8",roughness:.2,metalness:.3}),
    ice:new THREE.MeshStandardMaterial({color:"#B9D7FF",roughness:.26,metalness:.16}),
    deep:new THREE.MeshStandardMaterial({color:"#0E2E59",roughness:.22,metalness:.34}),
    kraft:new THREE.MeshStandardMaterial({color:"#B78955",roughness:.62,metalness:.02}),
    tape:new THREE.MeshStandardMaterial({color:"#E8D6B6",roughness:.48,metalness:0}),
    label:new THREE.MeshStandardMaterial({color:"#F5F8FC",roughness:.5,metalness:0}),
    meat:new THREE.MeshStandardMaterial({color:"#C85E2F",roughness:.46,metalness:0}),
    meatLight:new THREE.MeshStandardMaterial({color:"#E48242",roughness:.42,metalness:0}),
    bone:new THREE.MeshStandardMaterial({color:"#F1E3C8",roughness:.5,metalness:0}),
    med:new THREE.MeshStandardMaterial({color:"#ECF4FF",roughness:.38,metalness:.04}),
    teal:new THREE.MeshStandardMaterial({color:"#167D73",roughness:.34,metalness:.08}),
    camera:new THREE.MeshStandardMaterial({color:"#17355F",roughness:.3,metalness:.22}),
    glass:new THREE.MeshStandardMaterial({color:"#071A33",roughness:.08,metalness:.5}),
    silver:new THREE.MeshStandardMaterial({color:"#A8C4E6",roughness:.24,metalness:.42}),
    plate:new THREE.MeshStandardMaterial({color:"#F4F7FB",roughness:.34,metalness:.03}),
    green:new THREE.MeshStandardMaterial({color:"#55976E",roughness:.45,metalness:0}),
    food:new THREE.MeshStandardMaterial({color:"#D49A42",roughness:.48,metalness:0}),
    xAxis:new THREE.MeshStandardMaterial({color:"#FF8F8A",roughness:.28,metalness:.12}),
    yAxis:new THREE.MeshStandardMaterial({color:"#87E5AE",roughness:.28,metalness:.12}),
    zAxis:new THREE.MeshStandardMaterial({color:"#83BAFF",roughness:.28,metalness:.12}),
    aether:new THREE.MeshStandardMaterial({color:dark?"#A9CEFF":"#C9E0FF",roughness:.18,metalness:.08,transparent:true,opacity:.28,side:THREE.DoubleSide}),
    edge:new THREE.LineBasicMaterial({color:dark?"#C5DEFF":"#6E9BCB",transparent:true,opacity:.92}),
  }),[dark]);
  useEffect(()=>{
    materials.energy.color.set(dark?"#74A9F5":"#3E82DC");
    materials.ice.color.set(dark?"#C8DEFF":"#B5D0F4");
    materials.deep.color.set(dark?"#0A2141":"#123C6D");
  },[dark,materials]);
  useEffect(()=>()=>{Object.values(materials).forEach(material=>material.dispose());},[materials]);
  return materials;
}

function ResponsiveLights({target,dark}:{target:MotionRef;dark:boolean}){
  const key=useRef<THREE.DirectionalLight>(null),fill=useRef<THREE.DirectionalLight>(null),rim=useRef<THREE.DirectionalLight>(null),point=useRef<THREE.PointLight>(null);
  const current=useRef({x:0,y:0});
  const {invalidate}=useThree();
  useFrame((_,delta)=>{
    const dx=target.current.x-current.current.x,dy=target.current.y-current.current.y,alpha=1-Math.exp(-12*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    const x=current.current.x,y=current.current.y;
    if(key.current)key.current.position.set(-2.8+x*3.8,3.6-y*2.7,4.9+x*.8);
    if(fill.current)fill.current.position.set(3.4-x*2.8,-1.6+y*2.1,2.55-y*.7);
    if(rim.current)rim.current.position.set(-3.6-x*1.4,-2.3-y,1.9);
    if(point.current){point.current.position.set(x*3.4,-y*2.7,2.75+Math.abs(x)*.7);point.current.intensity=(dark?4.7:3.9)+(Math.abs(x)+Math.abs(y))*1.2;}
    if(Math.abs(dx)>.0004||Math.abs(dy)>.0004)invalidate();
  });
  return <><ambientLight intensity={dark?.48:.68}/><directionalLight ref={key} position={[-2.8,3.6,4.9]} intensity={dark?2.9:3.15}/><directionalLight ref={fill} position={[3.4,-1.6,2.55]} intensity={dark?.85:1.05}/><directionalLight ref={rim} position={[-3.6,-2.3,1.9]} intensity={dark?1:.72}/><pointLight ref={point} color={dark?"#8CB6FF":"#1757AF"} position={[0,0,2.75]} intensity={dark?4.7:3.9} distance={8} decay={2}/></>;
}

function ArtifactRig({target,artifact,dark}:{target:MotionRef;artifact:ArtifactRef;dark:boolean}){
  const rig=useRef<THREE.Group>(null),core=useRef<THREE.Group>(null);
  const heroRef=useRef<THREE.Group>(null),kairosRef=useRef<THREE.Group>(null),kalintangRef=useRef<THREE.Group>(null),sambutRef=useRef<THREE.Group>(null),colorsRef=useRef<THREE.Group>(null),aetherRef=useRef<THREE.Group>(null),naraRef=useRef<THREE.Group>(null);
  const heroRingA=useRef<THREE.Mesh>(null),heroRingB=useRef<THREE.Mesh>(null),heroRingC=useRef<THREE.Mesh>(null);
  const heroBladeA=useRef<THREE.Mesh>(null),heroBladeB=useRef<THREE.Mesh>(null),heroBladeC=useRef<THREE.Mesh>(null);
  const current=useRef({x:0,y:0});
  const {invalidate,gl}=useThree();
  const m=useMaterials(dark);

  const g=useMemo(()=>{
    const box=new THREE.BoxGeometry(1,1,1);
    const cylinder=new THREE.CylinderGeometry(.5,.5,1,36,1,false);
    const sphere=new THREE.SphereGeometry(1,32,20);
    const torus=new THREE.TorusGeometry(1,.055,16,96);
    const thinTorus=new THREE.TorusGeometry(1,.035,14,96);
    const heroRing0=new THREE.TorusGeometry(1.16,.03,14,88,Math.PI*2);
    const heroRing1=new THREE.TorusGeometry(.82,.045,14,88,Math.PI*2);
    const heroRing2=new THREE.TorusGeometry(1.48,.024,14,88,Math.PI*1.66);
    const heroBlade=new THREE.CylinderGeometry(.16,.34,1.28,5,1,false);
    const heroNode=new THREE.SphereGeometry(.085,18,12);
    const card=extrude(roundedRectShape(2.2,1.35,.18),.16,.045);
    const cameraBody=extrude(roundedRectShape(2.2,1.28,.16),.38,.055);
    const smallRounded=extrude(roundedRectShape(1,.55,.14),.18,.035);
    const drumstick=drumstickMeatGeometry();
    const four=extrude(digitFourShape(),.24,.045);
    const edges=new THREE.EdgesGeometry(box,25);
    const plate=new THREE.CylinderGeometry(1,1,.12,64,1,false);
    const cone=new THREE.ConeGeometry(.11,.28,24);
    return {box,cylinder,sphere,torus,thinTorus,heroRing0,heroRing1,heroRing2,heroBlade,heroNode,card,cameraBody,smallRounded,drumstick,four,edges,plate,cone};
  },[]);
  useEffect(()=>()=>{Object.values(g).forEach(geometry=>geometry.dispose());},[g]);

  useEffect(()=>{
    const timer=window.setInterval(()=>{if(!document.hidden&&artifact.current.opacity>.03)invalidate();},33);
    return()=>window.clearInterval(timer);
  },[artifact,invalidate]);

  useFrame(({clock},delta)=>{
    const from=artifact.current.from,to=artifact.current.to,t=clamp01(artifact.current.t);
    const settled=from===to;
    const applyState=(state:ArtifactState,group:THREE.Group|null)=>{
      if(!group)return;
      group.visible=settled?state===from:(state===from&&t<.52)||(state===to&&t>.48);
      if(settled&&state===from)group.scale.setScalar(1);
      else if(state===from&&t<.52){const p=ease(t/.52);group.scale.setScalar(lerp(1,.035,p));}
      else if(state===to&&t>.48){const p=ease((t-.48)/.52);group.scale.setScalar(lerp(.035,1,p));}
    };
    applyState("hero",heroRef.current);applyState("kairos",kairosRef.current);applyState("kalintang",kalintangRef.current);applyState("sambut",sambutRef.current);applyState("colors",colorsRef.current);applyState("aether",aetherRef.current);applyState("nara",naraRef.current);

    if(core.current){
      core.current.visible=!settled;
      const pulse=Math.sin(Math.PI*t);
      core.current.scale.setScalar(.12+pulse*.68);
      core.current.rotation.x=clock.elapsedTime*.26;
      core.current.rotation.y=clock.elapsedTime*-.32;
      core.current.rotation.z=clock.elapsedTime*.22;
    }

    const interaction:Record<ArtifactState,number>={hero:1,kairos:.8,kalintang:.84,sambut:.8,colors:.82,aether:.92,nara:.8};
    const strength=settled?interaction[from]:lerp(interaction[from],interaction[to],t);
    const idle=settled?(from==="hero"?.95:.68):.28;
    const desiredX=target.current.x*.25*strength+Math.sin(clock.elapsedTime*.47)*.028*idle;
    const desiredY=-target.current.y*.21*strength+Math.cos(clock.elapsedTime*.41)*.024*idle;
    const dx=desiredX-current.current.x,dy=desiredY-current.current.y,alpha=1-Math.exp(-11.5*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;

    if(rig.current){
      const proximity=target.current.proximity;
      rig.current.rotation.x=current.current.y+Math.sin(clock.elapsedTime*.42)*.012*idle;
      rig.current.rotation.y=current.current.x+Math.sin(clock.elapsedTime*.36+.8)*.014*idle;
      rig.current.rotation.z=Math.sin(clock.elapsedTime*.31)*.01*idle+target.current.x*.035*proximity;
      rig.current.position.set(target.current.x*.1*strength,-target.current.y*.075*strength,Math.abs(target.current.x)*.05*strength);
    }

    const animateState=(state:ArtifactState,group:THREE.Group|null,phase:number)=>{
      if(!group||!group.visible)return;
      const base=baseRotation[state],active=settled&&state===from?1:.35;
      group.position.x=Math.cos(clock.elapsedTime*.31+phase)*.025*active;
      group.position.y=Math.sin(clock.elapsedTime*.37+phase)*.04*active;
      group.rotation.x=base[0]+Math.sin(clock.elapsedTime*.29+phase)*.026*active;
      group.rotation.y=base[1]+Math.cos(clock.elapsedTime*.27+phase)*.034*active;
      group.rotation.z=base[2]+Math.sin(clock.elapsedTime*.23+phase)*.018*active;
    };
    animateState("hero",heroRef.current,0);animateState("kairos",kairosRef.current,.8);animateState("kalintang",kalintangRef.current,1.6);animateState("sambut",sambutRef.current,2.3);animateState("colors",colorsRef.current,3.1);animateState("aether",aetherRef.current,3.8);animateState("nara",naraRef.current,4.6);

    if(heroRingA.current)heroRingA.current.rotation.z=.1+clock.elapsedTime*.30;
    if(heroRingB.current)heroRingB.current.rotation.z=-.28-clock.elapsedTime*.23;
    if(heroRingC.current)heroRingC.current.rotation.z=.72+clock.elapsedTime*.17;
    if(heroBladeA.current)heroBladeA.current.rotation.z=.92+Math.sin(clock.elapsedTime*.36)*.045;
    if(heroBladeB.current)heroBladeB.current.rotation.z=-.18+Math.sin(clock.elapsedTime*.33+1.4)*.04;
    if(heroBladeC.current)heroBladeC.current.rotation.z=-.9+Math.sin(clock.elapsedTime*.31+2.2)*.045;

    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${current.current.x.toFixed(3)},${current.current.y.toFixed(3)}`;
    document.documentElement.dataset.signalState=settled?from:`${from}-${to}`;
    if(Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });

  return <group ref={rig}>
    <group ref={heroRef} rotation={baseRotation.hero}>
      <mesh ref={heroRingA} position={[-.02,.02,.08]} rotation={[1.06,.28,.1]} material={m.energy} geometry={g.heroRing0}/>
      <mesh ref={heroRingB} position={[.08,-.05,.36]} rotation={[.62,-.54,-.28]} material={m.ice} geometry={g.heroRing1}/>
      <mesh ref={heroRingC} position={[-.08,.07,-.3]} rotation={[1.38,.58,.72]} material={m.energy} geometry={g.heroRing2}/>
      <mesh ref={heroBladeA} position={[-.92,.46,.4]} rotation={[.7,.18,.92]} scale={[.52,.94,.42]} material={m.energy} geometry={g.heroBlade}/>
      <mesh ref={heroBladeB} position={[.08,-.94,.08]} rotation={[.34,-.46,-.18]} scale={[.46,1.02,.38]} material={m.deep} geometry={g.heroBlade}/>
      <mesh ref={heroBladeC} position={[.96,.34,-.2]} rotation={[-.58,.52,-.9]} scale={[.5,.9,.4]} material={m.ice} geometry={g.heroBlade}/>
      <mesh position={[-1.42,-.5,.2]} material={m.ice} geometry={g.heroNode}/>
      <mesh position={[-.64,1.12,.54]} material={m.energy} geometry={g.heroNode}/>
      <mesh position={[.08,.7,-.26]} material={m.ice} geometry={g.heroNode}/>
      <mesh position={[.78,-.74,.7]} material={m.energy} geometry={g.heroNode}/>
      <mesh position={[1.42,.4,.14]} material={m.ice} geometry={g.heroNode}/>
    </group>

    <group ref={kairosRef} rotation={baseRotation.kairos}>
      <mesh scale={[1.62,1.12,1.12]} material={m.kraft} geometry={g.box}/>
      <lineSegments scale={[1.625,1.125,1.125]} geometry={g.edges} material={m.edge}/>
      <mesh position={[0,0,.575]} scale={[.25,1.125,.025]} material={m.tape} geometry={g.box}/>
      <mesh position={[0,.575,.18]} scale={[.25,.025,.78]} material={m.tape} geometry={g.box}/>
      <mesh position={[.43,-.14,.585]} scale={[.46,.28,.025]} material={m.label} geometry={g.box}/>
      <mesh position={[.43,-.11,.615]} scale={[.26,.028,.01]} material={m.deep} geometry={g.box}/>
    </group>

    <group ref={kalintangRef} rotation={baseRotation.kalintang}>
      <mesh position={[0,.15,0]} scale={[1.04,1.04,1.04]} material={m.meat} geometry={g.drumstick}/>
      <mesh position={[-.22,-.79,.01]} rotation={[0,0,0]} scale={[.14,.64,.14]} material={m.bone} geometry={g.cylinder}/>
      <mesh position={[-.32,-1.14,.02]} scale={[.17,.15,.15]} material={m.bone} geometry={g.sphere}/>
      <mesh position={[-.11,-1.16,.02]} scale={[.17,.15,.15]} material={m.bone} geometry={g.sphere}/>
      <mesh position={[.08,.47,.2]} scale={[.34,.44,.075]} material={m.meatLight} geometry={g.sphere}/>
    </group>

    <group ref={sambutRef} rotation={baseRotation.sambut}>
      <mesh material={m.med} geometry={g.card}/>
      <mesh position={[0,.8,.01]} scale={[.42,.24,.8]} material={m.silver} geometry={g.smallRounded}/>
      <mesh position={[-.66,.12,.11]} scale={[.12,.42,.08]} material={m.teal} geometry={g.box}/>
      <mesh position={[-.66,.12,.115]} scale={[.42,.12,.08]} material={m.teal} geometry={g.box}/>
      <mesh position={[.48,.25,.12]} scale={[.22,.22,.08]} material={m.deep} geometry={g.sphere}/>
      <mesh position={[.48,-.15,.12]} scale={[.42,.23,.07]} material={m.deep} geometry={g.sphere}/>
      <mesh position={[.02,-.43,.12]} scale={[.36,.045,.035]} material={m.silver} geometry={g.box}/>
      <mesh position={[.55,-.43,.12]} scale={[.3,.045,.035]} material={m.silver} geometry={g.box}/>
    </group>

    <group ref={colorsRef} rotation={baseRotation.colors}>
      <mesh material={m.camera} geometry={g.cameraBody}/>
      <mesh position={[-.46,.76,.02]} scale={[.72,.34,.9]} material={m.camera} geometry={g.smallRounded}/>
      <mesh position={[.83,.46,.23]} scale={[.28,.16,.08]} material={m.silver} geometry={g.box}/>
      <mesh position={[.08,-.02,.32]} rotation={[Math.PI/2,0,0]} scale={[.82,.34,.82]} material={m.silver} geometry={g.cylinder}/>
      <mesh position={[.08,-.02,.5]} rotation={[Math.PI/2,0,0]} scale={[.61,.24,.61]} material={m.deep} geometry={g.cylinder}/>
      <mesh position={[.08,-.02,.64]} rotation={[Math.PI/2,0,0]} scale={[.38,.12,.38]} material={m.glass} geometry={g.cylinder}/>
      <mesh position={[-.82,.65,.25]} rotation={[Math.PI/2,0,0]} scale={[.09,.1,.09]} material={m.energy} geometry={g.cylinder}/>
    </group>

    <group ref={aetherRef} rotation={baseRotation.aether}>
      <mesh scale={[1.02,1.02,1.02]} material={m.aether} geometry={g.box}/>
      <lineSegments scale={[1.03,1.03,1.03]} geometry={g.edges} material={m.edge}/>
      <mesh position={[.72,.58,.46]} scale={[.3,.3,.3]} material={m.ice} geometry={g.box}/>
      <lineSegments position={[.72,.58,.46]} scale={[.305,.305,.305]} geometry={g.edges} material={m.edge}/>
      <mesh position={[.55,0,0]} rotation={[0,0,-Math.PI/2]} scale={[.05,1.1,.05]} material={m.xAxis} geometry={g.cylinder}/>
      <mesh position={[1.18,0,0]} rotation={[0,0,-Math.PI/2]} material={m.xAxis} geometry={g.cone}/>
      <mesh position={[0,.55,0]} scale={[.05,1.1,.05]} material={m.yAxis} geometry={g.cylinder}/>
      <mesh position={[0,1.18,0]} material={m.yAxis} geometry={g.cone}/>
      <mesh position={[0,0,.55]} rotation={[Math.PI/2,0,0]} scale={[.05,1.1,.05]} material={m.zAxis} geometry={g.cylinder}/>
      <mesh position={[0,0,1.18]} rotation={[Math.PI/2,0,0]} material={m.zAxis} geometry={g.cone}/>
    </group>

    <group ref={naraRef} rotation={baseRotation.nara}>
      <mesh rotation={[Math.PI/2,0,0]} scale={[1.02,.12,1.02]} material={m.plate} geometry={g.plate}/>
      <mesh position={[0,0,.1]} material={m.silver} geometry={g.torus} scale={[.92,.92,.92]}/>
      <mesh position={[0,0,.13]} rotation={[Math.PI/2,0,0]} scale={[.72,.07,.72]} material={m.ice} geometry={g.plate}/>
      <mesh position={[-1.22,-.08,.1]} scale={[.075,.7,.055]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.34,.66,.1]} scale={[.026,.22,.045]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.26,.66,.1]} scale={[.026,.22,.045]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.18,.66,.1]} scale={[.026,.22,.045]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.10,.66,.1]} scale={[.026,.22,.045]} material={m.silver} geometry={g.box}/>
      <mesh position={[1.18,-.12,.1]} scale={[.075,.72,.055]} material={m.silver} geometry={g.box}/>
      <mesh position={[1.18,.6,.1]} scale={[.18,.3,.05]} material={m.ice} geometry={g.box}/>
      <mesh position={[.36,.24,.27]} scale={[.24,.2,.13]} material={m.green} geometry={g.sphere}/>
      <mesh position={[-.2,.33,.27]} scale={[.22,.19,.12]} material={m.food} geometry={g.sphere}/>
      <mesh position={[.02,-.28,.27]} scale={[.24,.18,.12]} material={m.meatLight} geometry={g.sphere}/>
    </group>

    <group ref={core} visible={false}>
      <mesh rotation={[1.08,.3,.1]} material={m.energy} geometry={g.torus}/>
      <mesh rotation={[.54,-.58,-.24]} scale={.72} material={m.ice} geometry={g.torus}/>
      <mesh rotation={[1.36,.56,.7]} scale={1.16} material={m.energy} geometry={g.thinTorus}/>
    </group>
  </group>;
}

function Error404Rig({target,dark}:{target:MotionRef;dark:boolean}){
  const group=useRef<THREE.Group>(null),left=useRef<THREE.Group>(null),right=useRef<THREE.Group>(null),zero=useRef<THREE.Mesh>(null);
  const current=useRef({x:0,y:0});
  const {invalidate,gl}=useThree();
  const m=useMaterials(dark);
  const g=useMemo(()=>({
    four:extrude(digitFourShape(),.24,.045),
    torus:new THREE.TorusGeometry(.72,.115,20,112),
  }),[]);
  useEffect(()=>()=>{g.four.dispose();g.torus.dispose();},[g]);
  useEffect(()=>{const timer=window.setInterval(()=>{if(!document.hidden)invalidate();},40);return()=>window.clearInterval(timer);},[invalidate]);

  useFrame(({clock},delta)=>{
    const dx=target.current.x*.16-current.current.x,dy=-target.current.y*.12-current.current.y,alpha=1-Math.exp(-10*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    if(group.current){
      group.current.position.y=Math.sin(clock.elapsedTime*.46)*.035;
      group.current.rotation.x=current.current.y*.55+Math.sin(clock.elapsedTime*.34)*.022;
      group.current.rotation.y=current.current.x*.5+Math.sin(clock.elapsedTime*.31+.5)*.026;
      group.current.rotation.z=Math.sin(clock.elapsedTime*.27)*.012;
    }
    if(left.current){left.current.position.y=Math.sin(clock.elapsedTime*.72)*.035+current.current.y*.15;left.current.rotation.z=-.025+Math.sin(clock.elapsedTime*.58)*.018-current.current.x*.08;}
    if(right.current){right.current.position.y=Math.sin(clock.elapsedTime*.72+1.2)*.035-current.current.y*.12;right.current.rotation.z=.025+Math.sin(clock.elapsedTime*.58+1.4)*.018+current.current.x*.08;}
    if(zero.current){zero.current.rotation.x=Math.sin(clock.elapsedTime*.48)*.04+current.current.y*.12;zero.current.rotation.y=clock.elapsedTime*.12+current.current.x*.22;zero.current.scale.set(1+target.current.proximity*.035,1-target.current.proximity*.02,1);}
    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${current.current.x.toFixed(3)},${current.current.y.toFixed(3)}`;
    document.documentElement.dataset.signalState="404";
    if(Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });

  return <group ref={group} scale={.9}>
    <group ref={left} position={[-1.28,0,0]}>
      <mesh material={m.energy} geometry={g.four}/>
    </group>
    <mesh ref={zero} position={[0,0,.02]} material={m.silver} geometry={g.torus}/>
    <group ref={right} position={[1.28,0,0]}>
      <mesh material={m.energy} geometry={g.four}/>
    </group>
  </group>;
}

function Scene({dark,persistent,variant}:{dark:boolean;persistent:boolean;variant:"artifact"|"404"}){
  const target=useRef({x:0,y:0,proximity:0}),artifact=useRef<ArtifactTarget>({from:"hero",to:"hero",t:0,opacity:1});
  const setArtifact=(detail:ArtifactTarget)=>{artifact.current=detail;};
  return <><KineticInput target={target}/><ResponsiveLights target={target} dark={dark}/>{variant==="404"?<Error404Rig target={target} dark={dark}/>:<><ArtifactInput onTarget={setArtifact} persistent={persistent}/><ArtifactRig target={target} artifact={artifact} dark={dark}/></>}</>;
}

export default function SignalScene({dark,persistent=false,variant="artifact",onLost}:{dark:boolean;persistent?:boolean;variant?:"artifact"|"404";onLost:()=>void}){
  return <Canvas className="signal-canvas" frameloop="demand" dpr={[1,1.5]} camera={{position:[0,0,5.5],fov:34}} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}} onCreated={({gl,invalidate})=>{gl.domElement.addEventListener("webglcontextlost",(event:Event)=>{event.preventDefault();onLost();},{once:true});invalidate();}}><Scene dark={dark} persistent={persistent} variant={variant}/></Canvas>;
}
