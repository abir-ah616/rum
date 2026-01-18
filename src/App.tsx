import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { MusicPage } from './pages/MusicPage';
import { GamesPage } from './pages/GamesPage';

const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
