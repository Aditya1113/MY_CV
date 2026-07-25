import { useGame } from '../../context/GameContext';
import { BUILDING_STOPS, PATH_POINTS } from '../../data/pathData';
import './PathStops.css';

export default function PathStops() {
  const { visitedBuildings } = useGame();

  return (
    <>
      {Object.entries(BUILDING_STOPS).map(([id, idx]) => {
        const pt = PATH_POINTS[idx];
        return (
          <div
            key={id}
            className={`path-stop ${visitedBuildings.has(parseInt(id)) ? 'visited' : ''}`}
            style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
          />
        );
      })}
    </>
  );
}
