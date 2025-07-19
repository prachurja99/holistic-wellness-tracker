// src/pages/RegisterLogin.js
import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const RegisterLogin = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ padding: '2rem' }}>
      <div>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Register</button>
      </div>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
};

export default RegisterLogin;
