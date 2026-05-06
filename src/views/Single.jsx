import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router';
import Likes from '../components/Likes';
import {useUserContext} from '../hooks/contextHooks';
import {useComments, useMedia, useRatings, useTags} from '../hooks/apiHooks';

const Single = () => {
  const navigate = useNavigate();
  const {mediaId} = useParams();
  const {state} = useLocation();
  const initialItem = state?.item || null;
  const {user} = useUserContext();
  const {getMediaById, modifyMedia, deleteMedia} = useMedia();
  const {getCommentsByMediaId, postComment, getCommentCountByMediaId} =
    useComments();
  const {getAverageRating, getRatingsByMediaId, postRating} = useRatings();
  const {getTagsByMediaId, postTag, deleteTagFromMediaByTagName} = useTags();

  const [media, setMedia] = useState(initialItem);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [tagName, setTagName] = useState('');
  const [ratingValue, setRatingValue] = useState('');
  const [editTitle, setEditTitle] = useState(initialItem?.title || '');
  const [editDescription, setEditDescription] = useState(
    initialItem?.description || ''
  );

  const token = localStorage.getItem('token');
  const isVideo = media?.media_type?.startsWith('video/');

  const loadMediaDetails = async (id) => {
    if (!id) {
      setLoading(false);
      setError('No media selected');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const mediaResult = await getMediaById(id);
      setMedia(mediaResult);
      setEditTitle(mediaResult.title || '');
      setEditDescription(mediaResult.description || '');

      const [
        commentsResult,
        countResult,
        avgResult,
        ratingsResult,
        tagsResult,
      ] = await Promise.allSettled([
        getCommentsByMediaId(id),
        getCommentCountByMediaId(id),
        getAverageRating(id),
        getRatingsByMediaId(id),
        getTagsByMediaId(id),
      ]);

      setComments(
        commentsResult.status === 'fulfilled' ? commentsResult.value : []
      );
      setCommentCount(
        countResult.status === 'fulfilled' ? countResult.value.count || 0 : 0
      );
      setAverageRating(
        avgResult.status === 'fulfilled'
          ? (avgResult.value.average ?? null)
          : null
      );
      setRatings(
        ratingsResult.status === 'fulfilled' ? ratingsResult.value : []
      );
      setTags(tagsResult.status === 'fulfilled' ? tagsResult.value : []);
    } catch (err) {
      console.error('Failed to load media details', err);
      setError(err?.message || 'Failed to load media details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMediaDetails(mediaId || media?.media_id || initialItem?.media_id);
  }, [mediaId]);

  const refreshAfterAction = async () => {
    const id = mediaId || media?.media_id || initialItem?.media_id;
    await loadMediaDetails(id);
  };

  const handleCommentSubmit = async (evt) => {
    evt.preventDefault();
    if (!token || !media?.media_id || !commentText.trim()) {
      return;
    }

    await postComment(
      {comment_text: commentText.trim(), media_id: media.media_id},
      token
    );
    setCommentText('');
    await refreshAfterAction();
  };

  const handleRatingSubmit = async (evt) => {
    evt.preventDefault();
    if (!token || !media?.media_id || !ratingValue) {
      return;
    }

    await postRating(
      {rating_value: ratingValue, media_id: media.media_id},
      token
    );
    setRatingValue('');
    await refreshAfterAction();
  };

  const handleTagSubmit = async (evt) => {
    evt.preventDefault();
    if (!token || !media?.media_id || !tagName.trim()) {
      return;
    }

    await postTag({tag_name: tagName.trim(), media_id: media.media_id}, token);
    setTagName('');
    await refreshAfterAction();
  };

  const handleMediaUpdate = async (evt) => {
    evt.preventDefault();
    if (!token || !media?.media_id) {
      return;
    }

    try {
      await modifyMedia(
        media.media_id,
        {title: editTitle, description: editDescription},
        token
      );
      await refreshAfterAction();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update media: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleDeleteMedia = async () => {
    if (!token || !media?.media_id) {
      return;
    }

    const confirmed = window.confirm('Delete this media item?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteMedia(media.media_id, token);
      navigate('/', {replace: true});
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete media: ' + (err?.message || 'Unknown error'));
    }
  };

  const handleRemoveTag = async (tag) => {
    if (!token || !media?.media_id) {
      return;
    }

    await deleteTagFromMediaByTagName(media.media_id, tag.tag_name, token);
    await refreshAfterAction();
  };

  const isOwner = Boolean(
    user &&
    media &&
    (user.user_id === media.user_id || user.id === media.user_id)
  );

  if (loading) {
    return (
      <div>
        <h2>Loading media...</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Media not available</h2>
        <p role="alert">{error}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  if (!media) {
    return (
      <div>
        <h2>No media selected</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div className="single-view-page detail-page">
      <button onClick={() => navigate(-1)}>Go back</button>
      <header className="detail-hero">
        <div>
          <p className="eyebrow">Media #{media.media_id}</p>
          <h1>{media.title}</h1>
          <p>{media.description || 'No description provided.'}</p>
        </div>
        <div className="detail-stats">
          <span>{commentCount} comments</span>
          <span>
            {averageRating
              ? `Avg rating ${Number(averageRating).toFixed(1)}`
              : 'No ratings yet'}
          </span>
        </div>
      </header>

      <div className="single-view__media">
        {isVideo ? (
          <video controls src={media.filename} />
        ) : (
          <img src={media.filename} alt={media.title} />
        )}
      </div>

      <section className="detail-actions">
        <div className="grid gap-4">
          <Likes mediaId={media.media_id} />
          {token ? (
            <form onSubmit={handleRatingSubmit} className="inline-form">
              <label htmlFor="ratingValue">Rate</label>
              <select
                id="ratingValue"
                value={ratingValue}
                onChange={(evt) => setRatingValue(evt.target.value)}
              >
                <option value="">Choose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit">Save rating</button>
            </form>
          ) : (
            <p>Log in to like, rate, comment, and tag media.</p>
          )}
        </div>
      </section>

      <section>
        <h2>Tags</h2>
        <div className="tag-list">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <span key={tag.tag_id} className="tag-pill">
                {tag.tag_name}
                {token && (
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    Remove
                  </button>
                )}
              </span>
            ))
          ) : (
            <p>No tags yet.</p>
          )}
        </div>
        {token && (
          <form onSubmit={handleTagSubmit} className="stack-form">
            <label htmlFor="tagName">Add tag</label>
            <input
              id="tagName"
              value={tagName}
              onChange={(evt) => setTagName(evt.target.value)}
              placeholder="nature"
            />
            <button type="submit">Add tag</button>
          </form>
        )}
      </section>

      {isOwner && (
        <section>
          <h2>Edit media</h2>
          <form onSubmit={handleMediaUpdate} className="stack-form">
            <label htmlFor="editTitle">Title</label>
            <input
              id="editTitle"
              value={editTitle}
              onChange={(evt) => setEditTitle(evt.target.value)}
            />
            <label htmlFor="editDescription">Description</label>
            <textarea
              id="editDescription"
              rows={4}
              value={editDescription}
              onChange={(evt) => setEditDescription(evt.target.value)}
            />
            <div className="button-row">
              <button type="submit">Save changes</button>
              <button type="button" onClick={handleDeleteMedia}>
                Delete media
              </button>
            </div>
          </form>
        </section>
      )}

      <section>
        <h2>Comments</h2>
        {token && (
          <form onSubmit={handleCommentSubmit} className="stack-form">
            <label htmlFor="commentText">Write a comment</label>
            <textarea
              id="commentText"
              rows={4}
              value={commentText}
              onChange={(evt) => setCommentText(evt.target.value)}
              placeholder="Share your thoughts"
            />
            <button type="submit">Post comment</button>
          </form>
        )}
        <div className="card-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <article key={comment.comment_id} className="card">
                <p>{comment.comment_text}</p>
                <small>
                  Comment #{comment.comment_id} by user {comment.user_id} on{' '}
                  {new Date(comment.created_at).toLocaleString('fi-FI')}
                </small>
              </article>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </section>

      <section>
        <h2>Ratings</h2>
        <div className="card-list">
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <article key={rating.rating_id} className="card">
                <p>{rating.rating_value} / 5</p>
                <small>
                  Rating #{rating.rating_id} by user {rating.user_id} on{' '}
                  {new Date(rating.created_at).toLocaleString('fi-FI')}
                </small>
              </article>
            ))
          ) : (
            <p>No ratings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Single;
