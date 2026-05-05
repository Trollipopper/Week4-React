import React from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

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
