import React from 'react';

interface TabsProps {
  activeTab: 'ForYou' | 'Following';
  onTabChange: (tab: 'ForYou' | 'Following') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-700 mb-4">
      <button
        className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
          activeTab === 'ForYou'
            ? 'border-b-2 border-lime-500 text-lime-500'
            : 'text-gray-400 hover:text-lime-500'
        }`}
        onClick={() => onTabChange('ForYou')}
      >
        Para Você
      </button>
      <button
        className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
          activeTab === 'Following'
            ? 'border-b-2 border-lime-500 text-lime-500'
            : 'text-gray-400 hover:text-lime-500'
        }`}
        onClick={() => onTabChange('Following')}
      >
        Seguindo
      </button>
    </div>
  );
};

export default Tabs;