import {all} from 'redux-saga/effects';
import videos from './videos';

export default function* rootSaga() {
  yield all([videos()]);
}
