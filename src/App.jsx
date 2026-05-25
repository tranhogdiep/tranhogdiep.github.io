import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Lazy load larger components to optimize initial bundle size
const ChickenAR = lazy(() => import('./pages/ChickenAR'));
const DragonAR = lazy(() => import('./pages/DragonAR'));
const Panorama = lazy(() => import('./pages/Panorama'));
const MapDemo = lazy(() => import('./pages/MapDemo'));

const LoadingFallback = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
    color: '#fff',
    fontFamily: 'sans-serif'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #fff',
      borderBottomColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chicken-ar" element={<ChickenAR />} />
          <Route path="/dragon-ar" element={<DragonAR />} />
          <Route path="/panorama" element={<Panorama />} />
          <Route path="/map-demo" element={<MapDemo />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
