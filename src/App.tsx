import './App.scss'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ToDoList } from './Components/ToDoList/ToDoList';
import { UiTaskCardDetail } from './Components/UiTaskCardDetail/UiTaskCardDetail';
import Contacts from './Components/Contacts/Contacts/Contacts';
import WelcomePage from './Components/WelcomePage/WelcomePage/WelcomePage';
import AppLayout from './Components/General/AppLayout/AppLayout';
import TaskLayout from './Components/General/TaskLayout/TaskLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<AppLayout />}>
            <Route path="" element={<WelcomePage />} />

            <Route path="" element={<TaskLayout />} >
              <Route path="/tasks" element={<ToDoList />} />
              <Route path="/tasks/:id" element={<UiTaskCardDetail />} />
            </Route>

            <Route path="/contacts" element={<Contacts />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
