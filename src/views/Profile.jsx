import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const load = async () => {
      try {
        const data = await getUserByToken(token);
        setUser(data);
      } catch (err) {
        console.error('Failed to load user', err);
      }
    };
    load();
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Profile</h2>
        <p>No user data. Please log in.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
