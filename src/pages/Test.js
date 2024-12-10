import React, { useState } from 'react';
import { FaList, FaChartBar, FaInfoCircle } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const Test = () => {
  const [activeModule, setActiveModule] = useState('list');

  const renderModule = () => {
    switch (activeModule) {
      case 'list':
        return <div>List Module Content</div>;
      case 'chart':
        return <div>Chart Module Content</div>;
      case 'description':
        return <div>Description Module Content</div>;
      default:
        return <div>List Module Content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4 flex justify-around">
        <FaList
          className={`text-2xl cursor-pointer ${activeModule === 'list' && 'text-blue-500'}`}
          onClick={() => setActiveModule('list')}
        />
        <FaChartBar
          className={`text-2xl cursor-pointer ${activeModule === 'chart' && 'text-blue-500'}`}
          onClick={() => setActiveModule('chart')}
        />
        <FaInfoCircle
          className={`text-2xl cursor-pointer ${activeModule === 'description' && 'text-blue-500'}`}
          onClick={() => setActiveModule('description')}
        />
      </nav>
      <div className="p-4">{renderModule()}</div>
    </div>
  );
};

export default Test;
