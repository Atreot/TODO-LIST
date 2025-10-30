import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import NewNotificationsSnackbar from './Components/notificationsSnackbar/NewNotificationsSnackbar.tsx';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
        <NewNotificationsSnackbar />
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
)
