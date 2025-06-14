import React, { useState, useEffect } from 'react';
import { Rocket, Clock, MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  objective: string;
  scenarios: Scenario[];
}

interface Scenario {
  id: string;
  situation: string;
  options: Option[];
}

interface Option {
  text: string;
  outcome: 'success' | 'failure' | 'continue';
  points: number;
  nextScenario?: string;
  result?: string;
}



export const MissionSimulator: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [currentScenario, setCurrentScenario] = useState<string>('');
  const [missionStatus, setMissionStatus] = useState<'active' | 'success' | 'failed' | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lastResult, setLastResult] = useState<string>('');
  const { addPoints, unlockAchievement,fetchMission } = useGame();
  const [missions ,setMission] = useState <Mission[]| null> (null);
  useEffect(()=>{
     setMission(fetchMission)
  },[fetchMission])
  const startMission = (mission: Mission) => {
    setSelectedMission(mission);
    setCurrentScenario(mission.scenarios[0].id);
    setMissionStatus('active');
    setTotalPoints(0);
    setLastResult('');
  };

  const handleChoice = (option: Option) => {
    const newTotal = totalPoints + option.points;
    setTotalPoints(newTotal);
    setLastResult(option.result || '');

    if (option.outcome === 'success') {
      setMissionStatus('success');
      addPoints(newTotal + 50); // Bonus for completion
      unlockAchievement('mission-commander');
    } else if (option.outcome === 'failure') {
      setMissionStatus('failed');
      addPoints(Math.max(0, newTotal)); // Don't add negative points
    } else if (option.nextScenario) {
      setCurrentScenario(option.nextScenario);
    }
  };

  const resetMission = () => {
    setSelectedMission(null);
    setCurrentScenario('');
    setMissionStatus(null);
    setTotalPoints(0);
    setLastResult('');
  };

  const getCurrentScenario = () => {
    if (!selectedMission) return null;
    return selectedMission.scenarios.find(s => s.id === currentScenario);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Hard': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  if (!selectedMission) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Space Mission Simulator
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience real space missions through interactive simulations. Make critical decisions and see if you have what it takes to be a mission commander!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions?.map((mission) => (
              <div
                key={mission.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Rocket className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                    {mission.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {mission.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {mission.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{mission.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{mission.scenarios.length} scenarios</span>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 mb-6">
                  <p className="text-sm text-purple-300 font-medium mb-1">Mission Objective:</p>
                  <p className="text-sm text-gray-300">{mission.objective}</p>
                </div>
                
                <button
                  onClick={() => startMission(mission)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
                >
                  Start Mission
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const scenario = getCurrentScenario();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Mission Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Rocket className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedMission.title}</h1>
                <p className="text-gray-400">{selectedMission.objective}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400 font-bold text-lg">{totalPoints}</span>
                <span className="text-gray-400 text-sm">points</span>
              </div>
              <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getDifficultyColor(selectedMission.difficulty)}`}>
                {selectedMission.difficulty}
              </span>
            </div>
          </div>
          
          {missionStatus && (
            <div className={`p-4 rounded-lg ${
              missionStatus === 'success' 
                ? 'bg-green-600/20 border border-green-500/30' 
                : missionStatus === 'failed'
                ? 'bg-red-600/20 border border-red-500/30'
                : 'bg-blue-600/20 border border-blue-500/30'
            }`}>
              <div className="flex items-center space-x-2">
                {missionStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : missionStatus === 'failed' ? (
                  <XCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                )}
                <span className={`font-medium ${
                  missionStatus === 'success' ? 'text-green-400' : 
                  missionStatus === 'failed' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {missionStatus === 'success' ? 'Mission Successful!' : 
                   missionStatus === 'failed' ? 'Mission Failed' : 'Mission Active'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scenario Display */}
        {scenario && missionStatus === 'active' && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Mission Scenario</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {scenario.situation}
            </p>
            
            <div className="space-y-4">
              {scenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(option)}
                  className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white group-hover:text-purple-300 transition-colors">
                      {option.text}
                    </span>
                    <span className="text-sm text-gray-400">
                      {option.points > 0 ? `+${option.points}` : option.points} pts
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Display */}
        {lastResult && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-purple-300 mb-3">Result</h3>
            <p className="text-gray-300 leading-relaxed">
              {lastResult}
            </p>
          </div>
        )}

        {/* Mission Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetMission}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors duration-200"
          >
            Return to Missions
          </button>
          
          {missionStatus === 'success' && (
            <div className="flex items-center space-x-2 bg-green-600/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Mission Commander achievement unlocked!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};