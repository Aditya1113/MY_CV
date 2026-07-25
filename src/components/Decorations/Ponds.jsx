import './Decorations.css';

const PONDS = [
  { left: '38%', top: '44%', width: '8vw', height: '5vw' },
  { left: '72%', top: '18%', width: '5vw', height: '3vw' },
];

export default function Ponds() {
  return (
    <>
      {PONDS.map((p, i) => (
        <div key={i} className="pond" style={p} />
      ))}
    </>
  );
}
