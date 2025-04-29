import { useState } from 'react';
import './Login.css';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const BASE_URL = 'http://localhost:3000';

  async function handleSubmit(e) {
    e.preventDefault();

    const endpoint = isLoginMode ? '/users/login' : '/users';
    const payload = isLoginMode
      ? { email, password }
      : { email, password, name, children: [] };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (isLoginMode) {
        if (data.success) {
          setSuccess(true);
          setError('');
          localStorage.setItem('token', data.token);
          window.location.href = '/dashboard';
        } else {
          setError(data.message);
          setSuccess(false);
        }
      } else {
        if (data.insertedId) {
          setSuccess(true);
          setError('');
          setIsLoginMode(true);
        } else {
          setError(data.message || 'Failed to create account');
          setSuccess(false);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
      setSuccess(false);
    }
  }

  function switchMode() {
    setIsLoginMode(!isLoginMode);
    setError('');
    setSuccess(false);
    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    <div className='wrapper'>
      <div>
        <h2>
          Welcome to ChorePal<br></br>
          {isLoginMode ? 'Login' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <label htmlFor='name'>Name:</label>
              <br />
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <br />
            </>
          )}

          <label htmlFor='email'>Email:</label>
          <br />
          <input
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor='password'>Password:</label>
          <br />
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />

          <button type='submit'>
            {isLoginMode ? 'Login' : 'Create Account'}
          </button>
        </form>

        <button onClick={switchMode} style={{ marginTop: '10px' }}>
          {isLoginMode ? 'Create an account' : 'Already have an account? Login'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && (
          <p style={{ color: 'green' }}>
            {isLoginMode
              ? 'Login successful!'
              : 'Account created! Please login.'}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
