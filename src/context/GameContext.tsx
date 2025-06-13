import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from '../utils/axios';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
}

interface User {
  _id: string; // MongoDB ID
  name: string;
  points: number;
  level: number;
  achievements: Achievement[];
  completedQuizzes: string[];
  visitedPlanets: string[];
}

interface GameContextType {
  user: User | null;
  addPoints: (points: number) => void;
  completeQuiz: (quizId: string) => void;
  visitPlanet: (planetId: string) => void;
  unlockAchievement :(achievementId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("userId"); 
  console.log(userId);
  const API_BASE = 'http://localhost:5000/api/users';

  // Fetch user from backend
  useEffect(() => {
    const fetchUser = async () => {
       const userId = localStorage.getItem("userId"); 
      try {
        const res = await axios.get(`${API_BASE}/${userId}`);
  
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  const addPoints = async (points: number) => {
    try {
      const res = await axios.put(`${API_BASE}/${userId}/points`, { pointsToAdd: points });
      setUser(res.data);
    } catch (err) {
      console.error('Error adding points:', err);
    }
  };

  const completeQuiz = async (quizId: string) => {
    try {
      const res = await axios.put(`${API_BASE}/${userId}/quiz`, { quizId });
      setUser(res.data);
    } catch (err) {
      console.error('Error completing quiz:', err);
    }
  };

  const visitPlanet = async (planetId: string) => {
    try {
      const res = await axios.put(`${API_BASE}/${userId}/visit`, { planetId });
      setUser(res.data);
    } catch (err) {
      console.error('Error visiting planet:', err);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    try {
      const res = await axios.put(`${API_BASE}/${userId}/unlock`, { achievementId });
      setUser(res.data);
    } catch (err) {
      console.error('Error unlocking achievement:', err);
    }
  };

  return (
    <GameContext.Provider value={{ user, addPoints, completeQuiz, visitPlanet, unlockAchievement }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
