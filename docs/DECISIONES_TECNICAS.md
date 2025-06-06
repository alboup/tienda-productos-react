# 🚀 TiendaProductos - Decisiones Técnicas y Arquitectura

## 📖 Resumen del Proyecto

**TiendaProductos** es una SPA desarrollada en React que presenta un catálogo de productos con funcionalidades de búsqueda, filtrado y detalle. El proyecto consume la API pública de DummyJSON y está optimizado para una experiencia de usuario moderna y fluida.

---

## 🛠️ Stack Tecnológico

### **Frontend Core**
- **React 19** - Biblioteca principal con hooks y componentes funcionales
- **Vite** - Build tool moderno para desarrollo rápido y HMR
- **React Router DOM** - Navegación SPA con rutas dinámicas

### **Estilos y UI**
- **Tailwind CSS** - Framework utility-first para estilos consistentes
- **CSS Custom Properties** - Variables para temas y modo oscuro
- **Glassmorphism** - Efectos visuales modernos con backdrop-filter

### **Comunicación HTTP**
- **Axios** - Cliente HTTP con interceptors y manejo de errores
- **API REST** - Consumo de DummyJSON con endpoints específicos

---

## 🏗️ Arquitectura del Proyecto

### **Estructura de Carpetas**
```
src/
├── components/           # Componentes reutilizables
│   ├── layout/          # Layout y navegación
│   ├── product/         # Componentes específicos de productos
│   └── ui/              # Componentes base (Button, Card, etc.)
├── hooks/               # Custom hooks para lógica de estado
├── pages/               # Páginas principales de la aplicación
├── services/            # Servicios de API y comunicación
├── styles/              # Estilos globales y temas
└── utils/               # Utilidades, formatters y constantes
```

### **Principios Aplicados**
- **Separación de Responsabilidades** - Cada carpeta tiene un propósito específico
- **Componentes Reutilizables** - UI components agnósticos del dominio
- **Custom Hooks** - Encapsulación de lógica de estado compleja
- **Service Layer** - Abstracción de la comunicación con APIs

---

## ⭐ Decisiones Técnicas Clave

### **1. Custom Hooks para Estado Complejo**
```javascript
// useProducts.js - Manejo integral del estado de productos
const useProducts = (initialFilters) => {
  // Estado, paginación, filtros, y efectos unificados
  return { products, loading, error, filters, pagination, actions };
};
```

**Justificación**: Centraliza toda la lógica relacionada con productos, facilita testing y reutilización.

### **2. Debounce en Búsqueda**
```javascript
// useDebounce.js - Optimización de rendimiento
const debouncedSearch = useDebounce(filters.search, 300);
```

**Justificación**: Reduce llamadas innecesarias a la API mejorando rendimiento y UX.

### **3. Componentes UI Genéricos**
```javascript
// ui/Button.jsx - Componente base reutilizable
export const Button = ({ variant, size, loading, children, ...props }) => {
  // Variantes: primary, secondary, outline
  // Tamaños: sm, md, lg
  // Estados: loading, disabled
};
```

**Justificación**: Consistencia visual, mantenibilidad y escalabilidad del design system.

### **4. Modo Oscuro Automático**
```javascript
// Detección automática de preferencias del sistema
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});
```

**Justificación**: Mejora la accesibilidad y se adapta a las preferencias del usuario.

### **5. Error Boundaries y Estados de Carga**
```javascript
// App.jsx - Error Boundary para captura global de errores
class ErrorBoundary extends React.Component {
  // Manejo robusto de errores con UI de recuperación
}
```

**Justificación**: Aplicación resiliente que maneja fallos.

---

## 🎨 Soluciones de Diseño

### **Glassmorphism Effects**
- **Backdrop-filter**: Efectos de desenfoque modernos
- **Transparencias**: Capas visuales con profundidad
- **Bordes sutiles**: Separación visual elegante

### **Sistema de Animaciones**
- **CSS Keyframes**: Animaciones performantes sin JavaScript
- **Stagger Animations**: Efectos secuenciales en grids
- **Hover States**: Micro-interacciones fluidas

### **Responsive Design**
- **Mobile-first**: Diseño adaptativo desde móvil
- **Grid Responsivo**: Auto-fit layout para productos
- **Breakpoints Tailwind**: Sistema consistente de pantallas

### **Accesibilidad**
- **Focus Visible**: Navegación por teclado clara
- **ARIA Labels**: Etiquetas descriptivas para lectores
- **Contraste**: Colores que cumplen WCAG guidelines

---

## 🚀 Optimizaciones de Rendimiento

### **Code Splitting**
```javascript
// vite.config.js - División automática de chunks
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      router: ['react-router-dom'],
      utils: ['axios'],
    },
  },
}
```

### **Lazy Loading de Imágenes**
```javascript
// ProductImage.jsx - Carga diferida con loading states
<img loading="lazy" onLoad={setLoaded} onError={setError} />
```

### **Memoización Estratégica**
```javascript
// ProductGrid.jsx - Prevención de re-renders innecesarios
export const ProductGrid = memo(({ products, loading, error }) => {
  // Solo re-renderiza cuando props cambian
});
```

### **Preconnect a APIs**
```html
<!-- index.html - Optimización de conexiones -->
<link rel="preconnect" href="https://dummyjson.com" />
<link rel="dns-prefetch" href="https://dummyjson.com" />
```

---
