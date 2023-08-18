import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BiddingsContextProvider from './contexts/BiddingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BiddingsContextProvider>
      <App />
    </BiddingsContextProvider>
  </React.StrictMode>
);