import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/mobile.css';   // CHANGED: must be LAST so it overrides component CSS


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

