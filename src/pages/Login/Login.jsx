
import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../utils/api/usersApi';
const photoUrl = import.meta.env.VITE_PHOTO_URL;

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async (event) => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);

    try {
      const response = await login({
        username: formData.get("username"),
        password: formData.get("password"),
      });

      console.log("response.access", response);

      localStorage.setItem('userData', JSON.stringify(response.modifiedResponse));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='loginContainer'>
      <div className='leftLogin'>
        <h1>Winku</h1>
        <p>Winku is free to use for as long as you want with two active projects.</p>
        <div className="imgBord">
          {/* <img src="https://wpkixx.com/html/winku/images/wink.png" alt="" /> */}
          <img src={`${photoUrl}upload/default/login/wink.png`} alt="img" />

        </div>
        <p>Follow Us on</p>
      </div>
      <div className="rightLogin">
        <div className='loginBlok'>
          <h1>Login</h1>
          <span>Don’t use Winku Yet?<a href=""> Take the tour </a>or <a href="">Join now</a></span>
          <form onSubmit={onLogin}>
            <input placeholder='Username' name="username" type="text" className='loginInput' />
            <input placeholder="Password" name="password" type="password" className='loginInput' />
            {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
            <div className='loginCheck'>
              <input className='remember' type="checkbox" />
              <span>Always Remember Me.</span>
              <div className='forgot hover:underline decoration-sky-500/30'><a href=""> Forgot Password?</a></div>
            </div>
            <div className="buttons">
              <button className="loginButton" type='submit'>Login</button>
              <NavLink to="/auth/register"><button className="loginButton" type="button"> Register </button></NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
