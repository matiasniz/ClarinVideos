import {put, call, takeLatest} from 'redux-saga/effects';
import {
  FETCH_VIDEOS_START,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
} from '../types/videos';

import apiCall, {api} from '../api';
import {LIMIT} from '../constants';

export function* getVideos(data) {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    let path;
    if (data.payload.category) {
      path =
        api.videosByCategory.path +
        data.payload.category +
        '?offset=' +
        data.payload.offset * LIMIT +
        '&limit=' +
        LIMIT;
    } else {
      path =
        api.videosHome.path +
        '?offset=' +
        data.payload.offset * LIMIT +
        '&limit=' +
        LIMIT;
    }
    const result = yield call(
      apiCall,
      path,
      null,
      headers,
      api.videosHome.method,
    );

    if (result) {
      yield put({
        type: FETCH_VIDEOS_SUCCESS,
        data: {
          ...result,
          ...{reset: data.payload.reset, category: data.payload.category},
        },
      });
    } else {
      yield put({type: FETCH_VIDEOS_FAILURE, error});
    }
  } catch (error) {
    yield put({type: FETCH_VIDEOS_FAILURE, error});
  }
}

export default function* videosByCategory() {
  yield takeLatest(FETCH_VIDEOS_START, getVideos);
}
