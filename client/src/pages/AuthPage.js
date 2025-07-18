import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      {showRegister ? (
        <>
          <Register onSuccess={() => setShowRegister(false)} />
          <p style={{ marginTop: '1rem' }}>
            Already have an account?{' '}
            <button onClick={() => setShowRegister(false)} style={{ cursor: 'pointer', color: 'blue', background: 'none', border: 'none', padding: 0 }}>
              Login
            </button>
          </p>
        </>
      ) : (
        <>
          <Login />
          <p style={{ marginTop: '1rem' }}>
            Don't have an account?{' '}
            <button onClick={() => setShowRegister(true)} style={{ cursor: 'pointer', color: 'blue', background: 'none', border: 'none', padding: 0 }}>
              Register
            </button>
          </p>
        </>
      )}
    </div>
  );
}

