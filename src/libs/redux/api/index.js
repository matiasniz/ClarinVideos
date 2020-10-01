import {VIDEOS_HOME, VIDEOS_BY_CATEGORY} from './../constants';

export const api = {
  videosHome: {
    method: 'GET',
    path: VIDEOS_HOME,
  },
  videosByCategory: {
    method: 'GET',
    path: VIDEOS_BY_CATEGORY,
  },
};

const apiCall = async (url, data, headers, method) => {
  try {
    let req = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });
    let json = await req.json();
    return json;
  } catch (err) {
    console.log('http method err', err);
    return null;
  }
};

export default apiCall;
