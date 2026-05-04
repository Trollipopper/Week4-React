import PropTypes from 'prop-types';

const SingleView = ({item, setSelectedItem}) => {
  if (!item) {
    return null;
  }

  const isVideo = item.media_type?.startsWith('video/');

  return (
    <dialog className="single-view" open={Boolean(item)}>
      <div className="single-view__header">
        <h3>{item.title}</h3>
        <button type="button" onClick={() => setSelectedItem(null)}>
          Close
        </button>
      </div>
      <p>{item.description || 'No description provided.'}</p>
      <div className="single-view__media">
        {isVideo ? (
          <video controls src={item.filename} />
        ) : (
          <img src={item.filename} alt={item.title} />
        )}
      </div>
    </dialog>
  );
};

SingleView.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number,
    filename: PropTypes.string,
    media_type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  setSelectedItem: PropTypes.func.isRequired,
};

export default SingleView;
