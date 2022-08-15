import Login from './components/Login';
import  { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react';
import Register from './components/Register';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Users/login' element={<Login />} />
        <Route path='/Users/register' element={<Register />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
