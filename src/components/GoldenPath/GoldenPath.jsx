import './GoldenPath.css';

// SVG path: goes up-right for buildings 1-6, then curves down-right for 7-9
const PATH_D = [
  'M 100,840',
  'C 200,790 300,720 400,670',   // 1→2
  'C 500,620 550,560 620,520',   // 2→3
  'C 700,480 780,460 860,430',   // 3→4
  'C 940,400 1000,380 1120,350', // 4→5
  'C 1200,320 1250,270 1310,220',// 5→6
  'C 1350,240 1360,300 1380,380',// 6→7 (curves down)
  'C 1400,440 1430,500 1480,580',// 7→8 (continues down)
  'C 1520,640 1560,700 1630,810',// 8→9 (continues down)
].join(' ');

export default function GoldenPath() {
  return (
    <svg
      className="path-svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gRunway" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#6E5518" />
          <stop offset="45%" stopColor="#C8A951" />
          <stop offset="75%" stopColor="#F3E4B8" />
          <stop offset="100%" stopColor="#E2007A" />
        </linearGradient>
        <filter id="fGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Ground shadow */}
      <path
        d={PATH_D}
        fill="none"
        stroke="rgba(0,0,0,.55)"
        strokeWidth="40"
        strokeLinecap="round"
        filter="url(#fGlow)"
        opacity=".7"
      />
      {/* Runway body */}
      <path
        d={PATH_D}
        fill="none"
        stroke="url(#gRunway)"
        strokeWidth="32"
        strokeLinecap="round"
        opacity=".58"
      />
      {/* Inner light line */}
      <path
        d={PATH_D}
        fill="none"
        stroke="url(#gRunway)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#fGlow)"
      />
      {/* Travelling dashes */}
      <path
        className="runway-flow"
        d={PATH_D}
        fill="none"
        stroke="rgba(247,244,239,.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="26 34"
      />
    </svg>
  );
}
