export type ApertureRigState = {
  rings: { radius:number; tube:number; arc:number; position:[number,number,number]; rotation:[number,number,number] }[];
  blades: { position:[number,number,number]; rotation:[number,number,number]; scale:[number,number,number] }[];
  nodes: [number,number,number][];
};

export const apertureRigState:ApertureRigState={
  rings:[
    {radius:1.2,tube:.035,arc:Math.PI*2,position:[0,0,.04],rotation:[1.13,.2,.18]},
    {radius:.82,tube:.048,arc:Math.PI*2,position:[.05,-.02,.34],rotation:[.72,-.48,-.32]},
    {radius:1.48,tube:.026,arc:Math.PI*1.48,position:[-.04,.08,-.34],rotation:[1.42,.5,.74]},
  ],
  blades:[
    {position:[-1.08,.5,.48],rotation:[-.32,.58,-.5],scale:[.92,.34,.11]},
    {position:[.18,-1.02,.06],rotation:[.48,-.34,.72],scale:[1.02,.36,.11]},
    {position:[1.1,.42,-.18],rotation:[-.2,.7,.4],scale:[.88,.32,.11]},
  ],
  nodes:[[-1.5,-.46,.18],[-.7,1.15,.5],[.1,.76,-.22],[.82,-.76,.66],[1.48,.38,.12]],
};