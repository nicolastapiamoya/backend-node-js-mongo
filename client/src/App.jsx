import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className='text-5xl font-bold'>Home Page</h1>}/>
        <Route path="/login" element={LoginPage}/>
        <Route path="/register" element={RegisterPage}/>
        <Route path="/tasks" element={<h1 className='text-5xl font-bold'>Tasks Page</h1>}/>
        <Route path="/add-task" element={<h1 className='text-5xl font-bold'>Add task</h1>}/>
        <Route path="/tasks/:id" element={<h1 className='text-5xl font-bold'>update tasks</h1>}/>
        <Route path="/profile" element={<h1 className='text-5xl font-bold'>Profile</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App