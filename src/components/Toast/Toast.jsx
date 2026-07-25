import { useGame } from '../../context/GameContext';
import './Toast.css';

export default function Toast() {
  const { toast } = useGame();

  return (
    <div className={`toast ${toast ? 'show' : ''}`}>
      <span className="toast-icon">{toast?.icon}</span>
      <div>
        <div className="toast-text">{toast?.text}</div>
        <div className="toast-sub">{toast?.sub}</div>
      </div>
    </div>
  );
}
