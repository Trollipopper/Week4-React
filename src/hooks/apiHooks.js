import {useState, useEffect} from 'react';

const fetchData = async (url, options = {}) => {
  try {
    console.log('Fetching:', url, options);
    const res = await fetch(url, options);
    console.log('Response status:', res.status);
    const data = await res.json();
    if (!res.ok) {
      console.error('Response error:', res.status, data);
      throw data;
    }
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
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
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );
    return loginResult;
  };

  return {postLogin};
};

export const useUser = () => {
  const getUserByToken = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      {method: 'GET', headers}
    );
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
    const result = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions
    );
    return result;
  };

  return {getUserByToken, postUser};
};

export const useMedia = () => {
  const postMedia = async (file, inputs, token) => {
    // file response contains: {data: {filename, media_type, filesize}, message}
    const fileData = file.data || file;
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: fileData.filename,
      filesize: fileData.filesize,
      media_type: fileData.media_type,
    };
    console.log('Posting media:', mediaData);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaData),
    };
    try {
      const result = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
        fetchOptions
      );
      return result;
    } catch (err) {
      console.error('postMedia error:', err);
      throw err;
    }
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
    const result = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions
    );
    return result;
  };

  return {postFile};
};

export default fetchData;
