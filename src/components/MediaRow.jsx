import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const MediaRow = ({item}) => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const isAdmin = Boolean(
    user && (user.role === 'admin' || user.isAdmin || user.is_admin)
  );
  const isOwner = Boolean(
    user && (user.user_id === item.user_id || user.id === item.user_id)
  );
  const canManage = isAdmin || isOwner;
  const actionClass =
    'inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition';

  const handleModify = () => {
    navigate(`/single/${item.media_id}`, {state: {item}});
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this media item?');
    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    await deleteMedia(item.media_id, token);
    navigate(0);
  };

  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description || '-'}</td>
      <td>{item.username || 'unknown'}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize.toLocaleString()}</td>
      <td>{item.media_type}</td>
      <td>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/single/${item.media_id}`}
            state={{item}}
            className={`${actionClass} bg-sky-600 text-white hover:bg-sky-500`}
          >
            View
          </Link>
          {canManage && (
            <>
              <button
                type="button"
                className={`${actionClass} bg-amber-600 text-white hover:bg-amber-500`}
                onClick={handleModify}
              >
                Modify
              </button>
              <button
                type="button"
                className={`${actionClass} bg-rose-600 text-white hover:bg-rose-500`}
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
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
    username: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default MediaRow;
