import React from 'react';
import ChatMessage from './ChatMessage';
import CorrectionMessage from './CorrectionMessage';
import TypingIndicator from './TypingIndicator';

const ChatArea = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === 'correction' ? (
            <CorrectionMessage corrections={message.corrections} />
          ) : (
            <ChatMessage message={message} />
          )}
        </div>
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatArea;