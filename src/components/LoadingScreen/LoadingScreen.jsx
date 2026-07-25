import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import './LoadingScreen.css';

const MESSAGES = [
  'BUILDING CAMPUS...',
  'PLANTING TREES...',
  'PLACING BUILDINGS...',
  'SPAWNING CHARACTER...',
  'READY!',
];

export default function LoadingScreen() {
  const { isLoading, setIsLoading, setShowHelp } = useGame();
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + Math.random() * 22 + 8, 100);
        setMsgIndex(Math.min(Math.floor(next / 25), 4));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setShowHelp(true);
          }, 500);
        }
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [setIsLoading, setShowHelp]);

  return (
    <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
      <div className="load-title">L'OR&Eacute;AL</div>
      <div className="load-sub">BEAUTY METAVERSE</div>
      <div className="load-bar-wrap">
        <div className="load-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="load-msg">{MESSAGES[msgIndex]}</div>
    </div>
  );
}
