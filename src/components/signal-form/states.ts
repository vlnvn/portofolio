export type ApertureRigState = {
  rings: { radius:number; tube:number; arc:number; position:[number,number,number]; rotation:[number,number,number] }[];
  blades: { position:[number,number,number]; rotation:[number,number,number]; scale:[number,number,number] }[];
  nodes: [number,number,number][];
};

export const apertureRigState:ApertureRigState={
  rings:[
    {radius:1.16,tube:.03,arc:Math.PI*2,position:[-.02,.02,.08],rotation:[1.06,.28,.1]},
    {radius:.82,tube:.045,arc:Math.PI*2,position:[.08,-.05,.36],rotation:[.62,-.54,-.28]},
    {radius:1.48,tube:.024,arc:Math.PI*1.66,position:[-.08,.07,-.3],rotation:[1.38,.58,.72]},
  ],
  blades:[
    {position:[-.92,.46,.4],rotation:[.7,.18,.92],scale:[.52,.94,.42]},
    {position:[.08,-.94,.08],rotation:[.34,-.46,-.18],scale:[.46,1.02,.38]},
    {position:[.96,.34,-.2],rotation:[-.58,.52,-.9],scale:[.5,.9,.4]},
  ],
  nodes:[[-1.42,-.5,.2],[-.64,1.12,.54],[.08,.7,-.26],[.78,-.74,.7],[1.42,.4,.14]],
};