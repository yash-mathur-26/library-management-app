import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<LoginUser/>}/>
        <Route path='/register' element={<RegisterUser/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
