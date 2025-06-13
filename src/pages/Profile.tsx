import React from 'react';
import { User, Award, Trophy, Star, BookOpen, Globe, Rocket, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Profile: React.FC = () => {
  const { user } = useGame();
  if (!user) return <p>Loading...</p>; // 👈 this prevents accessing null

  const unlockedAchievements = user.achievements.filter(a => a.unlocked);
  const lockedAchievements = user.achievements.filter(a => !a.unlocked);
  const nextLevelPoints = (user.level * 200) - user.points;

  const stats = [
    { label: 'Current Level', value: user.level, icon: Star, color: 'text-purple-400' },
    { label: 'Total Points', value: user.points, icon: Award, color: 'text-yellow-400' },
    { label: 'Quizzes Completed', value: user.completedQuizzes.length, icon: BookOpen, color: 'text-green-400' },
    { label: 'Planets Visited', value: user.visitedPlanets.length, icon: Globe, color: 'text-blue-400' },
  ];

  const getProgressToNextLevel = () => {
    const currentLevelStart = (user.level - 1) * 200;
    const nextLevelStart = user.level * 200;
    const progressInCurrentLevel = user.points - currentLevelStart;
    const levelRange = nextLevelStart - currentLevelStart;
    return (progressInCurrentLevel / levelRange) * 100;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Space Explorer Profile
            </span>
          </h1>
          <p className="text-xl text-gray-300">Track your cosmic journey and achievements</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-purple-300 text-lg mb-4">Level {user.level} Space Explorer</p>
              
              {/* Progress to Next Level */}
              <div className="bg-gray-700 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressToNextLevel()}%` }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {nextLevelPoints > 0 ? `${nextLevelPoints} points to level ${user.level + 1}` : 'Max level reached!'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-200"
              >
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Achievements</h3>
              <span className="bg-yellow-400/20 text-yellow-400 text-sm px-2 py-1 rounded-full">
                {unlockedAchievements.length}/{user.achievements.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {/* Unlocked Achievements */}
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-4 bg-green-600/20 border border-green-500/30 rounded-lg"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-300">{achievement.title}</h4>
                    <p className="text-sm text-gray-300">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">+{achievement.points}</div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>
              ))}
              
              {/* Locked Achievements */}
              {lockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-4 p-4 bg-gray-600/20 border border-gray-500/30 rounded-lg opacity-60"
                >
                  <div className="text-2xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-400">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 font-bold">{achievement.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Summary */}
          <div className="space-y-8">
            {/* Learning Progress */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Learning Progress</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Quizzes Completed</span>
                    <span className="text-green-400 font-medium">{user.completedQuizzes.length}/3</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${(user.completedQuizzes.length / 3) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Solar System Exploration</span>
                    <span className="text-blue-400 font-medium">{user.visitedPlanets.length}/8</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${(user.visitedPlanets.length / 8) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <a
                  href="/solar-system"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span className="text-white group-hover:text-purple-300">Explore Solar System</span>
                  </div>
                  <span className="text-xs text-gray-400">+10 pts per planet</span>
                </a>
                
                <a
                  href="/learn"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/30 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-green-400" />
                    <span className="text-white group-hover:text-green-300">Take a Quiz</span>
                  </div>
                  <span className="text-xs text-gray-400">Up to 200 pts</span>
                </a>
                
                <a
                  href="/missions"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Rocket className="h-5 w-5 text-pink-400" />
                    <span className="text-white group-hover:text-pink-300">Start Mission</span>
                  </div>
                  <span className="text-xs text-gray-400">100+ pts</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Level Rewards */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Level Rewards</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Level 5</h4>
              <p className="text-sm text-gray-300">Unlock advanced mission simulator</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Level 10</h4>
              <p className="text-sm text-gray-300">Access to exclusive space content</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">Level 15</h4>
              <p className="text-sm text-gray-300">Space Explorer Master badge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};