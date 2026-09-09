import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Sidebar from './Componentes/Sidebar/Sidebar.jsx';
import ChatHeader from './Componentes/ChatHeader/ChatHeader.jsx';
import MessageList from './Componentes/MessageList/MessageList.jsx';

import './App.css';

function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  async function fetchConversations() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        'http://localhost:3777/api/chat/conversations'
      );

      console.log(data);
      setConversations(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

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

        {/* <ChatMessage /> */}

      </main>
    </div>
  );
}

export default App;