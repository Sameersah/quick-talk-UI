import logo from './logo.svg';
import './App.css';

import ChatComponent from './ChatComponent';  // Importing your chat component

function App() {
  return (
    <div className="App">
      <h1>Chat Application</h1>
      <ChatComponent />  {/* Rendering the ChatComponent */}
    </div>
  );
}

export default App;
