import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from './components/RegisterPage';
import Navbar from './components/Navbar';
import './App.css'
import Dashboard from './components/Dashboard';
import EditBookModal from './components/EditBookModal';
import AssignedBooks from './components/AssignedBooks';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-book/:id" element={<EditBookModal book={{
          id: '',
          title: '',
          author: ''
        }} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/assigned-books" element={<AssignedBooks />} />
      </Routes>
    </Router>
  )
}

export default App
