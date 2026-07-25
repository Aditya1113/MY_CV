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

const DOTS = [
  [200, 790], [400, 670], [620, 520], [860, 430],
  [1120, 350], [1310, 220], [1380, 380], [1480, 580], [1630, 810],
];

export default function GoldenPath() {
  return (
    <svg
      className="path-svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#C8A951' }} />
          <stop offset="100%" style={{ stopColor: '#E84393' }} />
        </linearGradient>
      </defs>
      <path
        d={PATH_D}
        fill="none"
        stroke="url(#pg)"
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d={PATH_D}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="6 14"
      />
      {DOTS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.4)" />
      ))}
    </svg>
  );
}
