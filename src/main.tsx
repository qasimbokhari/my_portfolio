import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  // Suppress third-party iframe and Cal.com cross-origin errors
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msg = String(message).toLowerCase();
    const src = String(source || '').toLowerCase();
    if (
      msg.includes('script error') ||
      msg.includes('blocked a frame with origin') ||
      msg.includes('cross-origin') ||
      src.includes('cal.com') ||
      src.includes('calco')
    ) {
      console.warn('Suppressed benign third-party/iframe script error:', message);
      return true; // Prevent default propagation
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener('error', (event) => {
    const msg = String(event.message || '').toLowerCase();
    const src = String(event.filename || '').toLowerCase();
    if (
      msg.includes('script error') ||
      msg.includes('blocked a frame with origin') ||
      msg.includes('cross-origin') ||
      src.includes('cal.com') ||
      src.includes('calco')
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reason = String(event.reason || event.reason?.message || '').toLowerCase();
    if (
      reason.includes('script error') ||
      reason.includes('blocked a frame with origin') ||
      reason.includes('cross-origin') ||
      reason.includes('cal.com') ||
      reason.includes('calco')
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
