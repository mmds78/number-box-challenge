
import React from 'react';
import { Button } from '@/components/ui/button';
import { CategoryType } from '@/utils/numberGenerator';
import { useGame } from '@/contexts/GameContext';

interface NumberKeypadProps {
  selectedCategory: CategoryType | null;
}

const NumberKeypad: React.FC<NumberKeypadProps> = ({ selectedCategory }) => {
  const { updateUserAnswer } = useGame();
  const [currentValue, setCurrentValue] = React.useState<string>('');

  // Buttons for the keypad (0-9 and actions)
  const buttons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'Clear', '0', 'Enter'
  ];

  const handleButtonClick = (value: string) => {
    if (!selectedCategory) return;

    if (value === 'Clear') {
      setCurrentValue('');
      updateUserAnswer(selectedCategory, '');
    } else if (value === 'Enter') {
      // Do nothing on Enter, as we'll handle submission in GameControls
    } else {
      // Limit to reasonable length (10 digits max)
      if (currentValue.length < 10) {
        const newValue = currentValue + value;
        setCurrentValue(newValue);
        updateUserAnswer(selectedCategory, newValue);
      }
    }
  };

  // Reset current value when category changes
  React.useEffect(() => {
    setCurrentValue('');
  }, [selectedCategory]);

  return (
    <div className={`mt-6 ${selectedCategory ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            variant={btn === 'Enter' ? 'default' : btn === 'Clear' ? 'outline' : 'secondary'}
            className="h-12 text-lg font-medium"
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NumberKeypad;
