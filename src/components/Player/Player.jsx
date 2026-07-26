import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { posAtProgress } from '../../hooks/usePlayerDrag';
import './Player.css';

export default function Player() {
  // Pulling the setter from your context to update the path on scroll
  const { playerPathIndex, setPlayerPathIndex } = useGame();
  const pt = posAtProgress(playerPathIndex);
  
  // Local state to handle the walking animation and flip direction
  const [isWalking, setIsWalking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let walkTimeout;

    const handleScroll = (e) => {
      // Determines scroll direction (down = forward, up = backward)
      const scrollDirection = e.deltaY > 0 ? 1 : -1;
      const stepSpeed = 1; // Adjust this to make scrolling faster or slower
      const maxPathIndex = 54; // Adjust to match your PATH_POINTS length minus 1

      setPlayerPathIndex((prev) => {
        const nextIndex = Math.max(0, Math.min(maxPathIndex, prev + (scrollDirection * stepSpeed)));
        
        // Flip the character based on movement direction
        if (nextIndex > prev) setIsFlipped(false);
        if (nextIndex < prev) setIsFlipped(true);
        
        return nextIndex;
      });

      // Trigger the walking animation
      setIsWalking(true);
      
      // Stop the walking animation shortly after the user stops scrolling
      clearTimeout(walkTimeout);
      walkTimeout = setTimeout(() => {
        setIsWalking(false);
      }, 150); 
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(walkTimeout);
    };
  }, [setPlayerPathIndex]);

  return (
    <div
      id="player"
      className={`${isWalking ? 'walking' : ''} ${isFlipped ? 'flip' : ''}`}
      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
    >
      <div className="chibi">
        <div className="chibi-head">
          <div className="chibi-hair" />
          <div className="chibi-eyes">
            <div className="chibi-eye" />
            <div className="chibi-eye" />
          </div>
          <div className="chibi-blush l" />
          <div className="chibi-blush r" />
          <div className="chibi-mouth" />
        </div>
        
        <div className="chibi-body">
          {/* Arms added here for better swing animation */}
          <div className="chibi-arm left" />
          <div className="chibi-arm right" />
        </div>
        
        <div className="chibi-legs">
          <div className="chibi-leg" />
          <div className="chibi-leg" />
        </div>
        <div className="chibi-shadow" />
      </div>
      <div className="player-nametag">Swarnima</div>
    </div>
  );
}