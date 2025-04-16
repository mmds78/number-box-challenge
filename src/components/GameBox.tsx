
import React from 'react';
import { CategoryType } from '@/utils/numberGenerator';
import { useGame } from '@/contexts/GameContext';

interface GameBoxProps {
  category: CategoryType;
  value?: number;
  showValue: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const GameBox: React.FC<GameBoxProps> = ({ 
  category, 
  value, 
  showValue, 
  isSelected,
  onSelect 
}) => {
  const { userAnswers } = useGame();
  
  // Find user answer for this category
  const userAnswer = userAnswers.find(answer => answer.category === category);
  
  // Get category label
  const getCategoryLabel = () => {
    return category;
  };

  // Handle click on box
  const handleBoxClick = () => {
    onSelect();
  };

  return (
    <div 
      className={`p-4 rounded-lg border-2 ${isSelected ? 'border-blue-500' : 'border-gray-300'} 
                 cursor-pointer transition-colors`}
      onClick={handleBoxClick}
    >
      <div className="text-center mb-2 font-bold text-gray-800">
        {getCategoryLabel()}
      </div>
      
      <div className="text-center text-xl font-bold h-8">
        {showValue && value !== undefined ? (
          value
        ) : (
          userAnswer && userAnswer.value ? userAnswer.value : ''
        )}
      </div>
    </div>
  );
};

export default GameBox;
