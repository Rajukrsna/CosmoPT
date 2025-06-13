import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface Planet {
  id: string;
  name: string;
  distance: number; // AU from sun
  size: number; // relative size for display
  color: string;
  info: {
    diameter: string;
    mass: string;
    temperature: string;
    moons: number;
    dayLength: string;
    yearLength: string;
    description: string;
  };
}

const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    distance: 0.39,
    size: 20,
    color: 'bg-gray-400',
    info: {
      diameter: '4,879 km',
      mass: '3.3011 × 10²³ kg',
      temperature: '-173°C to 427°C',
      moons: 0,
      dayLength: '58.6 Earth days',
      yearLength: '88 Earth days',
      description: 'The smallest planet in our solar system and closest to the Sun. Mercury has extreme temperature variations.'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    distance: 0.72,
    size: 24,
    color: 'bg-yellow-500',
    info: {
      diameter: '12,104 km',
      mass: '4.8675 × 10²⁴ kg',
      temperature: '462°C',
      moons: 0,
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
      description: 'The hottest planet in our solar system with a thick, toxic atmosphere. Often called Earth\'s twin due to similar size.'
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    distance: 1.0,
    size: 26,
    color: 'bg-blue-500',
    info: {
      diameter: '12,756 km',
      mass: '5.9724 × 10²⁴ kg',
      temperature: '-88°C to 58°C',
      moons: 1,
      dayLength: '24 hours',
      yearLength: '365.25 days',
      description: 'Our home planet, the only known planet to harbor life. 71% of its surface is covered by water.'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    distance: 1.52,
    size: 22,
    color: 'bg-red-500',
    info: {
      diameter: '6,779 km',
      mass: '6.4171 × 10²³ kg',
      temperature: '-87°C to -5°C',
      moons: 2,
      dayLength: '24.6 hours',
      yearLength: '687 Earth days',
      description: 'The Red Planet, named for its rusty color. Mars has the largest volcano in the solar system, Olympus Mons.'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    distance: 5.2,
    size: 60,
    color: 'bg-orange-400',
    info: {
      diameter: '139,820 km',
      mass: '1.8982 × 10²⁷ kg',
      temperature: '-108°C',
      moons: 95,
      dayLength: '9.9 hours',
      yearLength: '12 Earth years',
      description: 'The largest planet in our solar system. Jupiter is a gas giant with a Great Red Spot storm larger than Earth.'
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    distance: 9.5,
    size: 52,
    color: 'bg-yellow-300',
    info: {
      diameter: '116,460 km',
      mass: '5.6834 × 10²⁶ kg',
      temperature: '-139°C',
      moons: 146,
      dayLength: '10.7 hours',
      yearLength: '29 Earth years',
      description: 'Famous for its prominent ring system. Saturn is less dense than water and would float if placed in a large enough ocean.'
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    distance: 19.2,
    size: 36,
    color: 'bg-cyan-400',
    info: {
      diameter: '50,724 km',
      mass: '8.6810 × 10²⁵ kg',
      temperature: '-197°C',
      moons: 27,
      dayLength: '17.2 hours',
      yearLength: '84 Earth years',
      description: 'An ice giant that rotates on its side. Uranus has a unique tilted magnetic field and faint rings.'
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    distance: 30.1,
    size: 34,
    color: 'bg-blue-600',
    info: {
      diameter: '49,244 km',
      mass: '1.0243 × 10²⁶ kg',
      temperature: '-201°C',
      moons: 16,
      dayLength: '16.1 hours',
      yearLength: '165 Earth years',
      description: 'The windiest planet with speeds up to 2,100 km/h. Neptune takes 165 Earth years to orbit the Sun once.'
    }
  }
];

export const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const { visitPlanet, addPoints } = useGame();

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    visitPlanet(planet.id);
    addPoints(10);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Interactive Solar System
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Click on any planet to learn fascinating facts and earn exploration points!
          </p>
        </div>

        {/* Solar System Display */}
        <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-x-auto">
          <div className="flex items-center justify-center min-w-[1200px] h-96 relative">
            {/* Sun */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <p className="text-center text-sm text-yellow-400 mt-2 font-medium">Sun</p>
            </div>

            {/* Planets */}
            {planets.map((planet, index) => (
              <div
                key={planet.id}
                className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer group"
                style={{ 
                  left: `${120 + planet.distance * 140}px`,
                  animation: `orbit-${index} ${20 + planet.distance * 5}s linear infinite`,
                }}
                onClick={() => handlePlanetClick(planet)}
              >
                <div
                  className={`${planet.color} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 relative`}
                  style={{ 
                    width: `${planet.size}px`,
                    height: `${planet.size}px`,
                  }}
                >
                  {planet.id === 'saturn' && (
                    <div className="absolute inset-0 border-2 border-yellow-300 rounded-full opacity-70" style={{ transform: 'scale(1.5)' }} />
                  )}
                </div>
                <p className="text-center text-xs text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  {planet.name}
                </p>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Click to explore
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              🌟 Tip: Planets are animated in their orbital paths. Click any planet to learn more!
            </p>
          </div>
        </div>

        {/* Planet Information Modal */}
        {selectedPlanet && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800/90 backdrop-blur border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800/95 backdrop-blur p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`${selectedPlanet.color} rounded-full`}
                      style={{ 
                        width: `${selectedPlanet.size}px`,
                        height: `${selectedPlanet.size}px`,
                      }}
                    />
                    <h2 className="text-3xl font-bold text-white">{selectedPlanet.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedPlanet(null)}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedPlanet.info.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-purple-400 font-semibold mb-2">Physical Properties</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Diameter:</span>
                          <span className="text-white">{selectedPlanet.info.diameter}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Mass:</span>
                          <span className="text-white">{selectedPlanet.info.mass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Temperature:</span>
                          <span className="text-white">{selectedPlanet.info.temperature}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-blue-400 font-semibold mb-2">Orbital Properties</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Day Length:</span>
                          <span className="text-white">{selectedPlanet.info.dayLength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Year Length:</span>
                          <span className="text-white">{selectedPlanet.info.yearLength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Moons:</span>
                          <span className="text-white">{selectedPlanet.info.moons}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-green-600/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg">
                    <Info className="h-4 w-4" />
                    <span className="text-sm font-medium">+10 points earned for exploration!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for orbital animations */}
      <style jsx>{`
        @keyframes orbit-0 {
          from { transform: translateY(-50%) rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(140px) rotate(-360deg); }
        }
        @keyframes orbit-1 {
          from { transform: translateY(-50%) rotate(0deg) translateX(180px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes orbit-2 {
          from { transform: translateY(-50%) rotate(0deg) translateX(220px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(220px) rotate(-360deg); }
        }
        @keyframes orbit-3 {
          from { transform: translateY(-50%) rotate(0deg) translateX(260px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(260px) rotate(-360deg); }
        }
        @keyframes orbit-4 {
          from { transform: translateY(-50%) rotate(0deg) translateX(340px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(340px) rotate(-360deg); }
        }
        @keyframes orbit-5 {
          from { transform: translateY(-50%) rotate(0deg) translateX(450px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(450px) rotate(-360deg); }
        }
        @keyframes orbit-6 {
          from { transform: translateY(-50%) rotate(0deg) translateX(560px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(560px) rotate(-360deg); }
        }
        @keyframes orbit-7 {
          from { transform: translateY(-50%) rotate(0deg) translateX(670px) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg) translateX(670px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};