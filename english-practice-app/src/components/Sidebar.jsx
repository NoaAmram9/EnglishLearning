import React from 'react';
import { BookOpen, Send, Trophy } from 'lucide-react';
import StatCard from './StatCard';

const Sidebar = ({ practiceStats }) => {
  const topics = [
    'Daily Life', 
    'Work & Career', 
    'Hobbies', 
    'Travel', 
    'Food', 
    'Technology',
    'Movies & TV',
    'Sports',
    'Weather',
    'Family & Friends'
  ];

  return (
    <div className="w-80 bg-white shadow-lg border-r">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <BookOpen className="text-white" size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Practice Stats</h2>
            <p className="text-sm text-gray-600">Your progress today</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <StatCard 
            icon={<Send size={16} />}
            label="Messages Sent"
            value={practiceStats.totalMessages}
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            icon={<Trophy size={16} />}
            label="Corrections Received"
            value={practiceStats.correctionsGiven}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard 
            icon={<BookOpen size={16} />}
            label="Practice Time"
            value={`${practiceStats.practiceTime} min`}
            color="bg-blue-100 text-blue-600"
          />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Quick Topics</h3>
        <div className="space-y-2">
          {topics.map((topic) => (
            <button 
              key={topic}
              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                // This will be implemented to start conversation with specific topic
                console.log(`Starting conversation about: ${topic}`);
              }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;