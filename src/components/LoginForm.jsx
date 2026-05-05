import React from 'react';
import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const initValues = {username: '', password: ''};
  const {handleLogin} = useUserContext();

  const doLogin = async (inputs) => {
    try {
      await handleLogin(inputs);
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    () => doLogin(inputs),
    initValues
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
