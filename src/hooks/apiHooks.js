import {useState, useEffect} from 'react';

const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  } catch (err) {
    throw err;
  }
};

export const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
    return loginResult;
  };

  return {postLogin};
};

export const useUser = () => {
  const getUserById = async (id) => {
    const result = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + id);
    return result;
  };

  const getUserByToken = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', {method: 'GET', headers});
    return result;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const result = await fetchData(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
    return result;
  };

  return {getUserById, getUserByToken, postUser};
};

export const useMedia = () => {
  const getMediaList = async () => {
    const result = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
    return result;
  };

  return {getMediaList};
};

export default fetchData;
