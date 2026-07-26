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
                {totalXP.toLocaleString()} / 22,000 XP
              </div>
            </div>
          </div>
          <div className="hud-avatar">SM</div>
        </div>
      </div>

      <button className="how-to-play-btn" onClick={() => setShowHelp(true)}>
        <span className="info-icon">!</span> How to Play
      </button>

      <div className="beauty-quote">
        <div className="beauty-quote-heading">What does beauty mean to me?</div>
        <p>While it is often said that beauty lies in the eyes of the beholder, I believe beauty is about making the beholder believe in you. It is the confidence you radiate, the effortless way you carry your style, and how you choose to express yourself through hair and makeup. True beauty is entirely universal: transcending color, size, nationality, and cultural boundaries. A girl from the slums possesses the same inherent beauty as one living in a skyscraper, just as a devoted mother holds the same grace as a woman working relentlessly for her livelihood.</p>
      </div>

      <div className="favourite-quote">
        <div className="beauty-quote-heading">Which is my favourite Loreal product?</div>
        <p>I absolutely love the L'Oréal Absolut Repair shampoo and hair mask; they have completely transformed my routine into a luxurious, at-home spa experience. The rich formulas deeply nourish my hair, feels incredibly soft after every wash. The entire range works together beautifully.</p>
      </div>

      <div className="bottom-hint">
        Drag Swarnima along the golden path &bull; Drop her on buildings to explore
      </div>
    </>
  );
}
