export type HeroSignalState = {
  ribbon: [number, number, number][];
  slabs: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }[];
  nodes: [number, number, number][];
};

export const heroSignalState: HeroSignalState = {
  ribbon: [[-2.9,-.24,-.35],[-1.55,.72,.28],[-.2,-.3,.62],[1.25,.12,-.12],[2.85,.62,.3]],
  slabs: [
    { position:[-1.65,.34,.55], rotation:[-.38,.52,-.24], scale:[1.15,.42,.12] },
    { position:[.08,-.52,-.15], rotation:[.34,-.44,.36], scale:[1.08,.4,.12] },
    { position:[1.72,.42,.38], rotation:[-.26,.62,-.2], scale:[1.02,.38,.12] },
  ],
  nodes: [[-2.45,-.02,.18],[-1.18,.54,.68],[.04,-.22,.78],[1.18,.18,-.02],[2.42,.54,.5]],
};