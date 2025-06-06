// src/main.jsx - Mejorado
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/globals.css'

// Configuración inicial para dark mode
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = savedTheme || systemTheme;
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

// Inicializar tema antes de renderizar
initializeTheme();

// Logs de desarrollo
if (import.meta.env.DEV) {
  console.log('🚀 TiendaProductos - Modo Desarrollo');
  console.log('📡 API Base URL:', 'https://dummyjson.com');
  console.log('🎯 Características: Búsqueda, Filtros, Paginación, Detalle de Producto');
  console.log('🌙 Modo Oscuro: Habilitado');
  console.log('✨ Animaciones: CSS & Transitions');
}

// Listener para cambios en preferencias del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const theme = e.matches ? 'dark' : 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)