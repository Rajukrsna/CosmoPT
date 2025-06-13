import React, { useState } from 'react';
import { BookOpen, Trophy, Star, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useGame } from '../context/GameContext';

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

const quizzes: Quiz[] = [
  {
    id: 'solar-system-basics',
    title: 'Solar System Basics',
    category: 'Planets',
    difficulty: 'Beginner',
    points: 100,
    questions: [
      {
        id: 'q1',
        question: 'Which planet is closest to the Sun?',
        options: ['Venus', 'Mercury', 'Earth', 'Mars'],
        correctAnswer: 1,
        explanation: 'Mercury is the closest planet to the Sun, orbiting at an average distance of about 58 million kilometers.'
      },
      {
        id: 'q2',
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1,
        explanation: 'There are 8 planets in our solar system since Pluto was reclassified as a dwarf planet in 2006.'
      },
      {
        id: 'q3',
        question: 'Which planet is known as the "Red Planet"?',
        options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        correctAnswer: 2,
        explanation: 'Mars is called the Red Planet due to iron oxide (rust) on its surface, giving it a reddish appearance.'
      },
      {
        id: 'q4',
        question: 'Which planet has the most moons?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: 1,
        explanation: 'Saturn has the most confirmed moons with 146 known moons, surpassing Jupiter\'s 95 moons.'
      },
      {
        id: 'q5',
        question: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
        correctAnswer: 2,
        explanation: 'Jupiter is the largest planet, with a mass greater than all other planets combined.'
      }
    ]
  },
  {
    id: 'space-exploration',
    title: 'Space Exploration History',
    category: 'History',
    difficulty: 'Intermediate',
    points: 150,
    questions: [
      {
        id: 'q1',
        question: 'Who was the first human to travel to space?',
        options: ['Neil Armstrong', 'Yuri Gagarin', 'Buzz Aldrin', 'John Glenn'],
        correctAnswer: 1,
        explanation: 'Yuri Gagarin became the first human to journey into outer space on April 12, 1961, aboard Vostok 1.'
      },
      {
        id: 'q2',
        question: 'Which spacecraft was the first to land on the Moon?',
        options: ['Apollo 10', 'Apollo 11', 'Apollo 12', 'Luna 2'],
        correctAnswer: 1,
        explanation: 'Apollo 11 was the first crewed mission to land on the Moon on July 20, 1969.'
      },
      {
        id: 'q3',
        question: 'What was the first artificial satellite launched into space?',
        options: ['Explorer 1', 'Sputnik 1', 'Vanguard 1', 'Luna 1'],
        correctAnswer: 1,
        explanation: 'Sputnik 1, launched by the Soviet Union on October 4, 1957, was the first artificial Earth satellite.'
      },
      {
        id: 'q4',
        question: 'Which space agency launched the Hubble Space Telescope?',
        options: ['ESA', 'NASA', 'Roscosmos', 'JAXA'],
        correctAnswer: 1,
        explanation: 'NASA launched the Hubble Space Telescope in 1990, revolutionizing our understanding of the universe.'
      }
    ]
  },
  {
    id: 'black-holes',
    title: 'Black Holes and Cosmic Phenomena',
    category: 'Astrophysics',
    difficulty: 'Advanced',
    points: 200,
    questions: [
      {
        id: 'q1',
        question: 'What is the event horizon of a black hole?',
        options: [
          'The center of the black hole',
          'The point of no return around a black hole',
          'The brightest part of a black hole',
          'The outer edge of the galaxy'
        ],
        correctAnswer: 1,
        explanation: 'The event horizon is the boundary around a black hole beyond which nothing can escape, not even light.'
      },
      {
        id: 'q2',
        question: 'What happens to time near a black hole?',
        options: [
          'Time speeds up',
          'Time slows down',
          'Time stops completely',
          'Time reverses'
        ],
        correctAnswer: 1,
        explanation: 'Due to gravitational time dilation, time appears to slow down near massive objects like black holes.'
      },
      {
        id: 'q3',
        question: 'What is Hawking radiation?',
        options: [
          'Radiation from the Big Bang',
          'Light from black holes',
          'Theoretical radiation emitted by black holes',
          'Solar radiation'
        ],
        correctAnswer: 2,
        explanation: 'Hawking radiation is theoretical radiation predicted to be emitted by black holes due to quantum effects.'
      }
    ]
  }
];

