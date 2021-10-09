import Sidebar from '../src/components/Sidebar/Sidebar.component.jsx'

import './App.css';
import Messages from './components/Messages/Messages.component.jsx';

function App() {
  return (
    <div>
      <Sidebar/>
      <div style={{paddingLeft:'350px'}}>
      <Messages/>
      </div>
      
    </div>
  );
}

export default App;
