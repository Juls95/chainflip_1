import React from 'react';
import ReactDOM from 'react-dom/client';  // Nota el cambio aquí
import './output.css'
import App from './App';

// Crea una raíz para el renderizado de la aplicación
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);