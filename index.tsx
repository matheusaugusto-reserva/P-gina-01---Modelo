
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Erro: Elemento root não encontrado.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Erro ao renderizar App:", err);
    rootElement.innerHTML = "<div style='color: white; text-align: center; padding-top: 50px;'>Erro ao carregar a página. Verifique o console.</div>";
  }
}
