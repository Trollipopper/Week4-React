import React from 'react';
import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const item = state?.item;

  if (!item) {
    return (
      <div>
        <h2>No media selected</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const isVideo = item.media_type?.startsWith('video/');

  return (
    <div className="single-view-page">
      <button onClick={() => navigate(-1)}>Go back</button>
      <h3>{item.title}</h3>
      <p>Owner: {item.username || 'unknown'}</p>
      <p>{item.description || 'No description provided.'}</p>
      <div className="single-view__media">
        {isVideo ? (
          <video controls src={item.filename} />
        ) : (
          <img src={item.filename} alt={item.title} />
        )}
      </div>
    </div>
  );
};

export default Single;
