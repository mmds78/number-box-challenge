
import React from 'react';
import { Button } from '@/components/ui/button';
import { CategoryType } from '@/utils/numberGenerator';
import { useGame } from '@/contexts/GameContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface NumberKeypadProps {
  selectedCategory: CategoryType | null;
  onSelectCategory: (category: CategoryType) => void;
}

const NumberKeypad: React.FC<NumberKeypadProps> = ({ selectedCategory, onSelectCategory }) => {
  const { updateUserAnswer } = useGame();
  const [currentValue, setCurrentValue] = React.useState<string>('');
  const allCategories: CategoryType[] = ['ALT', 'H', 'S', 'R'];

  // Buttons for the keypad (1-9, 0, Clear, Enter) in the correct order
  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
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
    <div className="mt-6 flex gap-4">
      {/* Box selector on the left */}
      <div className="flex-shrink-0">
        <RadioGroup 
          value={selectedCategory || ''} 
          onValueChange={(value) => onSelectCategory(value as CategoryType)}
          className="space-y-3"
        >
          {allCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={`radio-${category}`} />
              <Label htmlFor={`radio-${category}`} className="font-medium">
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Number keypad */}
      <div className={`flex-grow ${selectedCategory ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
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
    </div>
  );
};

export default NumberKeypad;
