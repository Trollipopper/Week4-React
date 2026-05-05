import React from 'react';
import useForm from '../hooks/formHooks';
import {useAuthentication} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const LoginForm = () => {
  const initValues = {username: '', password: ''};
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const doLogin = async (inputs) => {
    try {
      const result = await postLogin(inputs);
      console.log(result);
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        navigate('/', {replace: true});
      }
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(() => doLogin(inputs), initValues);

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
