import axios from 'axios';

const API_KEY = '46431994-a635163271497b221c43ba27b';

axios.defaults.baseURL = 'https://pixabay.com';
async function getPhotos({ page, perPage, query }) {

  const res = await axios.get('api/', {
    params: {
      key: API_KEY,
      q: encodeURIComponent(query),
      page,
      per_page: perPage,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });

  return res.data;
}

export { getPhotos };

