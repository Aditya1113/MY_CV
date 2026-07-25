import './Decorations.css';

const FLOWERS = [
  { left: '12%', top: '68%', size: 8, color: '#E84393' },
  { left: '13%', top: '70%', size: 7, color: 'var(--gold)' },
  { left: '11.5%', top: '71%', size: 6, color: '#0984E3' },
  { left: '55%', top: '38%', size: 8, color: '#E84393' },
  { left: '56%', top: '40%', size: 7, color: '#FFD700' },
  { left: '80%', top: '18%', size: 7, color: 'var(--pink)' },
  { left: '81%', top: '20%', size: 6, color: 'var(--gold)' },
];

export default function Flowers() {
  return (
    <>
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          className="fl"
          style={{ left: f.left, top: f.top, width: f.size, height: f.size, background: f.color }}
        />
      ))}
    </>
  );
}
