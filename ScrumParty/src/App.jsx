import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Setup from './pages/Setup';
import Game from './pages/Game';
import Results from './pages/Results';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/game" element={<Game />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
