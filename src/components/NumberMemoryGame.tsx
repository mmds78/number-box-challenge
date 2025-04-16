
import React, { useEffect } from 'react';
import { useGame, GameProvider } from '@/contexts/GameContext';
import GameBox from './GameBox';
import GameHeader from './GameHeader';
import GameControls from './GameControls';
import CategoryLegend from './CategoryLegend';
import ResultsScreen from './ResultsScreen';

const GameBoard: React.FC = () => {
  const { phase, boxNumbers, startMemorizePhase } = useGame();
  
  // Start the game on component mount
  useEffect(() => {
    startMemorizePhase();
  }, []);
  
  // If we're in the results phase, show the results screen
  if (phase === 'result') {
    return <ResultsScreen />;
  }
  
  return (
    <div className="max-w-md mx-auto p-4">
      <GameHeader />
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {boxNumbers.map((box, index) => (
          <GameBox
            key={`${box.category}-${index}`}
            category={box.category}
            value={box.value}
            showValue={phase === 'memorize'}
          />
        ))}
      </div>
      
      <GameControls />
      
      <div className="mt-8">
        <CategoryLegend />
      </div>
    </div>
  );
};

// Wrapped component with provider
const NumberMemoryGame: React.FC = () => (
  <GameProvider>
    <div className="min-h-screen bg-gray-100 pt-6 pb-10">
      <GameBoard />
    </div>
  </GameProvider>
);

export default NumberMemoryGame;
