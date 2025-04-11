import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import { UserProvider } from './UserContext';
import {app} from './firebaseConfig';
import { AuthProvider } from './contexts/authContext';

const App = () => {
  return (
    <AuthProvider>
    <UserProvider>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<Coin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </UserProvider>
    </AuthProvider>
  );
}

export default App;
