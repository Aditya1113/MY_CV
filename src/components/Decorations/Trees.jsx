import './Decorations.css';

const TREES = [
  // Left side (near buildings 1-2)
  { left: '3%', top: '60%', w: 40, h: 40 },
  { left: '7%', top: '65%', w: 35, h: 35 },
  { left: '15%', top: '54%', w: 45, h: 45 },
  { left: '5%', top: '88%', w: 50, h: 50 },
  { left: '18%', top: '82%', w: 36, h: 36 },
  // Mid-left (near buildings 3-4)
  { left: '22%', top: '50%', w: 32, h: 32 },
  { left: '28%', top: '42%', w: 42, h: 42 },
  { left: '35%', top: '36%', w: 38, h: 38 },
  { left: '42%', top: '30%', w: 48, h: 48 },
  // Center (near building 5)
  { left: '50%', top: '26%', w: 36, h: 36 },
  { left: '58%', top: '22%', w: 44, h: 44 },
  { left: '48%', top: '55%', w: 28, h: 28 },
  // Top-right (near building 6)
  { left: '63%', top: '12%', w: 30, h: 30 },
  { left: '72%', top: '10%', w: 40, h: 40 },
  { left: '76%', top: '18%', w: 34, h: 34 },
  // Right side going down (near buildings 7-8)
  { left: '68%', top: '30%', w: 36, h: 36 },
  { left: '76%', top: '42%', w: 42, h: 42 },
  { left: '82%', top: '48%', w: 32, h: 32 },
  { left: '74%', top: '60%', w: 38, h: 38 },
  // Bottom-right (near building 9)
  { left: '82%', top: '66%', w: 34, h: 34 },
  { left: '90%', top: '70%', w: 46, h: 46 },
  { left: '92%', top: '82%', w: 40, h: 40 },
  { left: '88%', top: '58%', w: 28, h: 28 },
];

export default function Trees() {
  return (
    <>
      {TREES.map((t, i) => (
        <div key={i} className="tree" style={{ left: t.left, top: t.top }}>
          <div className="tree-crown" style={{ width: t.w, height: t.h }} />
          <div
            className="tree-trunk-css"
            style={{ width: Math.max(4, t.w * 0.15), height: Math.max(7, t.w * 0.25) }}
          />
        </div>
      ))}
    </>
  );
}
