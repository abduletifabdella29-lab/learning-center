import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Sidebar from './Componentes/Sidebar/Sidebar.jsx';
import ChatHeader from './Componentes/ChatHeader/ChatHeader.jsx';
import MessageList from './Componentes/MessageList/MessageList.jsx';
import ChatInput from './Componentes/ChatInput/ChatInput.jsx';

import './App.css';

const API_BASE_URL = 'http://localhost:3777/api';

function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  async function fetchConversations() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/chat/conversations`);

      if (data.success && data.data?.conversations) {
        setConversations(data.data.conversations);
      } else {
        setConversations(Array.isArray(data) ? data : data.data || []);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, isLoading]);

  const handleSendMessage = async question => {
    const tempUserMessage = {
      id: Date.now(),
      role: 'user',
      content: question,
    };
    setConversations(prev => [...prev, tempUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat/conversation`, {
        question,
      });

      if (response.data.success) {
        const { userConversation, assistantConversation } = response.data.data;
        
        setConversations(prev => {
          const filtered = prev.filter(msg => msg.id !== tempUserMessage.id);
          return [...filtered, userConversation, assistantConversation];
        });
      }
    } catch (error) {
      console.error('Error posting conversation:', error);

      const errorMessage =
        error.response?.data?.message ||
        'There was an error generating a response.';

      const errorConversation = {
        id: Date.now() + 1,
        role: 'assistant',
        content: errorMessage,
      };

      setConversations(prev => [...prev, errorConversation]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <ChatHeader />

        <MessageList 
          conversations={conversations} 
          isLoading={isLoading} 
          messagesEndRef={messagesEndRef} 
        />

        <ChatInput 
          handleSendMessage={handleSendMessage} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
}

export default App;