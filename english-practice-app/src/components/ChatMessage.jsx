import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
        message.type === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-white text-gray-800 shadow-sm'
      }`}>
        <div className="flex items-start space-x-2">
          {message.type === 'bot' && (
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={12} className="text-white" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm leading-relaxed">{message.content}</p>
            <p className={`text-xs mt-2 ${
              message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {message.type === 'user' && (
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <User size={12} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;