import React, { useState } from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import { Rocket, Globe, BookOpen, Newspaper, User, Menu, X, Award, MapPin } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useGame();
  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("token")
      logout();
      navigate('/login'); // or navigate('/login')
    };
  const navigation = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'Solar System', href: '/solar-system', icon: Globe },
    { name: 'Travel Planner', href: '/travel-planner', icon: MapPin },
    { name: 'Missions', href: '/missions', icon: Rocket },
    { name: 'Learn', href: '/learn', icon: BookOpen },
    { name: 'News', href: '/news', icon: Newspaper },


  ];

  return (
    <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Rocket className="h-8 w-8 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CosmosPT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Award className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">{user?.points}</span>
            </div>
            <Link
              to="/profile"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">Profile</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors duration-200"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-600/30 text-purple-300'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
               <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full space-x-3 px-4 py-3 text-left text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                <X className="h-5 w-5" />
                <span>Logout</span>
              </button>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
              >
                <User className="h-5 w-5" />
                <span>Profile ({user?.points} pts)</span>
                
              </Link>
              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};