import { useState } from 'react';

export const useMessages = (initialMessage = '') => {
  const [currentMessage, setCurrentMessage] = useState(initialMessage);
  
  const updateMessage = (message) => {
    setCurrentMessage(message);
  };

  return {
    currentMessage,
    updateMessage
  };
};
