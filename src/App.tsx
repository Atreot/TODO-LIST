import { useState } from 'react'

import './App.css'
import UiTaskCard from './Components/UiTaskCard/UiTaskCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>ToDoList</h1>
      <div className="card">
        <UiTaskCard id={0} title={'1 Task'} description={' Hello,  Hello,  Hello,  Hello,  Hello,  Hello,  Hello, '} isCompleted={false}  />
      </div>
      
    </>
  )
}

export default App
