import PropTypes from 'prop-types';
import {Link} from 'react-router';

const MediaRow = ({item}) => {
  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description || '-'}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize.toLocaleString()}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to={`/single/${item.media_id}`} state={{item}}>
          View
        </Link>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number,
    filename: PropTypes.string,
    thumbnail: PropTypes.string,
    filesize: PropTypes.number,
    media_type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default MediaRow;
