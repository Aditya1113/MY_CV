import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { MAX_XP } from '../data/pathData';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [totalXP, setTotalXP] = useState(0);
  const [visitedBuildings, setVisitedBuildings] = useState(new Set());
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [playerPathIndex, setPlayerPathIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showVictory, setShowVictory] = useState(false);
  const allCompletedRef = useRef(false);

  const visitBuilding = useCallback((id, xp) => {
    if (visitedBuildings.has(id)) return false;
    const updated = new Set(visitedBuildings).add(id);
    setVisitedBuildings(updated);
    setTotalXP(prev => prev + xp);
    if (updated.size === 10) {
      allCompletedRef.current = true;
    }
    return true;
  }, [visitedBuildings]);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    if (allCompletedRef.current) {
      allCompletedRef.current = false;
      setTimeout(() => setShowVictory(true), 800);
    }
  }, []);

  const showToast = useCallback((icon, text, sub) => {
    setToast({ icon, text, sub });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const value = {
    totalXP,
    maxXP: MAX_XP,
    visitedBuildings,
    visitBuilding,
    activeModal,
    setActiveModal,
    closeModal,
    toast,
    showToast,
    playerPathIndex,
    setPlayerPathIndex,
    isDragging,
    setIsDragging,
    showHelp,
    setShowHelp,
    isLoading,
    setIsLoading,
    showVictory,
    setShowVictory,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
