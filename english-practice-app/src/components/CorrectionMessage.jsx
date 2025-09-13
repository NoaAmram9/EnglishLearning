import React from 'react';
import { BookOpen } from 'lucide-react';

const CorrectionMessage = ({ corrections }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-lg">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <BookOpen size={12} className="text-white" />
          </div>
          <h4 className="font-semibold text-yellow-800">Grammar Correction</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-red-600 font-medium">Original: </span>
            <span className="text-red-600 italic">"{corrections.originalText}"</span>
          </div>
          <div>
            <span className="text-green-600 font-medium">Corrected: </span>
            <span className="text-green-600 font-medium">"{corrections.correctedText}"</span>
          </div>
          {corrections.explanation && (
            <div>
              <span className="text-yellow-700 font-medium">Explanation: </span>
              <span className="text-yellow-700">{corrections.explanation}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorrectionMessage;