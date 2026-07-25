import { useRef, useEffect, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import usePlayerDrag, { nearestBuildingId } from '../../hooks/usePlayerDrag';
import buildingConfig from '../../data/buildingConfig';
import { BUILDING_STOPS } from '../../data/pathData';
import GoldenPath from '../GoldenPath/GoldenPath';
import PathStops from '../PathStops/PathStops';
import Building from '../Building/Building';
import Player from '../Player/Player';
import Trees from '../Decorations/Trees';
import FerrisWheel from '../Decorations/FerrisWheel';
import Balloons from '../Decorations/Balloons';
import Ponds from '../Decorations/Ponds';
import Flowers from '../Decorations/Flowers';
import './GameWorld.css';

export default function GameWorld() {
  const worldRef = useRef(null);
  const { playerPathIndex, setActiveModal, setPlayerPathIndex } = useGame();
  const { onStart, onMove, onEnd } = usePlayerDrag(worldRef);

  const handleRelease = useCallback(() => {
    const didEnd = onEnd();
    if (!didEnd) return;
    const bid = nearestBuildingId(playerPathIndex);
    if (bid) {
      setPlayerPathIndex(BUILDING_STOPS[bid]);
      setActiveModal(bid);
    }
  }, [onEnd, playerPathIndex, setActiveModal, setPlayerPathIndex]);

  useEffect(() => {
    const move = (e) => onMove(e);
    const up = () => handleRelease();

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [onMove, handleRelease]);

  // Determine which building is near the player
  const nearBuildingId = nearestBuildingId(playerPathIndex);

  return (
    <div id="game-world" ref={worldRef}>
      {/* Atmospheric light beams */}
      <div className="beam b1" />
      <div className="beam b2" />
      <div className="beam b3" />

      <GoldenPath />
      <PathStops />
      <Ponds />
      <Flowers />
      <Trees />
      <FerrisWheel />
      <Balloons />

      {buildingConfig.map((cfg) => (
        <Building
          key={cfg.id}
          config={cfg}
          isNear={nearBuildingId === cfg.id}
        />
      ))}

      <Player onMouseDown={onStart} onTouchStart={onStart} />

      {/* Atmospheric overlays */}
      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}