export const Learning: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  
  const { addPoints, completeQuiz, user } = useGame();

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
    setAnswers(new Array(quiz.questions.length).fill(null));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if(!user)return;
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < selectedQuiz!.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        const finalScore = newAnswers.reduce((acc, answer, index) => {
          return acc?acc:0 + (answer === selectedQuiz!.questions[index].correctAnswer ? 1 : 0);
        }, 0);
        if(finalScore){
        const percentage = Math.round((finalScore / selectedQuiz!.questions.length) * 100);
        const earnedPoints = Math.round((percentage / 100) * selectedQuiz!.points);
        
        setScore(finalScore);
        setQuizCompleted(true);
        addPoints(earnedPoints);
        completeQuiz(selectedQuiz!.id);
        }
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
    setAnswers([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    if(!user)return;
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Advanced': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Gamified Learning Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Test your space knowledge with interactive quizzes and earn points to unlock achievements!
            </p>
            
            {/* User Progress */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{user?.level}</div>
                <div className="text-sm text-gray-400">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{user?.points}</div>
                <div className="text-sm text-gray-400">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user?.completedQuizzes.length}</div>
                <div className="text-sm text-gray-400">Quizzes Completed</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => {
              const isCompleted = user?.completedQuizzes.includes(quiz.id);
              return (
                <div
                  key={quiz.id}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group ${
                    isCompleted ? 'ring-2 ring-green-500/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-6 w-6 text-green-400 group-hover:text-green-300 transition-colors" />
                      {isCompleted && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                    {quiz.title}
                  </h3>
                  
                  <p className="text-purple-300 text-sm mb-4">{quiz.category}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <span>{quiz.questions.length} questions</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">{quiz.points} pts</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => startQuiz(quiz)}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isCompleted
                        ? 'bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 shadow-lg shadow-green-500/25'
                    }`}
                  >
                    {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    const earnedPoints = Math.round((percentage / 100) * selectedQuiz.points);
    
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <div className="mb-8">
              {percentage >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              ) : percentage >= 60 ? (
                <Star className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              ) : (
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              )}
              
              <h2 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h2>
              <p className="text-xl text-gray-300 mb-6">{selectedQuiz.title}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{score}/{selectedQuiz.questions.length}</div>
                <div className="text-gray-400">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{percentage}%</div>
                <div className="text-gray-400">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">+{earnedPoints}</div>
                <div className="text-gray-400">Points Earned</div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg mb-8 ${
              percentage >= 80 
                ? 'bg-green-600/20 border border-green-500/30' 
                : percentage >= 60
                ? 'bg-blue-600/20 border border-blue-500/30'
                : 'bg-gray-600/20 border border-gray-500/30'
            }`}>
              <p className={`font-medium ${
                percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-blue-400' : 'text-gray-400'
              }`}>
                {percentage >= 80 
                  ? '🎉 Excellent work! You\'re a space expert!' 
                  : percentage >= 60
                  ? '👍 Good job! Keep learning about the cosmos!'
                  : '📚 Nice try! Review the material and try again!'}
              </p>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors duration-200"
              >
                Back to Quizzes
              </button>
              <button
                onClick={() => startQuiz(selectedQuiz)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">{selectedQuiz.title}</h1>
            <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getDifficultyColor(selectedQuiz.difficulty)}`}>
              {selectedQuiz.difficulty}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Question {currentQuestion + 1} of {selectedQuiz.questions.length}
            </p>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">{selectedQuiz.points} pts</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-8 leading-relaxed">
            {question.question}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'bg-green-600/30 border-2 border-green-500 text-green-300'
                      : selectedAnswer === index
                      ? 'bg-red-600/30 border-2 border-red-500 text-red-300'
                      : 'bg-white/5 border border-white/10 text-gray-400'
                    : selectedAnswer === index
                    ? 'bg-purple-600/30 border-2 border-purple-500 text-purple-300'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                  {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result Explanation */}
        {showResult && (
          <div className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 mb-8 ${
            isCorrect ? 'border-green-500/30' : 'border-red-500/30'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              {isCorrect ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-400" />
              )}
              <h3 className={`text-lg font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-between">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-colors duration-200"
          >
            Exit Quiz
          </button>
          
          {!showResult ? (
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          ) : (
            <div className="px-6 py-3 bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-xl">
              Loading next question...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};