
import './App.scss';
import EditableContent from './editable-content';
import { motion } from "framer-motion"

function App() {
  return (
    <div className="App">
      <h1>
        Editable component
      </h1>
      <div className='center'>

<EditableContent/>
      
      </div>
    </div>
  );
}

export default App;
