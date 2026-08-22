import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Handle benign ResizeObserver loop notices in browser
if (typeof window !== 'undefined') {
  const originalErrorHandler = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    if (
      typeof message === 'string' &&
      (message.includes('ResizeObserver loop completed with undelivered notifications') ||
       message.includes('ResizeObserver loop limit exceeded'))
    ) {
      return true;
    }
    if (originalErrorHandler) {
      return originalErrorHandler.apply(this, [message, source, lineno, colno, error]);
    }
    return false;
  };

  window.addEventListener('error', (e) => {
    const msg = e.message || e.error?.message || '';
    if (
      typeof msg === 'string' &&
      (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
       msg.includes('ResizeObserver loop limit exceeded'))
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
