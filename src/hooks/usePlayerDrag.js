import { useCallback, useRef } from 'react';
import { PATH_POINTS, BUILDING_STOPS } from '../data/pathData';
import { useGame } from '../context/GameContext';

function closestPathIndex(mx, my) {
  let bestDist = Infinity;
  let bestIdx = 0;
  for (let i = 0; i < PATH_POINTS.length; i++) {
    const dx = mx - PATH_POINTS[i].x;
    const dy = my - PATH_POINTS[i].y;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function nearestBuildingId(pathIdx) {
  for (const [id, stopIdx] of Object.entries(BUILDING_STOPS)) {
    if (Math.abs(pathIdx - stopIdx) <= 1) return parseInt(id);
  }
  return null;
}

export default function usePlayerDrag(worldRef) {
  const { setPlayerPathIndex, setIsDragging } = useGame();
  const draggingRef = useRef(false);

  const getPercent = useCallback((clientX, clientY) => {
    if (!worldRef.current) return { x: 0, y: 0 };
    const rect = worldRef.current.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  }, [worldRef]);

  const onStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    draggingRef.current = true;
    setIsDragging(true);
  }, [setIsDragging]);

  const onMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const pct = getPercent(clientX, clientY);
    const idx = closestPathIndex(pct.x, pct.y);
    setPlayerPathIndex(idx);
  }, [getPercent, setPlayerPathIndex]);

  const onEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    return true; // signal that drag ended
  }, [setIsDragging]);

  return { onStart, onMove, onEnd };
}
