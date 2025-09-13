import React from 'react';
import { Send, Mic, MicOff, Volume2 } from 'lucide-react';

const InputArea = ({ 
  currentMessage, 
  setCurrentMessage, 
  handleSendMessage, 
  handleVoiceInput, 
  handleKeyPress, 
  isRecording,
  inputRef 
}) => {
  return (
    <div className="bg-white border-t px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "Recording..." : "Type your message in English..."}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={1}
            disabled={isRecording}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!currentMessage.trim() || isRecording}
          className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>Press Enter to send</span>
          <span>•</span>
          <span>Use microphone for voice input</span>
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 size={16} className="text-gray-400" />
          <span className="text-xs text-gray-500">Voice feedback enabled</span>
        </div>
      </div>
    </div>
  );
};

export default InputArea;