import React from 'react';
import { Settings, RefreshCw } from 'lucide-react';

const Header = ({ onNewSession }) => {
  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">English Practice Chat</h1>
          <p className="text-gray-600">Practice your English with AI assistance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          <button 
            onClick={onNewSession}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>New Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;