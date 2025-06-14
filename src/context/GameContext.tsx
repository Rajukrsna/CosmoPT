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
interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
  points: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

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
 interface Labs {
  _id?: string;
  title: string;
  description: string;
  image: string;       
  route: string;       
  track: string;       
  createdAt?: Date;   
 }
interface GameContextType {
  user: User | null;
  addPoints: (points: number) => void;
  completeQuiz: (quizId: string) => void;
  visitPlanet: (planetId: string) => void;
  unlockAchievement :(achievementId: string) => void;
  fetchQuiz : Quiz[] | null;
  fetchMission : Mission[]|null;
  fetchVehicles : Vehicle[] |null;
  fetchDestination: Destination[]|null;
  fetchLabs: Labs[]|null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [fetchQuiz, setfetchQuiz] = useState<Quiz[] | null>(null);
  const[fetchMission, setfetchMission] = useState<Mission[] | null>(null);
  const [fetchVehicles, setfetchVehicles] = useState< Vehicle[]| null>(null)
  const [fetchDestination, setfetchDestination] = useState< Destination[]| null>(null)
  const [fetchLabs, setfetchLabs] = useState< Labs[]| null>(null)


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
  

  useEffect(()=>{
    const fetchQuiz = async () =>
    {
      try
      {
        const res = await axios.get(`${API_BASE}/fetch/getQuiz`)
        console.log("queire", res.data)
        setfetchQuiz(res.data);
      }
      catch(err)
      {
        console.error("Error fetching quiz data", err);
      }
    }
    fetchQuiz();
  },[])

  useEffect(()=>{
    const fetchMission = async()=>
    {
      try{
        const res = await axios.get(`${API_BASE}/fetch/getMission`)
        setfetchMission(res.data)
      }
      catch(err)
      {
        console.log("error bro in fetching Mission", err)
      }
    }
    fetchMission();
  },[])
   useEffect(()=>{
    const fetchVehicles = async()=>
    {
      try{
        const res = await axios.get(`${API_BASE}/fetch/getVehicles`)
        setfetchVehicles(res.data)
      }
      catch(err)
      {
        console.log("error bro in fetching Mission", err)
      }
    }
    fetchVehicles();
  },[])
   useEffect(()=>{
    const fetchDestination = async()=>
    {
      try{
        const res = await axios.get(`${API_BASE}/fetch/getDestination`)
        setfetchDestination(res.data)
      }
      catch(err)
      {
        console.log("error bro in fetching Mission", err)
      }
    }
    fetchDestination();
  },[])

  useEffect(()=>{
    const fetchLabs = async()=>
    {
      try{
        const res = await axios.get(`${API_BASE}/fetch/getLabs`)
        setfetchLabs(res.data)
      }
      catch(err)
      {
        console.log("error bro in fetching Mission", err)
      }
    }
    fetchLabs();
  },[])

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
    <GameContext.Provider value={{ user, addPoints, completeQuiz, visitPlanet, unlockAchievement , fetchQuiz ,fetchMission, fetchVehicles, fetchDestination, fetchLabs}}>
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
