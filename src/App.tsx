import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToDoList } from './Components/ToDoList/ToDoList';
import { UiTaskCardDetail } from './Components/UiTaskCardDetail/UiTaskCardDetail';
import { useAppSelector } from './store/hook';
import { createDefaulTask } from './utils';
import { UiTaskCardBilder } from './Components/UiTaskCardBilder/UiTaskCardBilder';

// npm run dev

function App() {
  const isEdit = useAppSelector(state=>state.tasksSlice.isEdit)
  return (
    < >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/:id" element={<UiTaskCardDetail />} />
      </Routes>
    </BrowserRouter>
    {isEdit && <UiTaskCardBilder/>}
    </>
  )
}

export default App
