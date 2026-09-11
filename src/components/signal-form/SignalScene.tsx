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
    xAxis:new THREE.MeshStandardMaterial({color:"#E36B68",roughness:.3,metalness:.16}),
    yAxis:new THREE.MeshStandardMaterial({color:"#66A57A",roughness:.3,metalness:.16}),
    zAxis:new THREE.MeshStandardMaterial({color:"#5792E2",roughness:.3,metalness:.16}),
    edge:new THREE.LineBasicMaterial({color:dark?"#A9C9F5":"#173E6D",transparent:true,opacity:.78}),
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
  const current=useRef({x:0,y:0});
  const {invalidate,gl}=useThree();
  const m=useMaterials(dark);

  const g=useMemo(()=>{
    const box=new THREE.BoxGeometry(1,1,1);
    const cylinder=new THREE.CylinderGeometry(.5,.5,1,36,1,false);
    const sphere=new THREE.SphereGeometry(1,32,20);
    const torus=new THREE.TorusGeometry(1,.055,16,96);
    const thinTorus=new THREE.TorusGeometry(1,.035,14,96);
    const card=extrude(roundedRectShape(2.2,1.35,.18),.16,.045);
    const cameraBody=extrude(roundedRectShape(2.2,1.28,.16),.38,.055);
    const smallRounded=extrude(roundedRectShape(1,.55,.14),.18,.035);
    const drumstick=drumstickMeatGeometry();
    const edges=new THREE.EdgesGeometry(box,25);
    const plate=new THREE.CylinderGeometry(1,1,.12,64,1,false);
    const cone=new THREE.ConeGeometry(.11,.28,24);
    return {box,cylinder,sphere,torus,thinTorus,card,cameraBody,smallRounded,drumstick,edges,plate,cone};
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
      if(settled&&state===from){group.scale.setScalar(1);group.rotation.z=0;}
      else if(state===from&&t<.52){const p=ease(t/.52);group.scale.setScalar(lerp(1,.035,p));group.rotation.z=p*.42;}
      else if(state===to&&t>.48){const p=ease((t-.48)/.52);group.scale.setScalar(lerp(.035,1,p));group.rotation.z=(1-p)*-.42;}
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

    const interaction:Record<ArtifactState,number>={hero:1,kairos:.76,kalintang:.82,sambut:.72,colors:.78,aether:.92,nara:.74};
    const strength=settled?interaction[from]:lerp(interaction[from],interaction[to],t);
    const idle=settled?(from==="hero"?.85:.28):.18;
    const desiredX=target.current.x*.24*strength+Math.sin(clock.elapsedTime*.55)*.022*idle;
    const desiredY=-target.current.y*.2*strength+Math.cos(clock.elapsedTime*.48)*.018*idle;
    const dx=desiredX-current.current.x,dy=desiredY-current.current.y,alpha=1-Math.exp(-11.5*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;

    if(rig.current){
      const proximity=target.current.proximity;
      rig.current.rotation.x=current.current.y+Math.sin(clock.elapsedTime*.42)*.012*idle;
      rig.current.rotation.y=current.current.x+Math.sin(clock.elapsedTime*.36+.8)*.014*idle;
      rig.current.rotation.z=Math.sin(clock.elapsedTime*.31)*.01*idle+target.current.x*.035*proximity;
      rig.current.position.set(target.current.x*.1*strength,-target.current.y*.075*strength,Math.abs(target.current.x)*.05*strength);
    }

    if(heroRingA.current)heroRingA.current.rotation.z=clock.elapsedTime*.31;
    if(heroRingB.current)heroRingB.current.rotation.z=clock.elapsedTime*-.24;
    if(heroRingC.current)heroRingC.current.rotation.z=clock.elapsedTime*.18;

    document.documentElement.dataset.signalFrames=String((Number(document.documentElement.dataset.signalFrames)||0)+1);
    document.documentElement.dataset.signalCalls=String(gl.info.render.calls);
    document.documentElement.dataset.signalTriangles=String(gl.info.render.triangles);
    document.documentElement.dataset.signalTilt=`${current.current.x.toFixed(3)},${current.current.y.toFixed(3)}`;
    document.documentElement.dataset.signalState=settled?from:`${from}-${to}`;
    if(Math.abs(dx)>.00035||Math.abs(dy)>.00035)invalidate();
  });

  return <group ref={rig}>
    <group ref={heroRef} rotation={[-.08,.12,0]}>
      <mesh ref={heroRingA} rotation={[1.08,.28,.1]} material={m.energy} geometry={g.torus}/>
      <mesh ref={heroRingB} rotation={[.64,-.56,-.28]} scale={.73} material={m.ice} geometry={g.torus}/>
      <mesh ref={heroRingC} rotation={[1.38,.58,.72]} scale={1.18} material={m.energy} geometry={g.thinTorus}/>
      <mesh position={[-.78,.4,.2]} rotation={[-.18,.34,-.5]} scale={[.86,.26,.12]} material={m.energy} geometry={g.box}/>
      <mesh position={[.04,-.78,.08]} rotation={[.42,-.2,.68]} scale={[.92,.28,.12]} material={m.deep} geometry={g.box}/>
      <mesh position={[.84,.32,-.14]} rotation={[-.18,.54,.34]} scale={[.82,.25,.11]} material={m.ice} geometry={g.box}/>
      <mesh position={[-1.28,-.38,.18]} scale={.09} material={m.ice} geometry={g.sphere}/>
      <mesh position={[.08,.8,-.12]} scale={.11} material={m.energy} geometry={g.sphere}/>
      <mesh position={[1.24,.34,.1]} scale={.085} material={m.ice} geometry={g.sphere}/>
    </group>

    <group ref={kairosRef} rotation={[-.3,.56,.05]}>
      <mesh scale={[1.62,1.12,1.12]} material={m.kraft} geometry={g.box}/>
      <lineSegments scale={[1.625,1.125,1.125]} geometry={g.edges} material={m.edge}/>
      <mesh position={[0,0,.575]} scale={[.25,1.125,.025]} material={m.tape} geometry={g.box}/>
      <mesh position={[0,.575,.18]} scale={[.25,.025,.78]} material={m.tape} geometry={g.box}/>
      <mesh position={[.43,-.14,.585]} scale={[.46,.28,.025]} material={m.label} geometry={g.box}/>
      <mesh position={[.43,-.11,.615]} scale={[.26,.028,.01]} material={m.deep} geometry={g.box}/>
    </group>

    <group ref={kalintangRef} rotation={[.02,-.28,-.55]}>
      <mesh position={[.16,.27,0]} scale={[.92,.92,.92]} material={m.meat} geometry={g.drumstick}/>
      <mesh position={[-.55,-.76,.02]} rotation={[0,0,-.03]} scale={[.16,.78,.16]} material={m.bone} geometry={g.cylinder}/>
      <mesh position={[-.66,-1.16,.03]} scale={[.2,.17,.16]} material={m.bone} geometry={g.sphere}/>
      <mesh position={[-.42,-1.18,.03]} scale={[.2,.17,.16]} material={m.bone} geometry={g.sphere}/>
      <mesh position={[.13,.45,.2]} scale={[.32,.42,.08]} material={m.meatLight} geometry={g.sphere}/>
    </group>

    <group ref={sambutRef} rotation={[-.08,.18,.02]}>
      <mesh material={m.med} geometry={g.card}/>
      <mesh position={[0,.8,.01]} scale={[.42,.24,.8]} material={m.silver} geometry={g.smallRounded}/>
      <mesh position={[-.66,.12,.11]} scale={[.12,.42,.08]} material={m.teal} geometry={g.box}/>
      <mesh position={[-.66,.12,.115]} scale={[.42,.12,.08]} material={m.teal} geometry={g.box}/>
      <mesh position={[.48,.25,.12]} scale={[.22,.22,.08]} material={m.deep} geometry={g.sphere}/>
      <mesh position={[.48,-.15,.12]} scale={[.42,.23,.07]} material={m.deep} geometry={g.sphere}/>
      <mesh position={[.02,-.43,.12]} scale={[.36,.045,.035]} material={m.silver} geometry={g.box}/>
      <mesh position={[.55,-.43,.12]} scale={[.3,.045,.035]} material={m.silver} geometry={g.box}/>
    </group>

    <group ref={colorsRef} rotation={[-.08,.18,-.02]}>
      <mesh material={m.camera} geometry={g.cameraBody}/>
      <mesh position={[-.46,.76,.02]} scale={[.72,.34,.9]} material={m.camera} geometry={g.smallRounded}/>
      <mesh position={[.83,.46,.23]} scale={[.28,.16,.08]} material={m.silver} geometry={g.box}/>
      <mesh position={[.08,-.02,.32]} rotation={[Math.PI/2,0,0]} scale={[.82,.34,.82]} material={m.silver} geometry={g.cylinder}/>
      <mesh position={[.08,-.02,.5]} rotation={[Math.PI/2,0,0]} scale={[.61,.24,.61]} material={m.deep} geometry={g.cylinder}/>
      <mesh position={[.08,-.02,.64]} rotation={[Math.PI/2,0,0]} scale={[.38,.12,.38]} material={m.glass} geometry={g.cylinder}/>
      <mesh position={[-.82,.65,.25]} rotation={[Math.PI/2,0,0]} scale={[.09,.1,.09]} material={m.energy} geometry={g.cylinder}/>
    </group>

    <group ref={aetherRef} rotation={[-.28,.46,.08]}>
      <mesh scale={[1.35,1.35,1.35]} material={m.glass} geometry={g.box}/>
      <lineSegments scale={[1.36,1.36,1.36]} geometry={g.edges} material={m.edge}/>
      <mesh position={[.88,.72,.56]} scale={[.36,.36,.36]} material={m.ice} geometry={g.box}/>
      <lineSegments position={[.88,.72,.56]} scale={[.365,.365,.365]} geometry={g.edges} material={m.edge}/>
      <mesh position={[1.05,0,0]} rotation={[0,0,-Math.PI/2]} scale={[.055,1.05,.055]} material={m.xAxis} geometry={g.cylinder}/>
      <mesh position={[2.08,0,0]} rotation={[0,0,-Math.PI/2]} material={m.xAxis} geometry={g.cone}/>
      <mesh position={[0,1.05,0]} scale={[.055,1.05,.055]} material={m.yAxis} geometry={g.cylinder}/>
      <mesh position={[0,2.08,0]} material={m.yAxis} geometry={g.cone}/>
      <mesh position={[0,0,1.05]} rotation={[Math.PI/2,0,0]} scale={[.055,1.05,.055]} material={m.zAxis} geometry={g.cylinder}/>
      <mesh position={[0,0,2.08]} rotation={[Math.PI/2,0,0]} material={m.zAxis} geometry={g.cone}/>
    </group>

    <group ref={naraRef} rotation={[-.24,.18,-.03]}>
      <mesh rotation={[Math.PI/2,0,0]} scale={[1.08,.12,1.08]} material={m.plate} geometry={g.plate}/>
      <mesh position={[0,0,.12]} rotation={[Math.PI/2,0,0]} scale={[.72,.08,.72]} material={m.ice} geometry={g.plate}/>
      <mesh position={[-1.22,-.08,.08]} scale={[.09,.82,.07]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.38,.72,.08]} scale={[.035,.24,.055]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.28,.72,.08]} scale={[.035,.24,.055]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.18,.72,.08]} scale={[.035,.24,.055]} material={m.silver} geometry={g.box}/>
      <mesh position={[-1.08,.72,.08]} scale={[.035,.24,.055]} material={m.silver} geometry={g.box}/>
      <mesh position={[.36,.22,.26]} scale={[.22,.18,.12]} material={m.green} geometry={g.sphere}/>
      <mesh position={[-.18,.34,.25]} scale={[.18,.16,.1]} material={m.food} geometry={g.sphere}/>
      <mesh position={[.08,-.28,.25]} scale={[.2,.16,.11]} material={m.meatLight} geometry={g.sphere}/>
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
    bar:extrude(roundedRectShape(1,.3,.13),.22,.045),
    torus:new THREE.TorusGeometry(.72,.115,20,112),
  }),[]);
  useEffect(()=>()=>{g.bar.dispose();g.torus.dispose();},[g]);
  useEffect(()=>{const timer=window.setInterval(()=>{if(!document.hidden)invalidate();},40);return()=>window.clearInterval(timer);},[invalidate]);

  useFrame(({clock},delta)=>{
    const dx=target.current.x*.16-current.current.x,dy=-target.current.y*.12-current.current.y,alpha=1-Math.exp(-10*delta);
    current.current.x+=dx*alpha;current.current.y+=dy*alpha;
    if(group.current){
      group.current.rotation.x=current.current.y*.55+Math.sin(clock.elapsedTime*.42)*.015;
      group.current.rotation.y=current.current.x*.5+Math.sin(clock.elapsedTime*.36+.5)*.018;
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

  return <group ref={group} scale={.92}>
    <group ref={left} position={[-1.3,0,0]}>
      <mesh position={[-.18,.24,0]} rotation={[0,0,-.62]} scale={[1.18,1,1]} material={m.energy} geometry={g.bar}/>
      <mesh position={[.22,0,0]} rotation={[0,0,Math.PI/2]} scale={[1.55,1,1]} material={m.ice} geometry={g.bar}/>
      <mesh position={[-.08,-.03,.03]} scale={[1.05,1,1]} material={m.deep} geometry={g.bar}/>
    </group>
    <mesh ref={zero} position={[0,0,.02]} material={m.silver} geometry={g.torus}/>
    <group ref={right} position={[1.3,0,0]}>
      <mesh position={[-.18,.24,0]} rotation={[0,0,-.62]} scale={[1.18,1,1]} material={m.energy} geometry={g.bar}/>
      <mesh position={[.22,0,0]} rotation={[0,0,Math.PI/2]} scale={[1.55,1,1]} material={m.ice} geometry={g.bar}/>
      <mesh position={[-.08,-.03,.03]} scale={[1.05,1,1]} material={m.deep} geometry={g.bar}/>
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
