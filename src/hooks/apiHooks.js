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

  return {getUserByToken, postUser};
};

export const useMedia = () => {
  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      filesize: file.filesize,
      media_type: file.media_type,
      mimetype: file.mimetype,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaData),
    };
    const result = await fetchData(import.meta.env.VITE_MEDIA_API + '/media', fetchOptions);
    return result;
  };

  return {postMedia};
};

export const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const result = await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload', fetchOptions);
    return result;
  };

  return {postFile};
};

export default fetchData;
