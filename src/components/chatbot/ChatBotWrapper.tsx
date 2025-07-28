
import React, { useState } from 'react';
import ChatBot from './ChatBot';
import ChatBotToggle from './ChatBotToggle';

const ChatBotWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatBot isOpen={isOpen} onToggle={toggleChatBot} />
      {!isOpen && <ChatBotToggle onClick={toggleChatBot} />}
    </>
  );
};

export default ChatBotWrapper;
