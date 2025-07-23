import React, { useState } from 'react';

const PriceFilterSection = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  return (
    <div className="space-y-4 px-6 pb-6">
      <div className="flex items-center justify-between text-sm">
        <span>Price: ${priceRange.min} — ${priceRange.max}</span>
      </div>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
          value={priceRange.min}
          onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
        />
        <span className="self-center">—</span>
        <input
          type="number"
          placeholder="Max"
          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
          value={priceRange.max}
          onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 100})}
        />
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
          Filter
        </button>
      </div>
    </div>
  );
};

export default PriceFilterSection;