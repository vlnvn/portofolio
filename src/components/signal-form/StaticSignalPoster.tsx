export function StaticSignalPoster() {
  return <svg className="signal-poster" viewBox="0 0 160 120" aria-hidden="true">
    <g className="aperture-rings">
      <ellipse cx="80" cy="60" rx="47" ry="29" transform="rotate(-14 80 60)"/>
      <ellipse cx="80" cy="60" rx="35" ry="42" transform="rotate(38 80 60)"/>
      <path d="M29 78a58 37 0 0 1 96-37"/>
    </g>
    <g className="aperture-blades">
      <path d="M44 34 73 45 62 58 34 47Z"/>
      <path d="m91 40 31 9-8 16-30-10Z"/>
      <path d="m69 72 27 10-9 16-28-12Z"/>
    </g>
    <g className="aperture-nodes">
      {[[28,69],[49,25],[80,30],[112,83],[134,50]].map(([cx,cy],index)=><circle key={index} cx={cx} cy={cy} r={index===2?4.5:3.4}/>)}
    </g>
    <circle className="aperture-core" cx="80" cy="60" r="13"/>
  </svg>;
}