import React, { useState, useContext } from 'react'
import './Login.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'; //for routing
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth'
import { useAuth } from '../../contexts/authContext'

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email && password){
      await doSignInWithEmailAndPassword(email, password);
    }else{
      alert('Please enter email and password');
    }
  }


  return (
    <div>
      {userLoggedIn && (<Navigate to="/" replace={true} />)}
      <div className='login'>
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Cryptoplace</h3>
            <span className="loginDesc">Crypto price tracking</span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <form className='loginForm' onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  className="loginEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="loginPwd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="loginButton" type="submit">Log In</button>
              </form>
              <span className="loginForgot">Forget Password?</span>
              <button className='loginRegisterButton' onClick={() => navigate('/register')} >
                Create a New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;