import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import {fetchData} from '../utils/fetchData';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // Lab 2: Try to fetch from API with user enrichment
        const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
        const authUrl = import.meta.env.VITE_AUTH_API + '/users/';

        const media = await fetchData(mediaUrl);

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            try {
              const user = await fetchData(authUrl + item.user_id);
              return {...item, username: user.username};
            } catch {
              return {...item, username: 'unknown'};
            }
          })
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('API Error:', error);

        // Lab 1 fallback: Load from local test.json
        try {
          const json = await fetchData('test.json');
          setMediaArray(json.map((item) => ({...item, username: 'local-user'})));
        } catch (fallbackError) {
          console.error('Fallback Error:', fallbackError);
        }
      }
    };

    getMedia();
  }, []);

  console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
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
