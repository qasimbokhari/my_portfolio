import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import {shouldSuppressError} from './utils/errorFiltering';
import './index.css';

if (typeof window !== 'undefined') {
  // Suppress third-party iframe and Cal.com cross-origin errors
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    if (shouldSuppressError(message, source)) {
      console.warn('Suppressed benign third-party/iframe script error:', message);
      return true; // Prevent default propagation
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener('error', (event) => {
    if (shouldSuppressError(event.message, event.filename)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    if (shouldSuppressError(event.reason?.message || event.reason)) {
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
