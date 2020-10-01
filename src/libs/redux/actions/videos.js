import {FETCH_VIDEOS_START} from './../types/videos';

export const fetchVideos = ({offset = 0, reset = false, category = null}) => ({
  type: FETCH_VIDEOS_START,
  payload: {offset, reset, category},
});
