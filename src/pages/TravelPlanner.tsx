import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Zap, Rocket, Star, Globe, Gauge, Info, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface Destination {
  id: string;
  name: string;
  type: 'planet' | 'star' | 'galaxy' | 'nebula' | 'moon';
  distance: number; // in kilometers
  imageUrl: string;
  description: string;
  funFacts: string[];
}

interface Vehicle {
  id: string;
  name: string;
  speed: number; // km/s
  description: string;
  icon: string;
  multiplier: number;
}

const destinations: Destination[] = [
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    distance: 0,
    imageUrl: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Our beautiful blue home planet',
    funFacts: [
      'Earth is the only known planet with life',
      '71% of Earth\'s surface is covered by water',
      'Earth has one natural satellite - the Moon'
    ]
  },
  {
    id: 'moon',
    name: 'Moon',
    type: 'moon',
    distance: 384400,
    imageUrl: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Earth\'s only natural satellite',
    funFacts: [
      'The Moon is moving away from Earth at 3.8 cm per year',
      'A day on the Moon lasts about 29.5 Earth days',
      'The Moon has no atmosphere'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    distance: 225000000,
    imageUrl: 'https://images.pexels.com/photos/73873/mars-mars-rover-space-travel-robot-73873.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The Red Planet, our next frontier',
    funFacts: [
      'Mars has the largest volcano in the solar system',
      'A year on Mars is 687 Earth days',
      'Mars has two small moons: Phobos and Deimos'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    distance: 628000000,
    imageUrl: 'https://images.pexels.com/photos/39649/jupiter-red-spot-planet-39649.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The gas giant with the Great Red Spot',
    funFacts: [
      'Jupiter has 95 known moons',
      'Jupiter\'s Great Red Spot is a storm larger than Earth',
      'Jupiter acts as a cosmic vacuum cleaner, protecting inner planets'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    distance: 1400000000,
    imageUrl: 'https://images.pexels.com/photos/39649/jupiter-red-spot-planet-39649.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The ringed beauty of our solar system',
    funFacts: [
      'Saturn has 146 known moons',
      'Saturn is less dense than water',
      'Saturn\'s rings are made mostly of ice particles'
    ]
  },
  {
    id: 'proxima-centauri',
    name: 'Proxima Centauri',
    type: 'star',
    distance: 39900000000000,
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The closest star to our solar system',
    funFacts: [
      'Proxima Centauri is a red dwarf star',
      'It has at least two confirmed planets',
      'Light from Proxima Centauri takes 4.24 years to reach Earth'
    ]
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy',
    type: 'galaxy',
    distance: 2.4e19,
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Our nearest major galactic neighbor',
    funFacts: [
      'Andromeda contains about 1 trillion stars',
      'It\'s approaching the Milky Way at 250,000 mph',
      'Andromeda and Milky Way will collide in 4.5 billion years'
    ]
  },
  {
    id: 'orion-nebula',
    name: 'Orion Nebula',
    type: 'nebula',
    distance: 1.26e16,
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A stellar nursery where new stars are born',
    funFacts: [
      'The Orion Nebula is 1,344 light-years away',
      'It\'s one of the brightest nebulae visible to the naked eye',
      'New stars are actively forming in this nebula'
    ]
  }
];

const vehicles: Vehicle[] = [
  {
    id: 'rocket',
    name: 'Standard Rocket',
    speed: 11,
    description: 'Traditional chemical rocket propulsion',
    icon: '🚀',
    multiplier: 1
  },
  {
    id: 'ion-drive',
    name: 'Ion Drive Spacecraft',
    speed: 50,
    description: 'Efficient electric propulsion system',
    icon: '⚡',
    multiplier: 1.2
  },
  {
    id: 'nuclear-pulse',
    name: 'Nuclear Pulse Ship',
    speed: 1000,
    description: 'Theoretical nuclear propulsion',
    icon: '☢️',
    multiplier: 2
  },
  {
    id: 'fusion-ramjet',
    name: 'Fusion Ramjet',
    speed: 30000,
    description: 'Advanced fusion-powered spacecraft',
    icon: '🔥',
    multiplier: 5
  },
  {
    id: 'warp-drive',
    name: 'Warp Drive Cruiser',
    speed: 299792458000,
    description: 'Theoretical faster-than-light travel',
    icon: '🌌',
    multiplier: 10
  }
];

export const TravelPlanner: React.FC = () => {
  const [fromDestination, setFromDestination] = useState<string>('earth');
  const [toDestination, setToDestination] = useState<string>('mars');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('rocket');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [travelTime, setTravelTime] = useState<string>('');
  const [showFunFacts, setShowFunFacts] = useState<boolean>(false);
  
  const { addPoints } = useGame();

  const getDestination = (id: string) => destinations.find(d => d.id === id);
  const getVehicle = (id: string) => vehicles.find(v => v.id === id);

  const calculateTravelTime = () => {
    const from = getDestination(fromDestination);
    const to = getDestination(toDestination);
    const vehicle = getVehicle(selectedVehicle);

    if (!from || !to || !vehicle) return '';

    const distance = Math.abs(to.distance - from.distance);
    if (distance === 0) return 'You\'re already there!';

    const effectiveSpeed = vehicle.speed * speedMultiplier * vehicle.multiplier;
    const timeInSeconds = distance / effectiveSpeed;

    // Convert to appropriate units
    if (timeInSeconds < 60) {
      return `${Math.round(timeInSeconds)} seconds`;
    } else if (timeInSeconds < 3600) {
      return `${Math.round(timeInSeconds / 60)} minutes`;
    } else if (timeInSeconds < 86400) {
      return `${Math.round(timeInSeconds / 3600)} hours`;
    } else if (timeInSeconds < 31536000) {
      return `${Math.round(timeInSeconds / 86400)} days`;
    } else {
      const years = timeInSeconds / 31536000;
      if (years > 1000000) {
        return `${(years / 1000000).toFixed(1)} million years`;
      } else if (years > 1000) {
        return `${(years / 1000).toFixed(1)} thousand years`;
      } else {
        return `${Math.round(years)} years`;
      }
    }
  };

  useEffect(() => {
    setTravelTime(calculateTravelTime());
  }, [fromDestination, toDestination, selectedVehicle, speedMultiplier]);

  const handlePlanTrip = () => {
    addPoints(25);
    setShowFunFacts(true);
    setTimeout(() => setShowFunFacts(false), 5000);
  };

  const fromDest = getDestination(fromDestination);
  const toDest = getDestination(toDestination);
  const currentVehicle = getVehicle(selectedVehicle);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'planet': return '🪐';
      case 'star': return '⭐';
      case 'galaxy': return '🌌';
      case 'nebula': return '☁️';
      case 'moon': return '🌙';
      default: return '🌍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'planet': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'star': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'galaxy': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'nebula': return 'text-pink-400 bg-pink-400/20 border-pink-400/30';
      case 'moon': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
      default: return 'text-green-400 bg-green-400/20 border-green-400/30';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Cosmic Travel Planner
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Plan your journey across the universe! From planets to galaxies, customize your cosmic adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Destination Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* From/To Selection */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-cyan-400" />
                <span>Choose Your Journey</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* From Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">From</label>
                  <select
                    value={fromDestination}
                    onChange={(e) => setFromDestination(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    {destinations.map((dest) => (
                      <option key={dest.id} value={dest.id} className="bg-slate-800">
                        {getTypeIcon(dest.type)} {dest.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">To</label>
                  <select
                    value={toDestination}
                    onChange={(e) => setToDestination(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    {destinations.map((dest) => (
                      <option key={dest.id} value={dest.id} className="bg-slate-800">
                        {getTypeIcon(dest.type)} {dest.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Destination Images */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* From Image */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={fromDest?.imageUrl}
                    alt={fromDest?.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getTypeColor(fromDest?.type || 'planet')}`}>
                      {fromDest?.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{fromDest?.name}</h3>
                  <p className="text-gray-300 text-sm">{fromDest?.description}</p>
                </div>
              </div>

              {/* To Image */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={toDest?.imageUrl}
                    alt={toDest?.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getTypeColor(toDest?.type || 'planet')}`}>
                      {toDest?.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{toDest?.name}</h3>
                  <p className="text-gray-300 text-sm">{toDest?.description}</p>
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Rocket className="h-6 w-6 text-purple-400" />
                <span>Choose Your Vehicle</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                      selectedVehicle === vehicle.id
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="text-2xl mb-2">{vehicle.icon}</div>
                    <h4 className="font-semibold text-white mb-1">{vehicle.name}</h4>
                    <p className="text-xs text-gray-400 mb-2">{vehicle.description}</p>
                    <div className="text-xs">
                      <span className="text-cyan-400">Speed: {vehicle.speed.toLocaleString()} km/s</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Customization */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Gauge className="h-6 w-6 text-orange-400" />
                <span>Customize Speed</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Speed Multiplier</span>
                  <span className="text-orange-400 font-bold">{speedMultiplier}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0.1x (Slow)</span>
                  <span>10x (Maximum)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="space-y-6">
            {/* Travel Time */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span>Travel Time</span>
              </h3>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{travelTime}</div>
                <p className="text-gray-400 text-sm">Estimated journey duration</p>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Info className="h-5 w-5 text-blue-400" />
                <span>Trip Details</span>
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="text-white">{currentVehicle?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Speed:</span>
                  <span className="text-white">{currentVehicle?.speed.toLocaleString()} km/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speed Boost:</span>
                  <span className="text-orange-400">{speedMultiplier}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle Bonus:</span>
                  <span className="text-purple-400">{currentVehicle?.multiplier}x</span>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            {showFunFacts && (
              <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 rounded-2xl p-6 animate-pulse">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  <span>Fun Facts</span>
                </h3>
                
                <div className="space-y-3">
                  {toDest?.funFacts.map((fact, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plan Trip Button */}
            <button
              onClick={handlePlanTrip}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-4 rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25"
            >
              Plan This Trip (+25 pts)
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background:rgb(105, 59, 27);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  );
};