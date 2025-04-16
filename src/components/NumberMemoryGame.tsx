
import React, { useEffect, useState } from 'react';
import { useGame, GameProvider } from '@/contexts/GameContext';
import { CategoryType } from '@/utils/numberGenerator';
import GameBox from './GameBox';
import GameHeader from './GameHeader';
import GameControls from './GameControls';
import NumberKeypad from './NumberKeypad';
import ResultsScreen from './ResultsScreen';

const GameBoard: React.FC = () => {
  const { phase, boxNumbers, startMemorizePhase } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  
  // All categories
  const allCategories: CategoryType[] = ['ALT', 'H', 'S', 'R'];
  
  // Start the game on component mount
  useEffect(() => {
    startMemorizePhase();
  }, []);

  // Reset selected category when phase changes
  useEffect(() => {
    setSelectedCategory(null);
  }, [phase]);
  
  // Handle category selection
  const handleCategorySelect = (category: CategoryType) => {
    if (phase === 'input') {
      setSelectedCategory(category);
    }
  };

  // Check if a category has a number assigned
  const hasNumber = (category: CategoryType) => {
    return boxNumbers.some(box => box.category === category);
  };
  
  // If we're in the results phase, show the results screen
  if (phase === 'result') {
    return <ResultsScreen />;
  }
  
  return (
    <div className="max-w-md mx-auto p-4">
      <GameHeader />
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {allCategories.map((category) => (
          <GameBox
            key={category}
            category={category}
            value={boxNumbers.find(box => box.category === category)?.value}
            showValue={phase === 'memorize' && hasNumber(category)}
            isSelected={selectedCategory === category}
            onSelect={() => handleCategorySelect(category)}
          />
        ))}
      </div>
      
      <NumberKeypad 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect}
      />
      
      <GameControls />
    </div>
  );
};

// Wrapped component with provider
const NumberMemoryGame: React.FC = () => (
  <GameProvider>
    <div className="min-h-screen pt-6 pb-10">
      <GameBoard />
    </div>
  </GameProvider>
);

export default NumberMemoryGame;
