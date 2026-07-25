import { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import './HelpModal.css';

const HELP_ITEMS = [
  { icon: '\u{1F6B6}', title: 'Drag Swarnima', desc: 'along the golden path. She can only move on the path!' },
  { icon: '\u{1F3E2}', title: 'Drop on a building', desc: 'to unlock it and view achievements, stats, and XP.' },
  { icon: '\u{1F4C8}', title: 'Collect XP', desc: 'by visiting all 9 buildings to reach 21,500 XP Legendary status!' },
  { icon: '\u{1F31F}', title: 'Follow the path', desc: 'from Level 1 (bottom-left) to discover Swarnima\'s full journey!' },
];

export default function HelpModal() {
  const { showHelp, setShowHelp } = useGame();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowHelp(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setShowHelp]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setShowHelp(false);
  };

  return (
    <div className={`help-modal ${showHelp ? 'active' : ''}`} onClick={handleOverlayClick}>
      <div className="help-card">
        <div className="help-title">{'\u{1F3AE}'} How to Play</div>
        {HELP_ITEMS.map((item, i) => (
          <div key={i} className="help-item">
            <span className="help-icon">{item.icon}</span>
            <div className="help-text">
              <strong>{item.title}</strong> {item.desc}
            </div>
          </div>
        ))}
        <button className="help-close-btn" onClick={() => setShowHelp(false)}>
          Got it! Let's explore!
        </button>
      </div>
    </div>
  );
}
