import React from 'react';
import { Minus, Plus } from 'lucide-react';

const SidebarSection = ({ title, isExpanded, onToggle, children }) => (
  <div>
    <div
      className={`flex px-6 pt-4 items-center justify-between cursor-pointer ${
        isExpanded ? 'pb-0' : 'pb-4'
      }`}
      onClick={onToggle}
    >
      <h3 className="font-medium text-lg text-gray-900">{title}</h3>
      {isExpanded ? (
        <Minus className="w-4 h-4 text-gray-600" />
      ) : (
        <Plus className="w-4 h-4 text-gray-600" />
      )}
    </div>
    {isExpanded && (
      <div className="mt-4">
        {children}
      </div>
    )}
  </div>
);

export default SidebarSection;
