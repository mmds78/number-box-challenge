
import React from 'react';

const CategoryLegend: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">Category Rules:</h3>
      <ul className="text-sm space-y-1">
        <li className="flex">
          <span className="font-bold w-12">ALT:</span>
          <span>Numbers ending in thousands or 500 from 2000 to 42000</span>
        </li>
        <li className="flex">
          <span className="font-bold w-12">H:</span>
          <span>Numbers ending in 0 or 5 from 0 to 360</span>
        </li>
        <li className="flex">
          <span className="font-bold w-12">S:</span>
          <span>Numbers ending in 0 or 5 from 0 to 500</span>
        </li>
        <li className="flex">
          <span className="font-bold w-12">R:</span>
          <span>6 digit numbers starting with 1 and ending in 0 or 5</span>
        </li>
      </ul>
    </div>
  );
};

export default CategoryLegend;
