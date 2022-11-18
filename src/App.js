
import { useState } from 'react';
import './App.scss';
import EditableContent from './editable-content';


function App() {
  const [title, setTitle] = useState("Here is plain text till now")
  return (
    <div className="App">
      <h1>
        Editable component
      </h1>
      <div className='center'>

        <EditableContent
          title={title}
          setTitle={setTitle}
        />

      </div>
    </div>
  );
}

export default App;
