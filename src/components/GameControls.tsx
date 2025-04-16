
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const GameControls: React.FC = () => {
  const { phase, submitAnswers, resetGame, userAnswers } = useGame();
  
  // Check if all answers are filled
  const isSubmitDisabled = phase !== 'input' || userAnswers.some(answer => !answer.value);
  
  return (
    <div className="mt-6 flex justify-center">
      {phase === 'input' && (
        <Button 
          onClick={submitAnswers} 
          disabled={isSubmitDisabled}
          className="w-full"
        >
          Submit Answers
        </Button>
      )}
      
      {phase === 'result' && (
        <Button 
          onClick={resetGame}
          className="w-full"
        >
          Play Again
        </Button>
      )}
    </div>
  );
};

export default GameControls;
