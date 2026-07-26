import { useEffect } from 'react';
import { GameProvider } from './context/GameContext';
import { initAudio } from '../src/sfx/sfx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HUD from './components/HUD/HUD';
import GameWorld from './components/GameWorld/GameWorld';
import Modal from './components/Modal/Modal';
import HelpModal from './components/HelpModal/HelpModal';
import Toast from './components/Toast/Toast';
import VictoryModal from './components/VictoryModal/VictoryModal';

export default function App() {
  // Wakes the AudioContext on the user's first click or keypress. Browsers keep
  // it suspended until then, so without this the first chime is dropped.
  // initAudio returns its own cleanup function, so returning it directly is enough.
  useEffect(() => initAudio(), []);

  return (
    <GameProvider>
      <LoadingScreen />
      <Toast />
      <HUD />
      <GameWorld />
      <Modal />
      <HelpModal />
      <VictoryModal />
    </GameProvider>
  );
}
