
// Generate numbers according to the specific conditions for each category

// ALT: Numbers ending in thousands or 500 from 2000 to 42000
export const generateALTNumber = (): number => {
  // Generate random number between 2 and 42
  const base = Math.floor(Math.random() * 41) + 2;
  // Decide if it ends in 000 or 500
  const ending = Math.random() < 0.5 ? 0 : 500;
  return base * 1000 + ending;
};

// H: Three-digit numbers ending in 0 or 5 from 0 to 360
export const generateHNumber = (): number => {
  // Generate random number between 0 and 36 (to ensure three-digit numbers)
  const base = Math.floor(Math.random() * 37);
  // Decide if it ends in 0 or 5
  const ending = Math.random() < 0.5 ? 0 : 5;
  // Calculate raw number
  const rawNumber = base * 10 + ending;
  // Convert to string and pad with leading zeros to ensure 3 digits
  return parseInt(rawNumber.toString().padStart(3, '0'));
};

// S: Numbers ending in 0 or 5 from 0 to 500
export const generateSNumber = (): number => {
  // Generate random number between 0 and 50
  const base = Math.floor(Math.random() * 51);
  // Decide if it ends in 0 or 5
  const ending = Math.random() < 0.5 ? 0 : 5;
  return base * 10 + ending;
};

// R: 6 digit numbers starting with 1 and ending in 0 or 5
export const generateRNumber = (): number => {
  // Generate 4 random digits for the middle
  const middleDigits = Math.floor(Math.random() * 10000);
  // Format to ensure 4 digits with leading zeros if needed
  const formattedMiddle = middleDigits.toString().padStart(4, '0');
  // Decide if it ends in 0 or 5
  const ending = Math.random() < 0.5 ? 0 : 5;
  // Construct the number: 1xxxxx0/5
  return parseInt(`1${formattedMiddle}${ending}`);
};

// Category type
export type CategoryType = 'ALT' | 'H' | 'S' | 'R';

// Generate a number based on the category
export const generateNumberForCategory = (category: CategoryType): number => {
  switch (category) {
    case 'ALT':
      return generateALTNumber();
    case 'H':
      return generateHNumber();
    case 'S':
      return generateSNumber();
    case 'R':
      return generateRNumber();
    default:
      return 0;
  }
};

// Get random categories (3 out of 4)
export const getRandomCategories = (): CategoryType[] => {
  const allCategories: CategoryType[] = ['ALT', 'H', 'S', 'R'];
  const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};
