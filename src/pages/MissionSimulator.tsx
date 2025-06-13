import React, { useState } from 'react';
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

const missions: Mission[] = [
  {
    id: 'mars-landing',
    title: 'Mars Landing Mission',
    description: 'Navigate the challenges of landing on the Red Planet',
    difficulty: 'Hard',
    duration: '15 min',
    objective: 'Successfully land a rover on Mars and begin exploration',
    scenarios: [
      {
        id: 'approach',
        situation: 'Your spacecraft is approaching Mars. The entry, descent, and landing (EDL) phase is critical. What\'s your first priority?',
        options: [
          {
            text: 'Check heat shield integrity',
            outcome: 'continue',
            points: 20,
            nextScenario: 'descent',
            result: 'Heat shield is functioning perfectly. Proceeding to descent phase.'
          },
          {
            text: 'Deploy parachutes immediately',
            outcome: 'failure',
            points: -10,
            result: 'Too early! The parachutes deploy in the thin atmosphere and tear. Mission failed.'
          },
          {
            text: 'Fire retro rockets',
            outcome: 'failure',
            points: -10,
            result: 'Wrong sequence! Firing rockets too early wastes fuel. Mission failed.'
          }
        ]
      },
      {
        id: 'descent',
        situation: 'Descent is going well. Your altimeter shows 10km altitude. The parachute deployment window is approaching.',
        options: [
          {
            text: 'Deploy parachute at 8km altitude',
            outcome: 'continue',
            points: 25,
            nextScenario: 'landing',
            result: 'Perfect timing! Parachutes deploy successfully, slowing descent.'
          },
          {
            text: 'Wait until 5km altitude',
            outcome: 'failure',
            points: -15,
            result: 'Too late! Not enough time for parachutes to slow the descent. Crash landing.'
          },
          {
            text: 'Deploy immediately',
            outcome: 'continue',
            points: 10,
            nextScenario: 'landing',
            result: 'A bit early, but manageable. Parachutes slow descent adequately.'
          }
        ]
      },
      {
        id: 'landing',
        situation: 'Final approach! You\'re 500m above the surface. The sky crane system is ready for the final landing sequence.',
        options: [
          {
            text: 'Activate sky crane and lower rover',
            outcome: 'success',
            points: 50,
            result: 'Perfect execution! The rover touches down safely on Mars. Mission accomplished!'
          },
          {
            text: 'Land directly without sky crane',
            outcome: 'failure',
            points: -20,
            result: 'The rover is damaged on impact. Landing failed.'
          },
          {
            text: 'Deploy additional parachutes',
            outcome: 'failure',
            points: -10,
            result: 'No additional parachutes available at this altitude. Hard landing damages rover.'
          }
        ]
      }
    ]
  },
  {
    id: 'iss-docking',
    title: 'ISS Docking Procedure',
    description: 'Successfully dock your spacecraft with the International Space Station',
    difficulty: 'Medium',
    duration: '10 min',
    objective: 'Complete a safe docking maneuver with the ISS',
    scenarios: [
      {
        id: 'approach',
        situation: 'You\'re 200 meters from the ISS. The docking port is aligned. What\'s your approach strategy?',
        options: [
          {
            text: 'Slow, controlled approach at 0.1 m/s',
            outcome: 'continue',
            points: 30,
            nextScenario: 'alignment',
            result: 'Excellent approach speed. Maintaining perfect control.'
          },
          {
            text: 'Fast approach at 1 m/s',
            outcome: 'failure',
            points: -20,
            result: 'Too fast! Risk of collision. Docking aborted for safety.'
          },
          {
            text: 'Stop and wait',
            outcome: 'continue',
            points: 10,
            nextScenario: 'alignment',
            result: 'Cautious approach. You can proceed when ready.'
          }
        ]
      },
      {
        id: 'alignment',
        situation: 'You\'re 50 meters away. The docking mechanism needs perfect alignment. Small thruster corrections are needed.',
        options: [
          {
            text: 'Make precise thruster adjustments',
            outcome: 'success',
            points: 40,
            result: 'Perfect docking! The crew aboard the ISS welcomes you. Mission successful!'
          },
          {
            text: 'Rely on automated systems only',
            outcome: 'continue',
            points: 20,
            result: 'Automation works but requires manual override for final approach.'
          },
          {
            text: 'Make large corrections quickly',
            outcome: 'failure',
            points: -15,
            result: 'Over-correction causes misalignment. Docking procedure failed.'
          }
        ]
      }
    ]
  },
  {
    id: 'asteroid-mining',
    title: 'Asteroid Mining Operation',
    description: 'Extract valuable resources from a near-Earth asteroid',
    difficulty: 'Easy',
    duration: '8 min',
    objective: 'Successfully establish a mining operation on asteroid Bennu',
    scenarios: [
      {
        id: 'approach',
        situation: 'You\'ve reached asteroid Bennu. Its low gravity requires careful maneuvering. How do you begin the mining operation?',
        options: [
          {
            text: 'Map the surface first',
            outcome: 'continue',
            points: 25,
            nextScenario: 'mining',
            result: 'Smart choice! Surface mapping reveals the best mining locations.'
          },
          {
            text: 'Start mining immediately',
            outcome: 'continue',
            points: 10,
            nextScenario: 'mining',
            result: 'You begin mining but without optimal site selection.'
          },
          {
            text: 'Establish orbit first',
            outcome: 'continue',
            points: 15,
            nextScenario: 'mining',
            result: 'Stable orbit established. Ready for mining operations.'
          }
        ]
      },
      {
        id: 'mining',
        situation: 'Mining operations are underway. You\'ve collected valuable platinum samples. How do you secure the cargo?',
        options: [
          {
            text: 'Use magnetic containment',
            outcome: 'success',
            points: 35,
            result: 'Excellent! Platinum secured safely. Mining operation successful!'
          },
          {
            text: 'Store in regular containers',
            outcome: 'success',
            points: 20,
            result: 'Adequate storage. Some material lost but mission successful.'
          },
          {
            text: 'Process on-site',
            outcome: 'success',
            points: 40,
            result: 'Advanced processing yields higher quality materials. Outstanding success!'
          }
        ]
      }
    ]
  }
];

export const MissionSimulator: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [currentScenario, setCurrentScenario] = useState<string>('');
  const [missionStatus, setMissionStatus] = useState<'active' | 'success' | 'failed' | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lastResult, setLastResult] = useState<string>('');
  const { addPoints, unlockAchievement } = useGame();

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
            {missions.map((mission) => (
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