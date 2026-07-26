import './Decorations.css';

// 1. We create a mini-component right here in the same file
function SingleWheel({ left, top }) {
  return (
    <div className="ferris-wheel" style={{ left: left, top: top }}>
      <div className="fw-ring">
        <div className="fw-spoke" />
        <div className="fw-spoke" />
        <div className="fw-spoke" />  
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

// 2. We export your main component, which now renders TWO wheels!
export default function FerrisWheel() {
  return (
    <>
      {/* Original wheel on the left */}
      <SingleWheel left="1%" top="30%" />
      
      {/* New wheel on the top right */}
      <SingleWheel left="85%" top="20%" />
    </>
  );
}