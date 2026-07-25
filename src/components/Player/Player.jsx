import { useGame } from '../../context/GameContext';
import { PATH_POINTS } from '../../data/pathData';
import './Player.css';

export default function Player({ onMouseDown, onTouchStart }) {
  const { playerPathIndex, isDragging } = useGame();
  const pt = PATH_POINTS[playerPathIndex];

  return (
    <div
      id="player"
      className={isDragging ? 'walking' : ''}
      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
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
        <div className="chibi-body" />
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
