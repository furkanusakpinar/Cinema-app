import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import TVDetails from './pages/TVDetails';
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Series from './pages/Series';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<TVDetails />} />
            <Route path="/search" element={
              <div className="container" style={{ paddingTop: '120px' }}>
                <h2 className="section-title">Arama Sonuçları</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Bu özellik yakında aktif edilecektir.</p>
              </div>
            } />
          </Routes>
        </main>
        <footer style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <p>&copy; 2024 LECINEMA. Tüm hakları saklıdır.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>TMDb API kullanılarak geliştirilmiştir.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
