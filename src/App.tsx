import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from './components/RegisterPage';
import Navbar from './components/Navbar';
import './App.css'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<div className="text-center mt-10">Welcome to library management system</div>}></Route>
      </Routes>
    </Router>
  )
}

export default App
