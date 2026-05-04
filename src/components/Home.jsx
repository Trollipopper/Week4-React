import {useState} from 'react';
import MediaRow from './MediaRow';
import SingleView from './SingleView';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const mediaArray = [
    {
      media_id: 8,
      user_id: 5,
      filename: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
      thumbnail: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
      filesize: 170469,
      media_type: 'image/jpeg',
      title: 'Sleepy Cat',
      description: 'Real cat image from The Cat API.',
      created_at: '2024-01-07T20:49:34.000Z',
    },
    {
      media_id: 9,
      user_id: 7,
      filename: 'https://cataas.com/cat/cute',
      thumbnail: 'https://cataas.com/cat/small',
      filesize: 1002912,
      media_type: 'image/jpeg',
      title: 'Cute Cat',
      description: 'Random generated cat image.',
      created_at: '2024-01-07T21:32:27.000Z',
    },
    {
      media_id: 17,
      user_id: 2,
      filename: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail:
        'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_640.jpg',
      filesize: 1236616,
      media_type: 'video/mp4',
      title: 'Cat Video',
      description: 'Cat relaxing and moving around.',
      created_at: '2024-01-07T20:48:13.000Z',
    },
  ];

  return (
    <>
      <h2>My Media</h2>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
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
            <MediaRow
              key={item.media_id}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
