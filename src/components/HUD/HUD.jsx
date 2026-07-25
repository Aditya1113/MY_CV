import { useGame } from '../../context/GameContext';
import './HUD.css';

export default function HUD() {
  const { totalXP, maxXP, setShowHelp } = useGame();
  const pct = (totalXP / maxXP) * 100;

  return (
    <>
      <div className="hud-top">
        <div>
          <div className="hud-brand">
            L'OR&Eacute;AL
            <small>Beauty Metaverse Campus</small>
          </div>
        </div>
        <div className="hud-player">
          <div>
            <div className="hud-name">Swarnima Mazumdar</div>
            <div className="hud-xp-row">
              <div className="hud-xp-bar">
                <div className="hud-xp-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="hud-xp-text">
                {totalXP.toLocaleString()} / 21,500 XP
              </div>
            </div>
          </div>
          <div className="hud-avatar">SM</div>
        </div>
      </div>

      <button className="how-to-play-btn" onClick={() => setShowHelp(true)}>
        <span className="info-icon">!</span> How to Play
      </button>

      <div className="bottom-hint">
        Drag Swarnima along the golden path &bull; Drop her on buildings to explore
      </div>
    </>
  );
}
