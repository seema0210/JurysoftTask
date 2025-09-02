import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HabitTracker from './components/HabitTracker'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HabitTracker/>}/>
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </ThemeProvider>
  )
}

export default App