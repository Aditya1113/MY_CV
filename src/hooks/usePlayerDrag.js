import { useCallback, useRef, useEffect } from 'react';
import { PATH_POINTS, BUILDING_STOPS } from '../data/pathData';
import { useGame } from '../context/GameContext';

const MAX_P = PATH_POINTS.length - 1;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/* Returns fractional progress (0 … MAX_P) along the path
   by projecting the cursor onto each segment and picking the closest. */
function closestPathProgress(mx, my) {
  let bestDist = Infinity;
  let bestProg = 0;

  for (let i = 0; i < MAX_P; i++) {
    const ax = PATH_POINTS[i].x, ay = PATH_POINTS[i].y;
    const bx = PATH_POINTS[i + 1].x, by = PATH_POINTS[i + 1].y;
    const dx = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    let t = lenSq === 0 ? 0 : ((mx - ax) * dx + (my - ay) * dy) / lenSq;
    t = clamp(t, 0, 1);
    const px = ax + t * dx, py = ay + t * dy;
    const dist = (mx - px) * (mx - px) + (my - py) * (my - py);
    if (dist < bestDist) { bestDist = dist; bestProg = i + t; }
  }

  const last = PATH_POINTS[MAX_P];
  if ((mx - last.x) ** 2 + (my - last.y) ** 2 < bestDist) bestProg = MAX_P;

  return bestProg;
}

/* Interpolate position from fractional progress */
export function posAtProgress(prog) {
  const i = clamp(Math.floor(prog), 0, MAX_P);
  const j = clamp(i + 1, 0, MAX_P);
  const t = clamp(prog - i, 0, 1);
  return {
    x: PATH_POINTS[i].x + (PATH_POINTS[j].x - PATH_POINTS[i].x) * t,
    y: PATH_POINTS[i].y + (PATH_POINTS[j].y - PATH_POINTS[i].y) * t,
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
  const targetRef = useRef(0);
  const progRef = useRef(0);
  const rafRef = useRef(null);
  const touchYRef = useRef(null);

  /* Continuous animation loop — eases prog toward target */
  const loop = useCallback(() => {
    const delta = targetRef.current - progRef.current;

    if (Math.abs(delta) < 0.02) {
      progRef.current = targetRef.current;
    } else {
      progRef.current += delta * 0.14;
    }

    const moving = Math.abs(delta) > 0.012;
    setIsDragging(moving);
    setPlayerPathIndex(progRef.current);

    rafRef.current = requestAnimationFrame(loop);
  }, [setPlayerPathIndex, setIsDragging]);

  /* Start the loop once on mount */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);

  const getPercent = useCallback((clientX, clientY) => {
    if (!worldRef.current) return { x: 0, y: 0 };
    const rect = worldRef.current.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    };
  }, [worldRef]);

  /* --- Drag handlers --- */
  const onStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    draggingRef.current = true;
  }, []);

  const onMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const pct = getPercent(clientX, clientY);
    targetRef.current = closestPathProgress(pct.x, pct.y);
  }, [getPercent]);

  const onEnd = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    return true;
  }, []);

  /* --- Scroll to walk --- */
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const step = (Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * 0.0055;
      targetRef.current = clamp(targetRef.current + step, 0, MAX_P);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  /* --- Touch swipe to walk (when not dragging) --- */
  useEffect(() => {
    const onTouchStart = (e) => {
      if (!draggingRef.current) touchYRef.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (draggingRef.current || touchYRef.current === null) return;
      const dy = touchYRef.current - e.touches[0].clientY;
      touchYRef.current = e.touches[0].clientY;
      targetRef.current = clamp(targetRef.current + dy * 0.02, 0, MAX_P);
    };
    const onTouchEnd = () => { touchYRef.current = null; };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return { onStart, onMove, onEnd };
}
