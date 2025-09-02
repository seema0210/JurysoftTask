import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
function App() {
  
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='/create' element={<CreateUser/>}/>
        <Route path='/updaqte' element={<UpdateUser/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
