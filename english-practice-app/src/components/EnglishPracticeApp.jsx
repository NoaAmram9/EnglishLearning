import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import InputArea from './InputArea';
import { sendMessageToChatGPT } from '../services/apiService';
import { detectAndCorrectErrors } from '../services/correctionService';

const EnglishPracticeApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your English practice assistant. Let's have a conversation to improve your English skills. What would you like to talk about today?",
      corrections: null,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [practiceStats, setPracticeStats] = useState({
    totalMessages: 0,
    correctionsGiven: 0,
    practiceTime: 0
  });
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      corrections: null,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // Step 1: Check for grammar/language errors
      const corrections = await detectAndCorrectErrors(messageToProcess);
      
      // Step 2: Get ChatGPT response
      const botResponse = await sendMessageToChatGPT(messageToProcess, corrections);
      
      const newMessages = [];
      
      // Add correction message if there are errors
      if (corrections.hasErrors) {
        const correctionMessage = {
          id: Date.now() + 1,
          type: 'correction',
          content: '',
          corrections: corrections,
          timestamp: new Date()
        };
        newMessages.push(correctionMessage);
        setPracticeStats(prev => ({ ...prev, correctionsGiven: prev.correctionsGiven + 1 }));
      }
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 2,
        type: 'bot',
        content: botResponse,
        corrections: null,
        timestamp: new Date()
      };
      newMessages.push(botMessage);
      
      setMessages(prev => [...prev, ...newMessages]);
      setPracticeStats(prev => ({ ...prev, totalMessages: prev.totalMessages + 1 }));
      
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback response in case of error
      const errorMessage = {
        id: Date.now() + 2,
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        corrections: null,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Voice recording logic will be implemented here
      setTimeout(() => {
        setIsRecording(false);
        setCurrentMessage("This is a mock voice input message");
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewSession = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        content: "Hello! Let's start a fresh conversation. What would you like to practice today?",
        corrections: null,
        timestamp: new Date()
      }
    ]);
    setPracticeStats({
      totalMessages: 0,
      correctionsGiven: 0,
      practiceTime: 0
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar practiceStats={practiceStats} />
      <div className="flex-1 flex flex-col">
        <Header onNewSession={startNewSession} />
        <ChatArea 
          messages={messages} 
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
        <InputArea 
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          handleSendMessage={handleSendMessage}
          handleVoiceInput={handleVoiceInput}
          handleKeyPress={handleKeyPress}
          isRecording={isRecording}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

export default EnglishPracticeApp;