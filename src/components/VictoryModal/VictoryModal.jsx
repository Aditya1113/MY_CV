import { useGame } from '../../context/GameContext';
import './VictoryModal.css';

export default function VictoryModal() {
  const { showVictory, setShowVictory, totalXP } = useGame();

  if (!showVictory) return null;

  return (
    <div className="victory-overlay" onClick={() => setShowVictory(false)}>
      <div className="victory-card" onClick={(e) => e.stopPropagation()}>
        <div className="victory-sparkles">
          <span className="sparkle s1" />
          <span className="sparkle s2" />
          <span className="sparkle s3" />
          <span className="sparkle s4" />
          <span className="sparkle s5" />
          <span className="sparkle s6" />
        </div>

        <div className="victory-trophy">&#127942;</div>
        <h2 className="victory-title">CONGRATULATIONS!</h2>
        <p className="victory-subtitle">All Levels Completed</p>

        <div className="victory-xp-box">
          <div className="victory-xp-label">TOTAL XP EARNED</div>
          <div className="victory-xp-value">{totalXP.toLocaleString()}</div>
          <div className="victory-xp-bar">
            <div className="victory-xp-fill" />
          </div>
          <div className="victory-rank">LEGENDARY TECH-PRODUCT LEADER</div>
        </div>

        <div className="victory-player">
          <div className="victory-avatar">SM</div>
          <div>
            <div className="victory-name">Swarnima Mazumdar</div>
            <div className="victory-class">Software Engineer / Product Strategist</div>
            <div className="victory-guild">MDI Gurgaon &bull; PGDM '26</div>
          </div>
        </div>

        <p className="victory-message">
          You've explored every milestone of Swarnima's journey &mdash; from a perfect 10/10 scholar
          to a Tech-Product leader. But this is just the beginning. There's so much more to come...
        </p>

        <div className="victory-loreal">
          <div className="victory-loreal-brand">L'OR&Eacute;AL</div>
          <div className="victory-tagline">Because she's worth it.</div>
        </div>

        <button className="victory-close-btn" onClick={() => setShowVictory(false)}>
          Continue Exploring
        </button>
      </div>
    </div>
  );
}
