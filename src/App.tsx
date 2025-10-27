import './App.scss'
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { ToDoList } from './Components/ToDoList/ToDoList';
import { UiTaskCardDetail } from './Components/UiTaskCardDetail/UiTaskCardDetail';
import { useAppSelector } from './store/hook';
import { UiTaskCardBilder } from './Components/UiTaskCardBilder/UiTaskCardBilder';
import { Provider } from './components/ui/provider';
import { StyledEngineProvider } from '@mui/material/styles';
import Contacts from './Components/Contacts/Contacts/Contacts';
import WelcomePage from './Components/WelcomePage/WelcomePage/WelcomePage';
import AppLayout from './Components/General/AppLayout/AppLayout';
import NotificationsSnackbar from './Components/notificationsSnackbar/NotificationsSnackbar';


// npm run dev

function App() {


  const isEdit = useAppSelector(state => state.tasksSlice.isEdit)
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Provider>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<AppLayout />}>
                <Route path="" element={<WelcomePage />} />

                <Route path="/tasks" element={isEdit && <UiTaskCardBilder />}>
                  <Route path="/tasks" element={<ToDoList />} />
                  <Route path="/tasks/:id" element={<UiTaskCardDetail />} />
                </Route>

                <Route path="/contacts" element={<Contacts />} />

              </Route>
            </Routes>
          </BrowserRouter>
          <NotificationsSnackbar/>
        </Provider>

      </StyledEngineProvider>
    </>
  )
}

export default App
