
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

const ResultsScreen: React.FC = () => {
  const { correctAnswers, totalAnswers, resetGame } = useGame();
  
  // Calculate percentage
  const percentage = Math.round((correctAnswers / totalAnswers) * 100);
  
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Game Results</h2>
      
      <div className="mb-6 text-center">
        <p className="text-lg mb-2">
          You got <span className="font-bold text-green-600">{correctAnswers}</span> out of <span className="font-bold">{totalAnswers}</span> correct!
        </p>
        <p className="text-3xl font-bold text-blue-600">
          {percentage}% Accuracy
        </p>
      </div>
      
      <div className="mb-4 text-center">
        <p className="text-gray-600 mb-2">
          {percentage >= 80 ? "Excellent memory! You're a natural." : 
           percentage >= 60 ? "Well done! Your memory is quite good." :
           percentage >= 40 ? "Good effort! Keep practicing to improve." :
           "Don't worry, memory improves with practice!"}
        </p>
      </div>
      
      <Button onClick={resetGame} className="w-full">
        Play Again
      </Button>
    </div>
  );
};

export default ResultsScreen;
