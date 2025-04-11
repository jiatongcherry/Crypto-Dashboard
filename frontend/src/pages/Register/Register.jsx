import React, { useState, useContext } from 'react'
import './Register.css'
import { Navigate, useNavigate } from 'react-router-dom'; //for routing
import { useAuth } from '../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'

const Register = () => {
  const { userLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) return alert('Passwords do not match!');
    const res = await doCreateUserWithEmailAndPassword(email, password);
    console.log(res);
  };

  return (
    <>
      {userLoggedIn && (<Navigate to="/" replace={true} />)}
      <div className='login'>
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Cryptoplace</h3>
            <span className="loginDesc">Crypto price tracking</span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className='loginInput'
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='loginInput'
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='loginInput'
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className='loginInput'
                />
                <button type="submit" className='loginButton'>Register</button>
              </form>
              <button className='loginRegisterButton' onClick={() => navigate('/login')}>
                Log into Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
