const fetchData = async (url, options = {}) => {
  try {
    console.log('Fetching:', url, options);
    const res = await fetch(url, options);
    console.log('Response status:', res.status);
    const data = await res.json();
    if (!res.ok) {
      console.error('Response error:', res.status, data);
      throw data;
    }
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

const buildAuthHeaders = (token, extraHeaders = {}) => ({
  ...(token ? {Authorization: `Bearer ${token}`} : {}),
  ...extraHeaders,
});

const buildJsonOptions = (method, token, body, extraHeaders = {}) => ({
  method,
  headers: buildAuthHeaders(token, {
    'Content-Type': 'application/json',
    ...extraHeaders,
  }),
  body: JSON.stringify(body),
});

export const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );
    return loginResult;
  };

  return {postLogin};
};

export const useUser = () => {
  const getUserById = async (id) => {
    const result = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/' + id
    );
    return result;
  };

  const getUserByToken = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      {method: 'GET', headers}
    );
    return result;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const result = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions
    );
    return result;
  };

  return {getUserById, getUserByToken, postUser};
};

export const useMedia = () => {
  const getMediaList = async () => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media`);
  };

  const getMediaById = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media/${id}`);
  };

  const getMediaByUserId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media/byuser/${id}`);
  };

  const getMediaByToken = async (token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media/bytoken`, {
      method: 'GET',
      headers: buildAuthHeaders(token),
    });
  };

  const getMostLikedMedia = async () => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media/mostliked`);
  };

  const postMedia = async (file, inputs, token) => {
    // file response contains: {data: {filename, media_type, filesize}, message}
    const fileData = file.data || file;
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: fileData.filename,
      filesize: fileData.filesize,
      media_type: fileData.media_type,
    };
    console.log('Posting media:', mediaData);
    const fetchOptions = buildJsonOptions('POST', token, mediaData);
    try {
      const result = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
        fetchOptions
      );
      return result;
    } catch (err) {
      console.error('postMedia error:', err);
      throw err;
    }
  };

  const modifyMedia = async (id, inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      buildJsonOptions('PUT', token, {
        title: inputs.title,
        description: inputs.description,
      })
    );
  };

  const updateMedia = modifyMedia;

  const deleteMedia = async (id, token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/media/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(token),
    });
  };

  return {
    getMediaList,
    getMediaById,
    getMediaByUserId,
    getMediaByToken,
    getMostLikedMedia,
    postMedia,
    modifyMedia,
    updateMedia,
    deleteMedia,
  };
};

export const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const result = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions
    );
    return result;
  };

  return {postFile};
};

export const useComments = () => {
  const getCommentById = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/comments/${id}`);
  };

  const getCommentCountByMediaId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/comments/count/${id}`);
  };

  const getCommentsByMediaId = async (id) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/comments/bymedia/${id}`
    );
  };

  const getCommentsByUserToken = async (token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/comments/byuser`, {
      method: 'GET',
      headers: buildAuthHeaders(token),
    });
  };

  const postComment = async (inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/comments`,
      buildJsonOptions('POST', token, {
        comment_text: inputs.comment_text,
        media_id: Number(inputs.media_id),
      })
    );
  };

  const updateComment = async (id, inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/comments/${id}`,
      buildJsonOptions('PUT', token, {
        comment_text: inputs.comment_text,
      })
    );
  };

  return {
    getCommentById,
    getCommentCountByMediaId,
    getCommentsByMediaId,
    getCommentsByUserToken,
    postComment,
    updateComment,
  };
};

export const useLike = () => {
  const getLikeCountByMediaId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/likes/count/${id}`);
  };

  const getLikeByUser = async (mediaId, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes/bymedia/user/${mediaId}`,
      {
        method: 'GET',
        headers: buildAuthHeaders(token),
      }
    );
  };

  const postLike = async (inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes`,
      buildJsonOptions('POST', token, {
        media_id: Number(inputs.media_id),
      })
    );
  };

  const deleteLike = async (id, token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/likes/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(token),
    });
  };

  return {
    getLikeCountByMediaId,
    getLikeByUser,
    postLike,
    deleteLike,
  };
};

export const useLikes = () => {
  const getAllLikes = async () => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/likes`);
  };

  const getLikeCountByMediaId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/likes/count/${id}`);
  };

  const getLikesByMediaId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/likes/bymedia/${id}`);
  };

  const getLikesByUserIdOrToken = async (token, id = '') => {
    const suffix = id ? `/${id}` : '';
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes/byuser${suffix}`,
      {
        method: 'GET',
        headers: buildAuthHeaders(token),
      }
    );
  };

  const checkUserLike = async (mediaId, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes/bymedia/user/${mediaId}`,
      {
        method: 'GET',
        headers: buildAuthHeaders(token),
      }
    );
  };

  const likeMedia = async (inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/likes`,
      buildJsonOptions('POST', token, {
        media_id: Number(inputs.media_id),
      })
    );
  };

  const deleteLike = async (id, token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/likes/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(token),
    });
  };

  return {
    getAllLikes,
    getLikeCountByMediaId,
    getLikesByMediaId,
    getLikesByUserIdOrToken,
    checkUserLike,
    likeMedia,
    deleteLike,
  };
};

export const useRatings = () => {
  const getAllRatings = async () => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/ratings`);
  };

  const getAverageRating = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/ratings/average/${id}`);
  };

  const getRatingsByMediaId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/ratings/bymedia/${id}`);
  };

  const getRatingsByUserToken = async (token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/ratings/byuser`, {
      method: 'GET',
      headers: buildAuthHeaders(token),
    });
  };

  const postRating = async (inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/ratings`,
      buildJsonOptions('POST', token, {
        rating_value: Number(inputs.rating_value),
        media_id: Number(inputs.media_id),
      })
    );
  };

  return {
    getAllRatings,
    getAverageRating,
    getRatingsByMediaId,
    getRatingsByUserToken,
    postRating,
  };
};

export const useTags = () => {
  const getAllTags = async () => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/tags`);
  };

  const getMediaByTagName = async (tagName) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/tags/bytagname/${encodeURIComponent(tagName)}`
    );
  };

  const getMediaByTagId = async (tagId) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/tags/bytag/${tagId}`);
  };

  const getTagsByMediaId = async (id) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/tags/bymedia/${id}`);
  };

  const postTag = async (inputs, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/tags`,
      buildJsonOptions('POST', token, {
        tag_name: inputs.tag_name,
        media_id: Number(inputs.media_id),
      })
    );
  };

  const deleteTag = async (id, token) => {
    return fetchData(`${import.meta.env.VITE_MEDIA_API}/tags/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(token),
    });
  };

  const deleteTagFromMediaByTagName = async (mediaId, tagName, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/tags/bymedia/${mediaId}/${encodeURIComponent(tagName)}`,
      {
        method: 'DELETE',
        headers: buildAuthHeaders(token),
      }
    );
  };

  const deleteTagFromMediaByTagId = async (mediaId, tagId, token) => {
    return fetchData(
      `${import.meta.env.VITE_MEDIA_API}/tags/bymedia/${mediaId}/${tagId}`,
      {
        method: 'DELETE',
        headers: buildAuthHeaders(token),
      }
    );
  };

  return {
    getAllTags,
    getMediaByTagName,
    getMediaByTagId,
    getTagsByMediaId,
    postTag,
    deleteTag,
    deleteTagFromMediaByTagName,
    deleteTagFromMediaByTagId,
  };
};

export default fetchData;
