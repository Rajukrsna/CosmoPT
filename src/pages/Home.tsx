import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Globe, BookOpen, Zap, Award, TrendingUp, MapPin } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Home: React.FC = () => {
  const { user } = useGame();
  if (!user) return <p>Loading...</p>; // 👈 this prevents accessing null

  const features = [
    {
      icon: Globe,
      title: 'Interactive Solar System',
      description: 'Explore planets in stunning 3D-like visualization with detailed information about each celestial body.',
      link: '/solar-system',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      title: 'Cosmic Travel Planner',
      description: 'Plan your journey across the universe! From Earth to distant galaxies with customizable vehicles.',
      link: '/travel-planner',
      color: 'from-cyan-500 to-purple-500',
    },
    {
      icon: Rocket,
      title: 'Space Missions',
      description: 'Experience real space missions through interactive simulations and make critical decisions.',
      link: '/missions',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'Gamified Learning',
      description: 'Test your space knowledge with interactive quizzes and earn points to unlock achievements.',
      link: '/learn',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Space News',
      description: 'Stay updated with the latest discoveries and missions from space agencies around the world.',
      link: '/news',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { label: 'Current Level', value: user.level, icon: Zap },
    { label: 'Total Points', value: user.points, icon: Award },
    { label: 'Quizzes Completed', value: user.completedQuizzes.length, icon: BookOpen },
    { label: 'Planets Visited', value: user.visitedPlanets.length, icon: Globe },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Explore the Cosmos
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Journey through the universe with interactive learning, space missions, and gamified exploration.
            Discover the mysteries of our solar system and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/solar-system"
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              Start Exploring
            </Link>
            <Link
              to="/travel-planner"
              className="border border-white/20 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
            >
              Plan a Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Discover the Universe
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Immerse yourself in interactive space exploration with cutting-edge educational tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Become a Space Explorer?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of learners discovering the wonders of space through interactive education.
            </p>
            <Link
              to="/profile"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              <Award className="h-5 w-5" />
              <span>View Your Progress</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};