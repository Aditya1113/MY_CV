import { useCallback, useRef } from 'react';
import { PATH_POINTS, BUILDING_STOPS } from '../data/pathData';
import { useGame } from '../context/GameContext';

/* Returns fractional progress (0 … PATH_POINTS.length-1) along the path
   by projecting the cursor onto each segment and picking the closest. */
function closestPathProgress(mx, my) {
  let bestDist = Infinity;
  let bestProg = 0;

  for (let i = 0; i < PATH_POINTS.length - 1; i++) {
    const ax = PATH_POINTS[i].x, ay = PATH_POINTS[i].y;
    const bx = PATH_POINTS[i + 1].x, by = PATH_POINTS[i + 1].y;

    // project point onto segment [A,B]
    const dx = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    let t = lenSq === 0 ? 0 : ((mx - ax) * dx + (my - ay) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const px = ax + t * dx;
    const py = ay + t * dy;
    const dist = (mx - px) * (mx - px) + (my - py) * (my - py);

    if (dist < bestDist) {
      bestDist = dist;
      bestProg = i + t;
    }
  }

  // also check last point
  const last = PATH_POINTS[PATH_POINTS.length - 1];
  const dLast = (mx - last.x) * (mx - last.x) + (my - last.y) * (my - last.y);
  if (dLast < bestDist) {
    bestProg = PATH_POINTS.length - 1;
  }

  return bestProg;
}

/* Interpolate position from fractional progress */
export function posAtProgress(prog) {
  const i = Math.floor(prog);
  const t = prog - i;
  if (i >= PATH_POINTS.length - 1) return PATH_POINTS[PATH_POINTS.length - 1];
  if (i < 0) return PATH_POINTS[0];
  return {
    x: PATH_POINTS[i].x + t * (PATH_POINTS[i + 1].x - PATH_POINTS[i].x),
    y: PATH_POINTS[i].y + t * (PATH_POINTS[i + 1].y - PATH_POINTS[i].y),
  };
}

export function nearestBuildingId(pathProg) {
  const pathIdx = Math.round(pathProg);
  for (const [id, stopIdx] of Object.entries(BUILDING_STOPS)) {
    if (Math.abs(pathIdx - stopIdx) <= 1) return parseInt(id);
  }
  return null;
}

export default function usePlayerDrag(worldRef) {
  const { setPlayerPathIndex, setIsDragging } = useGame();
  const draggingRef = useRef(false);
  const targetProgRef = useRef(0);
  const currentProgRef = useRef(0);
  const rafRef = useRef(null);

  const animate = useCallback(() => {
    const current = currentProgRef.current;
    const target = targetProgRef.current;
    const delta = target - current;

    if (Math.abs(delta) > 0.01) {
      // Ease toward target (lerp factor 0.18 for smooth feel)
      currentProgRef.current = current + delta * 0.18;
      setPlayerPathIndex(currentProgRef.current);
      rafRef.current = requestAnimationFrame(animate);
    } else {
      currentProgRef.current = target;
      setPlayerPathIndex(target);
      rafRef.current = null;
    }
  }, [setPlayerPathIndex]);

  const startAnimation = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

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
    targetProgRef.current = closestPathProgress(pct.x, pct.y);
    startAnimation();
  }, [getPercent, startAnimation]);

  const onEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Snap to final target
    currentProgRef.current = targetProgRef.current;
    setPlayerPathIndex(targetProgRef.current);
    return true;
  }, [setIsDragging, setPlayerPathIndex]);

  return { onStart, onMove, onEnd };
}
