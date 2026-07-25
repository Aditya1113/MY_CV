import './Decorations.css';

export default function FerrisWheel() {
  return (
    <div className="ferris-wheel" style={{ left: '1%', top: '42%' }}>
      <div className="fw-ring">
        <div className="fw-spoke" />
        <div className="fw-spoke" />
        <div className="fw-spoke" />
        <div className="fw-cab" />
        <div className="fw-cab" />
        <div className="fw-cab" />
        <div className="fw-cab" />
      </div>
      <div className="fw-pole" />
      <div className="fw-foot" />
    </div>
  );
}
