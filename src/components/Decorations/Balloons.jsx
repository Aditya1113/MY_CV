import './Decorations.css';

const BALLOON_GROUPS = [
  {
    style: { left: '16%', top: '62%' },
    balloons: [
      { color: '#E84393', left: 0, top: 0 },
      { color: 'var(--gold)', left: 12, top: -6 },
      { color: '#0984E3', left: 24, top: 2 },
      { color: '#00B894', left: 36, top: -4 },
    ],
  },
  {
    style: { left: '78%', top: '10%', animationDelay: '1.5s' },
    balloons: [
      { color: 'var(--gold)', left: 0, top: 0 },
      { color: '#E84393', left: 10, top: -5 },
    ],
  },
];

export default function Balloons() {
  return (
    <>
      {BALLOON_GROUPS.map((group, gi) => (
        <div key={gi} className="balloons" style={group.style}>
          {group.balloons.map((b, bi) => (
            <div
              key={bi}
              className="balloon"
              style={{ background: b.color, width: 14, height: 18, left: b.left, top: b.top }}
            />
          ))}
        </div>
      ))}
    </>
  );
}
