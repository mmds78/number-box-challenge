import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryType, getRandomCategories, generateNumberForCategory } from '../utils/numberGenerator';
import { toast } from 'sonner';

// Game phases
export type GamePhase = 'memorize' | 'input' | 'result';

// Interface for the numbers displayed in boxes
export interface BoxNumber {
  category: CategoryType;
  value: number;
}

// Interface for user answers
export interface UserAnswer {
  category: CategoryType;
  value: string;
}

// Interface for session results
export interface SessionResult {
  boxNumbers: BoxNumber[];
  userAnswers: UserAnswer[];
  correctCount: number;
}

// Interface for the game context
interface GameContextType {
  phase: GamePhase;
  boxNumbers: BoxNumber[];
  userAnswers: UserAnswer[];
  sessionCount: number;
  timer: number;
  sessionResults: SessionResult[];
  correctAnswers: number;
  totalAnswers: number;

  startMemorizePhase: () => void;
  startInputPhase: () => void;
  updateUserAnswer: (category: CategoryType, value: string) => void;
  submitAnswers: () => void;
  resetGame: () => void;
}

// Create the game context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Game provider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<GamePhase>('memorize');
  const [boxNumbers, setBoxNumbers] = useState<BoxNumber[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(10);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [sessionResults, setSessionResults] = useState<SessionResult[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [totalAnswers, setTotalAnswers] = useState<number>(0);

  // Clear the timer interval when component unmounts
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Start memorize phase by generating new numbers
  const startMemorizePhase = () => {
    // Generate 3 random categories
    const categories = getRandomCategories();
    
    // Generate numbers for each category
    const numbers = categories.map(category => ({
      category,
      value: generateNumberForCategory(category)
    }));
    
    setBoxNumbers(numbers);
    setUserAnswers(categories.map(category => ({ category, value: '' })));
    setPhase('memorize');
    setTimer(10);
    
    // Start timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          startInputPhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimerInterval(interval);
  };

  // Start input phase
  const startInputPhase = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setPhase('input');
  };

  // Update user answer
  const updateUserAnswer = (category: CategoryType, value: string) => {
    setUserAnswers(prev => 
      prev.map(answer => 
        answer.category === category ? { ...answer, value } : answer
      )
    );
  };

  // Submit answers and calculate score
  const submitAnswers = () => {
    // Count correct answers
    const correct = userAnswers.reduce((count, answer) => {
      const matchingBox = boxNumbers.find(box => box.category === answer.category);
      return matchingBox && matchingBox.value.toString() === answer.value ? count + 1 : count;
    }, 0);
    
    // Update session results
    const result: SessionResult = {
      boxNumbers: [...boxNumbers],
      userAnswers: [...userAnswers],
      correctCount: correct
    };
    
    setSessionResults(prev => [...prev, result]);
    setCorrectAnswers(prev => prev + correct);
    setTotalAnswers(prev => prev + boxNumbers.length);
    
    // Increment session count
    const newSessionCount = sessionCount + 1;
    setSessionCount(newSessionCount);
    
    // Show toast with result
    toast(
      `Session ${newSessionCount} result: ${correct}/${boxNumbers.length} correct`,
      { duration: 3000 }
    );
    
    // Check if we've completed 10 sessions
    if (newSessionCount >= 10) {
      setPhase('result');
    } else {
      // Start next session
      startMemorizePhase();
    }
  };

  // Reset the game
  const resetGame = () => {
    setSessionCount(0);
    setSessionResults([]);
    setCorrectAnswers(0);
    setTotalAnswers(0);
    startMemorizePhase();
  };

  return (
    <GameContext.Provider
      value={{
        phase,
        boxNumbers,
        userAnswers,
        sessionCount,
        timer,
        sessionResults,
        correctAnswers,
        totalAnswers,
        startMemorizePhase,
        startInputPhase,
        updateUserAnswer,
        submitAnswers,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
