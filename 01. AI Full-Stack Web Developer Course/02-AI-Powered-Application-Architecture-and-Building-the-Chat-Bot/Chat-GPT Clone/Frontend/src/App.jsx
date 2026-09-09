import './App.css';
import Sidebar from './Componentes/Sidebar/Sidebar';
import ChatHeader from './Componentes/ChatHeader/ChatHeader'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className='main'>
        <ChatHeader />
      </main>
    </div>
  );
}

export default App;