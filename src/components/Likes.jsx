import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({mediaId}) => {
  const {user} = useUserContext();
  const {getLikeCountByMediaId, getLikeByUser, postLike, deleteLike} =
    useLike();
  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);
  const token = localStorage.getItem('token');

  const loadLikes = async () => {
    if (!mediaId) {
      setLikeCount(0);
      setUserLike(null);
      return;
    }

    try {
      const countResult = await getLikeCountByMediaId(mediaId);
      setLikeCount(countResult.count || 0);
    } catch (err) {
      console.error('Failed to load like count', err);
      setLikeCount(0);
    }

    if (!token) {
      setUserLike(null);
      return;
    }

    try {
      const likeResult = await getLikeByUser(mediaId, token);
      setUserLike(likeResult);
    } catch (err) {
      if (err?.message === 'No likes found' || err?.status === 404) {
        setUserLike(null);
        return;
      }
      setUserLike(null);
    }
  };

  useEffect(() => {
    loadLikes();
  }, [mediaId, token]);

  const handleLikeToggle = async () => {
    if (!token || !mediaId) {
      return;
    }

    if (userLike?.like_id) {
      await deleteLike(userLike.like_id, token);
    } else {
      await postLike({media_id: mediaId}, token);
    }

    await loadLikes();
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-900">
        {likeCount} likes
      </span>
      {token ? (
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          onClick={handleLikeToggle}
        >
          {userLike?.like_id ? 'Unlike' : 'Like'}
        </button>
      ) : (
        <span className="text-sm text-slate-500">
          Log in to like this media.
        </span>
      )}
    </div>
  );
};

Likes.propTypes = {
  mediaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Likes;
