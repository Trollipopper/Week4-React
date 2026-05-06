import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {useComments, useLikes, useMedia, useRatings} from '../hooks/apiHooks';

const Profile = () => {
  const {user} = useUserContext();
  const {getMediaByToken} = useMedia();
  const {getCommentsByUserToken} = useComments();
  const {getLikesByUserIdOrToken} = useLikes();
  const {getRatingsByUserToken} = useRatings();
  const [media, setMedia] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [mediaResult, commentsResult, likesResult, ratingsResult] =
          await Promise.allSettled([
            getMediaByToken(token),
            getCommentsByUserToken(token),
            getLikesByUserIdOrToken(token),
            getRatingsByUserToken(token),
          ]);

        const mediaData =
          mediaResult.status === 'fulfilled' ? mediaResult.value : [];
        const commentsData =
          commentsResult.status === 'fulfilled' ? commentsResult.value : [];
        const likesData =
          likesResult.status === 'fulfilled' ? likesResult.value : [];
        const ratingsData =
          ratingsResult.status === 'fulfilled' ? ratingsResult.value : [];

        setMedia(Array.isArray(mediaData) ? mediaData : mediaData.media || []);
        setComments(
          Array.isArray(commentsData)
            ? commentsData
            : commentsData.comments || []
        );
        setLikes(Array.isArray(likesData) ? likesData : likesData.likes || []);
        setRatings(
          Array.isArray(ratingsData) ? ratingsData : ratingsData.ratings || []
        );
      } catch (err) {
        console.error('Failed to load profile data', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
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
      {loading ? (
        <p>Loading profile data...</p>
      ) : (
        <>
          <section>
            <h3>My uploads</h3>
            <ul>
              {media.length > 0 ? (
                media.map((item) => (
                  <li key={item.media_id}>
                    {item.title} - {item.media_type}
                  </li>
                ))
              ) : (
                <li>No uploads yet.</li>
              )}
            </ul>
          </section>
          <section>
            <h3>My comments</h3>
            <ul>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <li key={comment.comment_id}>{comment.comment_text}</li>
                ))
              ) : (
                <li>No comments yet.</li>
              )}
            </ul>
          </section>
          <section>
            <h3>My likes</h3>
            <ul>
              {likes.length > 0 ? (
                likes.map((like) => (
                  <li key={like.like_id}>Liked media #{like.media_id}</li>
                ))
              ) : (
                <li>No likes yet.</li>
              )}
            </ul>
          </section>
          <section>
            <h3>My ratings</h3>
            <ul>
              {ratings.length > 0 ? (
                ratings.map((rating) => (
                  <li key={rating.rating_id}>
                    Rated media #{rating.media_id}: {rating.rating_value}/5
                  </li>
                ))
              ) : (
                <li>No ratings yet.</li>
              )}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Profile;
