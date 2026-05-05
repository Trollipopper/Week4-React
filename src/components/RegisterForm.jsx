import React from 'react';
import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const initValues = {username: '', password: '', email: ''};
  const {postUser} = useUser();

  const doRegister = async (inputs) => {
    try {
      const result = await postUser(inputs);
      console.log('Register result', result);
    } catch (err) {
      console.error('Register error', err);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(() => doRegister(inputs), initValues);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reguser">Username</label>
          <input
            id="reguser"
            name="username"
            type="text"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="regemail">Email</label>
          <input
            id="regemail"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="regpassword">Password</label>
          <input
            id="regpassword"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
