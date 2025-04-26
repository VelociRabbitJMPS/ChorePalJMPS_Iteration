function Login() {
  return (
    <div>
      <h1>Welcome to ChorePal</h1>
      <div>
        <h2>Login</h2>
        <form action='/login' method='POST'>
          <label htmlFor='email'>Email:</label>
          <br />
          <input type='text' id='email' name='email' />
          <br />
          <br />

          <label htmlFor='password'>Password:</label>
          <br />
          <input type='password' id='password' name='password' />
          <br />
          <br />

          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
