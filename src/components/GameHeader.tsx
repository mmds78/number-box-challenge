
import React from 'react';
import { useGame } from '@/contexts/GameContext';

const GameHeader: React.FC = () => {
  const { phase, timer, sessionCount } = useGame();
  
  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">Number Box Challenge</h2>
        <p className="text-sm text-gray-600">Session {sessionCount + 1}/10</p>
      </div>
      
      {phase === 'memorize' && (
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Memorize</div>
          <div className="text-2xl font-bold">{timer}s</div>
        </div>
      )}
      
      {phase === 'input' && (
        <div className="text-center">
          <div className="text-sm text-gray-600">Input your answers</div>
        </div>
      )}
    </div>
  );
};

export default GameHeader;
