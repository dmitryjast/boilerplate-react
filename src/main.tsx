import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { CookieConsentProvider } from './context/CookieConsentContext.tsx';
import "./assets/styles/main.scss";
import "./assets/styles/zeroing.scss";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CookieConsentProvider>
        <App />
      </CookieConsentProvider>
    </AuthProvider>
  </StrictMode>,
)
