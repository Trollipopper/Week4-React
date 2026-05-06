import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {getMediaList} = useMedia();

  useEffect(() => {
    const loadMedia = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await getMediaList(1, 20);
        const list = Array.isArray(result) ? result : result?.media || [];
        setMediaArray(list);
      } catch (err) {
        console.error('API Error:', err);
        // Fallback: Load from local test.json if API fails (e.g., CORS)
        try {
          const testData = await fetch('test.json').then((res) => res.json());
          setMediaArray(testData);
          console.log('Loaded fallback test data');
        } catch (fallbackErr) {
          console.error('Fallback Error:', fallbackErr);
          setError(err?.message || 'Failed to load media');
        }
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  return (
    <>
      <section>
        <h1>My Media</h1>
        <p>
          Browse the latest uploads, open any item, and interact with comments,
          likes, ratings, and tags.
        </p>
      </section>
      {loading && <p>Loading media...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && mediaArray.length === 0 && (
        <p>No media found yet.</p>
      )}
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
