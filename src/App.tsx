import './App.css'
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
function App() {
  const isLoggedIn = useSelector((state:RootState)=>state.auth.currentUser);
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/login' element={isLoggedIn ? <Navigate to="/dashboard"/>:<LoginUser/>}/>
        <Route path='/register' element={isLoggedIn ? <Navigate to="/dashboard"/>:<RegisterUser/>}/>
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard/>:<Navigate to="/login"/>}/>
        <Route path="/" element={<Typography>Welcome to Library Management System !!</Typography>}/>
        <Route path="*" element={isLoggedIn ? <Navigate to="/dashboard"/>:<Navigate to="/login"/>}/>
      </Routes>
    </Router>
  )
}

export default App
