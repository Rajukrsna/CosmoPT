
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { SolarSystem } from './pages/SolarSystem';
import { TravelPlanner } from './pages/TravelPlanner';
import { MissionSimulator } from './pages/MissionSimulator';
import { Learning } from './pages/Learning';
import { News } from './pages/News';
import { Profile } from './pages/Profile';
import { GameProvider } from './context/GameContext';
import { StarField } from './components/StarField';
import Register from './components/Register';
import Login from './components/Login'
function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
          <StarField />
          <Navigation />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/solar-system" element={<SolarSystem />} />
              <Route path="/travel-planner" element={<TravelPlanner />} />
              <Route path="/missions" element={<MissionSimulator />} />
              <Route path="/learn" element={<Learning />} />
              <Route path="/news" element={<News />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;