
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
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
import Login from './components/Login';
import Pendulum from './experiments/Pendulum'
import Newton from './experiments/Newton'
import Inclined from './experiments/Inclined'
import Collision from './experiments/collision'
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
          <StarField />
          <Navigation />
          <main className="relative z-10">
            <Routes>
             <Route path="/" element={<Navigate to="/login" replace />} />              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/solar-system" element={ <PrivateRoute><SolarSystem /></PrivateRoute>} />
              <Route path="/travel-planner" element={<PrivateRoute><TravelPlanner /></PrivateRoute>} />
              <Route path="/missions" element={<PrivateRoute><MissionSimulator /></PrivateRoute>} />
              <Route path="/learn" element={<PrivateRoute><Learning /></PrivateRoute>} />
              <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/pendulum" element={<Pendulum />} />
              <Route path="/newton" element={<Newton />} />
              <Route path="/inclined" element={<Inclined/>}/>
              <Route path="/collision" element={<Collision/>}/>
              <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      /> 
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;