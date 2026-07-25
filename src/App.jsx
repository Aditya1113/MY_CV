import { GameProvider } from './context/GameContext';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import HUD from './components/HUD/HUD';
import GameWorld from './components/GameWorld/GameWorld';
import Modal from './components/Modal/Modal';
import HelpModal from './components/HelpModal/HelpModal';
import Toast from './components/Toast/Toast';
import VictoryModal from './components/VictoryModal/VictoryModal';

export default function App() {
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
