import { all } from 'redux-saga/effects';

import sessionSaga from './session-saga';
import divaSaga from '../diva-react/sagas/diva-saga';

export default function* rootSaga() {
  yield all([
    sessionSaga(),
    divaSaga(),
  ]);
}
