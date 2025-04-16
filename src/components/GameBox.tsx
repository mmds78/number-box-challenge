
import React from 'react';
import { CategoryType } from '@/utils/numberGenerator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGame } from '@/contexts/GameContext';

interface GameBoxProps {
  category: CategoryType;
  value?: number;
  showValue: boolean;
}

const GameBox: React.FC<GameBoxProps> = ({ category, value, showValue }) => {
  const { phase, updateUserAnswer, userAnswers } = useGame();
  
  // Find user answer for this category
  const userAnswer = userAnswers.find(answer => answer.category === category);
  
  // Get box color based on category
  const getBoxColor = () => {
    switch (category) {
      case 'ALT': return 'bg-box-alt border-indigo-400';
      case 'H': return 'bg-box-h border-blue-400';
      case 'S': return 'bg-box-s border-green-400';
      case 'R': return 'bg-box-r border-red-400';
      default: return 'bg-gray-100 border-gray-400';
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    updateUserAnswer(category, value);
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getBoxColor()} shadow-md`}>
      <div className="text-center mb-2 font-bold text-gray-800">
        {category}
      </div>
      
      {showValue && value !== undefined ? (
        <div className="text-center text-xl font-bold">{value}</div>
      ) : phase === 'input' ? (
        <div>
          <Label htmlFor={`input-${category}`} className="sr-only">Enter {category} number</Label>
          <Input 
            id={`input-${category}`}
            type="text" 
            placeholder="Enter number"
            value={userAnswer?.value || ''}
            onChange={handleInputChange}
            className="text-center"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      ) : (
        <div className="h-10 flex items-center justify-center">
          {phase === 'memorize' ? '...' : ''}
        </div>
      )}
    </div>
  );
};

export default GameBox;
